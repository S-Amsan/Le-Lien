<?php

use LeLien\Management\BddConnect;
use LeLien\Management\Exceptions\BddConnectException;
use LeLien\Management\Messages;
use LeLien\Management\user\MariaDBUserRepository;

require_once '../../../vendor/autoload.php';

// Démarrage de la session
if (!session_id()) {
    session_start();
}
$bdd = new BddConnect();

try {
    $pdo = $bdd->connexion();
} catch (BddConnectException $e) {
    Messages::goHome(
        $e->getMessage(),
        $e->getType(),
        "../../pages/authentification.html"
    );
    die();
}

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
    $_SESSION['userID'] = $userID;
}

header('Content-Type: application/json');
echo json_encode([
    'estConnecte' => $estConnecte,
    'estAdherent' => $estAdherent,
    'estAdmin' => $estAdmin,
    'aSoumisEnquete' => $aSoumisEnquete,
]);
?>
