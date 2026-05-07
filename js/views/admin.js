// ============================================
// PANEL DE ADMINISTRACIÓN - GESTIÓN DE PLATAFORMA
// ============================================

// ============================================
// VISTA: GESTIÓN DE USUARIOS
// ============================================

function generarVistaGestionUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const sesion = obtenerSesion();
    
    // Detectar si es móvil (430px o menos)
    const isMobile = window.innerWidth <= 430;
    
    return `
        <div class="page-header" style="flex-direction: column; align-items: stretch; gap: 12px;">
            <div>
                <h1 style="font-size: ${isMobile ? '19px' : '28px'};"><i class="fas fa-users-cog"></i> Gestión de Usuarios</h1>
                <p style="font-size: ${isMobile ? '13px' : '15px'};">Administra los usuarios del sistema ENERGIX SMART</p>
            </div>
            <button class="btn-primary" onclick="mostrarModalCrearUsuario()" style="width: ${isMobile ? '100%' : 'auto'}; justify-content: center;">
                <i class="fas fa-user-plus"></i> Crear Usuario
            </button>
        </div>
        
        <div class="kpi-grid" style="display: grid; grid-template-columns: ${isMobile ? '1fr' : 'repeat(4, 1fr)'}; gap: ${isMobile ? '10px' : '20px'};">
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Total Usuarios</span>
                    <div class="kpi-icon blue" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${usuarios.length}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Registrados en el sistema</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Usuarios Activos</span>
                    <div class="kpi-icon green" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-user-check"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${usuarios.filter(u => u.activo !== false).length}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Con acceso al sistema</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Administradores</span>
                    <div class="kpi-icon orange" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-user-shield"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${usuarios.filter(u => u.rol === 'admin').length}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Con privilegios admin</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Nuevos (30 días)</span>
                    <div class="kpi-icon red" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-user-plus"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${usuarios.filter(u => {
                    const fecha = new Date(u.fechaRegistro);
                    const hace30Dias = new Date();
                    hace30Dias.setDate(hace30Dias.getDate() - 30);
                    return fecha >= hace30Dias;
                }).length}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Registros recientes</div>
            </div>
        </div>
        
        <div class="card" style="padding: ${isMobile ? '14px' : '20px'};">
            <div class="card-header" style="flex-direction: column; align-items: flex-start; gap: 12px; margin-bottom: 16px;">
                <h3 class="card-title" style="font-size: ${isMobile ? '14px' : '18px'};">
                    <i class="fas fa-table"></i>
                    Lista de Usuarios
                </h3>
            </div>
            
            <div class="table-container" style="margin: 0 ${isMobile ? '-14px' : '0'}; padding: 0 ${isMobile ? '14px' : '0'}; overflow-x: auto;">
                <table style="min-width: ${isMobile ? '620px' : '100%'}; font-size: ${isMobile ? '11px' : '14px'};">
                    <thead>
                        <tr>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Usuario</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Email</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Rol</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Registro</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Estado</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuarios.map(u => `
                            <tr>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">
                                    <div style="display: flex; align-items: center; gap: ${isMobile ? '8px' : '12px'};">
                                        <div class="user-avatar" style="width: ${isMobile ? '30px' : '40px'}; height: ${isMobile ? '30px' : '40px'}; font-size: ${isMobile ? '12px' : '16px'}; ${u.rol === 'admin' ? 'background: var(--admin-badge);' : ''}">
                                            ${u.avatar}
                                        </div>
                                        <strong style="font-size: ${isMobile ? '11px' : '14px'};">${u.nombre}</strong>
                                    </div>
                                </td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${u.email}</td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'};">
                                    <span class="badge ${u.rol === 'admin' ? 'warning' : 'success'}" style="font-size: ${isMobile ? '9px' : '11px'}; padding: ${isMobile ? '3px 7px' : '4px 10px'};">
                                        ${u.rol === 'admin' ? 'Admin' : 'Usuario'}
                                    </span>
                                </td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${new Date(u.fechaRegistro).toLocaleDateString('es-CO')}</td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'};">
                                    <span class="badge ${u.activo !== false ? 'success' : 'danger'}" style="font-size: ${isMobile ? '9px' : '11px'}; padding: ${isMobile ? '3px 7px' : '4px 10px'};">
                                        ${u.activo !== false ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'};">
                                    ${u.email !== sesion.email ? `
                                        <button class="btn-secondary" onclick="toggleEstadoUsuario('${u.email}')" style="padding: ${isMobile ? '6px 9px' : '6px 12px'}; font-size: ${isMobile ? '10px' : '12px'}; margin-right: 3px;" title="${u.activo !== false ? 'Desactivar' : 'Activar'}">
                                            <i class="fas fa-${u.activo !== false ? 'ban' : 'check'}"></i>
                                        </button>
                                        <button class="btn-secondary" onclick="cambiarRolUsuario('${u.email}')" style="padding: ${isMobile ? '6px 9px' : '6px 12px'}; font-size: ${isMobile ? '10px' : '12px'}; margin-right: 3px;" title="Cambiar rol">
                                            <i class="fas fa-user-shield"></i>
                                        </button>
                                        <button class="btn-secondary" onclick="eliminarUsuario('${u.email}')" style="padding: ${isMobile ? '6px 9px' : '6px 12px'}; font-size: ${isMobile ? '10px' : '12px'};">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    ` : `<span style="color: var(--text-secondary); font-size: ${isMobile ? '10px' : '12px'};">Tu cuenta</span>`}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function mostrarModalCrearUsuario() {
    mostrarNotificacion('info', 'Función en Desarrollo', 'La creación de usuarios desde admin estará disponible próximamente');
}

function toggleEstadoUsuario(email) {
    let usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email);
    
    if (!usuario) return;
    
    usuario.activo = usuario.activo === false ? true : false;
    localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
    
    mostrarNotificacion('success', 'Estado Actualizado', `Usuario ${usuario.activo ? 'activado' : 'desactivado'} correctamente`);
    cargarVista('gestionUsuarios');
}

