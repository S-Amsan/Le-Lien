<?php

namespace LeLien\Management;

class Messages {

  /**
   * Effectue une redirection et enregistre un message d'alerte en session
   * @param string $message Texte du message d'alerte
   * @param string $type Couleur bootstrap de l'alerte
   * @param string $page Nom du fichier public de destination
   * @return void
   */
  public static function goHome(string $message, string $type, string $page) : void {
    $_SESSION['flash'][$type] = $message;
    $baseurl = $_SERVER['HTTP_ORIGIN'];
    header("Location: $baseurl/$page");
  }

  /**
   * Affiche les messages d'alerte présent dans la session
   * @return void
   */
  public static function messageFlash() : void {
    if(isset($_SESSION['flash'])) {
      foreach($_SESSION['flash'] as $type => $message) {
        echo <<<HTML
          <div class='messageFlash $type'>
              <button onclick="this.parentElement.remove()"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
              <p>$message</p>
          </div>
          HTML;
      }
      unset($_SESSION['flash']);
    }
  }
}