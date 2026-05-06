// ============================================
// VISTA: REGISTRO DE CONSUMO
// ============================================

function generarVistaConsumo() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const registrosHoy = registros.filter(r => new Date(r.fecha) >= hoy);
    const consumoHoy = registrosHoy.reduce((s, r) => s + r.consumo, 0);
    const costoHoy   = registrosHoy.reduce((s, r) => s + r.costo, 0);

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-bolt"></i> Registrar Consumo</h1>
                <p>Ingresa tu consumo energético diario</p>
            </div>
            <div class="page-header-actions">
                <button class="btn-secondary" onclick="cargarVista('historial')">
                    <i class="fas fa-history"></i> Ver Historial
                </button>
            </div>
        </div>

        <!-- Resumen del día -->
        <div class="kpi-grid">
            <div class="kpi-card kpi-accent">
                <div class="kpi-header">
                    <span class="kpi-title">Registros Hoy</span>
                    <div class="kpi-icon blue"><i class="fas fa-calendar-day"></i></div>
                </div>
                <div class="kpi-value">${registrosHoy.length}</div>
                <div class="kpi-label">Registros del día</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Consumo Hoy</span>
                    <div class="kpi-icon green"><i class="fas fa-bolt"></i></div>
                </div>
                <div class="kpi-value">${consumoHoy.toFixed(2)}<span class="kpi-unit">kWh</span></div>
                <div class="kpi-label">${formatearMoneda(costoHoy)}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Tarifa Actual</span>
                    <div class="kpi-icon orange"><i class="fas fa-tag"></i></div>
                </div>
                <div class="kpi-value" style="font-size:20px;">${formatearMoneda(TARIFA_KWH)}</div>
                <div class="kpi-label">por kWh</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Total Registros</span>
                    <div class="kpi-icon blue"><i class="fas fa-database"></i></div>
                </div>
                <div class="kpi-value">${registros.length}</div>
                <div class="kpi-label">En el historial</div>
            </div>
        </div>

        <div class="grid-2">
            <!-- Formulario de registro -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-plus-circle"></i> Nuevo Registro</h3>
                </div>
                <form id="formConsumo" class="form-professional">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fechaConsumo"><i class="fas fa-calendar"></i> Fecha *</label>
                            <input type="date" id="fechaConsumo" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="horaConsumo"><i class="fas fa-clock"></i> Hora *</label>
                            <input type="time" id="horaConsumo" class="form-control" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="consumoKwh"><i class="fas fa-bolt"></i> Consumo (kWh) *</label>
                        <input type="number" id="consumoKwh" class="form-control" step="0.01" min="0.01" max="100" placeholder="Ej: 2.5" required>
                        <small class="form-text">Valor del medidor eléctrico en kilovatios-hora</small>
                    </div>

                    <!-- Preview del costo -->
                    <div class="costo-preview" id="costoPreview">
                        <div class="costo-preview-row">
                            <span><i class="fas fa-bolt"></i> Consumo</span>
                            <strong id="previewKwh">0.00 kWh</strong>
                        </div>
                        <div class="costo-preview-row">
                            <span><i class="fas fa-tag"></i> Tarifa</span>
                            <strong>${formatearMoneda(TARIFA_KWH)}/kWh</strong>
                        </div>
                        <div class="costo-preview-row costo-total">
                            <span><i class="fas fa-dollar-sign"></i> Costo estimado</span>
                            <strong id="costoEstimado" style="color:var(--accent-primary);font-size:20px;">$0 COP</strong>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="limpiarFormularioConsumo()">
                            <i class="fas fa-undo"></i> Limpiar
                        </button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save"></i> Guardar Registro
                        </button>
                    </div>
                </form>
            </div>

            <!-- Últimos registros del día -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-clock"></i> Registros de Hoy</h3>
                    <button class="btn-secondary" onclick="cargarVista('historial')">
                        <i class="fas fa-list"></i> Ver todos
                    </button>
                </div>

                ${registrosHoy.length === 0 ? `
                    <div class="empty-state" style="padding:32px 16px;">
                        <i class="fas fa-sun" style="font-size:36px;"></i>
                        <p>Sin registros hoy</p>
                        <small>Registra tu primer consumo del día</small>
                    </div>
                ` : `
                    <div style="display:grid;gap:10px;">
                        ${registrosHoy.slice(0, 8).map(r => {
                            const fecha = new Date(r.fecha);
                            const nivel = r.consumo > 3 ? 'red' : r.consumo > 2 ? 'orange' : 'green';
                            return `
                                <div class="registro-item">
                                    <div class="registro-icon ${nivel}">
                                        <i class="fas fa-bolt"></i>
                                    </div>
                                    <div class="registro-info">
                                        <span class="registro-hora">${fecha.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span class="registro-kwh">${r.consumo.toFixed(2)} kWh</span>
                                    </div>
                                    <div class="registro-costo">${formatearMoneda(r.costo)}</div>
                                    <button class="btn-icon-danger" onclick="eliminarRegistroConsumo(${r.id})" title="Eliminar">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}

                <div class="alert alert-info" style="margin-top:16px;">
                    <i class="fas fa-lightbulb"></i>
                    <div>
                        <strong>Consejo</strong>
                        <p>Registra tu consumo diariamente para obtener análisis más precisos y recomendaciones personalizadas.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function configurarFormularioConsumo() {
    const ahora = new Date();
    document.getElementById('fechaConsumo').valueAsDate = ahora;
    document.getElementById('horaConsumo').value = ahora.toTimeString().slice(0, 5);

    document.getElementById('consumoKwh')?.addEventListener('input', (e) => {
        const consumo = parseFloat(e.target.value) || 0;
        const costo = consumo * TARIFA_KWH;
        document.getElementById('costoEstimado').textContent = formatearMoneda(costo);
        document.getElementById('previewKwh').textContent = consumo.toFixed(2) + ' kWh';
    });

    document.getElementById('formConsumo')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const fecha   = document.getElementById('fechaConsumo').value;
        const hora    = document.getElementById('horaConsumo').value;
        const consumo = parseFloat(document.getElementById('consumoKwh').value);

        if (!fecha || !hora || !consumo || consumo <= 0) {
            mostrarNotificacion('warning', 'Datos Incompletos', 'Por favor completa todos los campos correctamente');
            return;
        }

        const sesion = obtenerSesion();
        const registros = obtenerConsumoUsuario(sesion.email);
        const nuevoRegistro = {
            id: Date.now(),
            fecha: new Date(`${fecha}T${hora}`).toISOString(),
            consumo,
            costo: consumo * TARIFA_KWH
        };

        registros.push(nuevoRegistro);
        guardarConsumoUsuario(sesion.email, registros);
        mostrarNotificacion('success', 'Registro Guardado',
            `${consumo.toFixed(2)} kWh registrado · Costo: ${formatearMoneda(nuevoRegistro.costo)}`);
        limpiarFormularioConsumo();
        // Refrescar lista del día
        cargarVista('consumo');
    });
}

function limpiarFormularioConsumo() {
    document.getElementById('formConsumo')?.reset();
    const ahora = new Date();
    document.getElementById('fechaConsumo').valueAsDate = ahora;
    document.getElementById('horaConsumo').value = ahora.toTimeString().slice(0, 5);
    document.getElementById('costoEstimado').textContent = '$0 COP';
    document.getElementById('previewKwh').textContent = '0.00 kWh';
    document.getElementById('consumoKwh')?.focus();
}

function eliminarRegistroConsumo(id) {
    const sesion = obtenerSesion();
    let registros = obtenerConsumoUsuario(sesion.email);
    registros = registros.filter(r => r.id !== id);
    guardarConsumoUsuario(sesion.email, registros);
    mostrarNotificacion('success', 'Eliminado', 'Registro eliminado correctamente');
    cargarVista('consumo');
}
