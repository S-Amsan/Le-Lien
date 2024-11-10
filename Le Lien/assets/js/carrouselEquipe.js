import {contenuCarrouselData} from "./data.js";
const contenuCarrousel = JSON.parse(JSON.stringify(contenuCarrouselData));

//affectation des boutons
const boutonDroite = document.getElementById('Droite');
const boutonGauche = document.getElementById('Gauche');
//affectation de variable
const nbSlide = contenuCarrousel.length;
let id = 0


function getProchainId(){
    return id === nbSlide-1 ? 0 : ++id;
}
function getPrecedentId(){
    return id === 0 ? nbSlide-1 : --id;
}

function flecheDroiteClick() {
    id = getProchainId()
    actualiserCarrousel()
}
function flecheGaucheClick() {
    id = getPrecedentId()
    actualiserCarrousel()
}

function actualiserCarrousel(){
    document.querySelector('.carrousel .contenu').innerHTML = contenuCarrousel[id];
}

boutonDroite.addEventListener('click', flecheDroiteClick);
boutonGauche.addEventListener('click', flecheGaucheClick);
actualiserCarrousel()