// ============================================
// VISTA: DASHBOARD USUARIO
// ============================================

function generarDashboard() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    const stats = calcularEstadisticas(registros);
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-home"></i> Dashboard</h1>
            <p>Resumen de tu consumo energético</p>
        </div>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Consumo Hoy</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-bolt"></i>
                    </div>
                </div>
                <div class="kpi-value">${stats.consumoHoy.toFixed(1)} <span style="font-size: 18px;">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(stats.costoHoy)}</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Consumo del Mes</span>
                    <div class="kpi-icon blue">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <div class="kpi-value">${stats.consumoMes.toFixed(1)} <span style="font-size: 18px;">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(stats.costoMes)}</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Proyección del Mes</span>
                    <div class="kpi-icon orange">
                        <i class="fas fa-chart-line"></i>
                    </div>
                </div>
                <div class="kpi-value">${stats.proyeccion.toFixed(0)} <span style="font-size: 18px;">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(stats.costoProyeccion)}</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Ahorro vs Mes Anterior</span>
                    <div class="kpi-icon ${stats.ahorro > 0 ? 'green' : 'red'}">
                        <i class="fas fa-${stats.ahorro > 0 ? 'arrow-down' : 'arrow-up'}"></i>
                    </div>
                </div>
                <div class="kpi-value ${stats.ahorro > 0 ? 'trend positive' : 'trend negative'}">
                    ${stats.ahorro > 0 ? '-' : '+'}${Math.abs(stats.ahorro).toFixed(1)}%
                </div>
                <div class="kpi-label">
                    ${stats.ahorro > 0 ? 'Ahorraste' : 'Aumentó'} ${formatearMoneda(Math.abs(stats.costoMes - stats.costoMesAnterior))}
                </div>
            </div>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-chart-line"></i>
                        Consumo Últimos 7 Días
                    </h3>
                </div>
                <div class="chart-container">
                    <canvas id="chartConsumo7Dias"></canvas>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-bell"></i>
                        Alertas Recientes
                    </h3>
                </div>
                <div id="alertasRecientes"></div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-lightbulb"></i>
                    Recomendaciones del Día
                </h3>
            </div>
            <div id="recomendacionesDia"></div>
        </div>
    `;
}

function generarDashboardAdmin() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const totalUsuarios = usuarios.length;
    
    let consumoTotal = 0;
    let costoTotal = 0;
    
    usuarios.forEach(u => {
        const registros = obtenerConsumoUsuario(u.email);
        consumoTotal += registros.reduce((sum, r) => sum + r.consumo, 0);
        costoTotal += registros.reduce((sum, r) => sum + r.costo, 0);
    });
    
    const promedioPorHogar = consumoTotal / totalUsuarios;
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-chart-pie"></i> Dashboard Administrador</h1>
            <p>Resumen global del sistema ENERGIX SMART</p>
        </div>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Total Usuarios</span>
                    <div class="kpi-icon blue">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="kpi-value">${totalUsuarios}</div>
                <div class="kpi-label">Usuarios registrados</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Consumo Total</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-bolt"></i>
                    </div>
                </div>
                <div class="kpi-value">${consumoTotal.toFixed(0)} <span style="font-size: 18px;">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(costoTotal)}</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Promedio por Hogar</span>
                    <div class="kpi-icon orange">
                        <i class="fas fa-home"></i>
                    </div>
                </div>
                <div class="kpi-value">${promedioPorHogar.toFixed(1)} <span style="font-size: 18px;">kWh</span></div>
                <div class="kpi-label">Por usuario</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Alertas Activas</span>
                    <div class="kpi-icon red">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                </div>
                <div class="kpi-value">12</div>
                <div class="kpi-label">Requieren atención</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-bar"></i>
                    Comparativa de Consumo por Usuario
                </h3>
            </div>
            <div class="chart-container" style="height: 400px;">
                <canvas id="chartComparativaUsuarios"></canvas>
            </div>
        </div>
    `;
}
