// ============================================
// VISTA: DASHBOARD USUARIO
// ============================================

function generarDashboard() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    const stats = calcularEstadisticas(registros);

    const eficiencia = Math.max(0, Math.min(100, Math.round(100 - (stats.ahorro < 0 ? Math.abs(stats.ahorro) : 0))));
    const eficienciaLabel = eficiencia >= 80 ? 'Excelente' : eficiencia >= 60 ? 'Moderado' : 'Mejorable';
    const eficienciaColor = eficiencia >= 80 ? 'var(--accent-primary)' : eficiencia >= 60 ? 'var(--alert-warning)' : 'var(--alert-critical)';

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-home"></i> Dashboard</h1>
                <p>Bienvenido, <strong>${sesion.nombre}</strong> · Resumen energético del hogar</p>
            </div>
            <div class="page-header-actions">
                <button class="btn-secondary" onclick="cargarVista('consumo')">
                    <i class="fas fa-plus"></i> Registrar Consumo
                </button>
                <button class="btn-primary" onclick="cargarVista('reportes')">
                    <i class="fas fa-file-pdf"></i> Generar Reporte
                </button>
            </div>
        </div>

        <!-- KPIs principales -->
        <div class="kpi-grid kpi-grid-6">
            <div class="kpi-card kpi-accent">
                <div class="kpi-header">
                    <span class="kpi-title">Consumo mensual</span>
                    <div class="kpi-icon green"><i class="fas fa-bolt"></i></div>
                </div>
                <div class="kpi-value">${stats.consumoMes.toFixed(0)}<span class="kpi-unit">kWh</span></div>
                <div class="kpi-trend ${stats.ahorro > 0 ? 'positive' : 'negative'}">
                    <i class="fas fa-arrow-${stats.ahorro > 0 ? 'down' : 'up'}"></i>
                    ${Math.abs(stats.ahorro).toFixed(1)}% vs mes anterior
                </div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Promedio diario</span>
                    <div class="kpi-icon blue"><i class="fas fa-calendar-day"></i></div>
                </div>
                <div class="kpi-value">${(stats.consumoMes / new Date().getDate()).toFixed(1)}<span class="kpi-unit">kWh/día</span></div>
                <div class="kpi-label">estable</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Ahorro estimado</span>
                    <div class="kpi-icon ${stats.ahorro > 0 ? 'green' : 'red'}"><i class="fas fa-piggy-bank"></i></div>
                </div>
                <div class="kpi-value ${stats.ahorro > 0 ? 'trend positive' : 'trend negative'}">
                    ${stats.ahorro > 0 ? '+' : ''}${stats.ahorro.toFixed(1)}<span class="kpi-unit">%</span>
                </div>
                <div class="kpi-label">
                    <button class="kpi-link" onclick="cargarVista('alertas')">ver todas</button>
                    <span class="kpi-badge red">Alertas activas 3</span>
                </div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Costo estimado</span>
                    <div class="kpi-icon orange"><i class="fas fa-dollar-sign"></i></div>
                </div>
                <div class="kpi-value" style="font-size:22px;">${formatearMoneda(stats.costoMes)}</div>
                <div class="kpi-label">moderado</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Eficiencia del hogar</span>
                    <div class="kpi-icon blue"><i class="fas fa-leaf"></i></div>
                </div>
                <div class="kpi-value" style="color:${eficienciaColor};">${eficiencia}<span class="kpi-unit">/ 100</span></div>
                <div class="kpi-label">${eficienciaLabel}</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Mes anterior</span>
                    <div class="kpi-icon blue"><i class="fas fa-history"></i></div>
                </div>
                <div class="kpi-value">${stats.consumoMesAnterior.toFixed(0)}<span class="kpi-unit">kWh</span></div>
                <div class="kpi-trend ${stats.ahorro > 0 ? 'positive' : 'negative'}">
                    ${stats.ahorro > 0 ? 'mejoró' : 'aumentó'} · Variación ${stats.ahorro > 0 ? '-' : '+'}${Math.abs(stats.ahorro).toFixed(1)}%
                </div>
            </div>
        </div>

        <!-- Gráficos principales -->
        <div class="dashboard-grid">
            <!-- Consumo energético con tabs -->
            <div class="card card-wide">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-chart-line"></i> Consumo energético</h3>
                    <div class="card-tabs">
                        <button class="tab-btn active" onclick="cambiarTabDashboard('diario', this)">Diario</button>
                        <button class="tab-btn" onclick="cambiarTabDashboard('semanal', this)">Semanal</button>
                        <button class="tab-btn" onclick="cambiarTabDashboard('mensual', this)">Mensual</button>
                    </div>
                </div>
                <p class="card-subtitle">Evolución por periodo seleccionado</p>
                <div class="chart-container" style="height:280px;">
                    <canvas id="chartConsumo7Dias"></canvas>
                </div>
            </div>

            <!-- Distribución por dispositivo -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-chart-pie"></i> Por dispositivo</h3>
                </div>
                <p class="card-subtitle">Distribución del consumo mensual</p>
                <div class="device-distribution" id="deviceDistribution">
                    ${generarDistribucionDispositivos(stats.consumoMes)}
                </div>
            </div>
        </div>

        <!-- Segunda fila -->
        <div class="dashboard-grid">
            <!-- Comparación mensual -->
            <div class="card card-wide">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-balance-scale"></i> Comparación mensual</h3>
                </div>
                <p class="card-subtitle">Últimos 6 meses en kWh</p>
                <div class="chart-container" style="height:240px;">
                    <canvas id="chartComparacionMensual"></canvas>
                </div>
            </div>

            <!-- Índice de eficiencia -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-tachometer-alt"></i> Índice de eficiencia</h3>
                </div>
                <p class="card-subtitle">Evaluación del hogar</p>
                <div class="efficiency-gauge">
                    <div class="gauge-circle">
                        <svg viewBox="0 0 120 120" class="gauge-svg">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12"/>
                            <circle cx="60" cy="60" r="50" fill="none" stroke="${eficienciaColor}"
                                stroke-width="12" stroke-linecap="round"
                                stroke-dasharray="${Math.round(eficiencia * 3.14)} 314"
                                transform="rotate(-90 60 60)"
                                style="transition: stroke-dasharray 1.5s ease;"/>
                        </svg>
                        <div class="gauge-value">
                            <span class="gauge-number" style="color:${eficienciaColor};">${eficiencia}</span>
                            <span class="gauge-max">/ 100</span>
                        </div>
                    </div>
                    <div class="gauge-label">${eficienciaLabel}</div>
                    <div class="gauge-bars">
                        <div class="gauge-bar-item">
                            <span>Consumo</span>
                            <div class="gauge-bar-track"><div class="gauge-bar-fill green" style="width:${Math.min(100, (stats.consumoMes/400)*100).toFixed(0)}%"></div></div>
                            <span>${stats.consumoMes.toFixed(0)} kWh</span>
                        </div>
                        <div class="gauge-bar-item">
                            <span>Costo</span>
                            <div class="gauge-bar-track"><div class="gauge-bar-fill orange" style="width:${Math.min(100, (stats.costoMes/300000)*100).toFixed(0)}%"></div></div>
                            <span>${formatearMoneda(stats.costoMes)}</span>
                        </div>
                        <div class="gauge-bar-item">
                            <span>Eficiencia</span>
                            <div class="gauge-bar-track"><div class="gauge-bar-fill blue" style="width:${eficiencia}%"></div></div>
                            <span>${eficiencia}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generarDistribucionDispositivos(consumoTotal) {
    const dispositivos = [
        { nombre: 'Aire Acondicionado', icono: 'fa-wind',       porcentaje: 33, color: '#00C853' },
        { nombre: 'Refrigeración',       icono: 'fa-snowflake',  porcentaje: 21, color: '#00BFA5' },
        { nombre: 'Iluminación',         icono: 'fa-lightbulb',  porcentaje: 15, color: '#FF9100' },
        { nombre: 'Entretenimiento',     icono: 'fa-tv',         porcentaje: 13, color: '#9C27B0' },
        { nombre: 'Lavado',              icono: 'fa-tshirt',     porcentaje: 10, color: '#2196F3' },
        { nombre: 'Otros',               icono: 'fa-plug',       porcentaje: 8,  color: '#607D8B' }
    ];

    return dispositivos.map(d => {
        const kwh = ((d.porcentaje / 100) * consumoTotal).toFixed(0);
        return `
            <div class="device-item">
                <div class="device-icon" style="background:${d.color}22; color:${d.color};">
                    <i class="fas ${d.icono}"></i>
                </div>
                <div class="device-info">
                    <div class="device-name">${d.nombre}</div>
                    <div class="device-bar-track">
                        <div class="device-bar-fill" style="width:${d.porcentaje}%; background:${d.color};"></div>
                    </div>
                </div>
                <div class="device-stats">
                    <span class="device-kwh">${kwh} kWh</span>
                    <span class="device-pct" style="color:${d.color};">${d.porcentaje}%</span>
                </div>
            </div>
        `;
    }).join('');
}

