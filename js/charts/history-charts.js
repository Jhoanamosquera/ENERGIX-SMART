// ============================================
// GRÁFICOS DE HISTORIAL
// ============================================

function inicializarGraficoHistorial() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    
    // Calcular consumo por mes (últimos 12 meses)
    const hoy = new Date();
    const meses = [];
    const consumoPorMes = [];
    
    for (let i = 11; i >= 0; i--) {
        const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
        const mesNombre = fecha.toLocaleDateString('es-CO', { month: 'short', year: '2-digit' });
        
        const inicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
        const finMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
        
        const consumoMes = registros
            .filter(r => {
                const fechaRegistro = new Date(r.fecha);
                return fechaRegistro >= inicioMes && fechaRegistro <= finMes;
            })
            .reduce((sum, r) => sum + r.consumo, 0);
        
        meses.push(mesNombre);
        consumoPorMes.push(consumoMes.toFixed(2));
    }
    
    const ctx = document.getElementById('chartHistorial') || document.getElementById('chartHistorialMensual');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Consumo Mensual (kWh)',
                    data: consumoPorMes,
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
                                const kwh = context.parsed.y;
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
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Tabla detallada
    const tablaDiv = document.getElementById('tablaHistorialMensual');
    if (tablaDiv) {
        let tablaHTML = '<div class="table-container"><table><thead><tr><th>Mes</th><th>Consumo (kWh)</th><th>Costo (COP)</th></tr></thead><tbody>';
        
        for (let i = 0; i < meses.length; i++) {
            const costo = parseFloat(consumoPorMes[i]) * TARIFA_KWH;
            tablaHTML += `
                <tr>
                    <td>${meses[i]}</td>
                    <td class="mono">${consumoPorMes[i]} kWh</td>
                    <td class="mono">${formatearMoneda(costo)}</td>
                </tr>
            `;
        }
        
        tablaHTML += '</tbody></table></div>';
        tablaDiv.innerHTML = tablaHTML;
    }
}
