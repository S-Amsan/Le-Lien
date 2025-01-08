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

function getNombreAdherentsData(region) {
    return fetch(`../assets/php/donneesStatistique.php?region=${encodeURIComponent(region)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data.nombreAdherentsRegionSelect;
        })
        .catch((error) => {
            console.error("Erreur :", error);
            return -1000; // -1000 car on remarquera l'erreur
        });
}


document.addEventListener('DOMContentLoaded', async () => {
    const regions = document.querySelectorAll(".imageCarte .region");
    const titreRegion = document.querySelectorAll(".nomRegion h1")[1];
    const donneeRegion = document.getElementById("regionSelect");
    const donneeEtranger = document.getElementById("etranger");

    // On récupère et affiche les données étrangers
    const adherentsEtranger = await getNombreAdherentsEtrangerData();
    donneeEtranger.innerHTML=`${adherentsEtranger} Adhérent${adherentsEtranger > 1 ? "s" :""}`;

    let regionSelect = null;
    // Ajoute un événement à chaque région
    regions.forEach(function (region) { // Pour chaque region

        // Lorsque qu'on clique
        region.addEventListener("click",  (e) => {  // On ajoute ou enleve une class "select" à la region
            if (regionSelect === region) // Si c'est celle déjà sélectionner, on l'enlève
                regionSelect = null;
            else{ // Sinon on l'ajoute
                regionSelect = region;
                regionSelect.classList.add("select"); // nous permet de modifier ensuite le style (dans le css)
            }
        });

        // Lorsque la souris survole
        region.addEventListener("mouseenter", async (e) => {
            if(regionSelect)
                regionSelect.classList.remove("select"); // ne modifier le style de la region cliqué lorsqu'une région est survolé
            titreRegion.textContent = region.getAttribute("title"); // afficher le nom de la région
            const regionSurvoler = region.getAttribute("id");
            const adherentsRegion = await getNombreAdherentsData(regionSurvoler); // obtenir les données
            donneeRegion.innerHTML=`${await getNombreAdherentsData(regionSurvoler)} Adhérent${adherentsRegion > 1 ? "s" :""}`; // l'afficher
        });

        // Lorsque la souris ne survole aucune region
        region.addEventListener("mouseleave", async (e) =>{
            if(!regionSelect){ // Si aucune région n'est cliqué
                titreRegion.textContent = `Aucune région`;
                donneeRegion.innerHTML=`N/A`;
            }else{
                regionSelect.classList.add("select");
                titreRegion.textContent = regionSelect.getAttribute("title");
                const regionSurvoler = regionSelect.getAttribute("id");
                const adherentsRegion = await getNombreAdherentsData(regionSurvoler);
                donneeRegion.innerHTML=`${await getNombreAdherentsData(regionSurvoler)} Adhérent${adherentsRegion > 1 ? "s" :""}`;
            }
        });
    });
});