function cambiarTabDashboard(periodo, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Destruir chart anterior y reinicializar con el periodo
    const canvas = document.getElementById('chartConsumo7Dias');
    if (canvas) {
        const chart = Chart.getChart(canvas);
        if (chart) chart.destroy();
    }
    inicializarGraficosDashboard(periodo);
}

function generarDashboardAdmin() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const totalUsuarios = usuarios.length;
    let consumoTotal = 0, costoTotal = 0;

    usuarios.forEach(u => {
        const registros = obtenerConsumoUsuario(u.email);
        consumoTotal += registros.reduce((sum, r) => sum + r.consumo, 0);
        costoTotal += registros.reduce((sum, r) => sum + r.costo, 0);
    });

    const promedioPorHogar = totalUsuarios > 0 ? consumoTotal / totalUsuarios : 0;
    const usuariosActivos = usuarios.filter(u => u.activo !== false).length;
    
    // Calcular dispositivos totales
    let totalDispositivos = 0;
    usuarios.forEach(u => {
        const dispositivos = obtenerDispositivosUsuario(u.email);
        totalDispositivos += dispositivos.length;
    });

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-chart-pie"></i> Panel de Administración</h1>
                <p>Gestión y monitoreo de la plataforma ENERGIX SMART</p>
            </div>
            <div class="page-header-actions">
                <button class="btn-primary" onclick="cargarVista('gestionUsuarios')">
                    <i class="fas fa-users-cog"></i> Gestionar Usuarios
                </button>
                <button class="btn-secondary" onclick="cargarVista('monitoreoSistema')">
                    <i class="fas fa-server"></i> Monitoreo
                </button>
            </div>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card kpi-accent">
                <div class="kpi-header">
                    <span class="kpi-title">Total Usuarios</span>
                    <div class="kpi-icon blue"><i class="fas fa-users"></i></div>
                </div>
                <div class="kpi-value">${totalUsuarios}</div>
                <div class="kpi-label">${usuariosActivos} activos</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Consumo Total</span>
                    <div class="kpi-icon green"><i class="fas fa-bolt"></i></div>
                </div>
                <div class="kpi-value">${consumoTotal.toFixed(0)}<span class="kpi-unit">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(costoTotal)}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Dispositivos</span>
                    <div class="kpi-icon orange"><i class="fas fa-plug"></i></div>
                </div>
                <div class="kpi-value">${totalDispositivos}</div>
                <div class="kpi-label">Monitoreados</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Estado Sistema</span>
                    <div class="kpi-icon green"><i class="fas fa-check-circle"></i></div>
                </div>
                <div class="kpi-value" style="font-size: 18px; color: var(--success);">ACTIVO</div>
                <div class="kpi-label">Uptime 99.9%</div>
            </div>
        </div>

        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-chart-bar"></i> Consumo por Usuario</h3>
                </div>
                <div class="chart-container" style="height:350px;">
                    <canvas id="chartComparativaUsuarios"></canvas>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-tasks"></i> Accesos Rápidos</h3>
                </div>
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                    <button class="btn-secondary" onclick="cargarVista('gestionUsuarios')" style="justify-content: flex-start; padding: 16px;">
                        <i class="fas fa-users-cog"></i>
                        <span style="margin-left: 12px;">Gestión de Usuarios</span>
                    </button>
                    <button class="btn-secondary" onclick="cargarVista('monitoreoSistema')" style="justify-content: flex-start; padding: 16px;">
                        <i class="fas fa-server"></i>
                        <span style="margin-left: 12px;">Monitoreo de Sistema</span>
                    </button>
                    <button class="btn-secondary" onclick="cargarVista('gestionDispositivos')" style="justify-content: flex-start; padding: 16px;">
                        <i class="fas fa-plug"></i>
                        <span style="margin-left: 12px;">Gestión de Dispositivos</span>
                    </button>
                    <button class="btn-secondary" onclick="cargarVista('configuracionPlataforma')" style="justify-content: flex-start; padding: 16px;">
                        <i class="fas fa-cogs"></i>
                        <span style="margin-left: 12px;">Configuración de Plataforma</span>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-trophy"></i> Usuarios Más Eficientes</h3>
                </div>
                <div id="usuariosEficientes" style="padding: 20px;"></div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-exclamation-triangle"></i> Mayor Consumo</h3>
                </div>
                <div id="usuariosMayorConsumo" style="padding: 20px;"></div>
            </div>
        </div>
    `;
}

