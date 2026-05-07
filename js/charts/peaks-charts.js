// ============================================
// GRÁFICOS DE PICOS DE CONSUMO
// ============================================

function inicializarGraficosPicos() {
    const ctx = document.getElementById('chartPicosVsPromedio');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['04-12', '04-06', '04-08', '03-28', '03-19', '03-10', '02-22'],
                datasets: [
                    {
                        label: 'Consumo en Pico',
                        data: [14.3, 13.1, 12.6, 15.8, 12.1, 11.9, 13.7],
                        backgroundColor: 'rgba(255, 23, 68, 0.7)',
                        borderColor: '#FF1744',
                        borderWidth: 2,
                        borderRadius: 8
                    },
                    {
                        label: 'Promedio Normal',
                        data: [9.7, 9.7, 9.7, 9.5, 9.5, 9.5, 9.6],
                        backgroundColor: 'rgba(0, 200, 83, 0.7)',
                        borderColor: '#00C853',
                        borderWidth: 2,
                        borderRadius: 8
                    },
                    {
                        label: 'Umbral (+20%)',
                        data: [11.6, 11.6, 11.6, 11.4, 11.4, 11.4, 11.5],
                        backgroundColor: 'rgba(255, 145, 0, 0.3)',
                        borderColor: '#FF9100',
                        borderWidth: 2,
                        borderRadius: 8,
                        type: 'line',
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#B0BEC5',
                            font: { family: 'Inter' }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 16,
                        ticks: {
                            color: '#B0BEC5',
                            callback: value => value + ' kWh'
                        },
                        grid: { color: '#1E3A4A' }
                    },
                    x: {
                        ticks: { color: '#B0BEC5' },
                        grid: { display: false }
                    }
                }
            }
        });
    }
}
