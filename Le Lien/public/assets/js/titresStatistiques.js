function getTauxReponseData() {
    return fetch("../assets/php/donneesStatistique.php")
        .then((response) => response.json())
        .then((data) => {
            return data.tauxReponse;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

function getNombreAdherentsData() {
    return fetch("../assets/php/donneesStatistique.php")
        .then((response) => response.json())
        .then((data) => {
            return data.nombreAdherents;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

document.addEventListener('DOMContentLoaded', async () => {
    const tauxReponse = await getTauxReponseData();
    const nombreAdherents = await getNombreAdherentsData();

    const titreTauxReponse = document.getElementById("tauxReponse");
    const titreNombreAdherents = document.getElementById("nombreAdherents");

    titreTauxReponse.innerHTML=`${Math.floor(tauxReponse*100)}% des adhérents ont répondu à l'enquête`;
    titreNombreAdherents.innerHTML=`${nombreAdherents} adhérents présents dans l'association`;


});

