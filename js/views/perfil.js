// ============================================
// VISTA: PERFIL DE USUARIO
// ============================================

function generarVistaPerfil() {
    const sesion = obtenerSesion();
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === sesion.email);
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-user"></i> Mi Perfil</h1>
            <p>Administra tu información personal y configuración</p>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-user-edit"></i>
                        Información Personal
                    </h3>
                </div>
                <form id="formPerfil" class="form-professional">
                    <div class="form-group">
                        <label for="perfilNombre">
                            <i class="fas fa-user"></i> Nombre Completo
                        </label>
                        <input type="text" id="perfilNombre" class="form-control" value="${usuario.nombre}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="perfilEmail">
                            <i class="fas fa-envelope"></i> Correo Electrónico
                        </label>
                        <input type="email" id="perfilEmail" class="form-control" value="${usuario.email}" disabled>
                        <small class="form-text">El correo no se puede modificar</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="perfilTelefono">
                            <i class="fas fa-phone"></i> Teléfono
                        </label>
                        <input type="tel" id="perfilTelefono" class="form-control" value="${usuario.telefono || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="perfilDireccion">
                            <i class="fas fa-map-marker-alt"></i> Dirección
                        </label>
                        <input type="text" id="perfilDireccion" class="form-control" value="${usuario.direccion || ''}" required>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save"></i> Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-lock"></i>
                        Cambiar Contraseña
                    </h3>
                </div>
                <form id="formPassword" class="form-professional">
                    <div class="form-group">
                        <label for="passwordActual">
                            <i class="fas fa-lock"></i> Contraseña Actual
                        </label>
                        <input type="password" id="passwordActual" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="passwordNueva">
                            <i class="fas fa-key"></i> Nueva Contraseña
                        </label>
                        <input type="password" id="passwordNueva" class="form-control" minlength="8" required>
                        <small class="form-text">Mínimo 8 caracteres</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="passwordConfirmar">
                            <i class="fas fa-check"></i> Confirmar Contraseña
                        </label>
                        <input type="password" id="passwordConfirmar" class="form-control" minlength="8" required>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-key"></i> Cambiar Contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-info-circle"></i>
                    Información de la Cuenta
                </h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div>
                    <strong style="color: var(--text-secondary); font-size: 13px;">Rol:</strong>
                    <p style="margin-top: 4px;">${usuario.rol === 'admin' ? 'Administrador' : 'Usuario Residencial'}</p>
                </div>
                <div>
                    <strong style="color: var(--text-secondary); font-size: 13px;">Fecha de Registro:</strong>
                    <p style="margin-top: 4px;">${new Date(usuario.fechaRegistro).toLocaleDateString('es-CO')}</p>
                </div>
                <div>
                    <strong style="color: var(--text-secondary); font-size: 13px;">Último Acceso:</strong>
                    <p style="margin-top: 4px;">${new Date(usuario.ultimoAcceso).toLocaleString('es-CO')}</p>
                </div>
            </div>
        </div>
    `;
}

function configurarFormulariosPerfil() {
    // Formulario de perfil
    document.getElementById('formPerfil')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('perfilNombre').value.trim();
        const telefono = document.getElementById('perfilTelefono').value.trim();
        const direccion = document.getElementById('perfilDireccion').value.trim();
        
        const sesion = obtenerSesion();
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === sesion.email);
        
        if (usuario) {
            usuario.nombre = nombre;
            usuario.telefono = telefono;
            usuario.direccion = direccion;
            
            localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
            
            sesion.nombre = nombre;
            localStorage.setItem('energix_sesion', JSON.stringify(sesion));
            
            mostrarNotificacion('success', 'Perfil Actualizado', 'Tu información ha sido actualizada correctamente');
            
            // Actualizar nombre en sidebar
            document.getElementById('userName').textContent = nombre;
        }
    });
    
    // Formulario de contraseña
    document.getElementById('formPassword')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const actual = document.getElementById('passwordActual').value;
        const nueva = document.getElementById('passwordNueva').value;
        const confirmar = document.getElementById('passwordConfirmar').value;
        
        if (nueva !== confirmar) {
            mostrarNotificacion('error', 'Error', 'Las contraseñas no coinciden');
            return;
        }
        
        const sesion = obtenerSesion();
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === sesion.email);
        
        if (usuario && usuario.password === actual) {
            usuario.password = nueva;
            localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
            
            mostrarNotificacion('success', 'Contraseña Cambiada', 'Tu contraseña ha sido actualizada correctamente');
            
            document.getElementById('formPassword').reset();
        } else {
            mostrarNotificacion('error', 'Error', 'La contraseña actual es incorrecta');
        }
    });
}
