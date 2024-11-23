// On sélectionne les éléments de la page dont on a besoin
const personnes = document.querySelector('.personnes');
let personne = document.querySelectorAll('.personne');
const flecheGauche = document.querySelector('.fleche#gauche');
const flecheDroite = document.querySelector('.fleche#droite');

const nbPersonnesAAfficher = 5; // Le nombre de personnes à afficher
const nbPersonnes = personne.length; // Le nombre total de personnes

// On numérote chaque personne pour pouvoir les identifier plus tard
for (let i = 0; i < nbPersonnes; i++) {
    personne[i].setAttribute('id', String(i));
}

// On fait une copie des 5 premières et 5 dernières personnes :
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
let elementActuIndice = nbPersonnesAAfficher; // Position initiale dans la liste
let personneActuIndice = elementActuIndice - 3; // Indice de la personne au centre
let personnePrecIndice = personneActuIndice; // Indice de la personne précédente

let transitionEnCours = false; // Boolean qui indice si une transition est en cours

// On vérifie si le carrousel atteint l'une des limites et réinitialise la position
function verifLimite() {
    personnes.style.transition = 'none'; //réinitialisation instantanée (Pas visible par l'utilisateur)
    if (elementActuIndice === 0) {
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
    // Retire la classe "active" des éléments précédents
    const previousElements = personnes.querySelectorAll(`[id="${personnePrecIndice}"]`);
    previousElements.forEach(item => item.classList.remove('active'));

    // Ajoute la classe "active" à l'élément actuel
    const currentElements = personnes.querySelectorAll(`[id="${personneActuIndice}"]`);
    currentElements.forEach(item => item.classList.add('active'));


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
let autoClickTimer;
function defilementAuto() {
    clearInterval(autoClickTimer); // Permet de réactualiser le timer à chaque appel
    autoClickTimer = setInterval(() => { flecheDroite.click(); }, 3000); // On simule un click toutes les 3 secondes
}


// Les évenements :

flecheDroite.addEventListener('click', () => {
    if (transitionEnCours) return; // Si une transition est en cours, on ignore le click
    desactiverBouton();
    personnePrecIndice = personneActuIndice;
    personneActuIndice = (personneActuIndice + 1 > nbPersonnes - 1) ? 0 : personneActuIndice + 1; // Met à jour l'indice de la personne actuel
    elementActuIndice++;
    actualiseCarousel(); // Met à jour le carrousel
});

flecheGauche.addEventListener('click', () => {
    if (transitionEnCours) return; // Si une transition est en cours, on ignore le click
    desactiverBouton();
    personnePrecIndice = personneActuIndice; // Sauvegarde l'indice précédent
    personneActuIndice = (personneActuIndice - 1 < 0) ? nbPersonnes - 1 : personneActuIndice - 1; // Met à jour l'indice personne actuel
    elementActuIndice--;
    actualiseCarousel(); // Met à jour le carrousel
});

// Initialise le carrousel une fois la page chargée
document.addEventListener('DOMContentLoaded', () => {
    actualiseCarousel(); // Positionne correctement le carrousel
    defilementAuto(); // Lance le défilement automatique
});
