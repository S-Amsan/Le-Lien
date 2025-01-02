var regions = document.querySelectorAll(".imageCarte path");
var titreRegion = document.querySelector(".nomRegion h1");
var donneeRegion = document.querySelector(".nomRegion h2");

// Ajoute un événement à chaque région
regions.forEach(function(region) {
    region.addEventListener("mouseenter", function(e) {
        titreRegion.textContent = region.getAttribute("title");
        donneeRegion.textContent = "Donnée : " // je modifierai plus tard quand y'aura les requetes sql
    });

    region.addEventListener("mouseleave", function(e) {
        titreRegion.textContent = "Choisir Region";
        donneeRegion.textContent = "Donnée : ";
    });
});