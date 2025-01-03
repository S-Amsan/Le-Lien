const ctx = document.getElementById('myChart').getContext('2d');

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
            data: [25, 15, 18, 20, 10, 34, 12, 5, 14, 9, 11],
            backgroundColor: [
                '#4caf50', '#f44336', '#2196f3', '#ffeb3b', '#9c27b0',
                '#ff9800', '#3f51b5', '#009688', '#ff5722', '#607d8b', '#8bc34a'
            ],
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
