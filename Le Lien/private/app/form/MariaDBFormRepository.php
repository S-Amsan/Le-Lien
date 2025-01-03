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
        // On insère d'abord dans la table formulaire
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
        if (!$formResult) // Si il y a une erreur on return false
            return false;

        // Si pas de problème alors on insère dans formulaireQualiteDeVie qui fait la liaison entre formulaire et qualiteDeVie
        $idFormulaire = $this->dbConnexion->lastInsertId(); // On récupère l'id du formulaire
        $qualiteDeVie = $form->getQualiteDeVie(); // Un tableau de string (des types)

        foreach ($qualiteDeVie as $typeQualiteDeVie) {
            // Appel de la procédure stockée pour chaque type
            $sql = "CALL ajouterReponseQualiteDeVie(:idFormulaire, :type)";
            $stmt = $this->dbConnexion->prepare($sql);
            $formQVieResult = $stmt->execute(
                ["idFormulaire" => $idFormulaire,
                    "type" => $typeQualiteDeVie]
            );
            if (!$formQVieResult)
                return false;
        }

        return true;
    }
}