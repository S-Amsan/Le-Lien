<?php
if (!session_id())
    session_start();

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
        "../../pages/authentification.php");
    die();
}

$trousseau = new MariaDBUserRepository($pdo);
$auth = new Authentification($trousseau);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (empty($_POST['prenom']) || empty($_POST['nom']) || empty($_POST['email']) || empty($_POST['password']) || empty($_POST['repassword'])) {
            throw new AuthentificationException("Accès interdit", "danger");
        }
        $retour = $auth->register($_POST['prenom'],$_POST['nom'],$_POST['email'], $_POST['password'], $_POST['repassword']);
        $message = "Vous êtes enregistré. Vous pouvez vous authentifier";
        $type = "success";
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