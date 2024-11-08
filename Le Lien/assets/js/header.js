import {pagesData} from "./data.js";
const pages = JSON.parse(JSON.stringify(pagesData));
let pageActuel = pages.accueil

for (const page of Object.values(pages)) {
    if(document.title === page.title){
        pageActuel = page;
        pageActuel.class = "active";
    }
}

if (pageActuel === pages.accueil){ //Car la page d'acceuil n'est pas au meme emplacement que les autres.
    pages.presentation.href = "pages/" + pages.presentation.href;
    pages.nousAider.href = "pages/" + pages.nousAider.href;
    pages.declarerAccident.href = "pages/" + pages.declarerAccident.href;
}
else{
    pages.accueil.href = "../" + pages.accueil.href;
}

document.querySelector('header').innerHTML = `
    <nav class="navbar">
        <div class="navbar-gauche">
            <img src="${pageActuel.srcImg}/Logo.png" alt="Logo Le lien" class="logo">
        </div>
        <div class="navbar-droite">
            <a class="${pages.accueil.class}" href="${pages.accueil.href}">Accueil</a>
            <a class="${pages.presentation.class}"  href="${pages.presentation.href}">Présentation</a>
            <a class="${pages.nosActions.class}"  href="${pages.nosActions.href}">Nos Actions</a>
            <a class="${pages.declarerAccident.class}"  id="accident" href="${pages.declarerAccident.href}">Déclarez un accident</a>
            <div class="boutons-navbar">
                <button class="bouton bouton-aider" onclick="window.location.href='${pages.nousAider.href}';">Nous aider</button>
                <button class="bouton bouton-recherche">
                    <img src="${pageActuel.srcImg}/logo-recherche.png" alt="Logo pour recherche" class="logo-recherche">
                    Rechercher
                </button>
            </div>
        </div>
        <button class="menu-burger" id="menu-burger">
            <img src="../assets/images/menuBurger.png" alt="menuBurger" width="100%" height="100%" class="menu-burger">
        </button>
    </nav>

    <div class="menu-mobile" id="menu-mobile">
        <a href="../accueil.html">Accueil</a>
        <a href="presentation.html">Présentation</a>
        <a href="#">Nos Actions</a>
        <a href="Declarer%20un%20accident.html">Déclarez un accident</a>
        <button class="bouton bouton-aider">Nous aider</button>
        <button class="bouton bouton-recherche">Rechercher</button>
    </div>       
`
