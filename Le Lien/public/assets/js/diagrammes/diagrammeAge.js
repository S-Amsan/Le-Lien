document.addEventListener('DOMContentLoaded', function () {
    const ctx3 = document.getElementById('myChart3');

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
                data: [12, 25, 34, 22, 19, 15, 10, 5, 3, 1],  
                backgroundColor: [
                    '#1e88e5', '#43a047', '#f4511e', '#ffb300', '#8e24aa',
                    '#00acc1', '#d81b60', '#3949ab', '#fdd835', '#5e35b1'
                ],
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
                    position: 'top',
                    labels: {
                        padding: 20
                    }
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
