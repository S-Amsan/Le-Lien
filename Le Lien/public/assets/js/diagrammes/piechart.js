function getLieuxVieVoulusData() {
    return fetch("../assets/php/donneesStatistique.php")
        .then((response) => response.json())
        .then((data) => {
            return data.lieuxVieVoulus;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

document.addEventListener('DOMContentLoaded', async () => {
    const ctx2 = document.getElementById('myChart2');
    const agesStatistiques = await getLieuxVieVoulusData();

    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Oui', 'Non'],
            datasets: [{
                label: 'Réponses',
                data: agesStatistiques,
                backgroundColor: ['#1d9df8', '#f4d508'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Le lieu correspond-il à votre choix ?',
                    font: {
                        size: 18
                    },
                    padding: {
                        top: 40, // Augmente l'espace au-dessus du titre
                        bottom: 50 // Augmente l'espace en-dessous du titre
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        boxWidth: 20,
                        boxHeight: 20
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%' // Contrôle l'épaisseur de l'anneau (Doughnut spécifique)
        }
    });
});
