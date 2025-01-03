document.addEventListener('DOMContentLoaded', function () {
    const ctx2 = document.getElementById('myChart2');

    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Oui', 'Non'],
            datasets: [{
                label: 'Réponses',
                data: [70, 30],
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
