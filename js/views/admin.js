// ============================================
// VISTA: GESTIÓN DE USUARIOS (ADMIN)
// ============================================

function generarVistaGestionUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const sesion = obtenerSesion();
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-users-cog"></i> Gestión de Usuarios</h1>
            <p>Administra los usuarios del sistema ENERGIX SMART</p>
        </div>
        
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Total Usuarios</span>
                    <div class="kpi-icon blue">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="kpi-value">${usuarios.length}</div>
                <div class="kpi-label">Registrados en el sistema</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Usuarios Activos</span>
                    <div class="kpi-icon green">
                        <i class="fas fa-user-check"></i>
                    </div>
                </div>
                <div class="kpi-value">${usuarios.filter(u => u.activo !== false).length}</div>
                <div class="kpi-label">Con acceso al sistema</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Administradores</span>
                    <div class="kpi-icon orange">
                        <i class="fas fa-user-shield"></i>
                    </div>
                </div>
                <div class="kpi-value">${usuarios.filter(u => u.rol === 'admin').length}</div>
                <div class="kpi-label">Con privilegios admin</div>
            </div>
            
            <div class="kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Nuevos (30 días)</span>
                    <div class="kpi-icon red">
                        <i class="fas fa-user-plus"></i>
                    </div>
                </div>
                <div class="kpi-value">${usuarios.filter(u => {
                    const fecha = new Date(u.fechaRegistro);
                    const hace30Dias = new Date();
                    hace30Dias.setDate(hace30Dias.getDate() - 30);
                    return fecha >= hace30Dias;
                }).length}</div>
                <div class="kpi-label">Registros recientes</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-table"></i>
                    Lista de Usuarios
                </h3>
                <button class="btn-primary" onclick="mostrarModal('crearUsuarioModal')">
                    <i class="fas fa-user-plus"></i> Crear Usuario
                </button>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Registro</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuarios.map(u => `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <div class="user-avatar" style="width: 40px; height: 40px; font-size: 16px; ${u.rol === 'admin' ? 'background: var(--admin-badge);' : ''}">
                                            ${u.avatar}
                                        </div>
                                        <strong>${u.nombre}</strong>
                                    </div>
                                </td>
                                <td>${u.email}</td>
                                <td>
                                    <span class="badge ${u.rol === 'admin' ? 'warning' : 'success'}">
                                        ${u.rol === 'admin' ? 'Admin' : 'Usuario'}
                                    </span>
                                </td>
                                <td>${new Date(u.fechaRegistro).toLocaleDateString('es-CO')}</td>
                                <td>
                                    <span class="badge ${u.activo !== false ? 'success' : 'danger'}">
                                        ${u.activo !== false ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td>
                                    ${u.email !== sesion.email ? `
                                        <button class="btn-secondary" onclick="editarUsuario('${u.email}')" style="padding: 6px 12px; font-size: 12px; margin-right: 4px;">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-secondary" onclick="eliminarUsuario('${u.email}')" style="padding: 6px 12px; font-size: 12px;">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    ` : '<span style="color: var(--text-secondary); font-size: 12px;">Tu cuenta</span>'}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function editarUsuario(email) {
    mostrarNotificacion('info', 'Función en Desarrollo', 'La edición de usuarios estará disponible próximamente');
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
