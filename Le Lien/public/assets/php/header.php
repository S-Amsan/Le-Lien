<?php
if (!session_id())
    session_start();

use LeLien\Management\BddConnect;
use LeLien\Management\Exceptions\BddConnectException;
use LeLien\Management\Messages;
use LeLien\Management\user\MariaDBUserRepository;

require_once '../../../vendor/autoload.php';

$bdd = new BddConnect();

try {
    $pdo = $bdd->connexion();
} catch (BddConnectException $e) {
    Messages::goHome(
        $e->getMessage(),
        $e->getType(),
        "../../pages/authentification.html"
    );
    die();
}

$trousseau = new MariaDBUserRepository($pdo);