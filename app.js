// ============================================
// ENERGIX SMART - MAIN APPLICATION
// Arquitectura Modular JavaScript
// ============================================

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    inicializarApp();
});

function inicializarApp() {
    // Inicializar usuarios demo
    if (!localStorage.getItem('energix_usuarios')) {
        localStorage.setItem('energix_usuarios', JSON.stringify(USUARIOS_DEMO));
    }
    
    // Verificar sesión activa
    const sesion = obtenerSesion();
    if (sesion && sesion.email) {
        cargarPanel(sesion.rol);
    } else {
        mostrarPantalla('landingPage');
        setTimeout(() => {
            animarContadores();
        }, 400);
    }
    
    configurarEventListeners();
}

function configurarEventListeners() {
    // Login
    document.getElementById('loginForm')?.addEventListener('submit', manejarLogin);
    document.getElementById('registerLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarModal('registerModal');
    });
    document.getElementById('forgotPasswordLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarModal('forgotPasswordModal');
    });
    
    // Registro
    document.getElementById('registerForm')?.addEventListener('submit', manejarRegistro);
    document.getElementById('closeRegisterModal')?.addEventListener('click', () => {
        cerrarModal('registerModal');
    });
    
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', cerrarSesion);
    
    // Menu toggle mobile
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.toggle('active');
    });
}

function cargarPanel(rol) {
    mostrarPantalla('userPanel');
    
    const sesion = obtenerSesion();
    
    // Actualizar perfil en sidebar
    document.getElementById('userAvatar').textContent = sesion.avatar;
    document.getElementById('userAvatar').className = 'user-avatar' + (rol === 'admin' ? ' admin' : '');
    document.getElementById('userName').textContent = sesion.nombre;
    document.getElementById('userEmail').textContent = sesion.email;
    
    const badge = document.getElementById('userBadge');
    if (rol === 'admin') {
        badge.textContent = 'ADMINISTRADOR';
        badge.className = 'user-badge admin-badge';
    } else {
        badge.textContent = 'Usuario Residencial';
        badge.className = 'user-badge';
    }
    
    // Generar menú según rol
    generarMenu(rol);
    
    // Cargar vista inicial
    if (rol === 'admin') {
        cargarVista('dashboardAdmin');
    } else {
        cargarVista('dashboard');
    }
}

function generarMenu(rol) {
    const nav = document.getElementById('sidebarNav');
    
    const menuUsuario = [
        { id: 'dashboard',        icon: 'fa-home',              texto: 'Dashboard' },
        { id: 'consumo',          icon: 'fa-chart-line',        texto: 'Mi Consumo' },
        { id: 'historial',        icon: 'fa-history',           texto: 'Historial' },
        { id: 'analisis',         icon: 'fa-chart-bar',         texto: 'Análisis' },
        { id: 'picos',            icon: 'fa-exclamation-triangle', texto: 'Picos' },
        { id: 'alertas',          icon: 'fa-bell',              texto: 'Alertas' },
        { id: 'recomendaciones',  icon: 'fa-lightbulb',         texto: 'Recomendaciones' },
        { id: 'reportes',         icon: 'fa-file-pdf',          texto: 'Reportes' },
        { id: 'comparacion',      icon: 'fa-balance-scale',     texto: 'Comparación' },
        { id: 'perfil',           icon: 'fa-user',              texto: 'Mi Perfil' },
        { id: 'configuracion',    icon: 'fa-cog',               texto: 'Configuración' }
    ];

    const menuAdmin = [
        { id: 'dashboardAdmin',   icon: 'fa-chart-pie',         texto: 'Dashboard Admin' },
        { id: 'gestionUsuarios',  icon: 'fa-users-cog',         texto: 'Gestión de Usuarios' },
        { id: 'consumo',          icon: 'fa-chart-line',        texto: 'Mi Consumo' },
        { id: 'historial',        icon: 'fa-history',           texto: 'Historial' },
        { id: 'analisis',         icon: 'fa-chart-bar',         texto: 'Análisis' },
        { id: 'picos',            icon: 'fa-exclamation-triangle', texto: 'Picos' },
        { id: 'alertas',          icon: 'fa-bell',              texto: 'Alertas' },
        { id: 'recomendaciones',  icon: 'fa-lightbulb',         texto: 'Recomendaciones' },
        { id: 'reportes',         icon: 'fa-file-pdf',          texto: 'Reportes' },
        { id: 'comparacion',      icon: 'fa-balance-scale',     texto: 'Comparación' },
        { id: 'perfil',           icon: 'fa-user',              texto: 'Mi Perfil' },
        { id: 'configuracion',    icon: 'fa-cog',               texto: 'Configuración' }
    ];
    
    const menu = rol === 'admin' ? menuAdmin : menuUsuario;
    
    nav.innerHTML = menu.map(item => `
        <a class="nav-item" data-vista="${item.id}">
            <i class="fas ${item.icon}"></i>
            <span>${item.texto}</span>
        </a>
    `).join('');
    
    // Event listeners para navegación
    nav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const vista = item.getAttribute('data-vista');
            cargarVista(vista);
            
            // Actualizar activo
            nav.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Cerrar sidebar en móvil
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar')?.classList.remove('active');
            }
        });
    });
    
    // Activar primer item
    nav.querySelector('.nav-item')?.classList.add('active');
}

function cargarVista(vista) {
    const contenido = document.getElementById('mainContent');
    
    // Las funciones generarVista* están en vistas.js
    // Las funciones inicializarGraficos* están en graficos.js
    
    switch(vista) {
        case 'dashboard':
            contenido.innerHTML = generarDashboard();
            inicializarGraficosDashboard();
            break;
        case 'consumo':
            contenido.innerHTML = generarVistaConsumo();
            configurarFormularioConsumo();
            break;
        case 'historial':
            contenido.innerHTML = generarVistaHistorial();
            inicializarGraficoHistorial();
            break;
        case 'analisis':
            contenido.innerHTML = generarVistaAnalisis();
            inicializarGraficosAnalisis();
            break;
        case 'alertas':
            contenido.innerHTML = generarVistaAlertas();
            break;
        case 'recomendaciones':
            contenido.innerHTML = generarVistaRecomendaciones();
            break;
        case 'reportes':
            contenido.innerHTML = generarVistaReportes();
            configurarReportes();
            break;
        case 'perfil':
            contenido.innerHTML = generarVistaPerfil();
            configurarFormulariosPerfil();
            break;
        case 'dashboardAdmin':
            contenido.innerHTML = generarDashboardAdmin();
            inicializarGraficosDashboardAdmin();
            break;
        case 'gestionUsuarios':
            contenido.innerHTML = generarVistaGestionUsuarios();
            break;
        case 'picos':
            contenido.innerHTML = generarVistaPicos();
            inicializarGraficosPicos();
            break;
        case 'comparacion':
            contenido.innerHTML = generarVistaComparacion();
            inicializarGraficosComparacion();
            break;
        case 'configuracion':
            contenido.innerHTML = generarVistaConfiguracion();
            break;
        default:
            contenido.innerHTML = '<h1>Vista no encontrada</h1>';
    }
}
