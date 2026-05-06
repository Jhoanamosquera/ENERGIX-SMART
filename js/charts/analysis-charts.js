// ============================================
// GRÁFICOS DE ANÁLISIS
// ============================================

function inicializarGraficosAnalisis() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);

    // Gráfico consumo por día de la semana
    const ctxSemanal = document.getElementById('chartConsumoSemanal');
    if (ctxSemanal) {
        const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const consumoPorDia = [0, 0, 0, 0, 0, 0, 0];
        registros.forEach(r => {
            const d = new Date(r.fecha).getDay();
            const idx = d === 0 ? 6 : d - 1;
            consumoPorDia[idx] += r.consumo;
        });
        new Chart(ctxSemanal, {
            type: 'bar',
            data: {
                labels: dias,
                datasets: [{
                    label: 'Consumo (kWh)',
                    data: consumoPorDia.map(v => v.toFixed(2)),
                    backgroundColor: 'rgba(0, 200, 83, 0.7)',
                    borderColor: '#00C853',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#B0BEC5', font: { family: 'Inter' } } },
                    tooltip: {
                        backgroundColor: '#152535', titleColor: '#FFFFFF',
                        bodyColor: '#B0BEC5', borderColor: '#1E3A4A', borderWidth: 1
                    }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#B0BEC5', callback: v => v + ' kWh' }, grid: { color: '#1E3A4A' } },
                    x: { ticks: { color: '#B0BEC5' }, grid: { display: false } }
                }
            }
        });
    }

    // Gráfico consumo por hora del día
    const ctxHorario = document.getElementById('chartConsumoHorario');
    if (ctxHorario) {
        const horas = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}h`);
        const consumoPorHora = Array(24).fill(0);
        registros.forEach(r => {
            const h = new Date(r.fecha).getHours();
            consumoPorHora[h] += r.consumo;
        });
        new Chart(ctxHorario, {
            type: 'line',
            data: {
                labels: horas,
                datasets: [{
                    label: 'Consumo (kWh)',
                    data: consumoPorHora.map(v => v.toFixed(2)),
                    borderColor: '#00BFA5',
                    backgroundColor: 'rgba(0, 191, 165, 0.15)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#B0BEC5', font: { family: 'Inter' } } },
                    tooltip: {
                        backgroundColor: '#152535', titleColor: '#FFFFFF',
                        bodyColor: '#B0BEC5', borderColor: '#1E3A4A', borderWidth: 1
                    }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#B0BEC5', callback: v => v + ' kWh' }, grid: { color: '#1E3A4A' } },
                    x: { ticks: { color: '#B0BEC5', maxTicksLimit: 12 }, grid: { display: false } }
                }
            }
        });
    }

    // Gráfico de distribución por categoría
    const ctxDistribucion = document.getElementById('chartDistribucion');
    if (ctxDistribucion) {
        new Chart(ctxDistribucion, {
            type: 'doughnut',
            data: {
                labels: ['Iluminación', 'Electrodomésticos', 'Cocina', 'Lavado', 'Otros'],
                datasets: [{
                    data: [15, 35, 20, 15, 15],
                    backgroundColor: ['#00C853', '#00BFA5', '#FF9100', '#FF1744', '#B0BEC5'],
                    borderWidth: 2,
                    borderColor: '#152535'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#B0BEC5', font: { family: 'Inter' }, padding: 15 }
                    },
                    tooltip: {
                        backgroundColor: '#152535', titleColor: '#FFFFFF',
                        bodyColor: '#B0BEC5', borderColor: '#1E3A4A', borderWidth: 1,
                        callbacks: { label: ctx => ctx.label + ': ' + ctx.parsed + '%' }
                    }
                }
            }
        });
    }

    // Insights
    const insightsDiv = document.getElementById('insightsConsumo');
    if (insightsDiv) {
        insightsDiv.innerHTML = `
            <div class="alert-item">
                <div class="alert-icon green"><i class="fas fa-lightbulb"></i></div>
                <div class="alert-content">
                    <div class="alert-title">Iluminación (15%)</div>
                    <div class="alert-description">Considera usar bombillas LED para reducir este consumo hasta un 80%.</div>
                </div>
            </div>
            <div class="alert-item">
                <div class="alert-icon blue"><i class="fas fa-plug"></i></div>
                <div class="alert-content">
                    <div class="alert-title">Electrodomésticos (35%)</div>
                    <div class="alert-description">El mayor consumo. Desconecta los que no uses y aprovecha horarios valle.</div>
                </div>
            </div>
            <div class="alert-item">
                <div class="alert-icon orange"><i class="fas fa-fire"></i></div>
                <div class="alert-content">
                    <div class="alert-title">Cocina (20%)</div>
                    <div class="alert-description">Usa ollas a presión y tapa las ollas para cocinar más eficientemente.</div>
                </div>
            </div>
        `;
    }
}

function inicializarGraficosAnalisisInteligente() {
    // Tendencia mensual
    const ctx1 = document.getElementById('chartTendenciaMensual');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'],
                datasets: [{
                    label: 'Promedio',
                    data: [290, 305, 315, 320, 308, 293],
                    borderColor: '#00C853',
                    backgroundColor: 'rgba(0, 200, 83, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
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
    
    // Patrón horario
    const ctx2 = document.getElementById('chartPatronHorario');
    if (ctx2) {
        const horas = [];
        const consumos = [];
        
        for (let i = 0; i < 24; i += 2) {
            horas.push(`${i.toString().padStart(2, '0')}h`);
            // Simular patrón realista
            let consumo = 0.3;
            if (i >= 6 && i < 9) consumo = 1.2; // Mañana
            if (i >= 12 && i < 15) consumo = 1.5; // Mediodía
            if (i >= 18 && i < 23) consumo = 1.8; // Noche
            consumos.push(consumo);
        }
        
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: horas,
                datasets: [{
                    label: 'Consumo Promedio (kWh)',
                    data: consumos,
                    borderColor: '#00BFA5',
                    backgroundColor: 'rgba(0, 191, 165, 0.2)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: function(context) {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        return value > 1.5 ? '#FF1744' : '#00C853';
                    }
                }]
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
                        max: 1.8,
                        ticks: {
                            color: '#B0BEC5',
                            callback: value => value.toFixed(1)
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
    
    // Comparación semanal
    const ctx3 = document.getElementById('chartComparacionSemanal');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                datasets: [
                    {
                        label: 'Actual',
                        data: [68, 72, 71, 73],
                        backgroundColor: 'rgba(0, 200, 83, 0.7)',
                        borderColor: '#00C853',
                        borderWidth: 2,
                        borderRadius: 8
                    },
                    {
                        label: 'Promedio Histórico',
                        data: [70, 70, 70, 70],
                        backgroundColor: 'rgba(0, 191, 165, 0.3)',
                        borderColor: '#00BFA5',
                        borderWidth: 2,
                        borderRadius: 8
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
