<?php

use LeLien\Management\form\MariaDBFormRepository;

require_once '../../../vendor/autoload.php';



header('Content-Type: application/json');




echo json_encode([
    'tauxReponse' => MariaDBFormRepository::getTauxReponseData(),
    'nombreAdherents' => MariaDBFormRepository::getNombreAdherentsData(),
    'nombreAdherentsEtranger' => MariaDBFormRepository::getNombreAdherentsDataByRegion("etranger"),
    'qualitesVie' => MariaDBFormRepository::getQualitesVieData(),
    'agesStatistiques' => MariaDBFormRepository::getAgesData(),
    'lieuxVie' => MariaDBFormRepository::getLieuxVieData(),
    'lieuxVieVoulus' => MariaDBFormRepository::getLieuxVieVoulusData()
]);