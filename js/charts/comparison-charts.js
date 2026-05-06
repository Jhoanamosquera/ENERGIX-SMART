// ============================================
// GRÁFICOS DE COMPARACIÓN
// ============================================

function inicializarGraficosComparacion() {
    const ctx = document.getElementById('chartComparacion');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'],
                datasets: [
                    {
                        label: 'Período Actual',
                        data: [285, 295, 310, 305, 293, 287],
                        borderColor: '#00C853',
                        backgroundColor: 'rgba(0, 200, 83, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    },
                    {
                        label: 'Período Anterior',
                        data: [290, 305, 315, 320, 308, 295],
                        borderColor: '#00BFA5',
                        backgroundColor: 'rgba(0, 191, 165, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8,
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
                        max: 380,
                        ticks: {
                            color: '#B0BEC5',
                            callback: value => value + ' kWh'
                        },
                        grid: { color: '#1E3A4A' }
                    },
                    x: {
                        ticks: { color: '#B0BEC5' },
                        grid: { color: '#1E3A4A' }
                    }
                }
            }
        });
    }
    
    const ctx2 = document.getElementById('chartTendenciaSuperpuesta');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'],
                datasets: [
                    {
                        label: 'Período Actual',
                        data: [285, 295, 310, 305, 293, 287],
                        borderColor: '#00C853',
                        backgroundColor: 'transparent',
                        tension: 0.4,
                        pointRadius: 5
                    },
                    {
                        label: 'Período Anterior',
                        data: [290, 305, 315, 320, 308, 295],
                        borderColor: '#00BFA5',
                        backgroundColor: 'transparent',
                        tension: 0.4,
                        pointRadius: 5
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
                        max: 380,
                        ticks: {
                            color: '#B0BEC5'
                        },
                        grid: { color: '#1E3A4A' }
                    },
                    x: {
                        ticks: { color: '#B0BEC5' },
                        grid: { color: '#1E3A4A' }
                    }
                }
            }
        });
    }
}
