<?php
require_once 'identity.php';
createTrousseau($trousseau);
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    debugForm($_POST);
    addData($trousseau, $_POST);
    $jsonContent = file_get_contents($trousseau);
    $json = json_decode($jsonContent, true);
    debugForm($json);
}