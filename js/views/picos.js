// ============================================
// VISTA: DETECCIÓN DE PICOS
// ============================================

function generarVistaPicos() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);

    // Picos reales del usuario + datos demo enriquecidos
    const picosDemo = [
        { fecha: '2026-04-12T22:15:00', consumo: 14.3, promedio: 9.7, porcentaje: 47, severidad: 'alto', estado: 'pendiente', causa: 'Aire acondicionado + carga nocturna' },
        { fecha: '2026-04-06T13:40:00', consumo: 13.1, promedio: 9.7, porcentaje: 35, severidad: 'alto', estado: 'revisado', causa: 'Alta temperatura exterior' },
        { fecha: '2026-04-08T10:20:00', consumo: 12.6, promedio: 9.7, porcentaje: 30, severidad: 'medio', estado: 'revisado', causa: 'Lavadora + lavavajillas simultáneos' },
        { fecha: '2026-03-28T21:55:00', consumo: 15.8, promedio: 9.5, porcentaje: 66, severidad: 'critico', estado: 'revisado', causa: 'Cortocircuito detectado en cocina' },
        { fecha: '2026-03-19T19:30:00', consumo: 12.1, promedio: 9.5, porcentaje: 27, severidad: 'medio', estado: 'revisado', causa: 'Plancha + secadora simultáneas' },
        { fecha: '2026-03-10T08:45:00', consumo: 11.9, promedio: 9.5, porcentaje: 25, severidad: 'medio', estado: 'revisado', causa: 'Calentador de agua + ducha eléctrica' },
        { fecha: '2026-02-22T20:10:00', consumo: 13.7, promedio: 9.6, porcentaje: 43, severidad: 'alto', estado: 'revisado', causa: 'Fiesta en casa — múltiples dispositivos' }
    ];

    const totalPicos = picosDemo.length;
    const pendientes = picosDemo.filter(p => p.estado === 'pendiente').length;
    const revisados  = picosDemo.filter(p => p.estado === 'revisado').length;
    const picoMax    = Math.max(...picosDemo.map(p => p.consumo));

    const severidadColor = { alto: 'orange', critico: 'red', medio: 'blue' };
    const severidadBadge = { alto: 'warning', critico: 'danger', medio: 'success' };

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-exclamation-triangle"></i> Detección de Picos</h1>
                <p>Eventos de consumo anómalo detectados automáticamente</p>
            </div>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card kpi-accent">
                <div class="kpi-header"><span class="kpi-title">Total picos</span><div class="kpi-icon orange"><i class="fas fa-exclamation-triangle"></i></div></div>
                <div class="kpi-value">${totalPicos}</div>
                <div class="kpi-label">Detectados</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Pendientes</span><div class="kpi-icon red"><i class="fas fa-clock"></i></div></div>
                <div class="kpi-value">${pendientes}</div>
                <div class="kpi-label">Sin revisar</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Revisados</span><div class="kpi-icon green"><i class="fas fa-check-circle"></i></div></div>
                <div class="kpi-value">${revisados}</div>
                <div class="kpi-label">Gestionados</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Pico máximo</span><div class="kpi-icon red"><i class="fas fa-arrow-up"></i></div></div>
                <div class="kpi-value">${picoMax.toFixed(1)}<span class="kpi-unit">kWh</span></div>
                <div class="kpi-label">Registro más alto</div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><h3 class="card-title"><i class="fas fa-chart-bar"></i> Picos vs. Promedio</h3></div>
            <p class="card-subtitle">Consumo en días con pico detectado (kWh)</p>
            <div class="chart-container" style="height:300px;"><canvas id="chartPicosVsPromedio"></canvas></div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-list"></i> Lista de eventos</h3>
                <div class="card-tabs">
                    <button class="tab-btn active" onclick="filtrarPicos('todos', this)">Todos</button>
                    <button class="tab-btn" onclick="filtrarPicos('pendiente', this)">Pendiente</button>
                    <button class="tab-btn" onclick="filtrarPicos('revisado', this)">Revisado</button>
                </div>
            </div>

            <div id="listaPicos" style="display:grid;gap:16px;">
                ${picosDemo.map((p, i) => `
                    <div class="pico-card" data-estado="${p.estado}">
                        <div class="pico-header">
                            <div class="pico-fecha">
                                <i class="fas fa-calendar"></i>
                                ${new Date(p.fecha).toLocaleString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div style="display:flex;gap:6px;align-items:center;">
                                <span class="badge ${severidadBadge[p.severidad]}">${p.severidad}</span>
                                <span class="badge ${p.estado === 'pendiente' ? 'danger' : 'success'}">${p.estado}</span>
                            </div>
                        </div>
                        <div class="pico-causa"><i class="fas fa-info-circle"></i> ${p.causa}</div>
                        <div class="pico-stats">
                            <div class="pico-stat-item">
                                <span class="pico-stat-val">${p.consumo} kWh</span>
                                <span class="pico-stat-lbl">(pico)</span>
                            </div>
                            <div class="pico-stat-sep">vs. promedio ${p.promedio} kWh</div>
                            <div class="pico-stat-item">
                                <span class="pico-stat-val" style="color:var(--alert-critical);">+${p.porcentaje}%</span>
                                <span class="pico-stat-lbl">sobre promedio</span>
                            </div>
                        </div>
                        <div class="pico-bar-track">
                            <div class="pico-bar-fill" style="width:${Math.min(100, (p.consumo / 20) * 100).toFixed(0)}%;background:${p.severidad === 'critico' ? 'var(--alert-critical)' : p.severidad === 'alto' ? 'var(--alert-warning)' : 'var(--accent-secondary)'};"></div>
                        </div>
                        ${p.estado === 'pendiente' ? `
                            <div style="margin-top:12px;">
                                <button class="btn-secondary" style="font-size:12px;padding:6px 14px;" onclick="marcarPicoRevisado(${i})">
                                    <i class="fas fa-check"></i> Marcar revisado
                                </button>
                            </div>
                        ` : `<div class="pico-revisado"><i class="fas fa-check-circle"></i> Revisado</div>`}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function filtrarPicos(estado, btn) {
    document.querySelectorAll('.card-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('#listaPicos .pico-card').forEach(card => {
        card.style.display = (estado === 'todos' || card.dataset.estado === estado) ? '' : 'none';
    });
}

function marcarPicoRevisado(idx) {
    mostrarNotificacion('success', 'Pico Revisado', 'El evento ha sido marcado como revisado');
    setTimeout(() => cargarVista('picos'), 800);
}
