<?php
if (!session_id()) session_start();

use LeLien\Management\Authentification;
use LeLien\Management\BddConnect;
use LeLien\Management\Exceptions\AuthentificationException;
use LeLien\Management\Exceptions\BddConnectException;
use LeLien\Management\MariaDBUserRepository;
use LeLien\Management\Messages;

require_once 'header.php';
require_once '../../../vendor/autoload.php';

$bdd = new BddConnect();

try {
    $pdo = $bdd->connexion();
} catch (BddConnectException $e) {
    Messages::goHome(
        $e->getMessage(),
        $e->getType(),
        "../../pages/authentification.php"
    );
    die();
}

$trousseau = new MariaDBUserRepository($pdo);
$auth = new Authentification($trousseau);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (empty($_POST['email']) || empty($_POST['password'])) {
            throw new AuthentificationException("Veuillez remplir tous les champs", "danger");
        }

        // Authentification
        $authResult = $auth->authenticate($_POST['email'], $_POST['password']);

        // Enregistrer dans la session
        $_SESSION['auth'] = $authResult;


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

Messages::goHome($message, $type, "../../pages/authentification.php");

require_once 'footer.php';
