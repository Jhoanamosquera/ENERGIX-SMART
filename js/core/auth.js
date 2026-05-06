// ============================================
// AUTENTICACIÓN
// ============================================

const USUARIOS_DEMO = [
    {
        nombre: "Johana Martínez",
        email: "johana@gmail.com",
        password: "estudiantes",
        rol: "usuario",
        avatar: "JM",
        fechaRegistro: new Date().toISOString()
    },
    {
        nombre: "Brayan Alvarez",
        email: "brayan@gmail.com",
        password: "estudiantes",
        rol: "admin",
        avatar: "BA",
        fechaRegistro: new Date().toISOString()
    }
];

function manejarLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const recordar = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        mostrarNotificacion('error', 'Campos Requeridos', 'Por favor completa todos los campos');
        return;
    }
    
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    btnSubmit.classList.add('btn-loading');
    btnSubmit.disabled = true;
    
    setTimeout(() => {
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        btnSubmit.classList.remove('btn-loading');
        btnSubmit.disabled = false;
        
        if (usuario) {
            const sesion = {
                email: usuario.email,
                nombre: usuario.nombre,
                rol: usuario.rol,
                avatar: usuario.avatar,
                recordar: recordar,
                ultimoAcceso: new Date().toISOString()
            };
            localStorage.setItem('energix_sesion', JSON.stringify(sesion));
            
            usuario.ultimoAcceso = new Date().toISOString();
            localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
            
            generarDatosIniciales(email);
            
            mostrarNotificacion('success', '¡Bienvenido!', `Hola ${usuario.nombre}, has iniciado sesión correctamente`);
            
            setTimeout(() => {
                cargarPanel(usuario.rol);
            }, 1000);
        } else {
            mostrarNotificacion('error', 'Credenciales Incorrectas', 'El correo o la contraseña son incorrectos.');
        }
    }, 800);
}

function manejarRegistro(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('regName').value.trim();
    const telefono = document.getElementById('regTelefono').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const direccion = document.getElementById('regDireccion').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const terminos = document.getElementById('regTerminos').checked;
    
    if (!nombre || !telefono || !email || !direccion || !password || !confirmPassword) {
        mostrarNotificacion('warning', 'Campos Incompletos', 'Por favor completa todos los campos requeridos');
        return;
    }
    
    if (password !== confirmPassword) {
        mostrarNotificacion('error', 'Contraseñas No Coinciden', 'Las contraseñas ingresadas no son iguales');
        return;
    }
    
    if (password.length < 8) {
        mostrarNotificacion('error', 'Contraseña Débil', 'La contraseña debe tener al menos 8 caracteres');
        return;
    }
    
    if (!terminos) {
        mostrarNotificacion('warning', 'Términos y Condiciones', 'Debes aceptar los términos y condiciones');
        return;
    }
    
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    btnSubmit.classList.add('btn-loading');
    btnSubmit.disabled = true;
    
    setTimeout(() => {
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        
        if (usuarios.find(u => u.email.toLowerCase() === email)) {
            btnSubmit.classList.remove('btn-loading');
            btnSubmit.disabled = false;
            mostrarNotificacion('error', 'Correo Ya Registrado', 'Este correo ya está en uso.');
            return;
        }
        
        const nuevoUsuario = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            direccion: direccion,
            password: password,
            rol: 'usuario',
            avatar: nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
            fechaRegistro: new Date().toISOString(),
            ultimoAcceso: new Date().toISOString(),
            activo: true
        };
        
        usuarios.push(nuevoUsuario);
        localStorage.setItem('energix_usuarios', JSON.stringify(usuarios));
        
        btnSubmit.classList.remove('btn-loading');
        btnSubmit.disabled = false;
        
        cerrarModal('registerModal');
        document.getElementById('registerForm').reset();
        
        mostrarNotificacion('success', '¡Cuenta Creada!', `Bienvenido ${nombre}. Ya puedes iniciar sesión.`);
        
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').focus();
    }, 1000);
}

function cerrarSesion() {
    localStorage.removeItem('energix_sesion');
    mostrarPantalla('loginScreen');
    location.reload();
}

function obtenerSesion() {
    return JSON.parse(localStorage.getItem('energix_sesion') || 'null');
}
