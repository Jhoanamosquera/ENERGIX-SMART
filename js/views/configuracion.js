// ============================================
// VISTA: CONFIGURACIÓN
// ============================================

function generarVistaConfiguracion() {
    const sesion = obtenerSesion();
    const configKey = `energix_config_${sesion.email}`;
    const config = JSON.parse(localStorage.getItem(configKey) || JSON.stringify({
        unidad: 'kWh', umbralAlerta: 20, alertasActivas: true, alertaPicos: true,
        reporteSemanal: false, reporteMensual: true, consejosAhorro: true,
        notifEmail: true, notifPush: false, tema: 'oscuro'
    }));

    // Inicializar tema seleccionado
    _temaSeleccionado = config.tema;

    // Verificar estado de notificaciones del navegador
    const notifEnabled = notificationManager?.isEnabled() || false;
    const notifPermission = typeof Notification !== 'undefined' ? Notification.permission : 'default';

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-cog"></i> Configuración del Sistema</h1>
                <p>Personaliza tu experiencia y ajusta las preferencias de ENERGIX SMART</p>
            </div>
            <div class="page-actions">
                <button class="btn-secondary" onclick="exportarConfiguracion()">
                    <i class="fas fa-download"></i> Exportar
                </button>
                <button class="btn-secondary" onclick="importarConfiguracion()">
                    <i class="fas fa-upload"></i> Importar
                </button>
            </div>
        </div>

        <!-- Configuración Rápida -->
        <div class="quick-settings">
            <div class="quick-setting-item">
                <div class="setting-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="setting-content">
                    <h4>Notificaciones</h4>
                    <p>Alertas automáticas</p>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" id="quickNotif" ${config.alertasActivas ? 'checked' : ''} onchange="toggleQuickSetting('alertas')">
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="quick-setting-item">
                <div class="setting-icon">
                    <i class="fas fa-palette"></i>
                </div>
                <div class="setting-content">
                    <h4>Tema Oscuro</h4>
                    <p>Modo visual</p>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" id="quickTheme" ${config.tema === 'oscuro' ? 'checked' : ''} onchange="toggleQuickSetting('tema')">
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="quick-setting-item">
                <div class="setting-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="setting-content">
                    <h4>Email</h4>
                    <p>Reportes por correo</p>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" id="quickEmail" ${config.notifEmail ? 'checked' : ''} onchange="toggleQuickSetting('email')">
                    <span class="toggle-slider"></span>
                </label>
            </div>
        </div>

        <!-- Unidades y Medidas -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-ruler"></i> Unidades y Medidas
                </h3>
                <p class="card-description">Configura las unidades de medida utilizadas en todo el sistema</p>
            </div>
            <div class="card-body">
                <div class="settings-grid">
                    <div class="setting-group">
                        <label class="setting-label">
                            <i class="fas fa-bolt"></i> Unidad de Energía
                        </label>
                        <select id="cfgUnidad" class="form-control">
                            <option value="kWh" ${config.unidad === 'kWh' ? 'selected' : ''}>kWh (kilovatio-hora)</option>
                            <option value="MWh" ${config.unidad === 'MWh' ? 'selected' : ''}>MWh (megavatio-hora)</option>
                            <option value="J"   ${config.unidad === 'J'   ? 'selected' : ''}>Joules</option>
                        </select>
                        <small class="form-help">Esta unidad se usará en todos los gráficos y reportes</small>
                    </div>
                    
                    <div class="setting-group">
                        <label class="setting-label">
                            <i class="fas fa-exclamation-triangle"></i> Umbral de Alerta
                        </label>
                        <div class="input-with-unit">
                            <input type="range" id="cfgUmbralRange" min="5" max="100" step="5" value="${config.umbralAlerta}" 
                                   oninput="document.getElementById('cfgUmbral').value = this.value; updateUmbralDisplay(this.value)">
                            <input type="number" id="cfgUmbral" class="form-control" value="${config.umbralAlerta}" min="5" max="100" step="5"
                                   oninput="document.getElementById('cfgUmbralRange').value = this.value; updateUmbralDisplay(this.value)">
                            <span class="input-unit">%</span>
                        </div>
                        <small class="form-help">Porcentaje sobre el promedio para disparar alertas de pico</small>
                        <div class="umbral-preview" id="umbralPreview">
                            Alerta cuando el consumo supere el <strong>${config.umbralAlerta}%</strong> del promedio
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alertas y Notificaciones -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-bell"></i> Sistema de Alertas
                </h3>
                <p class="card-description">Configura cuándo y cómo recibir notificaciones sobre tu consumo</p>
            </div>
            <div class="card-body">
                <div class="settings-list">
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-icon primary">
                                <i class="fas fa-power-off"></i>
                            </div>
                            <div class="setting-content">
                                <h4>Sistema de Alertas</h4>
                                <p>Activar o desactivar todas las alertas automáticas del sistema</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgAlertasActivas" ${config.alertasActivas ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-icon warning">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="setting-content">
                                <h4>Alertas de Picos</h4>
                                <p>Notificación inmediata cuando se detecte un consumo elevado</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgAlertaPicos" ${config.alertaPicos ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-icon info">
                                <i class="fas fa-calendar-week"></i>
                            </div>
                            <div class="setting-content">
                                <h4>Reporte Semanal</h4>
                                <p>Resumen automático cada lunes con el análisis de la semana</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgReporteSemanal" ${config.reporteSemanal ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-icon success">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div class="setting-content">
                                <h4>Reporte Mensual</h4>
                                <p>Análisis completo al inicio de cada mes con tendencias y ahorros</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgReporteMensual" ${config.reporteMensual ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <div class="setting-info">
                            <div class="setting-icon primary">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <div class="setting-content">
                                <h4>Consejos de Ahorro</h4>
                                <p>Recomendaciones personalizadas para optimizar tu consumo</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="cfgConsejosAhorro" ${config.consejosAhorro ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Canales de Comunicación -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-paper-plane"></i> Canales de Comunicación
                </h3>
                <p class="card-description">Elige cómo prefieres recibir las notificaciones y reportes</p>
            </div>
            <div class="card-body">
                <div class="communication-channels">
                    <div class="channel-item ${notifPermission === 'granted' ? 'available' : notifPermission === 'denied' ? 'blocked' : 'pending'}">
                        <div class="channel-icon">
                            <i class="fas fa-desktop"></i>
                        </div>
                        <div class="channel-content">
                            <h4>Notificaciones del Navegador</h4>
                            <p>Alertas push en tiempo real mientras navegas</p>
                            <div class="channel-status">
                                ${notifPermission === 'granted' ? 
                                    '<span class="status-badge success"><i class="fas fa-check-circle"></i> Activado</span>' : 
                                    notifPermission === 'denied' ? 
                                    '<span class="status-badge danger"><i class="fas fa-times-circle"></i> Bloqueado</span>' : 
                                    '<span class="status-badge warning"><i class="fas fa-clock"></i> Pendiente</span>'
                                }
                            </div>
                        </div>
                        <div class="channel-action">
                            <button class="btn-primary ${notifEnabled ? 'btn-success' : ''}" 
                                    onclick="activarNotificacionesNavegador()" 
                                    id="btnNotifNavegador" 
                                    ${notifEnabled ? 'disabled' : ''}>
                                <i class="fas ${notifEnabled ? 'fa-check-circle' : 'fa-bell'}"></i> 
                                ${notifEnabled ? 'Activadas' : 'Activar'}
                            </button>
                        </div>
                    </div>
                    
                    <div class="channel-item available">
                        <div class="channel-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="channel-content">
                            <h4>Correo Electrónico</h4>
                            <p>Reportes y alertas enviados a ${sesion.email}</p>
                            <div class="channel-status">
                                <span class="status-badge info"><i class="fas fa-info-circle"></i> Siempre disponible</span>
                            </div>
                        </div>
                        <div class="channel-action">
                            <label class="toggle-switch">
                                <input type="checkbox" id="cfgNotifEmail" ${config.notifEmail ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="channel-item available">
                        <div class="channel-icon">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <div class="channel-content">
                            <h4>Notificaciones Push (Demo)</h4>
                            <p>Simulación de notificaciones push para dispositivos móviles</p>
                            <div class="channel-status">
                                <span class="status-badge info"><i class="fas fa-flask"></i> Modo demostración</span>
                            </div>
                        </div>
                        <div class="channel-action">
                            <label class="toggle-switch">
                                <input type="checkbox" id="cfgNotifPush" ${config.notifPush ? 'checked' : ''}>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Personalización Visual -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-palette"></i> Personalización Visual
                </h3>
                <p class="card-description">Ajusta la apariencia de la interfaz según tus preferencias</p>
            </div>
            <div class="card-body">
                <div class="theme-section">
                    <label class="setting-label">
                        <i class="fas fa-moon"></i> Tema del Sistema
                    </label>
                    <p class="setting-description">Selecciona el modo visual que prefieras para la aplicación</p>
                    
                    <div class="theme-selector-advanced">
                        <div class="theme-option ${config.tema === 'claro' ? 'active' : ''}" onclick="seleccionarTema('claro', this)">
                            <div class="theme-preview light">
                                <div class="preview-header"></div>
                                <div class="preview-sidebar"></div>
                                <div class="preview-content">
                                    <div class="preview-card"></div>
                                    <div class="preview-card"></div>
                                </div>
                            </div>
                            <div class="theme-info">
                                <i class="fas fa-sun"></i>
                                <span>Tema Claro</span>
                            </div>
                        </div>
                        
                        <div class="theme-option ${config.tema === 'oscuro' ? 'active' : ''}" onclick="seleccionarTema('oscuro', this)">
                            <div class="theme-preview dark">
                                <div class="preview-header"></div>
                                <div class="preview-sidebar"></div>
                                <div class="preview-content">
                                    <div class="preview-card"></div>
                                    <div class="preview-card"></div>
                                </div>
                            </div>
                            <div class="theme-info">
                                <i class="fas fa-moon"></i>
                                <span>Tema Oscuro</span>
                            </div>
                        </div>
                        
                        <div class="theme-option ${config.tema === 'sistema' ? 'active' : ''}" onclick="seleccionarTema('sistema', this)">
                            <div class="theme-preview auto">
                                <div class="preview-header"></div>
                                <div class="preview-sidebar"></div>
                                <div class="preview-content">
                                    <div class="preview-card"></div>
                                    <div class="preview-card"></div>
                                </div>
                                <div class="auto-indicator">
                                    <i class="fas fa-sync-alt"></i>
                                </div>
                            </div>
                            <div class="theme-info">
                                <i class="fas fa-desktop"></i>
                                <span>Automático</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="theme-benefits">
                        <div class="benefit-item">
                            <i class="fas fa-eye"></i>
                            <span>Reduce la fatiga visual</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-battery-half"></i>
                            <span>Ahorra batería en pantallas OLED</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-clock"></i>
                            <span>Se adapta automáticamente</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Zona de Peligro -->
        <div class="card danger-zone">
            <div class="card-header">
                <h3 class="card-title danger">
                    <i class="fas fa-exclamation-triangle"></i> Zona de Peligro
                </h3>
                <p class="card-description">Acciones irreversibles que afectarán permanentemente tus datos</p>
            </div>
            <div class="card-body">
                <div class="danger-actions">
                    <div class="danger-item">
                        <div class="danger-icon">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                        <div class="danger-content">
                            <h4>Eliminar Todos los Registros</h4>
                            <p>Esta acción eliminará permanentemente todos tus datos de consumo, configuraciones y progreso. No se puede deshacer.</p>
                            <div class="danger-warning">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>Se perderán todos los datos históricos y logros</span>
                            </div>
                        </div>
                        <div class="danger-action">
                            <button class="btn-danger" onclick="confirmarEliminarDatos()">
                                <i class="fas fa-trash"></i> Eliminar Todo
                            </button>
                        </div>
                    </div>
                    
                    <div class="danger-item">
                        <div class="danger-icon">
                            <i class="fas fa-undo"></i>
                        </div>
                        <div class="danger-content">
                            <h4>Restablecer Configuración</h4>
                            <p>Volver a los valores predeterminados de fábrica. Mantendrá los datos de consumo.</p>
                        </div>
                        <div class="danger-action">
                            <button class="btn-warning" onclick="confirmarRestablecerConfig()">
                                <i class="fas fa-undo"></i> Restablecer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Acciones Principales -->
        <div class="config-actions">
            <div class="actions-left">
                <button class="btn-secondary" onclick="cargarVista('configuracion')">
                    <i class="fas fa-undo"></i> Descartar Cambios
                </button>
                <button class="btn-secondary" onclick="previsualizarConfiguracion()">
                    <i class="fas fa-eye"></i> Vista Previa
                </button>
            </div>
            <div class="actions-right">
                <button class="btn-success" onclick="guardarConfiguracion()">
                    <i class="fas fa-save"></i> Guardar Configuración
                </button>
            </div>
        </div>
    `;
}

// Funciones auxiliares para configuración
function toggleQuickSetting(type) {
    switch(type) {
        case 'alertas':
            const alertasActivas = document.getElementById('quickNotif').checked;
            document.getElementById('cfgAlertasActivas').checked = alertasActivas;
            break;
        case 'tema':
            const temaOscuro = document.getElementById('quickTheme').checked;
            seleccionarTema(temaOscuro ? 'oscuro' : 'claro', 
                document.querySelector(`.theme-option[onclick*="${temaOscuro ? 'oscuro' : 'claro'}"]`));
            break;
        case 'email':
            const emailActivo = document.getElementById('quickEmail').checked;
            document.getElementById('cfgNotifEmail').checked = emailActivo;
            break;
    }
}

function updateUmbralDisplay(valor) {
    document.getElementById('umbralPreview').innerHTML = 
        `Alerta cuando el consumo supere el <strong>${valor}%</strong> del promedio`;
}

function exportarConfiguracion() {
    const sesion = obtenerSesion();
    const configKey = `energix_config_${sesion.email}`;
    const config = localStorage.getItem(configKey);
    
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energix-config-${sesion.email}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    mostrarNotificacion('success', 'Configuración Exportada', 'El archivo de configuración se ha descargado correctamente');
}

function importarConfiguracion() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const config = JSON.parse(e.target.result);
                    const sesion = obtenerSesion();
                    const configKey = `energix_config_${sesion.email}`;
                    localStorage.setItem(configKey, JSON.stringify(config));
                    cargarVista('configuracion');
                    mostrarNotificacion('success', 'Configuración Importada', 'La configuración se ha aplicado correctamente');
                } catch (error) {
                    mostrarNotificacion('error', 'Error', 'El archivo de configuración no es válido');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function previsualizarConfiguracion() {
    mostrarNotificacion('info', 'Vista Previa', 'Los cambios se aplicarán temporalmente para que puedas verlos');
    // Aplicar cambios temporalmente sin guardar
}

function confirmarRestablecerConfig() {
    if (confirm('¿Estás seguro de que quieres restablecer toda la configuración a los valores predeterminados?')) {
        const sesion = obtenerSesion();
        const configKey = `energix_config_${sesion.email}`;
        localStorage.removeItem(configKey);
        cargarVista('configuracion');
        mostrarNotificacion('success', 'Configuración Restablecida', 'Se han restaurado los valores predeterminados');
    }
}

let _temaSeleccionado = 'oscuro';

function seleccionarTema(tema, el) {
    _temaSeleccionado = tema;
    document.querySelectorAll('.tema-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
    
    // Aplicar el tema inmediatamente
    if (typeof themeManager !== 'undefined') {
        themeManager.applyTheme(tema === 'claro' ? 'light' : 'dark');
        themeManager.saveTheme(tema === 'claro' ? 'light' : 'dark');
    }
}

function guardarConfiguracion() {
    const sesion = obtenerSesion();
    const configKey = `energix_config_${sesion.email}`;
    const config = {
        unidad:          document.getElementById('cfgUnidad')?.value || 'kWh',
        umbralAlerta:    parseInt(document.getElementById('cfgUmbral')?.value) || 20,
        alertasActivas:  document.getElementById('cfgAlertasActivas')?.checked ?? true,
        alertaPicos:     document.getElementById('cfgAlertaPicos')?.checked ?? true,
        reporteSemanal:  document.getElementById('cfgReporteSemanal')?.checked ?? false,
        reporteMensual:  document.getElementById('cfgReporteMensual')?.checked ?? true,
        consejosAhorro:  document.getElementById('cfgConsejosAhorro')?.checked ?? true,
        notifEmail:      document.getElementById('cfgNotifEmail')?.checked ?? true,
        notifPush:       document.getElementById('cfgNotifPush')?.checked ?? false,
        tema:            _temaSeleccionado
    };
    localStorage.setItem(configKey, JSON.stringify(config));
    
    // Aplicar el tema seleccionado
    if (typeof themeManager !== 'undefined') {
        const themeToApply = _temaSeleccionado === 'claro' ? 'light' : 'dark';
        themeManager.applyTheme(themeToApply);
        themeManager.saveTheme(themeToApply);
    }
    
    mostrarNotificacion('success', 'Configuración Guardada', 'Tus preferencias han sido guardadas correctamente');
}

function confirmarEliminarDatos() {
    if (!confirm('¿Estás seguro? Esta acción eliminará TODOS tus registros de consumo permanentemente.')) return;
    const sesion = obtenerSesion();
    localStorage.removeItem(`energix_consumo_${sesion.email}`);
    mostrarNotificacion('success', 'Datos Eliminados', 'Todos tus registros han sido eliminados');
    setTimeout(() => cargarVista('dashboard'), 1500);
}

async function activarNotificacionesNavegador() {
    const btn = document.getElementById('btnNotifNavegador');
    const result = await toggleBrowserNotifications(true);
    
    if (result.success) {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Activadas';
        btn.className = 'btn-success';
        btn.disabled = true;
        mostrarNotificacion('success', 'Notificaciones Activadas', result.message);
    } else {
        mostrarNotificacion('error', 'Error', result.message);
    }
}
