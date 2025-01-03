<?php

use LeLien\Management\Exceptions\AuthentificationException;
use LeLien\Management\Messages;
use LeLien\Management\user\Authentification;

require_once 'header.php';

$auth = new Authentification($trousseau);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (empty($_POST['email']) || empty($_POST['password'])) {
            throw new AuthentificationException("Veuillez remplir tous les champs", "danger");
        }

        // Authentification
        $authResult = $auth->authenticate($_POST['email'], $_POST['password']);

        // Enregistrer dans la session
        $_SESSION['auth'] = $_POST['email'];

        $_SESSION['flash']['success'] = $authResult;

        // Rediriger vers `secure.php`
        header("Location: ../../pages/accueil.html");
        exit;

    } catch (AuthentificationException $e) {
        $message = $e->getMessage();
        $type = $e->getType();
    }
} else {
    $message = "Accès interdit";
    $type = "danger";
}
Messages::goHome($message, $type, "../../pages/authentification.html");
