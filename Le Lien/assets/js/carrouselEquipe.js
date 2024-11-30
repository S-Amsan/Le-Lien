// On sélectionne les éléments de la page dont on a besoin :
const flecheGauche = document.querySelector('.fleche#gauche');
const flecheDroite = document.querySelector('.fleche#droite');
let personnes = document.querySelector('.personnes'); // On selectionne les personnes
const personnesCopie = [...personnes.children]; //On garde une copie des personnes
const nbPersonnes = personnesCopie.length; // Le nombre total de personnes
let transitionEnCours = false; // Boolean qui indice si une transition est en cours
let autoClickTimer; // variable qui stocke l'interval du défilement automatique
// affectation dans la fontion chargerCarousel() :
let nbPersonnesAAfficher; // Le nombre de personnes à afficher
let personne; // variable pour stoker les personnes
let elementActuIndice; // Position initiale dans la liste (Indice)
let personneActuIndice; // Indice de la personne au centre
let personnePrecIndice; // Indice de la personne précédente

// les fonctions :
function mediaQueriesNbPersonnesAAfficher() { // Le nombre de personne à afficher selon la largeur de l'écran
    const width = window.innerWidth;
    if (width < 768) { // petit écran (téléphone)
        return 1;
    } else if (width < 1025) { // écran moyen (ipad, petit pc)
        return 3;
    } else { // le reste
        return 5;
    }
}
function chargerCarousel(){
    if (nbPersonnesAAfficher !== mediaQueriesNbPersonnesAAfficher()) { // recharge le carousel que si le nombre de personne a charger change
        personnes.innerHTML = ''; // Vide le contenu de personnes
        personnesCopie.forEach(personne => personnes.appendChild(personne.cloneNode(true))); // On le reremplie grace à la copie
        personne = document.querySelectorAll('.personne'); // On sélectionne les personnes
        nbPersonnesAAfficher = mediaQueriesNbPersonnesAAfficher(); // on calcul le nombre de personne à afficher
        // On numérote chaque personne pour pouvoir les identifier plus tard
        for (let i = 0; i < nbPersonnes; i++) {
            personne[i].setAttribute('id', String(i));
        }
        // On fait une copie des n premières et n dernières personnes (n = nbPersonnesAAfficher):
        // Grâce à ça, on peut faire un effet de boucle infini
        // En résumé on peut aller à l'infini à gauche ou à droite
        const copiePremieresPersonnes = [...personne].slice(0, nbPersonnesAAfficher).map(item => item.cloneNode(true));
        const copieDernieresPersonnes = [...personne].slice(-nbPersonnesAAfficher).map(item => item.cloneNode(true));
        // On ajoute les copies au carrousel :
        copieDernieresPersonnes.reverse().forEach(copiePersonne => personnes.prepend(copiePersonne));
        copiePremieresPersonnes.forEach(copiePersonne => personnes.append(copiePersonne));
        // On actualise donc la liste des personnes
        personne = document.querySelectorAll('.personne');
        // Les indices :
        elementActuIndice = nbPersonnesAAfficher; // Position initiale dans la liste
        personneActuIndice = elementActuIndice - (Math.floor(nbPersonnesAAfficher / 2) + 1); // Indice de la personne au centre
        personnePrecIndice = personneActuIndice; // Indice de la personne précédente
        actualiseCarousel(); // Positionne correctement le carrousel
        defilementAuto(); // Lance le défilement automatique
    }
}
// On vérifie si le carrousel atteint l'une des limites et réinitialise la position
function verifLimite() {
    personnes.style.transition = 'none'; //réinitialisation instantanée (Pas visible par l'utilisateur)
    if (elementActuIndice === 0) { // On réinitialise l'indice
        elementActuIndice = nbPersonnes;
    } else if (elementActuIndice === nbPersonnes + nbPersonnesAAfficher) {
        elementActuIndice = nbPersonnesAAfficher;
    }
    const offset = -elementActuIndice * (100 / nbPersonnesAAfficher); // Calcul du décalage
    personnes.style.transform = `translateX(${offset}%)`; // Applique le décalage
}
function actualiseCarousel() {
    defilementAuto(); // Redémarre le défilement automatique
    // Class "active" :
    // Retire la classe "active" des personnes précédents
    const personnePrec = personnes.querySelectorAll(`[id="${personnePrecIndice}"]`);
    personnePrec.forEach(item => item.classList.remove('active'));
    // Ajoute la classe "active" à la personne actuel
    const personneActu = personnes.querySelectorAll(`[id="${personneActuIndice}"]`);
    personneActu.forEach(item => item.classList.add('active'));
    // Calcule le décalage et applique la transition
    const offset = -elementActuIndice * (100 / nbPersonnesAAfficher);
    personnes.style.transition = 'transform 0.5s ease-in-out'; // On le remet à chaque fois car on l'enleve dans la fct verifLimite()
    personnes.style.transform = `translateX(${offset}%)`;
    // Vérifie les limites et réactive les boutons après la transition
    setTimeout(verifLimite, 500);
    setTimeout(activerBouton, 500); // Empèche l'utilisateur de spammer les boutons
}
function activerBouton() {
    transitionEnCours = false;
    flecheGauche.disabled = false;
    flecheDroite.disabled = false;
}
function desactiverBouton() {
    transitionEnCours = true;
    flecheGauche.disabled = true;
    flecheDroite.disabled = true;
}
// On définit un défilement automatique
function defilementAuto() {
    clearInterval(autoClickTimer); // Permet de réactualiser le timer à chaque appel
    autoClickTimer = setInterval(() => { flecheDroite.click(); }, 3000); // On simule un click toutes les 3 secondes
}
function getProchainePersonne(){
    personnePrecIndice = personneActuIndice;
    personneActuIndice = (personneActuIndice + 1 > nbPersonnes - 1) ? 0 : personneActuIndice + 1; // Met à jour l'indice de la personne actuel
    elementActuIndice++;
}
function getPersonnePrecedente(){
    personnePrecIndice = personneActuIndice; // Sauvegarde l'indice précédent
    personneActuIndice = (personneActuIndice - 1 < 0) ? nbPersonnes - 1 : personneActuIndice - 1; // Met à jour l'indice personne actuel
    elementActuIndice--;
}
// Les évenements :
flecheDroite.addEventListener('click', () => {
    if (transitionEnCours) return; // Si une transition est en cours, on ignore le click
    desactiverBouton();
    getProchainePersonne()
    actualiseCarousel();
});
flecheGauche.addEventListener('click', () => {
    if (transitionEnCours) return; // Si une transition est en cours, on ignore le click
    desactiverBouton();
    getPersonnePrecedente()
    actualiseCarousel();
});
window.addEventListener('resize', chargerCarousel); //Quand la taille de l'ecran change
// Initialise le carrousel une fois la page chargée
document.addEventListener('DOMContentLoaded', () => {
    chargerCarousel()
});