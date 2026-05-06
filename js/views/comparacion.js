// ============================================
// VISTA: COMPARACIÓN DE PERÍODOS
// ============================================

function generarVistaComparacion() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    const hoy = new Date();

    // Calcular períodos
    function calcularPeriodo(inicioActual, finActual, inicioAnterior, finAnterior) {
        const actual   = registros.filter(r => { const f = new Date(r.fecha); return f >= inicioActual && f <= finActual; }).reduce((s, r) => s + r.consumo, 0);
        const anterior = registros.filter(r => { const f = new Date(r.fecha); return f >= inicioAnterior && f <= finAnterior; }).reduce((s, r) => s + r.consumo, 0);
        const diff = actual - anterior;
        const pct  = anterior > 0 ? ((diff / anterior) * 100).toFixed(1) : 0;
        return { actual: actual.toFixed(1), anterior: anterior.toFixed(1), diff: diff.toFixed(1), pct, mejoro: diff <= 0 };
    }

    const mesActualInicio   = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const mesActualFin      = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const mesAnteriorInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
    const mesAnteriorFin    = new Date(hoy.getFullYear(), hoy.getMonth(), 0);

    const semActualInicio   = new Date(hoy); semActualInicio.setDate(hoy.getDate() - 6);
    const semAnteriorInicio = new Date(hoy); semAnteriorInicio.setDate(hoy.getDate() - 13);
    const semAnteriorFin    = new Date(hoy); semAnteriorFin.setDate(hoy.getDate() - 7);

    const meses   = calcularPeriodo(mesActualInicio, mesActualFin, mesAnteriorInicio, mesAnteriorFin);
    const semanas = calcularPeriodo(semActualInicio, hoy, semAnteriorInicio, semAnteriorFin);

    const promActual   = (parseFloat(meses.actual)   / new Date().getDate()).toFixed(1);
    const promAnterior = (parseFloat(meses.anterior) / 30).toFixed(1);
    const promDiff     = (promActual - promAnterior).toFixed(1);
    const promPct      = promAnterior > 0 ? ((promDiff / promAnterior) * 100).toFixed(1) : 0;

    function periodoCard(label, datos, icono) {
        const mejoro = datos.mejoro;
        const iconoTendencia = mejoro ? 'fa-arrow-down' : 'fa-arrow-up';
        const colorTendencia = mejoro ? 'success' : 'danger';
        const textoTendencia = mejoro ? 'Reducción' : 'Aumento';
        
        return `
            <div class="comparacion-card-pro">
                <div class="comp-header">
                    <div class="comp-icon ${colorTendencia}">
                        <i class="fas ${icono}"></i>
                    </div>
                    <div class="comp-title-wrap">
                        <h3 class="comp-title">${label}</h3>
                        <span class="comp-badge ${colorTendencia}">
                            <i class="fas ${iconoTendencia}"></i>
                            ${textoTendencia}
                        </span>
                    </div>
                </div>
                
                <div class="comp-body">
                    <div class="comp-comparison">
                        <div class="comp-period anterior">
                            <div class="comp-period-label">Período Anterior</div>
                            <div class="comp-period-value">${datos.anterior}</div>
                            <div class="comp-period-unit">kWh</div>
                        </div>
                        
                        <div class="comp-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                        
                        <div class="comp-period actual">
                            <div class="comp-period-label">Período Actual</div>
                            <div class="comp-period-value">${datos.actual}</div>
                            <div class="comp-period-unit">kWh</div>
                        </div>
                    </div>
                    
                    <div class="comp-variation ${mejoro ? 'positive' : 'negative'}">
                        <div class="comp-var-icon">
                            <i class="fas ${iconoTendencia}"></i>
                        </div>
                        <div class="comp-var-content">
                            <div class="comp-var-label">Variación</div>
                            <div class="comp-var-value">
                                ${mejoro ? '' : '+'}${datos.diff} kWh
                                <span class="comp-var-percent">(${mejoro ? '' : '+'}${datos.pct}%)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="comp-footer">
                    <div class="comp-stat">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Comparación de ${label.toLowerCase()}</span>
                    </div>
                    <div class="comp-stat">
                        <i class="fas fa-bolt"></i>
                        <span>${formatearMoneda(parseFloat(datos.diff) * TARIFA_KWH)}</span>
                    </div>
                </div>
            </div>`;
    }

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-balance-scale"></i> Comparación de Períodos</h1>
                <p>Analiza la evolución del consumo entre períodos</p>
            </div>
        </div>

        <!-- Resumen de períodos -->
        <div class="comparacion-grid">
            ${periodoCard('Meses', meses, 'fa-calendar-alt')}
            ${periodoCard('Semanas', semanas, 'fa-calendar-week')}
            ${periodoCard('Promedio Diario', { 
                anterior: promAnterior, 
                actual: promActual, 
                diff: promDiff, 
                pct: promPct,
                mejoro: parseFloat(promDiff) <= 0
            }, 'fa-chart-line')}
        </div>

        <!-- Gráficos con tabs -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-chart-line"></i> Comparación visual</h3>
                <div class="card-tabs">
                    <button class="tab-btn active" onclick="cambiarTabComparacion('meses', this)">Meses</button>
                    <button class="tab-btn" onclick="cambiarTabComparacion('semanas', this)">Semanas</button>
                    <button class="tab-btn" onclick="cambiarTabComparacion('dias', this)">Días</button>
                </div>
            </div>
            <p class="card-subtitle">Periodo actual vs. periodo anterior (kWh)</p>
            <div class="chart-container" style="height:300px;"><canvas id="chartComparacion"></canvas></div>
        </div>

        <div class="card">
            <div class="card-header"><h3 class="card-title"><i class="fas fa-chart-area"></i> Tendencia superpuesta</h3></div>
            <div class="chart-container" style="height:260px;"><canvas id="chartTendenciaSuperpuesta"></canvas></div>
        </div>
    `;
}

function cambiarTabComparacion(tipo, btn) {
    document.querySelectorAll('.card-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const canvas = document.getElementById('chartComparacion');
    if (canvas) { const c = Chart.getChart(canvas); if (c) c.destroy(); }
    inicializarGraficosComparacion(tipo);
}
