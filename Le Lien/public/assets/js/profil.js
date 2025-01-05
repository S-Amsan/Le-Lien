import {utilisateurEstAdherent, utilisateurEstAdmin, getNom, getPrenom} from "./infoUser.js";

const rangUser = document.getElementById("rang-user")
const logoRang = document.getElementById("rang-logo")
const userName = document.getElementById("username-profil")


userName.textContent = await getNom() + " " + await getPrenom();

if(await utilisateurEstAdmin()){
    logoRang.src = "../assets/images/profil/logoRang/couronne.png";
    rangUser.textContent = "Admin";
    rangUser.classList.add("admin");
}
else if(await utilisateurEstAdherent()){
    logoRang.src = "../assets/images/profil/logoRang/adherent-logo.png";
    rangUser.textContent = "Adhérent";
    rangUser.classList.add("adherent");
}
else{
    logoRang.src = "../assets/images/profil/logoRang/utilisateur-logo.png";
    rangUser.textContent = "Utilisateur";
    rangUser.classList.add("utilisateur");
}


// --------- Suppression du compte --------- //

const boutonSupprimerCompte = document.getElementById("supprimer-compte-button"); // On récupère le bouton
const actionSupprimer = document.getElementById("supprimer-compte"); // On récupère le formulaire (On utilise un formulaire, car plus simple pour envoyer une méthode POST à un fichier php).
boutonSupprimerCompte.addEventListener("click", demanderConfirmationSuppression) // On demande une confirmation
function demanderConfirmationSuppression(){ // Affiche un popup (annuler, confirmer) pour valider la suppréssion
    if (document.getElementById("supprPopup")) {
        return; // Si le popup existe
    }
    const supprPopup = `
        <div class="suppression" id="supprPopup">
            <div class="contenu">
                <h1>Suppréssion de votre compte</h1>
                <p>Cette action est irréversible. Êtes-vous certain de vouloir supprimer définitivement votre compte ?</p>
            </div>
            <div class="confirmation">
                <p class="text">Saisissez votre mot de passe pour confirmer l’action :</p>
                <input type="password" id="password-saisie" placeholder="Saisir le mot de passe" value="" required>
            </div>
            <div class="actions">
                <button id="annuler" onclick="this.parentElement.parentElement.remove()">Annuler</button>
                <button id="suppr">Confirmer</button>
            </div>

        </div>
        `;
    document.body.insertAdjacentHTML("beforeend", supprPopup);
    document.getElementById("suppr").addEventListener("click", handleSupprimerCompte);
}



function handleSupprimerCompte(){ // permet de supprimer le compte
    const mdpEnvoye = document.getElementById('password-cacher');
    const mdpSaisie = document.getElementById('password-saisie');
    if(mdpSaisie.value === ""){
        mdpSaisie.reportValidity();
        return;
    }else{
        mdpEnvoye.value = mdpSaisie.value;
        actionSupprimer.submit();
    }

}