<?php

namespace LeLien\Management\form;

use LeLien\Management\MariaDBRepository;

class MariaDBFormRepository extends MariaDBRepository implements IFormRepository
{

    public function __construct(\PDO $dbConnexion)
    {
        parent::__construct($dbConnexion);
    }

    public function saveForm(Form $form): bool
    {
        // On insère d'abord dans la table formulaire
        $sql = "INSERT INTO Formulaire (region, age, lieuDeVie, lieuDeVieVoulue, commentaire, idUser) 
            VALUES (:region, :age, :lieuDeVie, :lieuDeVieVoulue, :commentaire, :idUser)";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $formResult = $stmt->execute(
            [":region" => $form->getRegion(),
                ":age" => $form->getAge(),
                ":lieuDeVie" => $form->getLieuDeVie(),
                ":lieuDeVieVoulue" => (int)$form->isLieuDeVieVoulue(),
                ":commentaire" => $form->getCommentaire(),
                ":idUser" => $form->getIdUser()]
        );
        if (!$formResult) // Si il y a une erreur on return false
            return false;

        // Si pas de problème alors, on insère dans formulaireQualiteDeVie qui fait la liaison entre formulaire et qualiteDeVie
        $idFormulaire = $this->getDbConnexion()->lastInsertId(); // On récupère l'id du formulaire
        $qualiteDeVie = $form->getQualiteDeVie(); // Un tableau de string (des types)

        foreach ($qualiteDeVie as $typeQualiteDeVie) {
            // Appel de la procédure stockée pour chaque type
            $sql = "CALL ajouterReponseQualiteDeVie(:idFormulaire, :type)";
            $stmt = $this->getDbConnexion()->prepare($sql);
            $formQVieResult = $stmt->execute(
                ["idFormulaire" => $idFormulaire,
                    "type" => $typeQualiteDeVie]
            );
            if (!$formQVieResult)
                return false;
        }

        return true;
    }


    // Fonction pour récupérer les statistiques du formulaire :
    public function getTauxReponseData(): float
    {
        return (self::getNombreReponseData() / self::getNombreAdherentsData());
    }

    public function getNombreReponseData(): int
    {
        $sql = "SELECT COUNT(*) FROM Formulaire";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return (int) $result['COUNT(*)'];
    }

    public function getNombreAdherentsData(): int
    {
        return 100;
    } // TODO requete sql (respecter le format)
    public function getNombreAdherentsDataByRegion(string $region): int
    {
        return 60;
    } // TODO requete sql (respecter le format)
    public function getQualitesVieData(): array
    {
        return [25, 15, 18, 20, 10, 34, 12, 5, 14, 9, 11];
    } // TODO requete sql (respecter le format)

    public function getAgesData(): array
    {
        return [12, 25, 34, 22, 19, 15, 10, 5, 3, 1];
    } // TODO requete sql (respecter le format)

    public function getLieuxVieData(): array
    {
        return [26, 20, 15, 18, 10, 8, 12, 5, 14, 9, 11];
    } // TODO requete sql (respecter le format)

    public function getLieuxVieVoulusData(): array
    {
        return [50, 50];
    } // TODO requete sql (respecter le format)

}