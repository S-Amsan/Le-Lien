<?php

use LeLien\Management\Messages;
use LeLien\Management\user\Authentification;
use LeLien\Management\user\GestionCotisation;
use LeLien\Management\user\MariaDBUserRepository;

require_once 'header.php';

$trousseau = new MariaDBUserRepository($pdo);
$coti = new GestionCotisation($trousseau);
$auth = new Authentification($trousseau);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $email = $_SESSION['auth'];

        $user = $trousseau->findUserByEmail($email);
        $idUser = $user->getId();
        $cotisationEnCours = $user->estAdherent($idUser); // On regarde si il a une cotisation en cours
        if($cotisationEnCours){ // Si il est adhérer cela veut dire qu'il veut modif son abonnement donc on verif le mdp saisie
            $authResult = $auth->authenticate($email, $_POST['password']);
        }
        $cotiResult = $coti->enregistrer($idUser,$_POST["periodicite"],floatval($_POST["montant"]));
        if ($cotiResult) {
            if($cotisationEnCours){
                $message = "Votre cotisation a été mise à jour avec succès. Merci pour votre engagement continu !";
            }else{
                $message = "Votre cotisation a été enregistrée avec succès. Vous êtes désormais adhérent, merci pour votre soutien précieux !";
            }
            $_SESSION['flash']['success'] = $message;
            header("Location: ../../pages/accueil.html");
            exit;
        }
    } catch (Exception $e) {
        $message = $e->getMessage() === "Mot de pass et/ou email invalide" ? "Mot de passe incorrect" : $e->getMessage(); // On change le message
        $type = "danger";
    }
} else {
    $message = "Accès interdit";
    $type = "danger";
}
Messages::goHome($message, $type, "../../pages/adherer.html");
