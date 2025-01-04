function getNombreAdherentsEtrangerData() {
    return fetch("../assets/php/donneesStatistique.php")
        .then((response) => response.json())
        .then((data) => {
            return data.nombreAdherentsEtranger;
        })
        .catch((error) => {
            console.error("Erreur :", error);
            return false;
        });
}



document.addEventListener('DOMContentLoaded', async () => {
    const regions = document.querySelectorAll(".imageCarte path");
    const titreRegion = document.querySelectorAll(".nomRegion h1")[1];
    const donneeRegion = document.getElementById("regionSelect");
    const donneeEtranger = document.getElementById("etranger");

    donneeEtranger.innerHTML=`${await getNombreAdherentsEtrangerData()}`;

// Ajoute un événement à chaque région
    regions.forEach(function (region) {
        region.addEventListener("mouseenter", async (e) => {
            titreRegion.textContent = region.getAttribute("title");
            const regionSelect = region.getAttribute("title");
            donneeRegion.innerHTML=`${await getNombreAdherentsData(regionSelect)}`;
        });

        region.addEventListener("mouseleave", function (e) {
            titreRegion.textContent = `Aucune région`;
            donneeRegion.innerHTML=`N/A`;
        });
    });
});