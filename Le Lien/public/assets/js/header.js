import {pagesData as pages} from "./data.js";

const srcImg = "../assets/images";
let pageActuel = pages.accueil;

// Identifie la page actuelle pour appliquer la classe "active"
for (const page of Object.values(pages)) {
    if (document.title === page.title) {
        pageActuel = page;
        pageActuel.class = "active";
    }
}

// Fonction pour gérer l'authentification (connexion/déconnexion)
function handleAuthAction(isAuth) {
    if (isAuth) {
        // Si l'utilisateur est connecté, effectuer la déconnexion
        fetch("../assets/php/deconnexion.php")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    window.location.href = "../index.php"; // Rediriger après déconnexion
                } else {
                    alert("Une erreur est survenue lors de la déconnexion.");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la déconnexion :", error);
            });
    } else {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        window.location.href = pages.Login.href;
    }
}

function UtilisateurEstConnecte() {
    return fetch("../assets/php/estConnecte.php")
        .then((response) => response.json())
        .then((data) => {
            return data.auth; // Récupère le statut d'authentification
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

// Rendre handleAuthAction accessible globalement
window.handleAuthAction = handleAuthAction;

document.addEventListener("DOMContentLoaded",  async() => {
    // Vérifie si l'utilisateur est connecté via une requête Ajax
    const estConnecte = await UtilisateurEstConnecte();

    // On ajoute le css dans le head
            const headerCss = document.createElement('link');
            headerCss.rel = 'stylesheet';
            headerCss.href = '../assets/css/header.css';
            document.head.appendChild(headerCss);

            // On ajoute le contenu HTML dans la balise <header>
            document.querySelector('header').innerHTML = `
                <nav class="navbar">
                    <div class="navbar-gauche">
                        <img src="${srcImg}/Logo.png" alt="Logo Le lien" class="logo">
                    </div>
                    <div class="navbar-droite">
                        <a class="${pages.accueil.class}" href="${pages.accueil.href}">Accueil</a>
                        <a class="${pages.presentation.class}" href="${pages.presentation.href}">Présentation</a>
                        <a class="${pages.nosActions.class}" href="${pages.nosActions.href}">Nos Actions</a>
                        <a class="${pages.declarerAccident.class}" id="accident" href="${pages.declarerAccident.href}">Déclarez un accident</a>
                        <div class="boutons-navbar">
                            <button class="bouton bouton-aider" onclick="window.location.href='${pages.nousAider.href}';">Nous aider</button>
                            ${
                !estConnecte
                    ? `<button class="bouton bouton-login" onclick="handleAuthAction(false);">Se connecter</button>`
                    : `<button class="bouton bouton-login deco" onclick="handleAuthAction(true);">Se déconnecter</button>`
            }
                        </div>
                    </div>
                    <button class="menu-burger" id="menu-burger">
                        <img src="${srcImg}/menuBurger.png" alt="menuBurger" width="100%" height="100%" class="menu-burger">
                    </button>
                </nav>
                <div class="menu-mobile" id="menu-mobile">
                    <a href="${pages.accueil.href}">Accueil</a>
                    <a href="${pages.presentation.href}">Présentation</a>
                    <a href="${pages.nosActions.href}">Nos Actions</a>
                    <a href="${pages.declarerAccident.href}">Déclarez un accident</a>
                    ${
                !estConnecte
                    ? `<button class="bouton bouton-login" onclick="handleAuthAction(false);">Se connecter</button>`
                    : `<button class="bouton bouton-login deco" onclick="handleAuthAction(true);">Se déconnecter</button>`
            }
                    <button class="bouton bouton-aider" onclick="window.location.href='${pages.nousAider.href}';">Nous aider</button>
                </div>
            `;


            // Charge et insère le message flash après le header
            fetch("../assets/php/message.php")
                .then(response => response.text())
                .then(messageHtml => {
                    const messageContainer = document.createElement("div");
                    messageContainer.innerHTML = messageHtml;
                    // Sélectionne le header
                    const headerElement = document.querySelector('header');
                    // Insère le message après le header
                    headerElement.insertAdjacentElement('afterend', messageContainer);
                })
                .catch((error) => {
                    console.error("Erreur lors du chargement du message :", error);
                });

            // Gestion du menu burger
            const burgerMenu = document.getElementById("menu-burger");
            const mobileMenu = document.getElementById("menu-mobile");

            burgerMenu.addEventListener("click", () => {
                mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
            });


});
