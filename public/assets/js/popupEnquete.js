import {utilisateurASoumisEnquete, utilisateurEstAdherent} from "./infoUser.js";


let premiereConnexion = false;
const ajouterPopup = () => {

    // Ajoute le popup à la page
    const adherentPopup= `
        <div class="popup ${localStorage.getItem("popupCacher") === "true" ? "cacher" : "visible"}" id="popup">
            <button id="bouton-popup"><img src="../assets/images/popup/fleche-droite-blanche.png" alt=""/></button>
            <div class="contenu">
                <p>En tant qu'adhérent précieux, votre avis compte ! Aidez-nous à mieux comprendre vos besoins en répondant à ce formulaire dédié à notre enquête.</p>
                <a href="formulaire.html" id="lien">Je participe à l'enquête</a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", adherentPopup);
    document.getElementById("bouton-popup").addEventListener("click", handleChangerEtat);
    document.getElementById("lien").addEventListener("click", handleChangerEtat);
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
const aSoumisEnquete = await utilisateurASoumisEnquete();
if (estAdherent && !aSoumisEnquete){ // Si il est adhérent et qu'il n'a pas soumis l'enquete alors on affiche le popUp
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
