// ============================================
// VISTA: COMPARACIÓN DE PERÍODOS
// ============================================

function generarVistaComparacion() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);

    const hoy = new Date();
    const inicioMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const inicioMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
    const finMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0);

    const consumoActual = registros
        .filter(r => new Date(r.fecha) >= inicioMesActual)
        .reduce((sum, r) => sum + r.consumo, 0);

    const consumoAnterior = registros
        .filter(r => {
            const f = new Date(r.fecha);
            return f >= inicioMesAnterior && f <= finMesAnterior;
        })
        .reduce((sum, r) => sum + r.consumo, 0);

    const diferencia = consumoActual - consumoAnterior;
    const porcentaje = consumoAnterior > 0
        ? ((diferencia / consumoAnterior) * 100).toFixed(1)
        : 0;
    const mejoro = diferencia <= 0;

    return `
        <div class="page-header">
            <h1><i class="fas fa-balance-scale"></i> Comparación de Períodos</h1>
            <p>Compara tu consumo entre diferentes períodos</p>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Mes Actual</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                </div>
                <div class="kpi-value">${consumoActual.toFixed(1)} <span style="font-size: 18px;">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(consumoActual * TARIFA_KWH)}</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Mes Anterior</span>
                    <div class="kpi-icon blue">
                        <i class="fas fa-calendar-minus"></i>
                    </div>
                </div>
                <div class="kpi-value">${consumoAnterior.toFixed(1)} <span style="font-size: 18px;">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(consumoAnterior * TARIFA_KWH)}</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Diferencia</span>
                    <div class="kpi-icon ${mejoro ? 'green' : 'red'}">
                        <i class="fas fa-${mejoro ? 'arrow-down' : 'arrow-up'}"></i>
                    </div>
                </div>
                <div class="kpi-value trend ${mejoro ? 'positive' : 'negative'}">
                    ${mejoro ? '' : '+'}${porcentaje}%
                </div>
                <div class="kpi-label">${mejoro ? 'Reducción' : 'Incremento'} vs mes anterior</div>
            </div>

            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Ahorro / Costo Extra</span>
                    <div class="kpi-icon ${mejoro ? 'green' : 'orange'}">
                        <i class="fas fa-${mejoro ? 'piggy-bank' : 'exclamation-triangle'}"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: 22px; color: ${mejoro ? 'var(--accent-primary)' : 'var(--alert-critical)'};">
                    ${formatearMoneda(Math.abs(diferencia) * TARIFA_KWH)}
                </div>
                <div class="kpi-label">${mejoro ? 'Ahorraste este mes' : 'Gastaste de más'}</div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-line"></i>
                    Comparativa de Consumo Mensual
                </h3>
            </div>
            <div class="chart-container" style="height: 350px;">
                <canvas id="chartComparacion"></canvas>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-area"></i>
                    Tendencia Superpuesta
                </h3>
            </div>
            <div class="chart-container" style="height: 300px;">
                <canvas id="chartTendenciaSuperpuesta"></canvas>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-info-circle"></i>
                    Análisis de la Comparación
                </h3>
            </div>
            <div class="alert-item ${mejoro ? '' : 'warning'}">
                <div class="alert-icon ${mejoro ? 'green' : 'orange'}">
                    <i class="fas fa-${mejoro ? 'check-circle' : 'exclamation-triangle'}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">${mejoro ? 'Tendencia Positiva' : 'Consumo en Aumento'}</div>
                    <div class="alert-description">
                        ${mejoro
                            ? `Tu consumo bajó un ${Math.abs(porcentaje)}% respecto al mes anterior. ¡Sigue así!`
                            : `Tu consumo subió un ${porcentaje}% respecto al mes anterior. Revisa las recomendaciones para reducirlo.`
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
}
