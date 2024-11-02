let cheminImg = "";
let chemins = {accueil : "accueil.html",
                    presentation : "presentation.html",
                    nousAider : "nousAider.html",
                    declarerAccident : "Declarer%20un%20accident.html.html",};

if (document.title == "Page d'accueil"){ //Car la page d'acceuil n'est pas au meme emplacement que les autres.
    cheminImg = "assets/images";
    chemins.presentation = "pages/" + chemins.presentation;
    chemins.nousAider = "pages/" + chemins.nousAider;
    chemins.declarerAccident = "pages/" + chemins.declarerAccident;

}
else{
    chemins.accueil = "../" + chemins.accueil;
    cheminImg = "../assets/images";
}
document.querySelector('header').innerHTML = `
    <nav class="navbar">
        <div class="navbar-gauche">
            <img src="${cheminImg}/Logo.png" alt="Logo Le lien" class="logo">
        </div>
        <div class="navbar-droite">
            <a href="${chemins.accueil}">Accueil</a>
            <a href="${chemins.accueil}">Présentation</a>
            <a href="${chemins.nousAider}">Nos Actions</a>
            <a class="accident" href="${chemins.declarerAccident}">Déclarez un accident</a>
            <div class="boutons-navbar">
                <button class="bouton bouton-aider">Nous aider</button>
                <button class="bouton bouton-recherche">
                    <img src="${cheminImg}/logo-recherche.png" alt="Logo pour recherche" class="logo-recherche">
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
