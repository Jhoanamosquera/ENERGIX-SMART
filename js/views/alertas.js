// ============================================
// VISTA: ALERTAS
// ============================================

function generarVistaAlertas() {
    const alertas = [
        { id: 1, tipo: 'pico', prioridad: 'alta', titulo: 'Pico de consumo detectado', descripcion: 'El consumo del 12/04 superó el 47% del promedio habitual.', fecha: '2026-04-12', leida: false },
        { id: 2, tipo: 'consumo-alto', prioridad: 'media', titulo: 'Consumo mensual elevado', descripcion: 'El consumo de marzo (308 kWh) supera el promedio anual en un 8%.', fecha: '2026-04-01', leida: true },
        { id: 3, tipo: 'desperdicio', prioridad: 'alta', titulo: 'Posible desperdicio energético', descripcion: 'Se detectó consumo constante entre 2:00 AM y 5:00 AM durante 5 días consecutivos.', fecha: '2026-03-29', leida: false }
    ];
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-bell"></i> Alertas</h1>
            <p>Notificaciones sobre tu consumo energético</p>
        </div>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Total Alertas</span>
                    <div class="kpi-icon blue">
                        <i class="fas fa-bell"></i>
                    </div>
                </div>
                <div class="kpi-value">${alertas.length}</div>
                <div class="kpi-label">Alertas generadas</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Sin Leer</span>
                    <div class="kpi-icon red">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                </div>
                <div class="kpi-value">${alertas.filter(a => !a.leida).length}</div>
                <div class="kpi-label">Requieren atención</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Alta Prioridad</span>
                    <div class="kpi-icon orange">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                </div>
                <div class="kpi-value">${alertas.filter(a => a.prioridad === 'alta').length}</div>
                <div class="kpi-label">Alertas críticas</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Esta Semana</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-calendar-week"></i>
                    </div>
                </div>
                <div class="kpi-value">2</div>
                <div class="kpi-label">Nuevas alertas</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    Todas las Alertas
                </h3>
                <button class="btn-secondary" onclick="marcarTodasLeidas()">
                    <i class="fas fa-check-double"></i> Marcar todas como leídas
                </button>
            </div>
            
            ${alertas.map(alerta => `
                <div class="alert-item ${alerta.prioridad === 'alta' ? 'danger' : alerta.prioridad === 'media' ? 'warning' : ''}" style="opacity: ${alerta.leida ? '0.7' : '1'};">
                    <div class="alert-icon ${alerta.prioridad === 'alta' ? 'red' : alerta.prioridad === 'media' ? 'orange' : 'blue'}">
                        <i class="fas fa-${alerta.prioridad === 'alta' ? 'exclamation-triangle' : 'info-circle'}"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">${alerta.titulo}</div>
                        <div class="alert-description">${alerta.descripcion}</div>
                        <div class="alert-meta">
                            <span><i class="fas fa-calendar"></i> ${new Date(alerta.fecha).toLocaleDateString('es-CO')}</span>
                            <span><i class="fas fa-tag"></i> ${alerta.tipo}</span>
                            <span class="badge ${alerta.prioridad === 'alta' ? 'danger' : alerta.prioridad === 'media' ? 'warning' : 'success'}">${alerta.prioridad}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function marcarTodasLeidas() {
    mostrarNotificacion('success', 'Alertas Actualizadas', 'Todas las alertas han sido marcadas como leídas');
    setTimeout(() => cargarVista('alertas'), 1000);
}
