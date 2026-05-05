// ============================================
// VISTA: CONFIGURACIÓN DE USUARIO
// ============================================

function generarVistaConfiguracion() {
    const sesion = obtenerSesion();
    const configKey = `energix_config_${sesion.email}`;
    const config = JSON.parse(localStorage.getItem(configKey) || JSON.stringify({
        unidad: 'kWh',
        umbralAlerta: 20,
        alertasActivas: true,
        alertaPicos: true,
        reporteSemanal: false,
        reporteMensual: true,
        consejosAhorro: true,
        notifEmail: true,
        notifPush: false,
        tema: 'oscuro'
    }));

    return `
        <div class="page-header">
            <h1><i class="fas fa-cog"></i> Configuración</h1>
            <p>Personaliza tu experiencia en ENERGIX SMART</p>
        </div>

        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-bell"></i>
                        Alertas y Notificaciones
                    </h3>
                </div>
                <div style="display: grid; gap: 20px;">
                    <div class="config-item">
                        <div class="config-info">
                            <strong>Alertas de consumo</strong>
                            <p>Recibe alertas cuando superes el umbral configurado</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgAlertasActivas" ${config.alertasActivas ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="config-item">
                        <div class="config-info">
                            <strong>Alertas de picos</strong>
                            <p>Notificación inmediata al detectar picos de consumo</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgAlertaPicos" ${config.alertaPicos ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="config-item">
                        <div class="config-info">
                            <strong>Consejos de ahorro</strong>
                            <p>Recibe recomendaciones personalizadas diariamente</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgConsejosAhorro" ${config.consejosAhorro ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="form-group">
                        <label><i class="fas fa-sliders-h"></i> Umbral de alerta (%)</label>
                        <input type="number" id="cfgUmbral" class="form-control" value="${config.umbralAlerta}" min="5" max="100" step="5">
                        <small class="form-text">Alerta cuando el consumo supere este porcentaje del promedio</small>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-file-alt"></i>
                        Reportes Automáticos
                    </h3>
                </div>
                <div style="display: grid; gap: 20px;">
                    <div class="config-item">
                        <div class="config-info">
                            <strong>Reporte semanal</strong>
                            <p>Resumen automático cada lunes</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgReporteSemanal" ${config.reporteSemanal ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="config-item">
                        <div class="config-info">
                            <strong>Reporte mensual</strong>
                            <p>Resumen completo al inicio de cada mes</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgReporteMensual" ${config.reporteMensual ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="config-item">
                        <div class="config-info">
                            <strong>Notificaciones por email</strong>
                            <p>Recibe alertas y reportes en tu correo</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgNotifEmail" ${config.notifEmail ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="form-group">
                        <label><i class="fas fa-ruler"></i> Unidad de medida</label>
                        <select id="cfgUnidad" class="form-control">
                            <option value="kWh" ${config.unidad === 'kWh' ? 'selected' : ''}>kWh (Kilovatios-hora)</option>
                            <option value="MWh" ${config.unidad === 'MWh' ? 'selected' : ''}>MWh (Megavatios-hora)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-trash-alt"></i>
                    Zona de Peligro
                </h3>
            </div>
            <div style="display: grid; gap: 16px;">
                <div class="alert-item warning">
                    <div class="alert-icon orange">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Eliminar todos los registros de consumo</div>
                        <div class="alert-description">Esta acción eliminará permanentemente todos tus datos de consumo. No se puede deshacer.</div>
                    </div>
                    <button class="btn-danger" onclick="confirmarEliminarDatos()" style="flex-shrink: 0;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px;">
            <button class="btn-secondary" onclick="cargarVista('configuracion')">
                <i class="fas fa-undo"></i> Restablecer
            </button>
            <button class="btn-primary" onclick="guardarConfiguracion()">
                <i class="fas fa-save"></i> Guardar Configuración
            </button>
        </div>
    `;
}

function guardarConfiguracion() {
    const sesion = obtenerSesion();
    const configKey = `energix_config_${sesion.email}`;

    const config = {
        alertasActivas: document.getElementById('cfgAlertasActivas')?.checked ?? true,
        alertaPicos: document.getElementById('cfgAlertaPicos')?.checked ?? true,
        consejosAhorro: document.getElementById('cfgConsejosAhorro')?.checked ?? true,
        umbralAlerta: parseInt(document.getElementById('cfgUmbral')?.value) || 20,
        reporteSemanal: document.getElementById('cfgReporteSemanal')?.checked ?? false,
        reporteMensual: document.getElementById('cfgReporteMensual')?.checked ?? true,
        notifEmail: document.getElementById('cfgNotifEmail')?.checked ?? true,
        unidad: document.getElementById('cfgUnidad')?.value || 'kWh',
        tema: 'oscuro'
    };

    localStorage.setItem(configKey, JSON.stringify(config));
    mostrarNotificacion('success', 'Configuración Guardada', 'Tus preferencias han sido guardadas correctamente');
}

function confirmarEliminarDatos() {
    if (!confirm('¿Estás seguro? Esta acción eliminará TODOS tus registros de consumo permanentemente.')) {
        return;
    }
    const sesion = obtenerSesion();
    localStorage.removeItem(`energix_consumo_${sesion.email}`);
    mostrarNotificacion('success', 'Datos Eliminados', 'Todos tus registros de consumo han sido eliminados');
    setTimeout(() => cargarVista('dashboard'), 1500);
}
