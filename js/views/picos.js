// ============================================
// VISTA: DETECCIÓN DE PICOS
// ============================================

function generarVistaPicos() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);

    const picos = registros
        .filter(r => r.consumo > 2.5)
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 20);

    const picosAltos = picos.filter(p => p.consumo > 3).length;
    const picosModerados = picos.filter(p => p.consumo >= 2.5 && p.consumo <= 3).length;
    const consumoMaximo = picos.length > 0 ? Math.max(...picos.map(p => p.consumo)) : 0;

    return `
        <div class="page-header">
            <h1><i class="fas fa-exclamation-triangle"></i> Detección de Picos</h1>
            <p>Eventos de alto consumo energético detectados</p>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Total Picos</span>
                    <div class="kpi-icon orange">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                </div>
                <div class="kpi-value">${picos.length}</div>
                <div class="kpi-label">Detectados en el período</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Picos Críticos</span>
                    <div class="kpi-icon red">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                </div>
                <div class="kpi-value">${picosAltos}</div>
                <div class="kpi-label">Consumo mayor a 3 kWh</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Picos Moderados</span>
                    <div class="kpi-icon orange">
                        <i class="fas fa-minus-circle"></i>
                    </div>
                </div>
                <div class="kpi-value">${picosModerados}</div>
                <div class="kpi-label">Entre 2.5 y 3 kWh</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Consumo Máximo</span>
                    <div class="kpi-icon red">
                        <i class="fas fa-arrow-up"></i>
                    </div>
                </div>
                <div class="kpi-value">${consumoMaximo.toFixed(1)} <span style="font-size: 18px;">kWh</span></div>
                <div class="kpi-label">Pico más alto registrado</div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-bar"></i>
                    Picos vs Promedio Normal
                </h3>
            </div>
            <div class="chart-container" style="height: 350px;">
                <canvas id="chartPicosVsPromedio"></canvas>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    Detalle de Picos Detectados
                </h3>
            </div>

            ${picos.length === 0 ? `
                <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
                    <i class="fas fa-check-circle" style="font-size: 48px; color: var(--accent-primary); margin-bottom: 16px; display: block;"></i>
                    <p>No se han detectado picos de consumo significativos</p>
                </div>
            ` : picos.map(p => {
                const nivel = p.consumo > 3 ? 'danger' : 'warning';
                const colorIcon = p.consumo > 3 ? 'red' : 'orange';
                const icono = p.consumo > 3 ? 'fa-exclamation-circle' : 'fa-exclamation-triangle';
                const texto = p.consumo > 3 ? 'Crítico' : 'Moderado';
                return `
                    <div class="alert-item ${nivel}">
                        <div class="alert-icon ${colorIcon}">
                            <i class="fas ${icono}"></i>
                        </div>
                        <div class="alert-content">
                            <div class="alert-title">Pico de Consumo — ${texto}</div>
                            <div class="alert-description">
                                Consumo de <strong>${p.consumo.toFixed(2)} kWh</strong> detectado
                            </div>
                            <div class="alert-meta">
                                <span><i class="fas fa-calendar"></i> ${new Date(p.fecha).toLocaleString('es-CO')}</span>
                                <span><i class="fas fa-dollar-sign"></i> ${formatearMoneda(p.costo)}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}
