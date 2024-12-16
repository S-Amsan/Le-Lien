<?php
// Démarrage de la session
if (!session_id())
    session_start();

// Vérifie si la session d'authentification existe
$isAuth = isset($_SESSION['auth']);

// Renvoie une réponse JSON
header('Content-Type: application/json');
echo json_encode(['auth' => $isAuth]);
?>
