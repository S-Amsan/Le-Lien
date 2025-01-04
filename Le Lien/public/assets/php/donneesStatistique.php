<?php

use LeLien\Management\form\MariaDBFormRepository;

require_once '../../../vendor/autoload.php';
require_once 'header.php';

$trousseau = new MariaDBFormRepository($pdo);

header('Content-Type: application/json');
if (isset($_GET['region'])) {
    $region = htmlspecialchars($_GET['region']); // Sécurisation de l'entrée
    echo json_encode([
        'nombreAdherentsRegionSelect' => $trousseau->getNombreAdherentsDataByRegion($region)
    ]);
    exit;
}

echo json_encode([
    'tauxReponse' => $trousseau->getTauxReponseData(),
    'nombreAdherents' => $trousseau->getNombreAdherentsData(),
    'nombreAdherentsEtranger' => $trousseau->getNombreAdherentsDataByRegion("etranger"),
    'qualitesVie' => $trousseau->getQualitesVieData(),
    'agesStatistiques' => $trousseau->getAgesData(),
    'lieuxVie' => $trousseau->getLieuxVieData(),
    'lieuxVieVoulus' => $trousseau->getLieuxVieVoulusData()
]);