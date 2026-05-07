// ============================================
// MODO OSCURO/CLARO
// Toggle entre temas con persistencia
// ============================================

class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.applyTheme(this.currentTheme);
        
        // Actualizar el icono del botón al cargar
        this.updateIcon();
    }

    loadTheme() {
        // Intentar cargar tema del usuario si está logueado
        const sesionStr = localStorage.getItem('energix_sesion');
        if (sesionStr) {
            try {
                const sesion = JSON.parse(sesionStr);
                const userTheme = localStorage.getItem(`energix_theme_${sesion.email}`);
                if (userTheme) return userTheme;
            } catch (e) {
                // Ignorar error
            }
        }
        
        // Cargar tema global
        return localStorage.getItem('energix_theme') || 'dark';
    }

    saveTheme(theme) {
        // Guardar tema global
        localStorage.setItem('energix_theme', theme);
        
        // Si hay sesión, guardar también para el usuario
        const sesionStr = localStorage.getItem('energix_sesion');
        if (sesionStr) {
            try {
                const sesion = JSON.parse(sesionStr);
                localStorage.setItem(`energix_theme_${sesion.email}`, theme);
            } catch (e) {
                // Ignorar error
            }
        }
        
        this.currentTheme = theme;
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Actualizar icono
        this.updateIcon();
        
        // Agregar clase de transición
        document.body.classList.add('theme-changing');
        setTimeout(() => {
            document.body.classList.remove('theme-changing');
        }, 300);
    }

    updateIcon() {
        setTimeout(() => {
            const themeIcon = document.getElementById('themeToggleIcon');
            if (themeIcon) {
                themeIcon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }, 50);
    }

    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
        return newTheme;
    }

    getTheme() {
        return this.currentTheme;
    }

    isDark() {
        return this.currentTheme === 'dark';
    }
}

// Instancia global - se crea inmediatamente
const themeManager = new ThemeManager();

// Función para toggle desde UI
function toggleTheme() {
    const newTheme = themeManager.toggle();
    
    // NO mostrar notificación - cambio silencioso
    
    return newTheme;
}

// Actualizar icono cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager.updateIcon();
    });
} else {
    themeManager.updateIcon();
}
