export const pagesData = { // Les pages actif
    accueil : {
        title : "Le Lien - L'association",
        href : "accueil.html",
        class : "notActive"
    },
    presentation : {
        title : "Le Lien - L'association : Présentation",
        href : "presentation.html",
        class : "notActive"
    },
    declarerAccident : {
        title : "Le Lien - L'association : Déclarez un accident médical",
        href : "Declarer un accident.html",
        class : "notActive"
    },
    nosActions : {
        title : "Le Lien - L'association : Nos Actions",
        href : "#",
        class : "notActive"
    },
};

// Popup pour intéragir avec l'utilisateur :
export function demanderConfirmation(titre,text,buttonSubmit,containerMdp){
    if (document.getElementById("popup-confirmation")) {
        return; // Si le popup existe
    }
    const style = `
        <style>
            /* Le popup pour confirmer la déconnexion */
            .confirmation {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 100;
                background: #FBFAF9;
                padding: 1em 1em 0.5em 1em;
                border-radius: 15px;
                font-family: 'Poppins', sans-serif;
                width: 30vw;
                opacity: 0.97;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                animation: animationApparition 0.7s ease-out;
            }
            .confirmation h1 {
                font-size: 1.5em;
                font-weight: 600;
                margin: 0.5em 0;
                color: #E56363;
            }
            .confirmation p {
                color: #17171a;
                font-weight: 600;
                padding-bottom: 1rem;
            }
            .confirmation button {
                padding: 0.5em 1em;
                border-radius: 10px;
                font-size: 0.9em;
                box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                font-weight: 700;
                transition: background 0.5s ease, transform 0.3s ease;
            }
            .confirmation button:hover {
                background-position: left;
                transform: scale(1.1);
            }
            .confirmation #annuler {
                background: none;
                border: 2px solid #17171a;
                margin-right: 0.5em;
                color: #17171a;
            }
            .confirmation #confirmer-button {
                background: linear-gradient(to left, #FF6B6B, #FF4D4D);
                border: none;
                margin-left: 0.5em;
                color: white;
            }
            .confirmation .actions {
                display: flex;
                justify-content: flex-end;
                width: 100%;
                margin-top: auto;
            }
            .champ-mdp input {
                border: none;
                width: 29.5vw;
                height: 2rem;
                font-family: 'Poppins', sans-serif;
                margin-bottom: 10px;
                border-radius: 5px;
            }
            .champ-mdp .text {
                padding-bottom: 0.5em;
                margin: 0;
                font-size: 0.8em;
            }
            #password-saisie {
                padding-left: 10px;
            }
            /* Animation lorsque le popup apparait */
            @keyframes animationApparition {
                0% {
                    transform: translate(-50%, -50%) scale(0.3);
                    opacity: 0;
                }
                60% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        </style>
    `;
    document.head.insertAdjacentHTML("beforeend", style);

    const popupConfirmation = `
        <div class="confirmation" id="popup-confirmation">
            <div class="contenu">
                <h1>${titre}</h1>
                <p>${text}</p>
            </div>
            <div class="champ-mdp">
                <p class="text">Saisissez votre mot de passe pour confirmer l’action :</p>
                <input type="password" id="password-saisie" placeholder="Saisir le mot de passe" value="" required>
            </div>
            <div class="actions">
                <button id="annuler" onclick="this.parentElement.parentElement.remove()">Annuler</button>
                <button id="confirmer-button">Confirmer</button>
            </div>

        </div>
        `;
    document.body.insertAdjacentHTML("beforeend", popupConfirmation);
    document.getElementById("confirmer-button").addEventListener("click", () => handleEnvoyerForm(buttonSubmit,containerMdp));
}
function handleEnvoyerForm(buttonSubmit, containerMdp) {
    const mdpEnvoye = document.getElementById(containerMdp);
    const mdpSaisie = document.getElementById('password-saisie');
    if (mdpSaisie.value === "") {
        mdpSaisie.reportValidity();
    } else {
        mdpEnvoye.value = mdpSaisie.value;
        buttonSubmit.submit();
    }

}

