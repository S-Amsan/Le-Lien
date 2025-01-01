<?php
if (!session_id())
    session_start();

use LeLien\Management\BddConnect;
use LeLien\Management\Exceptions\BddConnectException;
use LeLien\Management\Exceptions\EnregistrementExeption;
use LeLien\Management\form\EnregistrementEnquete;
use LeLien\Management\form\MariaDBFormRepository;
use LeLien\Management\Messages;

require_once '../../../vendor/autoload.php';

$bdd = new BddConnect();

try {
    $pdo = $bdd->connexion();
} catch (BddConnectException $e) {
    Messages::goHome(
        $e->getMessage(),
        $e->getType(),
        "../../pages/formulaire.html"
    );
    die();
}

$trousseau = new MariaDBFormRepository($pdo);
$enregistrement = new EnregistrementEnquete($trousseau);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $idUsers = $_SESSION['userID'];
        $region = $_POST['region'];
        $age = (int) $_POST['age'];
        $lieuDeVie = $_POST['lieuVie'];
        $lieuDeVieVoulue = $_POST['choixLieuVie'] === 'oui';
        $qualiteDeVie = $_POST['qualite_vie'];
        $commentaire = $_POST['commentaire'];
        $retour = $enregistrement->enregistrer($idUsers,$region,$age,$lieuDeVie,$lieuDeVieVoulue,$qualiteDeVie,$commentaire);
        if($retour) {
            $message = "Votre formulaire a été soumis avec succès !";
            $type = "success";
        }else{
            $message = "BDD : Erreur lors de l'exécution de la requête";
            $type = "danger";
        }

    } catch (EnregistrementExeption $e) {
        $message = $e->getMessage();
        $type = $e->getType();
    }
} else {
    $message = "Accès interdit";
    $type = "danger";
}
Messages::goHome($message, $type, "../../pages/formulaire.html");
