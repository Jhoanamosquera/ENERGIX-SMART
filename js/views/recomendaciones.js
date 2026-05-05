// ============================================
// VISTA: RECOMENDACIONES
// ============================================

function generarVistaRecomendaciones() {
    const recomendaciones = [
        { id: 1, titulo: 'Optimiza el uso del aire acondicionado', descripcion: 'Configura el termostato a 24°C en lugar de 20°C. Esto puede reducir el consumo hasta un 15%.', ahorro: 26250, prioridad: 'alta', categoria: 'climatización' },
        { id: 2, titulo: 'Reemplaza bombillas tradicionales', descripcion: 'Cambia las bombillas incandescentes por LED. Consumen 80% menos energía y duran 25 veces más.', ahorro: 15750, prioridad: 'media', categoria: 'iluminación' },
        { id: 3, titulo: 'Desconecta dispositivos en standby', descripcion: 'Los dispositivos en modo standby consumen energía. Usa regletas con interruptor para apagarlos completamente.', ahorro: 8400, prioridad: 'media', categoria: 'electrónica' }
    ];
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-lightbulb"></i> Recomendaciones</h1>
            <p>Sugerencias personalizadas para optimizar tu consumo</p>
        </div>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Ahorro Potencial</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                </div>
                <div class="kpi-value">${formatearMoneda(recomendaciones.reduce((sum, r) => sum + r.ahorro, 0))}</div>
                <div class="kpi-label">Por mes</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Recomendaciones</span>
                    <div class="kpi-icon blue">
                        <i class="fas fa-list"></i>
                    </div>
                </div>
                <div class="kpi-value">${recomendaciones.length}</div>
                <div class="kpi-label">Activas</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Alta Prioridad</span>
                    <div class="kpi-icon orange">
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <div class="kpi-value">${recomendaciones.filter(r => r.prioridad === 'alta').length}</div>
                <div class="kpi-label">Recomendadas</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Reducción CO₂</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-leaf"></i>
                    </div>
                </div>
                <div class="kpi-value">45 <span style="font-size: 18px;">kg</span></div>
                <div class="kpi-label">Por mes</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-star"></i>
                    Recomendaciones Personalizadas
                </h3>
            </div>
            
            ${recomendaciones.map(rec => `
                <div class="recommendation-card">
                    <div class="recommendation-header">
                        <div class="recommendation-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div style="flex: 1;">
                            <div class="recommendation-title">${rec.titulo}</div>
                            <span class="badge ${rec.prioridad === 'alta' ? 'danger' : 'warning'}">${rec.prioridad}</span>
                            <span class="badge success">${rec.categoria}</span>
                        </div>
                    </div>
                    <div class="recommendation-description">${rec.descripcion}</div>
                    <div class="recommendation-savings">
                        <i class="fas fa-piggy-bank"></i>
                        Ahorro estimado: ${formatearMoneda(rec.ahorro)}/mes
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
