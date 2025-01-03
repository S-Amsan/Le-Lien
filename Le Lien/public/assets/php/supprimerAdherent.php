<?php

use LeLien\Management\BddConnect;
use LeLien\Management\Exceptions\BddConnectException;
use LeLien\Management\Messages;
use LeLien\Management\user\GestionCotisation;
use LeLien\Management\user\MariaDBUserRepository;

if (!session_id())
    session_start();

require_once '../../../vendor/autoload.php';

$bdd = new BddConnect();

try {
    $pdo = $bdd->connexion();
} catch (BddConnectException $e) {
    Messages::goHome(
        $e->getMessage(),
        $e->getType(),
        "../../pages/pageAdherent.html"
    );
    die();
}

$trousseau = new MariaDBUserRepository($pdo);
$coti = new GestionCotisation($trousseau);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $idUser = $trousseau->findUserByEmail($_SESSION['auth'])->getId();
        $cotiResult = $coti->annulerCotisation($idUser);

        if ($cotiResult) {
            $_SESSION['flash']['success'] = "Votre cotisation a été annulée avec succès, merci pour tout votre soutien.";
            header("Location: ../../pages/accueil.html");
            exit;
        }
    } catch (Exception $e) {
        $message = $e->getMessage();
        $type = "danger";
    }
} else {
    $message = "Accès interdit";
    $type = "danger";
}
Messages::goHome($message, $type, "../../pages/pageAdherent.html");
