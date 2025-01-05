import {utilisateurEstAdherent} from "./infoUser.js"

const inputMontant = document.getElementById('input-montant');
const buttons = document.querySelectorAll('.buttons-Don');
const titreAdherer = document.getElementById("titre-adherer");
const buttonDeleteAbonnement = document.getElementById("button-DeleteAbonnement");

if (await utilisateurEstAdherent()) {
    titreAdherer.innerText = "Modifier mon adhésion";
    buttonDeleteAbonnement.style.display = "flex";
    buttonDeleteAbonnement.addEventListener("click", async ()=>{

    })
} else
    titreAdherer.innerText = "Adherer";

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        const value = button.getAttribute('data-value');
        inputMontant.value = value;

        button.classList.add('active');
    });
});

inputMontant.addEventListener('input', ()=>{
    inputMontant.value = inputMontant.value.replace(/[^0-9]/g, '');

    if (inputMontant.value.startsWith('0')){
        inputMontant.value = inputMontant.value.slice(1);
    }

    buttons.forEach(button => {
        button.classList.remove('active')

        if(button.getAttribute('data-value') === inputMontant.value )
        button.classList.add('active');
    })

})

const boutonSupprimerAbonnement = document.getElementById("button-DeleteAbonnement");
const actionSupprimer = document.getElementById("supprimer-adhesion");
boutonSupprimerAbonnement.addEventListener("click", demanderConfirmationSuppression)
function demanderConfirmationSuppression(){ // Affiche un popup (annuler, confirmer) pour valider la suppréssion
    if (document.getElementById("supprPopup")) {
        return; // Si le popup existe
    }
    const supprPopup = `
        <div class="suppression" id="supprPopup">
            <div class="contenu">
                <h1>Supprésion de votre abonnement</h1>
                <p>Cette action vous enlèvera tous les avantages d'un adhérent.</p>
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