function cambiarRolUsuario(email) {
    let usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email);
    
    if (!usuario) return;
    
    if (!confirm(`¿Cambiar rol de ${usuario.nombre} a ${usuario.rol === 'admin' ? 'Usuario' : 'Administrador'}?`)) {
        return;
    }
    
    usuario.rol = usuario.rol === 'admin' ? 'usuario' : 'admin';
    localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
    
    mostrarNotificacion('success', 'Rol Actualizado', `${usuario.nombre} ahora es ${usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}`);
    cargarVista('gestionUsuarios');
}

function eliminarUsuario(email) {
    if (!confirm(`¿Estás seguro de eliminar el usuario ${email}?`)) {
        return;
    }
    
    let usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    usuarios = usuarios.filter(u => u.email !== email);
    localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
    
    // Eliminar datos del usuario
    localStorage.removeItem(`energix_consumo_${email}`);
    
    mostrarNotificacion('success', 'Usuario Eliminado', 'El usuario ha sido eliminado correctamente');
    
    cargarVista('gestionUsuarios');
}

// ============================================
// VISTA: MONITOREO DE SISTEMA
// ============================================

function generarVistaMonitoreoSistema() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const totalConsumo = usuarios.reduce((sum, u) => {
        const registros = obtenerConsumoUsuario(u.email);
        return sum + registros.reduce((s, r) => s + r.consumo, 0);
    }, 0);
    
    const dispositivosActivos = usuarios.reduce((sum, u) => {
        const dispositivos = obtenerDispositivosUsuario(u.email);
        return sum + dispositivos.filter(d => d.estado === 'activo').length;
    }, 0);
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-server"></i> Monitoreo de Sistema</h1>
            <p>Estado en tiempo real de la plataforma ENERGIX SMART</p>
        </div>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Estado del Sistema</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: 24px; color: var(--success);">OPERATIVO</div>
                <div class="kpi-label">Todos los servicios funcionando</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Consumo Total</span>
                    <div class="kpi-icon blue">
                        <i class="fas fa-bolt"></i>
                    </div>
                </div>
                <div class="kpi-value">${totalConsumo.toFixed(1)} kWh</div>
                <div class="kpi-label">Consumo acumulado plataforma</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Dispositivos Activos</span>
                    <div class="kpi-icon orange">
                        <i class="fas fa-plug"></i>
                    </div>
                </div>
                <div class="kpi-value">${dispositivosActivos}</div>
                <div class="kpi-label">Dispositivos monitoreados</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Uptime</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-clock"></i>
                    </div>
                </div>
                <div class="kpi-value">99.9%</div>
                <div class="kpi-label">Disponibilidad del sistema</div>
            </div>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-chart-line"></i>
                        Consumo en Tiempo Real
                    </h3>
                </div>
                <div class="chart-container" style="height: 300px;">
                    <canvas id="chartConsumoTiempoReal"></canvas>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-users"></i>
                        Actividad de Usuarios
                    </h3>
                </div>
                <div class="chart-container" style="height: 300px;">
                    <canvas id="chartActividadUsuarios"></canvas>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-list"></i>
                    Logs del Sistema
                </h3>
            </div>
            <div style="padding: 20px;">
                <div class="alert-item">
                    <div class="alert-icon green">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Sistema iniciado correctamente</div>
                        <div class="alert-description">Hace 2 horas</div>
                    </div>
                </div>
                <div class="alert-item">
                    <div class="alert-icon blue">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Nuevo usuario registrado</div>
                        <div class="alert-description">Hace 3 horas</div>
                    </div>
                </div>
                <div class="alert-item warning">
                    <div class="alert-icon orange">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Pico de consumo detectado</div>
                        <div class="alert-description">Hace 5 horas</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// VISTA: GESTIÓN DE DISPOSITIVOS
