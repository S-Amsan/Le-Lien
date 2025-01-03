document.addEventListener('DOMContentLoaded', function () {
    const ctx4 = document.getElementById('myChart4');

    new Chart(ctx4, {
        type: 'radar',
        data: {
            labels: [
                'Dans la famille en permanence',
                'Avec solution d’accueil/activités en journée',
                'Accueil temporaire en établissement',
                'Logement indépendant',
                'Habitat inclusif',
                'Foyer d’accueil médicalisé (FAM)',
                'Maison d’accueil spécialisée (MAS)',
                'Foyer de vie ou d’hébergement',
                'IME avec internat',
                'Hospitalisation en psychiatrie',
                'Autre'
            ],
            datasets: [{
                label: 'Réponses par lieu de vie',
                data: [26, 20, 15, 18, 10, 8, 12, 5, 14, 9, 11],
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
