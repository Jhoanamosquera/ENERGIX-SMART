// ============================================
// VISTA: PERFIL DE USUARIO
// ============================================

function generarVistaPerfil() {
    const sesion = obtenerSesion();
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === sesion.email) || {};
    const registros = obtenerConsumoUsuario(sesion.email);
    const stats = calcularEstadisticas(registros);
    const totalConsumo = registros.reduce((s, r) => s + r.consumo, 0);
    const eficiencia = 65;

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-user-circle"></i> Perfil de Usuario</h1>
                <p>Gestiona tu información personal y configuración</p>
            </div>
        </div>

        <div class="grid-2">
            <!-- Tarjeta de perfil izquierda -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-user-circle"></i> Información del Perfil</h3>
                </div>
                <div style="text-align:center;padding:20px 0;">
                    <div class="user-avatar" style="width:80px;height:80px;font-size:32px;margin:0 auto 16px;${sesion.rol === 'admin' ? 'background:var(--admin-badge);' : ''}">${sesion.avatar}</div>
                    <h2 style="margin-bottom:4px;">${sesion.nombre}</h2>
                    <p style="color:var(--text-secondary);margin-bottom:8px;">${sesion.email}</p>
                    <span class="badge ${sesion.rol === 'admin' ? 'warning' : 'success'}">${sesion.rol === 'admin' ? 'Administrador' : 'Usuario residencial'}</span>
                    <p style="color:var(--text-secondary);margin-top:12px;font-size:13px;">
                        <i class="fas fa-calendar"></i> Desde ${new Date(usuario.fechaRegistro || Date.now()).toLocaleDateString('es-CO')}
                    </p>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:20px;">
                    <h4 style="font-size:13px;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">Historial resumido</h4>
                    <div style="display:grid;gap:10px;">
                        <div class="info-row"><span>Consumo actual</span><strong class="mono">${stats.consumoMes.toFixed(0)} kWh</strong></div>
                        <div class="info-row"><span>Promedio mensual</span><strong class="mono">${(totalConsumo / 6).toFixed(0)} kWh</strong></div>
                        <div class="info-row"><span>Plan</span><strong>Residencial Premium</strong></div>
                        <div class="info-row"><span>Medidor</span><strong class="mono">MED-00123</strong></div>
                        <div class="info-row"><span>Eficiencia</span><strong style="color:var(--accent-primary);">${eficiencia}/100</strong></div>
                    </div>
                </div>
            </div>

            <!-- Datos personales -->
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-edit"></i> Datos Personales</h3>
                </div>
                <form id="formPerfil" class="form-professional">
                    <div class="form-group">
                        <label for="perfilNombre"><i class="fas fa-user"></i> Nombre completo</label>
                        <input type="text" id="perfilNombre" class="form-control" value="${usuario.nombre || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="perfilTelefono"><i class="fas fa-phone"></i> Teléfono</label>
                        <input type="tel" id="perfilTelefono" class="form-control" value="${usuario.telefono || ''}" placeholder="+57 300 000 0000">
                    </div>
                    <div class="form-group">
                        <label for="perfilDireccion"><i class="fas fa-map-marker-alt"></i> Dirección</label>
                        <input type="text" id="perfilDireccion" class="form-control" value="${usuario.direccion || ''}" placeholder="Calle 123 #45-67">
                    </div>
                    <div class="form-group">
                        <label for="perfilEmail"><i class="fas fa-envelope"></i> Correo electrónico</label>
                        <input type="email" id="perfilEmail" class="form-control" value="${usuario.email || ''}" disabled>
                        <small class="form-text">El correo no puede modificarse</small>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-primary"><i class="fas fa-save"></i> Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Cambiar contraseña -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-lock"></i> Cambiar contraseña</h3>
            </div>
            <form id="formPassword" class="form-professional" style="max-width:600px;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="passwordActual"><i class="fas fa-lock"></i> Contraseña actual</label>
                        <div class="password-input-group">
                            <input type="password" id="passwordActual" class="form-control" required placeholder="Tu contraseña actual">
                            <button type="button" class="btn-toggle-password" onclick="togglePasswordVisibility('passwordActual')" aria-label="Ver"><i class="fas fa-eye"></i></button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="passwordNueva"><i class="fas fa-key"></i> Nueva contraseña</label>
                        <div class="password-input-group">
                            <input type="password" id="passwordNueva" class="form-control" minlength="8" required placeholder="Mínimo 8 caracteres">
                            <button type="button" class="btn-toggle-password" onclick="togglePasswordVisibility('passwordNueva')" aria-label="Ver"><i class="fas fa-eye"></i></button>
                        </div>
                    </div>
                </div>
                <div class="form-group" style="max-width:300px;">
                    <label for="passwordConfirmar"><i class="fas fa-check-circle"></i> Confirmar contraseña</label>
                    <div class="password-input-group">
                        <input type="password" id="passwordConfirmar" class="form-control" minlength="8" required placeholder="Repite la nueva contraseña">
                        <button type="button" class="btn-toggle-password" onclick="togglePasswordVisibility('passwordConfirmar')" aria-label="Ver"><i class="fas fa-eye"></i></button>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary"><i class="fas fa-key"></i> Actualizar contraseña</button>
                </div>
            </form>
        </div>
    `;
}

function togglePasswordVisibility(id) {
    const input = document.getElementById(id);
    if (!input) return;
    
    // Toggle input type
    input.type = input.type === 'password' ? 'text' : 'password';
    
    // Find the button (could be sibling or in parent)
    const parent = input.parentElement;
    const btn = parent?.querySelector('.btn-toggle-password, .btn-toggle-password-login');
    const icon = btn?.querySelector('i');
    
    if (icon) {
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }
}

function configurarFormulariosPerfil() {
    document.getElementById('formPerfil')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre    = document.getElementById('perfilNombre').value.trim();
        const telefono  = document.getElementById('perfilTelefono').value.trim();
        const direccion = document.getElementById('perfilDireccion').value.trim();
        if (!nombre) { mostrarNotificacion('warning', 'Campo requerido', 'El nombre no puede estar vacío'); return; }
        const sesion = obtenerSesion();
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === sesion.email);
        if (usuario) {
            usuario.nombre = nombre; usuario.telefono = telefono; usuario.direccion = direccion;
            localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
            sesion.nombre = nombre;
            localStorage.setItem('energix_sesion', JSON.stringify(sesion));
            document.getElementById('userName').textContent = nombre;
            const topName = document.getElementById('topBarName');
            if (topName) topName.textContent = nombre.split(' ')[0];
            mostrarNotificacion('success', 'Perfil Actualizado', 'Tu información ha sido guardada correctamente');
        }
    });

    document.getElementById('formPassword')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const actual    = document.getElementById('passwordActual').value;
        const nueva     = document.getElementById('passwordNueva').value;
        const confirmar = document.getElementById('passwordConfirmar').value;
        if (nueva !== confirmar) { mostrarNotificacion('error', 'Error', 'Las contraseñas no coinciden'); return; }
        if (nueva.length < 8)    { mostrarNotificacion('error', 'Error', 'Mínimo 8 caracteres'); return; }
        const sesion = obtenerSesion();
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === sesion.email);
        if (usuario && usuario.password === actual) {
            usuario.password = nueva;
            localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
            mostrarNotificacion('success', 'Contraseña Cambiada', 'Tu contraseña ha sido actualizada correctamente');
            document.getElementById('formPassword').reset();
        } else {
            mostrarNotificacion('error', 'Contraseña Incorrecta', 'La contraseña actual no es correcta');
        }
    });
}
