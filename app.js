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
    
    // Inicializar datos demo para todos los usuarios
    inicializarTodosLosDatosDemo();
    
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
    document.getElementById('menuToggle')?.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que el click se propague
        document.getElementById('sidebar')?.classList.toggle('active');
    });
    
    // Cerrar sidebar al hacer click fuera (solo en móvil)
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menuToggle');
        
        if (sidebar && sidebar.classList.contains('active')) {
            // Si el click no es en el sidebar ni en el botón toggle
            if (!sidebar.contains(e.target) && !menuToggle?.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Cerrar sidebar al hacer click en cualquier elemento del menú (nav-item o link)
    document.addEventListener('click', function(e) {
        const navItem = e.target.closest('.nav-item');
        const navLink = e.target.closest('.sidebar-nav a');
        
        if (navItem || navLink) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && window.innerWidth <= 768) {
                // Pequeño delay para que la navegación se complete
                setTimeout(() => {
                    sidebar.classList.remove('active');
                }, 100);
            }
        }
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

    // Actualizar top bar
    const topAvatar = document.getElementById('topBarAvatar');
    const topName = document.getElementById('topBarName');
    if (topAvatar) topAvatar.textContent = sesion.avatar;
    if (topName) topName.textContent = sesion.nombre.split(' ')[0];
    
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

    // Inicializar notificaciones
    setTimeout(() => renderizarNotificaciones(), 100);

    // Inicializar funcionalidades nuevas
    initGamification();
    initGoals();
    initNeighborComparison();

    // Verificar logros
    if (gamificationManager) {
        const nuevosLogros = gamificationManager.checkAchievements();
        if (nuevosLogros.length > 0) {
            nuevosLogros.forEach(logro => {
                mostrarNotificacion('success', '🏆 ¡Logro Desbloqueado!', `${logro.nombre}: ${logro.descripcion}`);
            });
        }
    }

    // Actualizar progreso de metas
    if (goalsManager) {
        goalsManager.updateProgress();
    }

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
        { id: 'calculadora',      icon: 'fa-calculator',        texto: 'Calculadora' },
        { id: 'metas',            icon: 'fa-bullseye',          texto: 'Metas' },
        { id: 'gamificacion',     icon: 'fa-trophy',            texto: 'Logros' },
        { id: 'vecinos',          icon: 'fa-users',             texto: 'Comunidad' },
        { id: 'clima',            icon: 'fa-cloud-sun',         texto: 'Clima' },
        { id: 'perfil',           icon: 'fa-user',              texto: 'Mi Perfil' },
        { id: 'configuracion',    icon: 'fa-cog',               texto: 'Configuración' }
    ];

    const menuAdmin = [
        { id: 'dashboardAdmin',        icon: 'fa-chart-pie',         texto: 'Dashboard Admin' },
        { id: 'gestionUsuarios',       icon: 'fa-users-cog',         texto: 'Gestión de Usuarios' },
        { id: 'monitoreoSistema',      icon: 'fa-server',            texto: 'Monitoreo Sistema' },
        { id: 'gestionDispositivos',   icon: 'fa-plug',              texto: 'Dispositivos' },
        { id: 'estadisticasGlobales',  icon: 'fa-chart-pie',         texto: 'Estadísticas' },
        { id: 'configuracionPlataforma', icon: 'fa-cogs',            texto: 'Config. Plataforma' },
        { id: 'reportesAdmin',         icon: 'fa-file-alt',          texto: 'Reportes Admin' },
        { separator: true },
        { id: 'consumo',               icon: 'fa-chart-line',        texto: 'Mi Consumo' },
        { id: 'historial',             icon: 'fa-history',           texto: 'Historial' },
        { id: 'analisis',              icon: 'fa-chart-bar',         texto: 'Análisis' },
        { id: 'picos',                 icon: 'fa-exclamation-triangle', texto: 'Picos' },
        { id: 'alertas',               icon: 'fa-bell',              texto: 'Alertas' },
        { id: 'recomendaciones',       icon: 'fa-lightbulb',         texto: 'Recomendaciones' },
        { id: 'reportes',              icon: 'fa-file-pdf',          texto: 'Reportes' },
        { id: 'comparacion',           icon: 'fa-balance-scale',     texto: 'Comparación' },
        { id: 'calculadora',           icon: 'fa-calculator',        texto: 'Calculadora' },
        { id: 'metas',                 icon: 'fa-bullseye',          texto: 'Metas' },
        { id: 'gamificacion',          icon: 'fa-trophy',            texto: 'Logros' },
        { id: 'vecinos',               icon: 'fa-users',             texto: 'Comunidad' },
        { id: 'clima',                 icon: 'fa-cloud-sun',         texto: 'Clima' },
        { id: 'perfil',                icon: 'fa-user',              texto: 'Mi Perfil' },
        { id: 'configuracion',         icon: 'fa-cog',               texto: 'Configuración' }
    ];
    
    const menu = rol === 'admin' ? menuAdmin : menuUsuario;
    
    nav.innerHTML = menu.map(item => {
        if (item.separator) {
            return '<div class="nav-separator"></div>';
        }
        return `
            <a class="nav-item" data-vista="${item.id}">
                <i class="fas ${item.icon}"></i>
                <span>${item.texto}</span>
            </a>
        `;
    }).join('');
    
    // Event listeners para navegación
    nav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const vista = item.getAttribute('data-vista');
            console.log('Navegando a vista:', vista); // Debug
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
    console.log('Cargando vista:', vista); // Debug
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
            inicializarGraficosAnalisisInteligente();
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
        case 'monitoreoSistema':
            contenido.innerHTML = generarVistaMonitoreoSistema();
            inicializarGraficosMonitoreo();
            break;
        case 'gestionDispositivos':
            contenido.innerHTML = generarVistaGestionDispositivos();
            break;
        case 'estadisticasGlobales':
            contenido.innerHTML = generarVistaEstadisticasGlobales();
            inicializarGraficosEstadisticasGlobales();
            break;
        case 'configuracionPlataforma':
            contenido.innerHTML = generarVistaConfiguracionPlataforma();
            break;
        case 'reportesAdmin':
            contenido.innerHTML = generarVistaReportesAdmin();
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
        case 'calculadora':
            contenido.innerHTML = generarVistaCalculadora();
            break;
        case 'metas':
            contenido.innerHTML = generarVistaMetas();
            break;
        case 'gamificacion':
            contenido.innerHTML = generarVistaGamificacion();
            break;
        case 'vecinos':
            contenido.innerHTML = generarVistaVecinos();
            break;
        case 'clima':
            if (typeof generarVistaClimaSimulada === 'function') {
                const resultado = generarVistaClimaSimulada();
                console.log('Tipo de resultado clima:', typeof resultado);
                contenido.innerHTML = resultado;
            } else if (typeof generarVistaClima === 'function') {
                // Fallback a la función vieja
                const resultado = generarVistaClima();
                if (resultado instanceof Promise) {
                    contenido.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Cargando...</div>';
                    resultado.then(html => {
                        contenido.innerHTML = html;
                    }).catch(() => {
                        contenido.innerHTML = '<div class="error-message">Error al cargar clima</div>';
                    });
                } else {
                    contenido.innerHTML = resultado;
                }
            } else {
                contenido.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Vista de clima no disponible</div>';
            }
            break;
        default:
            contenido.innerHTML = '<h1>Vista no encontrada</h1>';
    }
}

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================

