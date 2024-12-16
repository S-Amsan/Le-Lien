<?php
session_start();
if (isset($_SESSION['auth'])) {
    unset($_SESSION['auth']);
    $_SESSION['flash']['success'] = "Déconnexion réussie";
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
