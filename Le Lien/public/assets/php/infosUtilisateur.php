<?php
// Démarrage de la session
if (!session_id()) {
    session_start();
}

// Vérifie si la session d'authentification existe
$estConnecte = isset($_SESSION['auth']);
$estAdherent = false;
$estAdmin = false;

if ($estConnecte) {
    $user = $_SESSION['auth'];
    $estAdherent = $user->getAdherent();
    $estAdmin = $user->getAdmin();
}

// Renvoie une réponse JSON contenant toutes les informations nécessaires
header('Content-Type: application/json');
echo json_encode([
    'estConnecte' => $estConnecte,
    'estAdherent' => $estAdherent,
    'estAdmin' => $estAdmin
]);
?>
