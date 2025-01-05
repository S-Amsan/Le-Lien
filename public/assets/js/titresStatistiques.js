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
    const nombreDeAdherents = await getNombreAdherentsData();
    const tauxReponseEnPourcentage = Math.floor(tauxReponse*100);
    const nombreDeReponses = nombreDeAdherents*tauxReponse;

    const titreTauxReponse = document.getElementById("tauxReponse");
    const titreNombreAdherents = document.getElementById("nombreAdherents");


    // Mise à jour des éléments HTML
    titreTauxReponse.textContent = `${tauxReponseEnPourcentage} % des adhérents ont répondu à l'enquête`;
    titreNombreAdherents.textContent = `Nombre total d'adhérents dans l'association : ${nombreDeAdherents}`;
    document.getElementById('nombreReponses').textContent = `Nombre total de réponses au formulaire : ${nombreDeReponses}`;

    // Mise à jour de la largeur de la barre de progression
    document.getElementById('progress-bar').style.width = `${tauxReponseEnPourcentage}%`;

});


