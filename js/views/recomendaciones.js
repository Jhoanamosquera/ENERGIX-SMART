// ============================================
// VISTA: RECOMENDACIONES INTELIGENTES
// ============================================

function generarVistaRecomendaciones() {
    const recomendaciones = [
        { id: 1, titulo: 'Optimiza el uso del aire acondicionado', descripcion: 'Reducir el uso de A/C en horas pico (12pm-8pm) puede ahorrar hasta 28 kWh/mes. Establece el termostato a 24°C.', ahorroKwh: 28, ahorroCop: 19600, impacto: 'alto', categoria: 'Climatización', icono: 'fa-wind', implementada: false },
        { id: 2, titulo: 'Evita el consumo fantasma nocturno', descripcion: 'Desconecta TV, consolas y cargadores entre 2am-6am. Se detectó consumo de 1.2 kWh diarios en ese horario.', ahorroKwh: 22, ahorroCop: 15400, impacto: 'alto', categoria: 'Hábitos', icono: 'fa-plug', implementada: false },
        { id: 3, titulo: 'Optimiza el uso de la lavadora', descripcion: 'Usa ciclos de agua fría y consolida cargas. Lavar con agua caliente consume hasta 3x más energía.', ahorroKwh: 12, ahorroCop: 8400, impacto: 'medio', categoria: 'Electrodomésticos', icono: 'fa-tshirt', implementada: false },
        { id: 4, titulo: 'Migra a iluminación LED', descripcion: 'Reemplazar las 8 bombillas incandescentes detectadas por LED puede reducir el consumo lumínico en un 75%.', ahorroKwh: 15, ahorroCop: 10500, impacto: 'medio', categoria: 'Iluminación', icono: 'fa-lightbulb', implementada: false },
        { id: 5, titulo: 'Revisa el sello del refrigerador', descripcion: 'El refrigerador muestra un patrón de encendido inusualmente frecuente. Verifica el sello de la puerta.', ahorroKwh: 8, ahorroCop: 5600, impacto: 'medio', categoria: 'Refrigeración', icono: 'fa-snowflake', implementada: false },
        { id: 6, titulo: 'Cambia hábitos de consumo nocturno', descripcion: 'Concentrar las actividades de alto consumo (cocina, plancha) antes de las 9pm reduce el consumo en horas críticas.', ahorroKwh: 5, ahorroCop: 3500, impacto: 'bajo', categoria: 'Hábitos', icono: 'fa-moon', implementada: false },
        { id: 7, titulo: 'Activa el modo ahorro en dispositivos', descripcion: 'Habilita el modo de ahorro energético en televisores y computadores. Reduce el consumo en standby hasta un 40%.', ahorroKwh: 4, ahorroCop: 2800, impacto: 'bajo', categoria: 'Configuración', icono: 'fa-cog', implementada: false }
    ];

    const totalKwh = recomendaciones.reduce((s, r) => s + r.ahorroKwh, 0);
    const totalCop = recomendaciones.reduce((s, r) => s + r.ahorroCop, 0);
    const altoImpacto  = recomendaciones.filter(r => r.impacto === 'alto').length;
    const medioImpacto = recomendaciones.filter(r => r.impacto === 'medio').length;
    const bajoImpacto  = recomendaciones.filter(r => r.impacto === 'bajo').length;

    const impactoColor = { alto: 'danger', medio: 'warning', bajo: 'success' };

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-lightbulb"></i> Recomendaciones Inteligentes</h1>
                <p>Sugerencias personalizadas basadas en tu patrón de consumo</p>
            </div>
        </div>

        <!-- Banner de ahorro total -->
        <div class="ahorro-banner">
            <div class="ahorro-banner-left">
                <div class="ahorro-banner-titulo">Potencial de ahorro total</div>
                <div class="ahorro-banner-sub">Implementando todas las recomendaciones</div>
            </div>
            <div class="ahorro-banner-center">
                <div class="ahorro-banner-kwh">${totalKwh} kWh/mes</div>
                <div class="ahorro-banner-cop">Equivale a ~${formatearMoneda(totalCop)} mensual · ${recomendaciones.length} recomendaciones activas</div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-star"></i> Recomendaciones</h3>
                <div class="card-tabs">
                    <button class="tab-btn active" onclick="filtrarRec('todas', this)">Todas</button>
                    <button class="tab-btn" onclick="filtrarRec('alto', this)">Alto impacto (${altoImpacto})</button>
                    <button class="tab-btn" onclick="filtrarRec('medio', this)">Impacto medio (${medioImpacto})</button>
                    <button class="tab-btn" onclick="filtrarRec('bajo', this)">Bajo impacto (${bajoImpacto})</button>
                </div>
            </div>

            <div id="listaRec" style="display:grid;gap:16px;">
                ${recomendaciones.map(rec => `
                    <div class="rec-card" data-impacto="${rec.impacto}">
                        <div class="rec-header">
                            <div class="rec-icon-wrap">
                                <div class="rec-icon"><i class="fas ${rec.icono}"></i></div>
                            </div>
                            <div class="rec-titulo-wrap">
                                <div class="rec-titulo">${rec.titulo}</div>
                                <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap;">
                                    <span class="badge ${impactoColor[rec.impacto]}">${rec.impacto === 'alto' ? 'Alto impacto' : rec.impacto === 'medio' ? 'Impacto medio' : 'Bajo impacto'}</span>
                                    <span class="badge success">${rec.categoria}</span>
                                </div>
                            </div>
                            <button class="rec-dismiss" onclick="this.closest('.rec-card').style.display='none'" title="Descartar"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="rec-descripcion">${rec.descripcion}</div>
                        <div class="rec-footer">
                            <div class="rec-ahorro">
                                <i class="fas fa-lightbulb"></i>
                                Ahorro: <strong>${rec.ahorroKwh} kWh/mes</strong>
                            </div>
                            <div class="rec-ahorro-cop">${formatearMoneda(rec.ahorroCop)}/mes</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function filtrarRec(impacto, btn) {
    document.querySelectorAll('.card-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('#listaRec .rec-card').forEach(card => {
        card.style.display = (impacto === 'todas' || card.dataset.impacto === impacto) ? '' : 'none';
    });
}
