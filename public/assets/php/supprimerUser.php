<?php

use LeLien\Management\Exceptions\AuthentificationException;
use LeLien\Management\Messages;
use LeLien\Management\user\Authentification;
use LeLien\Management\user\MariaDBUserRepository;

require_once 'header.php';

$trousseau = new MariaDBUserRepository($pdo);
$auth = new Authentification($trousseau);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $email = $_SESSION['auth'];
        $authResult = $auth->authenticate($email, $_POST['password']); // On vérifie que le mot de passe saisie est correct

        if ($authResult) {
            $idUser = $trousseau->findUserByEmail($email)->getId();
            $result = $trousseau->deleteUser($idUser);

            if ($result) {
                $_SESSION['flash']['success'] = "Votre compte a été supprimé avec succès !";
                unset($_SESSION['auth']); // On le déconnecte
                header("Location: ../../pages/accueil.html"); // On le redirige vers l'accueil
                exit;
            }
        }
    } catch (Exception $e) {
        $message = $e->getMessage();
        $type = "danger";
    }
} else {
    $message = "Accès interdit";
    $type = "danger";
}
Messages::goHome($message, $type, "../../pages/profil.html");