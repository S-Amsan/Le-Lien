function getAgeStatistiquesData() {
    return fetch("../assets/php/donneesStatistique.php")
        .then((response) => response.json())
        .then((data) => {
            return data.agesStatistiques;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

function getCouleursJaune(data) {
    const max = Math.max(...data);
    const min = Math.min(...data);

    return data.map((value) => {
        const normalise = (value - min) / (max - min); // On normalise
        const multiplicateur = 1 - normalise;

        // la valeur du RGB
        const rouge = Math.round(255 * (1 - multiplicateur * 0.4));
        const vert = Math.round(255 * (1 - multiplicateur * 0.6));
        const bleu = 0;

        return `rgb(${rouge}, ${vert}, ${bleu})`;
        }
    )
}


document.addEventListener('DOMContentLoaded', async () => {
    const ctx3 = document.getElementById('myChart3');
    const agesStatistiques = await getAgeStatistiquesData();


    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: [
                '18-25 ans',
                '26-35 ans',
                '36-45 ans',
                '46-55 ans',
                '56-65 ans',
                '66-75 ans',
                '76-85 ans',
                '86-95 ans',
                '96-105 ans',
                '106-120 ans'
            ],
            datasets: [{
                label: 'Répartition des âges',
                data: agesStatistiques,
                backgroundColor: getCouleursJaune(agesStatistiques),
                borderColor: '#000',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Répartition des âges des participants',
                    font: {
                        size: 18
                    },
                    padding: {
                        top: 20,
                        bottom: 30
                    }
                },
                legend: {
                    display: false // Désactiver la légende
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tranches d\'âge'
                    },
                    ticks: {
                        autoSkip: false
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nombre de participants'
                    }
                }
            }
        }
    });
});
