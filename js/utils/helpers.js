// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Generar ID único
function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Obtener fecha actual formateada
function obtenerFechaActual() {
    return new Date().toISOString();
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar contraseña (mínimo 6 caracteres)
function validarPassword(password) {
    return password && password.length >= 6;
}

// Scroll suave a sección
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle menú móvil
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Ir a login desde landing
function irALogin() {
    document.getElementById('landingPage').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');
}