const NOTIFICACIONES_DEMO = [
    {
        id: 1,
        tipo: 'warning',
        icono: 'fa-exclamation-triangle',
        titulo: 'Pico de consumo detectado',
        descripcion: 'Tu consumo superó el 47% del promedio habitual.',
        fecha: new Date(Date.now() - 3600000),
        vista: 'picos',
        leida: false
    },
    {
        id: 2,
        tipo: 'info',
        icono: 'fa-lightbulb',
        titulo: 'Nueva recomendación disponible',
        descripcion: 'Optimiza el uso del aire acondicionado y ahorra $26,250/mes.',
        fecha: new Date(Date.now() - 7200000),
        vista: 'recomendaciones',
        leida: false
    },
    {
        id: 3,
        tipo: 'success',
        icono: 'fa-check-circle',
        titulo: 'Meta de ahorro alcanzada',
        descripcion: 'Redujiste tu consumo un 8% este mes. ¡Excelente!',
        fecha: new Date(Date.now() - 86400000),
        vista: 'dashboard',
        leida: false
    },
    {
        id: 4,
        tipo: 'danger',
        icono: 'fa-bolt',
        titulo: 'Consumo elevado esta semana',
        descripcion: 'Tu consumo semanal está 12% por encima del promedio.',
        fecha: new Date(Date.now() - 172800000),
        vista: 'analisis',
        leida: true
    }
];

