// ============================================
// GRÁFICOS DEL DASHBOARD
// ============================================

function inicializarGraficosDashboard() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    
    // Gráfico de consumo últimos 7 días
    const hoy = new Date();
    const ultimos7Dias = [];
    const consumoPorDia = [];
    const promedioComparacion = [];
    
    for (let i = 6; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - i);
        fecha.setHours(0, 0, 0, 0);
        
        const fechaSiguiente = new Date(fecha);
        fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);
        
        const consumoDia = registros
            .filter(r => {
                const fechaRegistro = new Date(r.fecha);
                return fechaRegistro >= fecha && fechaRegistro < fechaSiguiente;
            })
            .reduce((sum, r) => sum + r.consumo, 0);
        
        ultimos7Dias.push(fecha.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric' }));
        consumoPorDia.push(consumoDia.toFixed(2));
        promedioComparacion.push((Math.random() * 2 + 8).toFixed(2)); // Promedio simulado
    }
    
    const ctx = document.getElementById('chartConsumo7Dias');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ultimos7Dias,
                datasets: [
                    {
                        label: 'Tu Consumo',
                        data: consumoPorDia,
                        borderColor: '#00C853',
                        backgroundColor: 'rgba(0, 200, 83, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'Promedio Hogares Similares',
                        data: promedioComparacion,
                        borderColor: '#00BFA5',
                        backgroundColor: 'rgba(0, 191, 165, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 7,
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
                            font: {
                                family: 'Inter'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#152535',
                        titleColor: '#FFFFFF',
                        bodyColor: '#B0BEC5',
                        borderColor: '#1E3A4A',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' kWh';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#B0BEC5',
                            callback: function(value) {
                                return value + ' kWh';
                            }
                        },
                        grid: {
                            color: '#1E3A4A'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#B0BEC5'
                        },
                        grid: {
                            color: '#1E3A4A'
                        }
                    }
                }
            }
        });
    }
    
    // Alertas recientes
    const alertasDiv = document.getElementById('alertasRecientes');
    if (alertasDiv) {
        alertasDiv.innerHTML = `
            <div style="display: grid; gap: 12px;">
                <div class="alert-item warning">
                    <div class="alert-icon orange">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Consumo Elevado</div>
                        <div class="alert-description">Tu consumo de hoy está 12% por encima del promedio</div>
                    </div>
                </div>
                <div class="alert-item">
                    <div class="alert-icon blue">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Recomendación</div>
                        <div class="alert-description">Considera usar electrodomésticos en horario valle</div>
                    </div>
                </div>
                <div class="alert-item">
                    <div class="alert-icon green">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Buen Trabajo</div>
                        <div class="alert-description">Has mantenido un consumo eficiente esta semana</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Recomendaciones del día
    const recomendacionesDiv = document.getElementById('recomendacionesDia');
    if (recomendacionesDiv) {
        recomendacionesDiv.innerHTML = `
            <div style="display: grid; gap: 12px;">
                <div class="recommendation-card">
                    <div class="recommendation-header">
                        <div class="recommendation-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div class="recommendation-title">Apaga las luces innecesarias</div>
                    </div>
                    <div class="recommendation-description">
                        Revisa que no haya luces encendidas en habitaciones vacías. Esto puede ahorrar hasta un 10% en iluminación.
                    </div>
                </div>
                
                <div class="recommendation-card">
                    <div class="recommendation-header">
                        <div class="recommendation-icon">
                            <i class="fas fa-plug"></i>
                        </div>
                        <div class="recommendation-title">Desconecta cargadores</div>
                    </div>
                    <div class="recommendation-description">
                        Los cargadores conectados sin dispositivos consumen energía fantasma. Desconéctalos cuando no los uses.
                    </div>
                </div>
                
                <div class="recommendation-card">
                    <div class="recommendation-header">
                        <div class="recommendation-icon">
                            <i class="fas fa-snowflake"></i>
                        </div>
                        <div class="recommendation-title">Optimiza el refrigerador</div>
                    </div>
                    <div class="recommendation-description">
                        Mantén el refrigerador a 4°C y el congelador a -18°C. No lo sobrecargues y limpia las bobinas regularmente.
                    </div>
                </div>
            </div>
        `;
    }
}

function inicializarGraficoHero() {
    const ctx = document.getElementById('heroChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Consumo',
                    data: [8.5, 9.2, 7.8, 10.1, 9.5, 11.2, 8.9],
                    borderColor: '#00C853',
                    backgroundColor: 'rgba(0, 200, 83, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { display: false },
                    x: { display: false }
                }
            }
        });
    }
}
