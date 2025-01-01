<?php
if (!session_id())
    session_start();

use LeLien\Management\BddConnect;
use LeLien\Management\Exceptions\AuthentificationException;
use LeLien\Management\Exceptions\BddConnectException;
use LeLien\Management\Messages;
use LeLien\Management\user\Authentification;
use LeLien\Management\user\MariaDBUserRepository;

require_once '../../../vendor/autoload.php';

$bdd = new BddConnect();

try {
    $pdo = $bdd->connexion();
} catch (BddConnectException $e) {
    Messages::goHome(
        $e->getMessage(),
        $e->getType(),
        "../../pages/authentification.html");
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
        if($retour) {
            $message = "Vous êtes enregistré. Vous pouvez vous authentifier";
            $type = "success";
        }else{
            $message = "BDD : Erreur lors de l'exécution de la requête";
            $type = "danger";
        }

    } catch (AuthentificationException $e) {
        $message = $e->getMessage();
        $type = $e->getType();
    }
} else {
    $message = "Accès interdit";
    $type = "danger";
}

Messages::goHome($message, $type, "../../pages/authentification.html");