function obtenerNotificaciones() {
    const sesion = obtenerSesion();
    const key = `energix_notif_${sesion?.email}`;
    const guardadas = localStorage.getItem(key);
    if (!guardadas) {
        localStorage.setItem(key, JSON.stringify(NOTIFICACIONES_DEMO));
        return NOTIFICACIONES_DEMO;
    }
    return JSON.parse(guardadas);
}

function guardarNotificaciones(notifs) {
    const sesion = obtenerSesion();
    const key = `energix_notif_${sesion?.email}`;
    localStorage.setItem(key, JSON.stringify(notifs));
}

function renderizarNotificaciones() {
    const notifs = obtenerNotificaciones();
    const noLeidas = notifs.filter(n => !n.leida).length;

    // Badge
    const badge = document.getElementById('notifBadge');
    if (badge) {
        badge.textContent = noLeidas;
        badge.style.display = noLeidas > 0 ? 'flex' : 'none';
    }

    // Lista
    const lista = document.getElementById('notifList');
    if (!lista) return;

    if (notifs.length === 0) {
        lista.innerHTML = `
            <div class="notif-empty">
                <i class="fas fa-bell-slash"></i>
                <p>Sin notificaciones</p>
            </div>`;
        return;
    }

    const colorMap = { warning: 'orange', info: 'blue', success: 'green', danger: 'red' };

    lista.innerHTML = notifs.map(n => `
        <div class="notif-item ${n.leida ? 'leida' : ''}" onclick="irANotificacion(${n.id})">
            <div class="notif-icon ${colorMap[n.tipo] || 'blue'}">
                <i class="fas ${n.icono}"></i>
            </div>
            <div class="notif-body">
                <div class="notif-titulo">${n.titulo}</div>
                <div class="notif-desc">${n.descripcion}</div>
                <div class="notif-tiempo">${formatearTiempoRelativo(new Date(n.fecha))}</div>
            </div>
            ${!n.leida ? '<div class="notif-dot"></div>' : ''}
        </div>
    `).join('');
}

function formatearTiempoRelativo(fecha) {
    const diff = Date.now() - new Date(fecha).getTime();
    const mins = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    if (mins < 60) return `Hace ${mins} min`;
    if (horas < 24) return `Hace ${horas}h`;
    return `Hace ${dias}d`;
}

function toggleNotifPanel() {
    const panel = document.getElementById('notifPanel');
    if (!panel) return;
    const abierto = panel.classList.contains('active');
    panel.classList.toggle('active', !abierto);
    if (!abierto) renderizarNotificaciones();
}

function irANotificacion(id) {
    const notifs = obtenerNotificaciones();
    const notif = notifs.find(n => n.id === id);
    if (!notif) return;

    // Marcar como leída
    notif.leida = true;
    guardarNotificaciones(notifs);

    // Cerrar panel
    document.getElementById('notifPanel')?.classList.remove('active');

    // Navegar a la vista
    cargarVista(notif.vista);

    // Actualizar menú activo
    document.querySelectorAll('.nav-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-vista') === notif.vista);
    });

    renderizarNotificaciones();
}

function verTodasNotificaciones() {
    document.getElementById('notifPanel')?.classList.remove('active');
    cargarVista('alertas');
    document.querySelectorAll('.nav-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-vista') === 'alertas');
    });
}

function marcarTodasNotifLeidas() {
    const notifs = obtenerNotificaciones();
    notifs.forEach(n => n.leida = true);
    guardarNotificaciones(notifs);
    renderizarNotificaciones();
}

function irAVista(vista) {
    cargarVista(vista);
    document.querySelectorAll('.nav-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-vista') === vista);
    });
}

// Cerrar panel al hacer clic fuera
document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('notifWrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        document.getElementById('notifPanel')?.classList.remove('active');
    }
});
