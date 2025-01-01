<?php

namespace LeLien\Management\form;
use PDO;
class MariaDBFormRepository implements IFormRepository
{
    private \PDO $dbConnexion;

    public function __construct(\PDO $dbConnexion)
    {
        $this->dbConnexion = $dbConnexion;
    }
    public function saveForm(Form $form): bool
    {
        // On insere d'abord dans la table formulaire
        $sql = "INSERT INTO Formulaire (region, age, lieuDeVie, lieuDeVieVoulue, commentaire, idUser) 
            VALUES (:region, :age, :lieuDeVie, :lieuDeVieVoulue, :commentaire, :idUser)";
        $stmt = $this->dbConnexion->prepare($sql);
        $formResult = $stmt->execute(
            [":region" => $form->getRegion(),
            ":age" => $form->getAge(),
            ":lieuDeVie" => $form->getLieuDeVie(),
            ":lieuDeVieVoulue" => (int) $form->isLieuDeVieVoulue(),
            ":commentaire" => $form->getCommentaire(),
            ":idUser" => $form->getIdUser()]
        );
        if(!$formResult) // Si il y'a une erreur on return false
            return false;

        // Si pas de problemme alors on insert dans formulaireQualiteDeVie qui fait la liasion entre formulaire et qualiteDeVie
        $idFormulaire = $this->dbConnexion->lastInsertId(); // On récupere l'id du formulaire
        $qualiteDeVie = $form->getQualiteDeVie(); // Un tableau de string (des types)
        $idsQualiteDeVie = [];  // tableau vide qui contiendra les id correspondants des types de la table qualiteDeVie

        foreach ($qualiteDeVie as $typeQualiteDeVie) { // Pour chaque type
            $sql = "SELECT idQualiteDeVie FROM QualiteDeVie WHERE type = :type";
            $stmt = $this->dbConnexion->prepare($sql);
            $stmt->execute(["type" => $typeQualiteDeVie]);
            $id = $stmt->fetch(PDO::FETCH_ASSOC);
            if($id){ // si on trouve un id alors :
                $idsQualiteDeVie[] = (int) $id['idQualiteDeVie']; // On récupere l'id et l'insere dans le tableau
            }else{ // L'id n'existe pas alors on insert ce type dans QualiteDeVie :
                $sql = "INSERT INTO QualiteDeVie(type) 
            VALUES (:type)";
                $stmt = $this->dbConnexion->prepare($sql);
                $qVieResult = $stmt->execute(
                    ["type" => $typeQualiteDeVie]
                );
                $idsQualiteDeVie[] = $this->dbConnexion->lastInsertId(); // On récupere l'id du nouveau type
                if(!$qVieResult) // Si il y'a une erreur return false
                    return false;
            }
        }
        // On peut maintenant insérer car on a recupere les id correspondant au type
        foreach ($idsQualiteDeVie as $idQualiteDeVie) {
            $sql = "INSERT INTO FormulaireQualiteDeVie(idFormulaire, idQualiteDeVie) 
            VALUES (:idFormulaire, :idQualiteDeVie)";
            $stmt = $this->dbConnexion->prepare($sql);
            $formQVieResult = $stmt->execute(
                ["idFormulaire" => $idFormulaire,
                 "idQualiteDeVie" => $idQualiteDeVie]
            );
            if(!$formQVieResult)
                return false;
        }
        return true;
    }

    public function findFormByUserEmail(string $email): ?Form
    {
        // TODO: Implement findFormByUserEmail() method.
        return null;
    }
    public static function getStatProportionParAge(): array
    {
        // TODO: Implement getStatProportionParAge() method.
        return [];
    }
}