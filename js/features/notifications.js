// ============================================
// NOTIFICACIONES DEL NAVEGADOR
// Sistema de notificaciones push usando Notification API
// ============================================

class NotificationManager {
    constructor() {
        this.permission = 'default';
        this.enabled = this.loadPreference();
    }

    // Cargar preferencia del usuario
    loadPreference() {
        const sesion = obtenerSesion();
        if (!sesion) return false;
        const pref = localStorage.getItem(`energix_notif_enabled_${sesion.email}`);
        return pref === 'true';
    }

    // Guardar preferencia
    savePreference(enabled) {
        const sesion = obtenerSesion();
        if (!sesion) return;
        localStorage.setItem(`energix_notif_enabled_${sesion.email}`, enabled);
        this.enabled = enabled;
    }

    // Solicitar permiso
    async requestPermission() {
        if (!('Notification' in window)) {
            return { success: false, message: 'Tu navegador no soporta notificaciones' };
        }

        if (Notification.permission === 'granted') {
            this.permission = 'granted';
            this.savePreference(true);
            return { success: true, message: 'Notificaciones activadas' };
        }

        if (Notification.permission === 'denied') {
            return { success: false, message: 'Notificaciones bloqueadas. Actívalas en la configuración del navegador' };
        }

        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            
            if (permission === 'granted') {
                this.savePreference(true);
                this.showWelcomeNotification();
                return { success: true, message: 'Notificaciones activadas correctamente' };
            } else {
                return { success: false, message: 'Permiso denegado' };
            }
        } catch (error) {
            return { success: false, message: 'Error al solicitar permiso' };
        }
    }

    // Mostrar notificación de bienvenida
    showWelcomeNotification() {
        this.show({
            title: '⚡ ENERGIX SMART',
            body: 'Notificaciones activadas. Te avisaremos sobre picos de consumo y recomendaciones.',
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2300C853" width="100" height="100"/><text x="50" y="70" font-size="60" text-anchor="middle" fill="white">⚡</text></svg>',
            tag: 'welcome'
        });
    }

    // Mostrar notificación
    show(options) {
        if (!this.enabled || Notification.permission !== 'granted') {
            return null;
        }

        const notification = new Notification(options.title, {
            body: options.body,
            icon: options.icon || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2300C853" width="100" height="100"/><text x="50" y="70" font-size="60" text-anchor="middle" fill="white">⚡</text></svg>',
            badge: options.badge,
            tag: options.tag || 'energix',
            requireInteraction: options.requireInteraction || false,
            silent: options.silent || false
        });

        if (options.onClick) {
            notification.onclick = options.onClick;
        }

        // Auto-cerrar después de 5 segundos
        setTimeout(() => notification.close(), 5000);

        return notification;
    }

    // Notificación de pico de consumo
    notifyPeakConsumption(consumo, promedio) {
        const porcentaje = ((consumo - promedio) / promedio * 100).toFixed(1);
        this.show({
            title: '⚠️ Pico de Consumo Detectado',
            body: `Tu consumo actual (${consumo} kWh) supera el promedio en ${porcentaje}%`,
            tag: 'peak',
            requireInteraction: true,
            onClick: () => {
                window.focus();
                cargarVista('picos');
            }
        });
    }

    // Notificación de nueva recomendación
    notifyNewRecommendation(titulo, ahorro) {
        this.show({
            title: '💡 Nueva Recomendación',
            body: `${titulo} - Ahorra hasta ${formatearMoneda(ahorro)}/mes`,
            tag: 'recommendation',
            onClick: () => {
                window.focus();
                cargarVista('recomendaciones');
            }
        });
    }

    // Notificación de meta alcanzada
    notifyGoalAchieved(meta, porcentaje) {
        this.show({
            title: '🎉 ¡Meta Alcanzada!',
            body: `Redujiste tu consumo un ${porcentaje}% este mes. ¡Excelente trabajo!`,
            tag: 'goal',
            onClick: () => {
                window.focus();
                cargarVista('dashboard');
            }
        });
    }

    // Notificación de consumo elevado
    notifyHighConsumption(periodo, porcentaje) {
        this.show({
            title: '📊 Consumo Elevado',
            body: `Tu consumo ${periodo} está ${porcentaje}% por encima del promedio`,
            tag: 'high-consumption',
            onClick: () => {
                window.focus();
                cargarVista('analisis');
            }
        });
    }

    // Desactivar notificaciones
    disable() {
        this.savePreference(false);
    }

    // Verificar si están habilitadas
    isEnabled() {
        return this.enabled && Notification.permission === 'granted';
    }

    // Obtener estado
    getStatus() {
        return {
            supported: 'Notification' in window,
            permission: Notification.permission,
            enabled: this.enabled
        };
    }
}

// Instancia global
const notificationManager = new NotificationManager();

// Función para activar/desactivar desde configuración
function toggleBrowserNotifications(enabled) {
    if (enabled) {
        return notificationManager.requestPermission();
    } else {
        notificationManager.disable();
        return { success: true, message: 'Notificaciones desactivadas' };
    }
}

// Verificar consumo y enviar notificaciones automáticas
function checkAndNotify() {
    if (!notificationManager.isEnabled()) return;

    const sesion = obtenerSesion();
    if (!sesion) return;

    const registros = obtenerConsumoUsuario(sesion.email);
    if (registros.length === 0) return;

    // Calcular promedio
    const promedio = registros.reduce((sum, r) => sum + r.consumo, 0) / registros.length;
    
    // Último registro
    const ultimo = registros[registros.length - 1];
    
    // Si el último consumo es 50% mayor que el promedio
    if (ultimo.consumo > promedio * 1.5) {
        notificationManager.notifyPeakConsumption(ultimo.consumo, promedio);
    }
}

// Verificar cada 5 minutos
setInterval(checkAndNotify, 300000);
