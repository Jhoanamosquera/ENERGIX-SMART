// ============================================
// VISTA: ALERTAS
// ============================================

function generarVistaAlertas() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    const stats = calcularEstadisticas(registros);

    // Generar alertas dinámicas basadas en datos reales
    const alertas = [];

    if (stats.ahorro < -5) {
        alertas.push({ id: 1, tipo: 'danger', prioridad: 'alta', icono: 'fa-exclamation-circle',
            titulo: 'Consumo Elevado Detectado',
            descripcion: `Tu consumo aumentó un ${Math.abs(stats.ahorro).toFixed(1)}% respecto al mes anterior.`,
            fecha: new Date(), accion: 'picos', leida: false });
    }

    if (stats.consumoHoy > 15) {
        alertas.push({ id: 2, tipo: 'warning', prioridad: 'alta', icono: 'fa-exclamation-triangle',
            titulo: 'Pico de Consumo Hoy',
            descripcion: `Consumo de hoy: ${stats.consumoHoy.toFixed(1)} kWh. Supera el promedio diario.`,
            fecha: new Date(), accion: 'picos', leida: false });
    }

    alertas.push({ id: 3, tipo: 'info', prioridad: 'media', icono: 'fa-lightbulb',
        titulo: 'Recomendación de Ahorro',
        descripcion: 'Podrías ahorrar hasta $26,250 COP/mes optimizando el aire acondicionado.',
        fecha: new Date(Date.now() - 3600000), accion: 'recomendaciones', leida: false });

    if (stats.ahorro > 0) {
        alertas.push({ id: 4, tipo: 'success', prioridad: 'baja', icono: 'fa-check-circle',
            titulo: 'Meta de Ahorro Alcanzada',
            descripcion: `Redujiste tu consumo un ${stats.ahorro.toFixed(1)}% este mes. ¡Excelente trabajo!`,
            fecha: new Date(Date.now() - 86400000), accion: 'dashboard', leida: true });
    }

    alertas.push({ id: 5, tipo: 'info', prioridad: 'media', icono: 'fa-clock',
        titulo: 'Consumo Nocturno Detectado',
        descripcion: 'Se detectó consumo constante entre 2:00 AM y 5:00 AM durante 3 días.',
        fecha: new Date(Date.now() - 172800000), accion: 'analisis', leida: true });

    const noLeidas = alertas.filter(a => !a.leida).length;
    const altas    = alertas.filter(a => a.prioridad === 'alta').length;

    const colorMap = { danger: 'red', warning: 'orange', info: 'blue', success: 'green' };
    const classBorder = { danger: 'danger', warning: 'warning', info: '', success: '' };

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-bell"></i> Alertas</h1>
                <p>Notificaciones sobre tu consumo energético</p>
            </div>
            <div class="page-header-actions">
                <button class="btn-secondary" onclick="marcarTodasLeidas()">
                    <i class="fas fa-check-double"></i> Marcar todas leídas
                </button>
            </div>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card kpi-accent">
                <div class="kpi-header">
                    <span class="kpi-title">Total Alertas</span>
                    <div class="kpi-icon blue"><i class="fas fa-bell"></i></div>
                </div>
                <div class="kpi-value">${alertas.length}</div>
                <div class="kpi-label">Generadas</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Sin Leer</span>
                    <div class="kpi-icon red"><i class="fas fa-envelope"></i></div>
                </div>
                <div class="kpi-value">${noLeidas}</div>
                <div class="kpi-label">Requieren atención</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Alta Prioridad</span>
                    <div class="kpi-icon orange"><i class="fas fa-exclamation-triangle"></i></div>
                </div>
                <div class="kpi-value">${altas}</div>
                <div class="kpi-label">Alertas críticas</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Esta Semana</span>
                    <div class="kpi-icon green"><i class="fas fa-calendar-week"></i></div>
                </div>
                <div class="kpi-value">${alertas.filter(a => (Date.now() - new Date(a.fecha)) < 604800000).length}</div>
                <div class="kpi-label">Nuevas alertas</div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-list"></i> Todas las Alertas</h3>
                <div class="card-tabs">
                    <button class="tab-btn active" onclick="filtrarAlertas('todas', this)">Todas</button>
                    <button class="tab-btn" onclick="filtrarAlertas('no-leidas', this)">Sin leer</button>
                    <button class="tab-btn" onclick="filtrarAlertas('alta', this)">Alta prioridad</button>
                </div>
            </div>

            <div id="listaAlertas" style="display:grid;gap:12px;">
                ${alertas.map(a => `
                    <div class="alert-item ${classBorder[a.tipo]}" data-prioridad="${a.prioridad}" data-leida="${a.leida}"
                         style="opacity:${a.leida ? '0.65' : '1'}; cursor:pointer;"
                         onclick="irAAlerta('${a.accion}')">
                        <div class="alert-icon ${colorMap[a.tipo]}">
                            <i class="fas ${a.icono}"></i>
                        </div>
                        <div class="alert-content">
                            <div class="alert-title">
                                ${a.titulo}
                                ${!a.leida ? '<span class="notif-dot" style="display:inline-block;width:8px;height:8px;background:var(--accent-primary);border-radius:50%;margin-left:8px;vertical-align:middle;"></span>' : ''}
                            </div>
                            <div class="alert-description">${a.descripcion}</div>
                            <div class="alert-meta">
                                <span><i class="fas fa-calendar"></i> ${formatearTiempoRelativo(new Date(a.fecha))}</span>
                                <span class="badge ${a.prioridad === 'alta' ? 'danger' : a.prioridad === 'media' ? 'warning' : 'success'}">${a.prioridad}</span>
                                <span style="color:var(--accent-primary);font-size:11px;"><i class="fas fa-arrow-right"></i> Ver detalle</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function irAAlerta(vista) {
    cargarVista(vista);
    document.querySelectorAll('.nav-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-vista') === vista);
    });
}

function filtrarAlertas(tipo, btn) {
    document.querySelectorAll('.card-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const items = document.querySelectorAll('#listaAlertas .alert-item');
    items.forEach(item => {
        const prioridad = item.dataset.prioridad;
        const leida = item.dataset.leida === 'true';
        if (tipo === 'todas') item.style.display = '';
        else if (tipo === 'no-leidas') item.style.display = leida ? 'none' : '';
        else if (tipo === 'alta') item.style.display = prioridad === 'alta' ? '' : 'none';
    });
}

function marcarTodasLeidas() {
    mostrarNotificacion('success', 'Alertas Actualizadas', 'Todas las alertas han sido marcadas como leídas');
    setTimeout(() => cargarVista('alertas'), 800);
}
