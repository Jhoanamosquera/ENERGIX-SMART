// ============================================
// INTERFAZ DE USUARIO
// ============================================

function mostrarPantalla(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId)?.classList.add('active');
}

function mostrarModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
}

function cerrarModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
}

function mostrarNotificacion(tipo, titulo, mensaje) {
    const modal = document.getElementById('notificationModal');
    const content = document.getElementById('notificationContent');
    const titleEl = document.getElementById('notificationTitle');
    
    const iconos = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    content.className = `notification-content ${tipo}`;
    content.innerHTML = `
        <i class="fas ${iconos[tipo]}"></i>
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
    `;
    
    titleEl.innerHTML = `<i class="fas ${iconos[tipo]}"></i> ${titulo}`;
    
    mostrarModal('notificationModal');
}

function irALogin() {
    mostrarPantalla('loginScreen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('loginForm')?.reset();
    setTimeout(() => {
        document.getElementById('loginEmail')?.focus();
    }, 300);
}

function volverALanding() {
    mostrarPantalla('landingPage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        if (document.getElementById('heroChart')) {
            inicializarGraficoHero();
        }
    }, 500);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Scroll to top button
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Animated counters for hero section
function animarContadores() {
    const counters = document.querySelectorAll('.counter-value[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.querySelector('span')?.outerHTML || '';
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                counter.innerHTML = Math.floor(current) + suffix;
                requestAnimationFrame(update);
            } else {
                counter.innerHTML = target + suffix;
            }
        };
        requestAnimationFrame(update);
    });
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.btn-mobile-menu');
    if (nav && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
        }
    }
});

// Close mobile nav when a link is clicked
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links')?.classList.remove('active');
        });
    });
});
