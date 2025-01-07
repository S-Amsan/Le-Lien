function getQualitesVieData() {
    return fetch("../assets/php/donneesStatistique.php")
        .then((response) => response.json())
        .then((data) => {
            return data.qualitesVie;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

function getCouleursBleu(data) {
    const max = Math.max(...data);
    const min = Math.min(...data);

    return data.map((value) => {
        const normalise = (value - min) / (max - min); // On normalise
        const multiplicateur = 1 - normalise;

        // la valeur du RGB
        const rouge = Math.round(21 * multiplicateur * 0.1);
        const vert = Math.round(208 - 208 * multiplicateur * 0.4);
        const bleu = 253;

        return `rgb(${rouge}, ${vert}, ${bleu})`;
    });
}



document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const qualitesVie = await getQualitesVieData();

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Tout va bien',
                'Restriction de la vie sociale',
                'Souffrance psychologique',
                'Fatigue, épuisement',
                'Réduction d’activité professionnelle',
                'Coûts financiers importants',
                'Impact négatif sur la fratrie',
                'Conflits familiaux',
                'Maladie ou difficultés dans l’exécution de certaines tâches',
                'Éloignement de la personne',
                'Douleurs physiques ou séquelles permanentes'
            ],
            datasets: [{
                label: 'Évaluation de la qualité de vie',
                data: qualitesVie,
                backgroundColor: getCouleursBleu(qualitesVie),
                borderColor: '#000',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Comment évaluez-vous votre qualité de vie ?',
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
                    ticks: {
                        autoSkip: false,
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nombre de réponses'
                    }
                }
            }
        }
    });
});