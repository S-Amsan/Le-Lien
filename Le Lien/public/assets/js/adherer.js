import {getUtilisateurCotisation, utilisateurEstAdherent} from "./infoUser.js"
import {demanderConfirmation} from "./data.js";

const inputMontant = document.getElementById('input-montant');
const buttons = document.querySelectorAll('.buttons-Don');
const titreAdherer = document.getElementById("titre-adherer");
const buttonDeleteAbonnement = document.getElementById("button-DeleteAbonnement");

const radioPeriodicite = document.querySelectorAll('input[name="periodicite"]');



const cotisation = await getUtilisateurCotisation();
const buttonPayerCB = document.getElementById("button-cb");
const buttonPayerPaypal = document.getElementById("button-paypal");

const styleButtonDesactive = {
    opacity: 0.5,
    pointerEvents: 'none',  // Désactive les interactions (cliquer, survoler)
    userSelect: 'none'      // Désactive la sélection du texte
};
const styleButtonActive = {
    opacity: 1,
    pointerEvents: 'auto',
    userSelect: 'auto'
};

const actualiserPayement = () =>{
    const periodiciteSelect = [...radioPeriodicite].find(button => button.checked);
    if(cotisation.montant === Number(inputMontant.value) && cotisation.type === periodiciteSelect.value){
        Object.assign(buttonPayerCB.style, styleButtonDesactive);
        Object.assign(buttonPayerPaypal.style, styleButtonDesactive);
    }else{
        Object.assign(buttonPayerCB.style, styleButtonActive);
        Object.assign(buttonPayerPaypal.style, styleButtonActive);
    }
}
const actualiserAbonnement = () => {

    inputMontant.value = inputMontant.value.replace(/[^0-9]/g, '');
    if (inputMontant.value.startsWith('0')){
        inputMontant.value = inputMontant.value.slice(1);
    }

    buttons.forEach(button => {
        button.classList.remove('active')

        if(button.getAttribute('data-value') === inputMontant.value )
            button.classList.add('active');
    })
    actualiserPayement();
}
const selectionnerCotisationUser = () => {
    inputMontant.value = cotisation.montant;
    radioPeriodicite.forEach(button => {
        if (button.value === cotisation.type) {
            button.checked = true;
        }
    });
}



if (await utilisateurEstAdherent()) {
    titreAdherer.innerText = "Modifier mon adhésion";
    buttonDeleteAbonnement.style.display = "flex";
    selectionnerCotisationUser();
    actualiserAbonnement();
    const actionAdherer = document.getElementById("form-adherer");
    const containerMdpId = 'password-cacher-adherer';
    buttonPayerCB.addEventListener("click", () => demanderConfirmation("Modification de votre abonnement", "Votre abonnement actuel sera annulé et remplacé par la nouvelle sélection.", actionAdherer,containerMdpId))
    buttonPayerPaypal.addEventListener("click", () => demanderConfirmation("Modification de votre abonnement", "Votre abonnement actuel sera annulé et remplacé par la nouvelle sélection.", actionAdherer,containerMdpId))

} else {
    titreAdherer.innerText = "Adherer";
    buttonPayerCB.setAttribute("type","submit");
    buttonPayerPaypal.setAttribute("type","submit");
    const actionAdherer = document.getElementById("form-adherer");
}

radioPeriodicite.forEach(button => {
    button.addEventListener('change', () => {
        if (button.checked) {
            actualiserPayement();
        }
    });
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        inputMontant.value = button.getAttribute('data-value');
        button.classList.add('active');
        actualiserPayement();
    });
});

inputMontant.addEventListener('input', ()=>{
    actualiserAbonnement();

})


const boutonSupprimerAbonnement = document.getElementById("button-DeleteAbonnement");
const actionSupprimer = document.getElementById("supprimer-adhesion");
const containerMdpID = "password-cacher-supprimer";
boutonSupprimerAbonnement.addEventListener("click",() => demanderConfirmation("Suppression de votre abonnement","Cette action vous enlèvera tous les avantages d'un adhérent.",actionSupprimer,containerMdpID))



