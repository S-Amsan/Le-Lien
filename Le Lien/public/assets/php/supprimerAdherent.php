<?php

use LeLien\Management\Messages;
use LeLien\Management\user\GestionCotisation;
use LeLien\Management\user\MariaDBUserRepository;

require_once 'header.php';

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
Messages::goHome($message, $type, "../../pages/adherer.html");
