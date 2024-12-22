function utilisateurEstAdherent() {
    return fetch("../assets/php/infosUtilisateur.php")
        .then((response) => response.json())
        .then((data) => {
            return data.estAdherent;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}
let premiereConnexion = false;
const ajouterPopup = () => {

    // Ajoute le popup à la page
    const adherentPopup= `
        <div class="popup ${localStorage.getItem("popupCacher") === "true" ? "cacher" : "visible"}" id="popup">
            <button id="bouton-popup"><img src="../assets/images/fleche-droite-blanche.png" alt=""/></button>
            <div class="contenu">
                <p>En tant qu'adhérent précieux, votre avis compte ! Aidez-nous à mieux comprendre vos besoins en répondant à ce formulaire dédié à notre enquête.</p>
                <a href="formulaire.html">Je participe à l'enquête</a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", adherentPopup);
    document.getElementById("bouton-popup").addEventListener("click", handleChangerEtat);
};

const handleChangerEtat = () => {
    const popup = document.getElementById("popup");
    if (popup.classList.contains("visible")) {
        popup.classList.remove("visible");
        popup.classList.add("cacher");
        localStorage.setItem("popupCacher", "true");
    } else {
        popup.classList.remove("cacher");
        popup.classList.add("visible");
        localStorage.setItem("popupCacher", "false");
    }
};

const estAdherent = await utilisateurEstAdherent();
if (estAdherent){
    if (localStorage.getItem("popupCacher") === null) {
        localStorage.setItem("popupCacher", "false");
        premiereConnexion = true; // Car si il est vide ça veut dire que l'utilisateur viens de se connecter
    }
    if(premiereConnexion) {
        // Délai de 1 seconde avant d'afficher le popup
        setTimeout(() => {
            ajouterPopup(); // Affiche le popup seulement si l'utilisateur est adhérent
        }, 2000);
    }else{
        // Pas de Délai
        ajouterPopup(); // Affiche le popup seulement si l'utilisateur est adhérent
    }
}
