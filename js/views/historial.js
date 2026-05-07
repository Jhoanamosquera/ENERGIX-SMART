// ============================================
// VISTA: HISTORIAL DE CONSUMO
// ============================================

function generarVistaHistorial() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    const totalConsumo = registros.reduce((s, r) => s + r.consumo, 0);
    const totalCosto   = registros.reduce((s, r) => s + r.costo, 0);
    const promedio     = registros.length > 0 ? totalConsumo / registros.length : 0;
    const maximo       = registros.length > 0 ? Math.max(...registros.map(r => r.consumo)) : 0;

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-history"></i> Historial de Consumo</h1>
                <p>Vista detallada de todos los registros de consumo</p>
            </div>
            <div class="page-header-actions">
                <button class="btn-secondary" onclick="exportarDatos()">
                    <i class="fas fa-file-csv"></i> Exportar
                </button>
                <button class="btn-primary" onclick="cargarVista('consumo')">
                    <i class="fas fa-plus"></i> Nuevo Registro
                </button>
            </div>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card kpi-accent">
                <div class="kpi-header"><span class="kpi-title">Total Registros</span><div class="kpi-icon blue"><i class="fas fa-list"></i></div></div>
                <div class="kpi-value">${registros.length}</div>
                <div class="kpi-label">Promedio: ${promedio.toFixed(2)} kWh/día</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Consumo Total</span><div class="kpi-icon green"><i class="fas fa-bolt"></i></div></div>
                <div class="kpi-value">${totalConsumo.toFixed(1)}<span class="kpi-unit">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(totalCosto)}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Promedio Diario</span><div class="kpi-icon orange"><i class="fas fa-chart-bar"></i></div></div>
                <div class="kpi-value">${promedio.toFixed(2)}<span class="kpi-unit">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(promedio * TARIFA_KWH)} por registro</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header"><span class="kpi-title">Pico Máximo</span><div class="kpi-icon red"><i class="fas fa-arrow-up"></i></div></div>
                <div class="kpi-value">${maximo.toFixed(2)}<span class="kpi-unit">kWh</span></div>
                <div class="kpi-label">Registro más alto</div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-table"></i> Registros de Consumo</h3>
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                    <div class="card-tabs">
                        <button class="tab-btn active" onclick="filtrarNivelHistorial('todos', this)">Todos</button>
                        <button class="tab-btn" onclick="filtrarNivelHistorial('alto', this)">Alto consumo</button>
                        <button class="tab-btn" onclick="filtrarNivelHistorial('bajo', this)">Bajo consumo</button>
                    </div>
                    <div class="card-tabs">
                        <button class="tab-btn active" id="btnTabla" onclick="cambiarVistaHistorial('tabla', this)"><i class="fas fa-table"></i> Tabla</button>
                        <button class="tab-btn" id="btnGrafico" onclick="cambiarVistaHistorial('grafico', this)"><i class="fas fa-chart-bar"></i> Gráfico</button>
                    </div>
                    <input type="text" id="filtroHistorial" class="form-control" placeholder="Buscar..." style="width:160px;padding:6px 12px;font-size:13px;" oninput="filtrarHistorial()">
                </div>
            </div>

            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">
                <strong>${registros.length}</strong> registros · Promedio: <strong>${promedio.toFixed(2)} kWh/día</strong>
            </p>

            <!-- Vista Tabla -->
            <div id="vistaTabla">
                ${registros.length === 0 ? `
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <h3>Sin registros aún</h3>
                        <p>Comienza registrando tu consumo energético diario</p>
                        <button class="btn-primary" onclick="cargarVista('consumo')"><i class="fas fa-plus"></i> Registrar Consumo</button>
                    </div>
                ` : `
                    <div class="table-container">
                        <table id="tablaHistorial">
                            <thead>
                                <tr>
                                    <th>Día</th>
                                    <th>Consumo (kWh)</th>
                                    <th>Costo (COP)</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${registros.map(r => {
                                    const fecha = new Date(r.fecha);
                                    const nivel = r.consumo > 3 ? 'danger' : r.consumo > 2 ? 'warning' : 'success';
                                    const nivelTexto = r.consumo > 3 ? 'Alto' : r.consumo > 2 ? 'Medio' : 'Normal';
                                    return `
                                        <tr data-nivel="${nivelTexto.toLowerCase()}">
                                            <td>${fecha.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })} ${fecha.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td><strong class="mono">${r.consumo.toFixed(2)}</strong></td>
                                            <td class="mono">${formatearMoneda(r.costo)}</td>
                                            <td><span class="badge ${nivel}">${nivelTexto}</span></td>
                                            <td><button class="btn-icon-danger" onclick="eliminarRegistro(${r.id})" title="Eliminar"><i class="fas fa-trash"></i></button></td>
                                        </tr>`;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                `}
            </div>

            <!-- Vista Gráfico -->
            <div id="vistaGrafico" style="display:none;">
                <div class="chart-container" style="height:320px;">
                    <canvas id="chartHistorialVista"></canvas>
                </div>
            </div>
        </div>
    `;
}

function cambiarVistaHistorial(tipo, btn) {
    document.querySelectorAll('#btnTabla, #btnGrafico').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('vistaTabla').style.display  = tipo === 'tabla'   ? '' : 'none';
    document.getElementById('vistaGrafico').style.display = tipo === 'grafico' ? '' : 'none';
    if (tipo === 'grafico') inicializarGraficoHistorialVista();
}

function inicializarGraficoHistorialVista() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email).slice(-30).reverse();
    const ctx = document.getElementById('chartHistorialVista');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: registros.map(r => new Date(r.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })),
            datasets: [{
                label: 'Consumo (kWh)',
                data: registros.map(r => r.consumo.toFixed(2)),
                backgroundColor: registros.map(r => r.consumo > 3 ? 'rgba(255,23,68,0.7)' : r.consumo > 2 ? 'rgba(255,145,0,0.7)' : 'rgba(0,200,83,0.7)'),
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { backgroundColor: '#152535', titleColor: '#fff', bodyColor: '#B0BEC5', borderColor: '#1E3A4A', borderWidth: 1 } },
            scales: {
                y: { beginAtZero: true, ticks: { color: '#B0BEC5', callback: v => v + ' kWh' }, grid: { color: '#1E3A4A' } },
                x: { ticks: { color: '#B0BEC5', maxTicksLimit: 15 }, grid: { display: false } }
            }
        }
    });
}

function filtrarNivelHistorial(nivel, btn) {
    document.querySelectorAll('.card-tabs .tab-btn').forEach(b => { if (b.textContent.includes('Todos') || b.textContent.includes('Alto') || b.textContent.includes('Bajo')) b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('#tablaHistorial tbody tr').forEach(fila => {
        const n = fila.dataset.nivel;
        if (nivel === 'todos') fila.style.display = '';
        else if (nivel === 'alto') fila.style.display = n === 'alto' ? '' : 'none';
        else if (nivel === 'bajo') fila.style.display = n === 'normal' ? '' : 'none';
    });
}

function filtrarHistorial() {
    const filtro = document.getElementById('filtroHistorial')?.value.toLowerCase() || '';
    document.querySelectorAll('#tablaHistorial tbody tr').forEach(fila => {
        fila.style.display = fila.textContent.toLowerCase().includes(filtro) ? '' : 'none';
    });
}

function eliminarRegistro(id) {
    // Crear modal de confirmación personalizado
    const modalHTML = `
        <div class="modal-overlay-custom" id="modalEliminarRegistro" onclick="if(event.target === this) cerrarModalEliminar()">
            <div class="modal-dialog-custom">
                <div class="modal-header-custom">
                    <div class="modal-icon-custom danger">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3>Confirmar Eliminación</h3>
                </div>
                <div class="modal-body-custom">
                    <p>¿Estás seguro de que deseas eliminar este registro de consumo?</p>
                    <p class="modal-warning-text">
                        <i class="fas fa-info-circle"></i>
                        Esta acción no se puede deshacer.
                    </p>
                </div>
                <div class="modal-footer-custom">
                    <button class="btn-secondary" onclick="cerrarModalEliminar()">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button class="btn-danger" onclick="confirmarEliminarRegistro(${id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Agregar modal al body si no existe
    let modalExistente = document.getElementById('modalEliminarRegistro');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal con animación
    setTimeout(() => {
        document.getElementById('modalEliminarRegistro').classList.add('active');
    }, 10);
}

function cerrarModalEliminar() {
    const modal = document.getElementById('modalEliminarRegistro');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

function confirmarEliminarRegistro(id) {
    const sesion = obtenerSesion();
    let registros = obtenerConsumoUsuario(sesion.email);
    registros = registros.filter(r => r.id !== id);
    guardarConsumoUsuario(sesion.email, registros);
    
    cerrarModalEliminar();
    mostrarNotificacion('success', 'Registro Eliminado', 'El registro ha sido eliminado correctamente');
    
    setTimeout(() => {
        cargarVista('historial');
    }, 500);
}
