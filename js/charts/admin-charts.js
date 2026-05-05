// ============================================
// GRÁFICOS DE ADMINISTRADOR
// ============================================

function inicializarGraficosDashboardAdmin() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    
    // Gráfico comparativa de usuarios
    const nombresUsuarios = [];
    const consumosUsuarios = [];
    
    usuarios.forEach(u => {
        const registros = obtenerConsumoUsuario(u.email);
        const consumoTotal = registros.reduce((sum, r) => sum + r.consumo, 0);
        
        nombresUsuarios.push(u.nombre);
        consumosUsuarios.push(consumoTotal.toFixed(2));
    });
    
    const ctx = document.getElementById('chartComparativaUsuarios');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nombresUsuarios,
                datasets: [{
                    label: 'Consumo Total (kWh)',
                    data: consumosUsuarios,
                    backgroundColor: 'rgba(0, 200, 83, 0.7)',
                    borderColor: '#00C853',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
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
                                const kwh = context.parsed.x;
                                const costo = kwh * TARIFA_KWH;
                                return [
                                    'Consumo: ' + kwh + ' kWh',
                                    'Costo: ' + formatearMoneda(costo)
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
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
                    y: {
                        ticks: {
                            color: '#B0BEC5'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Usuarios eficientes y mayor consumo
    const estadisticasUsuarios = usuarios.map(u => {
        const registros = obtenerConsumoUsuario(u.email);
        const consumoTotal = registros.reduce((sum, r) => sum + r.consumo, 0);
        return {
            nombre: u.nombre,
            consumo: consumoTotal,
            costo: consumoTotal * TARIFA_KWH
        };
    });
    
    estadisticasUsuarios.sort((a, b) => a.consumo - b.consumo);
    const eficientes = estadisticasUsuarios.slice(0, 3);
    
    estadisticasUsuarios.sort((a, b) => b.consumo - a.consumo);
    const mayorConsumo = estadisticasUsuarios.slice(0, 3);
    
    const divEficientes = document.getElementById('usuariosEficientes');
    if (divEficientes) {
        divEficientes.innerHTML = eficientes.map((u, i) => `
            <div class="alert-item">
                <div class="alert-icon green">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">#${i + 1} ${u.nombre}</div>
                    <div class="alert-description">
                        Consumo: <strong>${u.consumo.toFixed(1)} kWh</strong> | ${formatearMoneda(u.costo)}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    const divMayorConsumo = document.getElementById('usuariosMayorConsumo');
    if (divMayorConsumo) {
        divMayorConsumo.innerHTML = mayorConsumo.map((u, i) => `
            <div class="alert-item warning">
                <div class="alert-icon orange">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">#${i + 1} ${u.nombre}</div>
                    <div class="alert-description">
                        Consumo: <strong>${u.consumo.toFixed(1)} kWh</strong> | ${formatearMoneda(u.costo)}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function inicializarGraficosAnalisisAvanzado() {
    // Gráfico de tendencia global
    const ctx1 = document.getElementById('chartTendenciaGlobal');
    if (ctx1) {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
        const datos = [850, 920, 880, 950, 1020, 980];
        
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Consumo Global (kWh)',
                    data: datos,
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
    
    // Gráfico de distribución por usuario
    const ctx2 = document.getElementById('chartDistribucionUsuarios');
    if (ctx2) {
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        const nombres = usuarios.map(u => u.nombre);
        const consumos = usuarios.map(u => {
            const registros = obtenerConsumoUsuario(u.email);
            return registros.reduce((sum, r) => sum + r.consumo, 0);
        });
        
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: nombres,
                datasets: [{
                    data: consumos,
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
                        labels: {
                            color: '#B0BEC5',
                            font: { family: 'Inter' },
                            padding: 15
                        }
                    }
                }
            }
        });
    }
}

function inicializarGraficosEstadisticasGlobales() {
    const ctx = document.getElementById('chartDistribucionGlobal');
    if (ctx) {
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        const nombres = usuarios.map(u => u.nombre);
        const consumos = usuarios.map(u => {
            const registros = obtenerConsumoUsuario(u.email);
            return registros.reduce((sum, r) => sum + r.consumo, 0).toFixed(2);
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nombres,
                datasets: [{
                    label: 'Consumo Total (kWh)',
                    data: consumos,
                    backgroundColor: 'rgba(0, 191, 165, 0.7)',
                    borderColor: '#00BFA5',
                    borderWidth: 2,
                    borderRadius: 8
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
