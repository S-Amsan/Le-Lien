<?php

use LeLien\Management\form\MariaDBFormRepository;

require_once '../../../vendor/autoload.php';



header('Content-Type: application/json');









if (isset($_GET['region'])) {
    $region = htmlspecialchars($_GET['region']); // Sécurisation de l'entrée
    echo json_encode([
        'nombreAdherentsRegionSelect' => MariaDBFormRepository::getNombreAdherentsDataByRegion($region)
    ]);
    exit;
}



echo json_encode([
    'tauxReponse' => MariaDBFormRepository::getTauxReponseData(),
    'nombreAdherents' => MariaDBFormRepository::getNombreAdherentsData(),
    'nombreAdherentsEtranger' => MariaDBFormRepository::getNombreAdherentsDataByRegion("etranger"),
    'qualitesVie' => MariaDBFormRepository::getQualitesVieData(),
    'agesStatistiques' => MariaDBFormRepository::getAgesData(),
    'lieuxVie' => MariaDBFormRepository::getLieuxVieData(),
    'lieuxVieVoulus' => MariaDBFormRepository::getLieuxVieVoulusData()
]);