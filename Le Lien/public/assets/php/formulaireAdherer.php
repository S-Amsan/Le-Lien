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
        $user = $trousseau->findUserByEmail($_SESSION['auth']);
        $idUser = $user->getId();
        $cotisationEnCours = $user->estAdherent($idUser); // On regarde si il a une cotisation en cours
        $cotiResult = $coti->enregistrer($idUser,"annuelle",10);

        if ($cotiResult) {
            if($cotisationEnCours){
                $_SESSION['flash']['success'] = "Votre cotisation a été mise à jour avec succès. Merci pour votre engagement continu !";
            }else{
                $_SESSION['flash']['success'] = "Votre cotisation a été enregistrée avec succès. Vous êtes désormais adhérent, merci pour votre soutien précieux !";
            }
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
