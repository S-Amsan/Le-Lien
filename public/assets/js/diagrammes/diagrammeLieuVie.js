function getLieuxVieData() {
    return fetch("../assets/php/donneesStatistique.php")
        .then((response) => response.json())
        .then((data) => {
            return data.lieuxVie;
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification de l'authentification :", error);
            return false;
        });
}

document.addEventListener('DOMContentLoaded', async () => {
    const ctx4 = document.getElementById('myChart4');
    const lieuxVie = await getLieuxVieData();

    new Chart(ctx4, {
        type: 'radar',
        data: {
            labels: [
                'Dans la famille en permanence',
                'Autre',
                'Avec solution d’accueil/activités en journée',
                'Accueil temporaire en établissement', // Correspond à "dans-la-famille-principalement" dans la base
                'Logement indépendant',
                'Habitat inclusif',
                'Foyer d’accueil médicalisé (FAM)',
                'Maison d’accueil spécialisée (MAS)',
                'Foyer de vie ou d’hébergement',
                'IME avec internat',
                'Hospitalisation en psychiatrie'
            ],
            datasets: [{
                label: 'Réponses par lieu de vie',
                data: lieuxVie,
                backgroundColor: 'rgba(30, 136, 229, 0.2)',
                borderColor: '#1e88e5',
                borderWidth: 2,
                pointBackgroundColor: '#1e88e5'
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Répartition des lieux de vie',
                    font: {
                        size: 18
                    },
                    padding: {
                        top: 20,
                        bottom: 10
                    }
                },
                legend: {
                    display: false // Supprime la légende
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    },
                    pointLabels: {
                        font: {
                            size: 16 // Augmente la taille de la police des légendes
                        }
                    }
                }
            }
        }
    });
});
