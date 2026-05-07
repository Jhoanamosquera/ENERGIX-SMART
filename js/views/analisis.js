// ============================================
// VISTA: ANÁLISIS INTELIGENTE
// ============================================

function generarVistaAnalisis() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    const stats = calcularEstadisticas(registros);

    const promedioDiario = registros.length > 0 ? registros.reduce((s, r) => s + r.consumo, 0) / registros.length : 0;
    const maximo = registros.length > 0 ? Math.max(...registros.map(r => r.consumo)) : 0;
    const minimo = registros.length > 0 ? Math.min(...registros.map(r => r.consumo)) : 0;
    const tendencia = stats.ahorro > 0 ? `decreciente (${stats.ahorro.toFixed(1)}%)` : `creciente (${Math.abs(stats.ahorro).toFixed(1)}%)`;
    const clasificacion = promedioDiario > 12 ? 'Alto' : promedioDiario > 8 ? 'Moderado' : 'Eficiente';
    const clasificacionColor = promedioDiario > 12 ? 'var(--alert-critical)' : promedioDiario > 8 ? 'var(--alert-warning)' : 'var(--accent-primary)';

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-brain"></i> Análisis Inteligente</h1>
                <p>Patrones de consumo detectados automáticamente</p>
            </div>
        </div>

        <!-- Clasificación del hogar -->
        <div class="analisis-clasificacion">
            <div class="clasificacion-badge" style="border-color:${clasificacionColor};">
                <i class="fas fa-home" style="color:${clasificacionColor};"></i>
                <div>
                    <div class="clasificacion-label">Clasificación del hogar</div>
                    <div class="clasificacion-valor" style="color:${clasificacionColor};">${clasificacion}</div>
                </div>
            </div>
            <div class="clasificacion-stats">
                <div class="clas-stat"><span>Promedio diario</span><strong>${promedioDiario.toFixed(2)} kWh</strong></div>
                <div class="clas-stat"><span>Máximo registrado</span><strong>${maximo.toFixed(2)} kWh</strong></div>
                <div class="clas-stat"><span>Mínimo registrado</span><strong>${minimo.toFixed(2)} kWh</strong></div>
                <div class="clas-stat"><span>Tendencia actual</span><strong style="color:${stats.ahorro > 0 ? 'var(--accent-primary)' : 'var(--alert-critical)'};">${tendencia}</strong></div>
            </div>
        </div>

        <!-- Gráficos -->
        <div class="grid-2">
            <div class="card">
                <div class="card-header"><h3 class="card-title"><i class="fas fa-chart-line"></i> Tendencia mensual (últimos 6 meses)</h3></div>
                <div class="chart-container" style="height:260px;"><canvas id="chartTendenciaMensual"></canvas></div>
            </div>
            <div class="card">
                <div class="card-header"><h3 class="card-title"><i class="fas fa-clock"></i> Patrón horario de consumo</h3></div>
                <p class="card-subtitle">Promedio por franja horaria (kWh)</p>
                <div class="chart-container" style="height:260px;"><canvas id="chartPatronHorario"></canvas></div>
                <div class="horarios-criticos">
                    <i class="fas fa-exclamation-triangle" style="color:var(--alert-warning);"></i>
                    <span>Horarios críticos detectados: <strong>14h, 18h, 20h</strong></span>
                </div>
            </div>
        </div>

        <!-- Patrones identificados -->
        <div class="card">
            <div class="card-header"><h3 class="card-title"><i class="fas fa-search"></i> Patrones identificados</h3></div>
            <div class="patrones-grid">
                <div class="patron-item">
                    <div class="patron-icon orange"><i class="fas fa-moon"></i></div>
                    <div class="patron-info">
                        <div class="patron-titulo">Horario de mayor consumo</div>
                        <div class="patron-valor">20:00 – 22:00 hrs</div>
                    </div>
                </div>
                <div class="patron-item">
                    <div class="patron-icon green"><i class="fas fa-calendar-day"></i></div>
                    <div class="patron-info">
                        <div class="patron-titulo">Día de menor consumo</div>
                        <div class="patron-valor">Martes (promedio 8.4 kWh)</div>
                    </div>
                </div>
                <div class="patron-item">
                    <div class="patron-icon blue"><i class="fas fa-plug"></i></div>
                    <div class="patron-info">
                        <div class="patron-titulo">Consumo en standby</div>
                        <div class="patron-valor">~1.2 kWh/noche</div>
                    </div>
                </div>
                <div class="patron-item">
                    <div class="patron-icon red"><i class="fas fa-wind"></i></div>
                    <div class="patron-info">
                        <div class="patron-titulo">Dispositivo principal</div>
                        <div class="patron-valor">Aire Acondicionado (33%)</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Comparación semanal -->
        <div class="grid-2">
            <div class="card">
                <div class="card-header"><h3 class="card-title"><i class="fas fa-calendar-week"></i> Comparación semanal</h3></div>
                <div class="chart-container" style="height:260px;"><canvas id="chartComparacionSemanal"></canvas></div>
            </div>
            <div class="card">
                <div class="card-header"><h3 class="card-title"><i class="fas fa-chart-pie"></i> Distribución de Consumo</h3></div>
                <div class="chart-container" style="height:260px;"><canvas id="chartDistribucion"></canvas></div>
            </div>
        </div>

        <!-- KPIs de análisis -->
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Consumo por día de semana</span><div class="kpi-icon blue"><i class="fas fa-calendar-week"></i></div></div>
                <div class="chart-container" style="height:120px;"><canvas id="chartConsumoSemanal"></canvas></div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Consumo por hora</span><div class="kpi-icon orange"><i class="fas fa-clock"></i></div></div>
                <div class="chart-container" style="height:120px;"><canvas id="chartConsumoHorario"></canvas></div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">vs mes anterior</span><div class="kpi-icon ${stats.ahorro > 0 ? 'green' : 'red'}"><i class="fas fa-arrow-${stats.ahorro > 0 ? 'down' : 'up'}"></i></div></div>
                <div class="kpi-value trend ${stats.ahorro > 0 ? 'positive' : 'negative'}">${stats.ahorro > 0 ? '-' : '+'}${Math.abs(stats.ahorro).toFixed(1)}%</div>
                <div class="kpi-label">vs mes anterior</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Potencial ahorro</span><div class="kpi-icon green"><i class="fas fa-piggy-bank"></i></div></div>
                <div class="kpi-value" style="font-size:18px;">+8%</div>
                <div class="kpi-label">potencial ahorro</div>
            </div>
        </div>

        <div id="insightsConsumo"></div>
    `;
}
