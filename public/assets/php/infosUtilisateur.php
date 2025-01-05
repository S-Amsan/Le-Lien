<?php

use LeLien\Management\user\MariaDBUserRepository;

require_once 'header.php';

$trousseau = new MariaDBUserRepository($pdo);

// Initialisation des variables
$estConnecte = false;
$estAdherent = false;
$estAdmin = false;
// Vérifie si la session d'authentification existe
if (isset($_SESSION['auth'])) {
    $estConnecte = true;
    $user = $trousseau->findUserByEmail($_SESSION['auth']);
    $estAdmin = $user->estAdmin();
    $userID = $user->getId();
    $estAdherent = $user->estAdherent($userID);
    $aSoumisEnquete = $user->aSoumisEnquete($userID);
    $sonNom = $user->getNom();
    $sonPrenom = $user->getPrenom();
    $_SESSION['userID'] = $userID;
}

header('Content-Type: application/json');
echo json_encode([
    'estConnecte' => $estConnecte,
    'estAdherent' => $estAdherent,
    'estAdmin' => $estAdmin,
    'aSoumisEnquete' => $aSoumisEnquete,
    'sonNom' => $sonNom,
    'sonPrenom' => $sonPrenom
]);
?>
