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
        $sql = "SELECT COUNT(*) FROM Cotisation WHERE fin IS NULL";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return (int) $result['COUNT(*)'];
    }
    public function getNombreAdherentsDataByRegion(string $region): int
    {
        $sql = "SELECT COUNT(*) FROM Formulaire WHERE region = :region";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute([":region" => $region]);
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return (int) $result['COUNT(*)'];
    }
    public function getQualitesVieData(): array
    {
        $sql = "SELECT q.type, COUNT(fqv.idFormulaire) AS total
            FROM QualiteDeVie q
            LEFT JOIN FormulaireQualiteDeVie fqv ON q.idQualiteDeVie = fqv.idQualiteDeVie
            GROUP BY q.idQualiteDeVie, q.type
            ORDER BY q.idQualiteDeVie";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Formater les résultats en tableau simple
        return array_map(fn($row) => (int)$row['total'], $result);
    }




    public function getAgesData(): array
    {
        $sql = "
        SELECT age_range, COUNT(f.age) AS total
        FROM (
            SELECT '18-25' AS age_range, 18 AS min_age, 25 AS max_age UNION ALL
            SELECT '26-35', 26, 35 UNION ALL
            SELECT '36-45', 36, 45 UNION ALL
            SELECT '46-55', 46, 55 UNION ALL
            SELECT '56-65', 56, 65 UNION ALL
            SELECT '66-75', 66, 75 UNION ALL
            SELECT '76-85', 76, 85 UNION ALL
            SELECT '86-95', 86, 95 UNION ALL
            SELECT '96-105', 96, 105 UNION ALL
            SELECT '106-120', 106, 120
        ) AS age_ranges
        LEFT JOIN Formulaire f
        ON f.age BETWEEN age_ranges.min_age AND age_ranges.max_age
        GROUP BY age_range
        ORDER BY age_ranges.min_age;
    ";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Formater les résultats en tableau simple
        return array_map(fn($row) => (int)$row['total'], $result);
    }



    public function getLieuxVieData(): array
    {
        $lieuxDeVieOrdre = [
            'dans-la-famille-en-permanence',
            'autre',
            'avec-une-solution-d-accueil',
            'dans-la-famille-principalement', // Correspond à "Accueil temporaire en établissement" dans le diagramme
            'dans-un-logement-indépendant',
            'dans-un-habitat-inclusif',
            'dans-un-foyer-d-accueil-médicalisé',
            'dans-une-maison-d-accueil-médicalisée',
            'dans-un-foyer-de-vie-ou-foyer-d-hébergement',
            'en-IME-avec-internat',
            'hospitalisation-en-psychiatrie'
        ];

        $sql = "SELECT lieuDeVie, COUNT(*) AS total
        FROM Formulaire
        GROUP BY lieuDeVie";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Associer les résultats au bon ordre
        $lieuxDeVieData = [];
        foreach ($lieuxDeVieOrdre as $lieu) {
            $lieuxDeVieData[$lieu] = 0; // Initialise chaque lieu avec 0 par défaut
        }

        // Remplir avec les données récupérées
        foreach ($result as $row) {
            if (isset($lieuxDeVieData[$row['lieuDeVie']])) {
                $lieuxDeVieData[$row['lieuDeVie']] = (int)$row['total'];
            }
        }
        return array_values($lieuxDeVieData);
    }




    public function getLieuxVieVoulusData(): array
    {
        $sql = "SELECT lieuDeVieVoulue, COUNT(*) AS total
            FROM Formulaire
            GROUP BY lieuDeVieVoulue
            ORDER BY lieuDeVieVoulue";
        $stmt = $this->getDbConnexion()->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return [
            (int)($result[1]['total'] ?? 0), // Insatisfaits
            (int)($result[0]['total'] ?? 0)  // Satisfaits
        ];
    }


}