// ============================================

function generarVistaGestionDispositivos() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    
    let todosDispositivos = [];
    usuarios.forEach(u => {
        const dispositivos = obtenerDispositivosUsuario(u.email);
        dispositivos.forEach(d => {
            todosDispositivos.push({
                ...d,
                usuario: u.nombre,
                email: u.email
            });
        });
    });
    
    const activos = todosDispositivos.filter(d => d.estado === 'activo').length;
    const inactivos = todosDispositivos.filter(d => d.estado === 'inactivo').length;
    const consumoTotal = todosDispositivos.reduce((sum, d) => sum + (d.consumoPromedio || 0), 0);
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 430;
    
    return `
        <div class="page-header" style="flex-direction: column; align-items: stretch; gap: 12px;">
            <div>
                <h1 style="font-size: ${isMobile ? '19px' : '28px'};"><i class="fas fa-plug"></i> Gestión de Dispositivos</h1>
                <p style="font-size: ${isMobile ? '13px' : '15px'};">Administra todos los dispositivos de la plataforma</p>
            </div>
        </div>
        
        <div class="kpi-grid" style="display: grid; grid-template-columns: ${isMobile ? '1fr' : 'repeat(4, 1fr)'}; gap: ${isMobile ? '10px' : '20px'};">
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Total Dispositivos</span>
                    <div class="kpi-icon blue" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-plug"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${todosDispositivos.length}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Registrados en plataforma</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Activos</span>
                    <div class="kpi-icon green" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${activos}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">En funcionamiento</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Inactivos</span>
                    <div class="kpi-icon red" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-times-circle"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${inactivos}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Apagados o desconectados</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Consumo Promedio</span>
                    <div class="kpi-icon orange" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-bolt"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${consumoTotal.toFixed(1)} W</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Consumo total estimado</div>
            </div>
        </div>
        
        <div class="card" style="padding: ${isMobile ? '14px' : '20px'};">
            <div class="card-header" style="flex-direction: column; align-items: flex-start; gap: 12px; margin-bottom: 16px;">
                <h3 class="card-title" style="font-size: ${isMobile ? '14px' : '18px'};">
                    <i class="fas fa-table"></i>
                    Lista de Dispositivos
                </h3>
            </div>
            
            <div class="table-container" style="margin: 0 ${isMobile ? '-14px' : '0'}; padding: 0 ${isMobile ? '14px' : '0'}; overflow-x: auto;">
                <table style="min-width: ${isMobile ? '620px' : '100%'}; font-size: ${isMobile ? '11px' : '14px'};">
                    <thead>
                        <tr>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Dispositivo</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Usuario</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Tipo</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Consumo Promedio</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${todosDispositivos.map(d => `
                            <tr>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">
                                    <div style="display: flex; align-items: center; gap: ${isMobile ? '8px' : '12px'};">
                                        <div style="width: ${isMobile ? '30px' : '40px'}; height: ${isMobile ? '30px' : '40px'}; background: var(--card-bg); border-radius: ${isMobile ? '6px' : '8px'}; display: flex; align-items: center; justify-content: center; font-size: ${isMobile ? '16px' : '20px'};">
                                            ${d.icono}
                                        </div>
                                        <strong style="font-size: ${isMobile ? '11px' : '14px'};">${d.nombre}</strong>
                                    </div>
                                </td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${d.usuario}</td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'};"><span class="badge info" style="font-size: ${isMobile ? '9px' : '11px'}; padding: ${isMobile ? '3px 7px' : '4px 10px'};">${d.tipo}</span></td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${d.consumoPromedio || 0} W</td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'};">
                                    <span class="badge ${d.estado === 'activo' ? 'success' : 'danger'}" style="font-size: ${isMobile ? '9px' : '11px'}; padding: ${isMobile ? '3px 7px' : '4px 10px'};">
                                        ${d.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ============================================
// VISTA: CONFIGURACIÓN DE PLATAFORMA
// ============================================

function generarVistaConfiguracionPlataforma() {
    const config = obtenerConfiguracionPlataforma();
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-cogs"></i> Configuración de Plataforma</h1>
            <p>Ajustes globales del sistema ENERGIX SMART</p>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-dollar-sign"></i>
                        Tarifas y Costos
                    </h3>
                </div>
                <div style="padding: 20px;">
                    <div class="form-group">
                        <label>Tarifa por kWh (COP)</label>
                        <input type="number" class="form-control" value="${config.tarifaKwh}" id="inputTarifaKwh" step="1">
                    </div>
                    <div class="form-group">
                        <label>Tarifa Pico (COP)</label>
                        <input type="number" class="form-control" value="${config.tarifaPico}" id="inputTarifaPico" step="1">
                    </div>
                    <button class="btn-primary" onclick="guardarConfiguracionTarifas()">
                        <i class="fas fa-save"></i> Guardar Tarifas
                    </button>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-bell"></i>
                        Alertas y Notificaciones
                    </h3>
                </div>
                <div style="padding: 20px;">
                    <div class="form-group">
                        <label>
                            <input type="checkbox" ${config.alertasActivas ? 'checked' : ''} id="checkAlertasActivas">
                            Activar alertas automáticas
                        </label>
                    </div>
                    <div class="form-group">
                        <label>Umbral de alerta (%)</label>
                        <input type="number" class="form-control" value="${config.umbralAlerta}" id="inputUmbralAlerta" min="0" max="100">
                    </div>
                    <button class="btn-primary" onclick="guardarConfiguracionAlertas()">
                        <i class="fas fa-save"></i> Guardar Alertas
                    </button>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-database"></i>
                    Gestión de Datos
                </h3>
            </div>
            <div style="padding: 20px;">
                <div class="alert-item warning">
                    <div class="alert-icon orange">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="alert-content">
                        <div class="alert-title">Zona de Peligro</div>
                        <div class="alert-description">Las siguientes acciones son irreversibles</div>
                    </div>
                </div>
                
                <div style="margin-top: 20px; display: flex; gap: 12px;">
                    <button class="btn-secondary" onclick="exportarDatosPlataforma()">
                        <i class="fas fa-download"></i> Exportar Datos
                    </button>
                    <button class="btn-secondary" onclick="limpiarLogsAntiguos()">
                        <i class="fas fa-broom"></i> Limpiar Logs Antiguos
                    </button>
                    <button class="btn-secondary" style="background: var(--danger); border-color: var(--danger);" onclick="resetearPlataforma()">
                        <i class="fas fa-trash-restore"></i> Resetear Plataforma
                    </button>
                </div>
            </div>
        </div>
    `;
}

function obtenerConfiguracionPlataforma() {
    const configDefault = {
        tarifaKwh: 750,
        tarifaPico: 950,
        alertasActivas: true,
        umbralAlerta: 30
    };
    
    const config = localStorage.getItem('energix_config_plataforma');
    return config ? JSON.parse(config) : configDefault;
}

function guardarConfiguracionTarifas() {
    const config = obtenerConfiguracionPlataforma();
    config.tarifaKwh = parseFloat(document.getElementById('inputTarifaKwh').value);
    config.tarifaPico = parseFloat(document.getElementById('inputTarifaPico').value);
    
    localStorage.setItem('energix_config_plataforma', JSON.stringify(config));
    mostrarNotificacion('success', 'Configuración Guardada', 'Las tarifas han sido actualizadas');
}

function guardarConfiguracionAlertas() {
    const config = obtenerConfiguracionPlataforma();
    config.alertasActivas = document.getElementById('checkAlertasActivas').checked;
    config.umbralAlerta = parseInt(document.getElementById('inputUmbralAlerta').value);
    
    localStorage.setItem('energix_config_plataforma', JSON.stringify(config));
    mostrarNotificacion('success', 'Configuración Guardada', 'Las alertas han sido actualizadas');
}

function exportarDatosPlataforma() {
    const datos = {
        usuarios: JSON.parse(localStorage.getItem('energix_usuarios') || '[]'),
        configuracion: obtenerConfiguracionPlataforma(),
        fecha: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energix_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    mostrarNotificacion('success', 'Datos Exportados', 'El backup ha sido descargado');
}

function limpiarLogsAntiguos() {
    if (!confirm('¿Eliminar logs antiguos? Esta acción no se puede deshacer.')) {
        return;
    }
    
    mostrarNotificacion('success', 'Logs Limpiados', 'Los logs antiguos han sido eliminados');
}

function resetearPlataforma() {
    if (!confirm('⚠️ ADVERTENCIA: Esto eliminará TODOS los datos de la plataforma. ¿Estás seguro?')) {
        return;
    }
    
    if (!confirm('Esta acción es IRREVERSIBLE. ¿Confirmas que deseas resetear la plataforma?')) {
        return;
    }
    
    // Limpiar todo excepto la sesión actual
    const sesion = obtenerSesion();
    localStorage.clear();
    localStorage.setItem('energix_usuarios', JSON.stringify(USUARIOS_DEMO));
    
    mostrarNotificacion('success', 'Plataforma Reseteada', 'Todos los datos han sido eliminados');
    
    setTimeout(() => {
        location.reload();
    }, 2000);
}

function obtenerDispositivosUsuario(email) {
    const key = `energix_dispositivos_${email}`;
    const dispositivos = localStorage.getItem(key);
    return dispositivos ? JSON.parse(dispositivos) : [];
}


// ============================================
// VISTA: ESTADÍSTICAS GLOBALES
// ============================================

function generarVistaEstadisticasGlobales() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    
    // Calcular estadísticas
    let consumoTotal = 0;
    let costoTotal = 0;
    let registrosTotal = 0;
    
    const estadisticasPorUsuario = usuarios.map(u => {
        const registros = obtenerConsumoUsuario(u.email);
        const consumo = registros.reduce((sum, r) => sum + r.consumo, 0);
        const costo = registros.reduce((sum, r) => sum + r.costo, 0);
        
        consumoTotal += consumo;
        costoTotal += costo;
        registrosTotal += registros.length;
        
        return {
            nombre: u.nombre,
            email: u.email,
            consumo: consumo,
            costo: costo,
            registros: registros.length,
            promedio: registros.length > 0 ? consumo / registros.length : 0
        };
    });
    
    const promedioGlobal = registrosTotal > 0 ? consumoTotal / registrosTotal : 0;
    const usuarioMasEficiente = estadisticasPorUsuario.reduce((min, u) => u.consumo < min.consumo ? u : min, estadisticasPorUsuario[0] || {});
    const usuarioMayorConsumo = estadisticasPorUsuario.reduce((max, u) => u.consumo > max.consumo ? u : max, estadisticasPorUsuario[0] || {});
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 430;
    
    return `
        <div class="page-header" style="flex-direction: column; align-items: stretch; gap: 12px;">
            <div>
                <h1 style="font-size: ${isMobile ? '19px' : '28px'};"><i class="fas fa-chart-pie"></i> Estadísticas Globales</h1>
                <p style="font-size: ${isMobile ? '13px' : '15px'};">Análisis completo del consumo en la plataforma</p>
            </div>
        </div>
        
        <div class="kpi-grid" style="display: grid; grid-template-columns: ${isMobile ? '1fr' : 'repeat(4, 1fr)'}; gap: ${isMobile ? '10px' : '20px'};">
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Consumo Total</span>
                    <div class="kpi-icon blue" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-bolt"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${consumoTotal.toFixed(1)} kWh</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">${formatearMoneda(costoTotal)}</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Promedio Global</span>
                    <div class="kpi-icon green" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-chart-line"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${promedioGlobal.toFixed(2)} kWh</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Por registro</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Total Registros</span>
                    <div class="kpi-icon orange" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-database"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '28px' : '32px'}; font-weight: 700; line-height: 1;">${registrosTotal}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">En el sistema</div>
            </div>
            
            <div class="kpi-card" style="padding: ${isMobile ? '12px' : '20px'};">
                <div class="kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isMobile ? '8px' : '12px'};">
                    <span class="kpi-title" style="font-size: ${isMobile ? '10px' : '13px'}; text-transform: uppercase; letter-spacing: 0.5px;">Ahorro Potencial</span>
                    <div class="kpi-icon green" style="width: ${isMobile ? '28px' : '40px'}; height: ${isMobile ? '28px' : '40px'}; font-size: ${isMobile ? '12px' : '18px'};">
                        <i class="fas fa-piggy-bank"></i>
                    </div>
                </div>
                <div class="kpi-value" style="font-size: ${isMobile ? '24px' : '32px'}; font-weight: 700; line-height: 1;">${formatearMoneda(costoTotal * 0.15)}</div>
                <div class="kpi-label" style="font-size: ${isMobile ? '11px' : '12px'}; margin-top: ${isMobile ? '4px' : '8px'}; opacity: 0.7;">Estimado 15%</div>
            </div>
        </div>
        
        <div class="grid-2" style="display: grid; grid-template-columns: ${isMobile ? '1fr' : 'repeat(2, 1fr)'}; gap: ${isMobile ? '14px' : '20px'};">
            <div class="card" style="padding: ${isMobile ? '14px' : '20px'};">
                <div class="card-header" style="margin-bottom: 16px;">
                    <h3 class="card-title" style="font-size: ${isMobile ? '14px' : '18px'};">
                        <i class="fas fa-trophy"></i>
                        Usuario Más Eficiente
                    </h3>
                </div>
                <div style="padding: ${isMobile ? '0' : '0'};">
                    ${usuarioMasEficiente.nombre ? `
                        <div class="alert-item" style="display: flex; flex-direction: row; align-items: flex-start; gap: ${isMobile ? '12px' : '16px'}; padding: ${isMobile ? '14px' : '16px'};">
                            <div class="alert-icon green" style="width: ${isMobile ? '38px' : '48px'}; height: ${isMobile ? '38px' : '48px'}; font-size: ${isMobile ? '17px' : '20px'}; flex-shrink: 0;">
                                <i class="fas fa-award"></i>
                            </div>
                            <div class="alert-content" style="flex: 1; text-align: left;">
                                <div class="alert-title" style="font-size: ${isMobile ? '13px' : '16px'}; margin-bottom: 6px;">${usuarioMasEficiente.nombre}</div>
                                <div class="alert-description" style="font-size: ${isMobile ? '11px' : '13px'}; line-height: 1.5;">
                                    <strong style="font-size: ${isMobile ? '12px' : '14px'};">${usuarioMasEficiente.consumo.toFixed(1)} kWh</strong> total<br>
                                    ${formatearMoneda(usuarioMasEficiente.costo)}<br>
                                    Promedio: ${usuarioMasEficiente.promedio.toFixed(2)} kWh/registro
                                </div>
                            </div>
                        </div>
                    ` : '<p style="color: var(--text-secondary);">No hay datos disponibles</p>'}
                </div>
            </div>
            
            <div class="card" style="padding: ${isMobile ? '14px' : '20px'};">
                <div class="card-header" style="margin-bottom: 16px;">
                    <h3 class="card-title" style="font-size: ${isMobile ? '14px' : '18px'};">
                        <i class="fas fa-exclamation-triangle"></i>
                        Mayor Consumo
                    </h3>
                </div>
                <div style="padding: ${isMobile ? '0' : '0'};">
                    ${usuarioMayorConsumo.nombre ? `
                        <div class="alert-item warning" style="display: flex; flex-direction: row; align-items: flex-start; gap: ${isMobile ? '12px' : '16px'}; padding: ${isMobile ? '14px' : '16px'};">
                            <div class="alert-icon orange" style="width: ${isMobile ? '38px' : '48px'}; height: ${isMobile ? '38px' : '48px'}; font-size: ${isMobile ? '17px' : '20px'}; flex-shrink: 0;">
                                <i class="fas fa-fire"></i>
                            </div>
                            <div class="alert-content" style="flex: 1; text-align: left;">
                                <div class="alert-title" style="font-size: ${isMobile ? '13px' : '16px'}; margin-bottom: 6px;">${usuarioMayorConsumo.nombre}</div>
                                <div class="alert-description" style="font-size: ${isMobile ? '11px' : '13px'}; line-height: 1.5;">
                                    <strong style="font-size: ${isMobile ? '12px' : '14px'};">${usuarioMayorConsumo.consumo.toFixed(1)} kWh</strong> total<br>
                                    ${formatearMoneda(usuarioMayorConsumo.costo)}<br>
                                    Promedio: ${usuarioMayorConsumo.promedio.toFixed(2)} kWh/registro
                                </div>
                            </div>
                        </div>
                    ` : '<p style="color: var(--text-secondary);">No hay datos disponibles</p>'}
                </div>
            </div>
        </div>
        
        <div class="card" style="padding: ${isMobile ? '14px' : '20px'};">
            <div class="card-header" style="margin-bottom: 16px;">
                <h3 class="card-title" style="font-size: ${isMobile ? '14px' : '18px'};">
                    <i class="fas fa-chart-bar"></i>
                    Distribución de Consumo por Usuario
                </h3>
            </div>
            <div class="chart-container" style="height: ${isMobile ? '240px' : '400px'}; padding: ${isMobile ? '12px' : '16px'};">
                <canvas id="chartDistribucionGlobal"></canvas>
            </div>
        </div>
        
        <div class="card" style="padding: ${isMobile ? '14px' : '20px'};">
            <div class="card-header" style="margin-bottom: 16px;">
                <h3 class="card-title" style="font-size: ${isMobile ? '14px' : '18px'};">
                    <i class="fas fa-table"></i>
                    Ranking de Usuarios
                </h3>
            </div>
            <div class="table-container" style="margin: 0 ${isMobile ? '-14px' : '0'}; padding: 0 ${isMobile ? '14px' : '0'}; overflow-x: auto;">
                <table style="min-width: ${isMobile ? '620px' : '100%'}; font-size: ${isMobile ? '11px' : '14px'};">
                    <thead>
                        <tr>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">#</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Usuario</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Consumo Total</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Costo Total</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Registros</th>
                            <th style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '10px' : '13px'};">Promedio</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${estadisticasPorUsuario
                            .sort((a, b) => b.consumo - a.consumo)
                            .map((u, i) => `
                            <tr>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};"><strong>${i + 1}</strong></td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${u.nombre}</td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${u.consumo.toFixed(1)} kWh</td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${formatearMoneda(u.costo)}</td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${u.registros}</td>
                                <td style="padding: ${isMobile ? '10px 6px' : '12px'}; font-size: ${isMobile ? '11px' : '14px'};">${u.promedio.toFixed(2)} kWh</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ============================================
// VISTA: REPORTES DE ADMINISTRADOR
// ============================================

function generarVistaReportesAdmin() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const config = obtenerConfiguracionPlataforma();
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-file-alt"></i> Reportes de Administrador</h1>
            <p>Genera reportes detallados de la plataforma</p>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-users"></i>
                        Reporte de Usuarios
                    </h3>
                </div>
                <div style="padding: 20px;">
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">
                        Genera un reporte completo con todos los usuarios registrados y sus estadísticas.
                    </p>
                    <button class="btn-primary" onclick="generarReporteUsuarios()">
                        <i class="fas fa-download"></i> Generar Reporte
                    </button>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-bolt"></i>
                        Reporte de Consumo
                    </h3>
                </div>
                <div style="padding: 20px;">
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">
                        Genera un reporte detallado del consumo energético de toda la plataforma.
                    </p>
                    <button class="btn-primary" onclick="generarReporteConsumo()">
                        <i class="fas fa-download"></i> Generar Reporte
                    </button>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-line"></i>
                    Resumen Ejecutivo
                </h3>
            </div>
            <div style="padding: 20px;">
                <div class="kpi-grid">
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-title">Total Usuarios</span>
                            <div class="kpi-icon blue">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                        <div class="kpi-value">${usuarios.length}</div>
                    </div>
                    
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-title">Tarifa Actual</span>
                            <div class="kpi-icon green">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                        <div class="kpi-value">${formatearMoneda(config.tarifaKwh)}</div>
                    </div>
                    
                    <div class="kpi-card">
                        <div class="kpi-header">
                            <span class="kpi-title">Alertas</span>
                            <div class="kpi-icon orange">
                                <i class="fas fa-bell"></i>
                            </div>
                        </div>
                        <div class="kpi-value">${config.alertasActivas ? 'Activas' : 'Inactivas'}</div>
                    </div>
                </div>
                
                <div style="margin-top: 20px;">
                    <button class="btn-primary" onclick="generarReporteCompleto()">
                        <i class="fas fa-file-pdf"></i> Generar Reporte Completo
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generarReporteUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    
    const reporte = {
        titulo: 'Reporte de Usuarios - ENERGIX SMART',
        fecha: new Date().toISOString(),
        totalUsuarios: usuarios.length,
        usuarios: usuarios.map(u => ({
            nombre: u.nombre,
            email: u.email,
            rol: u.rol,
            activo: u.activo !== false,
            fechaRegistro: u.fechaRegistro
        }))
    };
    
    descargarJSON(reporte, `reporte_usuarios_${new Date().toISOString().split('T')[0]}.json`);
    mostrarNotificacion('success', 'Reporte Generado', 'El reporte de usuarios ha sido descargado');
}

function generarReporteConsumo() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    
    const consumoPorUsuario = usuarios.map(u => {
        const registros = obtenerConsumoUsuario(u.email);
        return {
            usuario: u.nombre,
            email: u.email,
            consumoTotal: registros.reduce((sum, r) => sum + r.consumo, 0),
            costoTotal: registros.reduce((sum, r) => sum + r.costo, 0),
            registros: registros.length
        };
    });
    
    const reporte = {
        titulo: 'Reporte de Consumo - ENERGIX SMART',
        fecha: new Date().toISOString(),
        consumoPorUsuario: consumoPorUsuario,
        totales: {
            consumoTotal: consumoPorUsuario.reduce((sum, u) => sum + u.consumoTotal, 0),
            costoTotal: consumoPorUsuario.reduce((sum, u) => sum + u.costoTotal, 0)
        }
    };
    
    descargarJSON(reporte, `reporte_consumo_${new Date().toISOString().split('T')[0]}.json`);
    mostrarNotificacion('success', 'Reporte Generado', 'El reporte de consumo ha sido descargado');
}

function generarReporteCompleto() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const config = obtenerConfiguracionPlataforma();
    
    const reporte = {
        titulo: 'Reporte Completo - ENERGIX SMART',
        fecha: new Date().toISOString(),
        configuracion: config,
        usuarios: usuarios.map(u => {
            const registros = obtenerConsumoUsuario(u.email);
            const dispositivos = obtenerDispositivosUsuario(u.email);
            return {
                nombre: u.nombre,
                email: u.email,
                rol: u.rol,
                activo: u.activo !== false,
                fechaRegistro: u.fechaRegistro,
                estadisticas: {
                    consumoTotal: registros.reduce((sum, r) => sum + r.consumo, 0),
                    costoTotal: registros.reduce((sum, r) => sum + r.costo, 0),
                    registros: registros.length,
                    dispositivos: dispositivos.length
                }
            };
        })
    };
    
    descargarJSON(reporte, `reporte_completo_${new Date().toISOString().split('T')[0]}.json`);
    mostrarNotificacion('success', 'Reporte Completo Generado', 'El reporte completo ha sido descargado');
}

function descargarJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
