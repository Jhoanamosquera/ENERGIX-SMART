// ============================================
// DATOS DE DEMOSTRACIÓN
// Inicializar datos simulados para todas las funcionalidades
// ============================================

function inicializarDatosDemo() {
    const sesion = obtenerSesion();
    if (!sesion) return;

    // Inicializar gamificación con algunos logros
    const gamifKey = `energix_gamification_${sesion.email}`;
    if (!localStorage.getItem(gamifKey)) {
        const datosGamif = {
            puntos: 350,
            logrosDesbloqueados: ['first_record', 'week_streak', 'saver_bronze'],
            nivel: 3,
            recomendacionesImplementadas: 5,
            ultimaActualizacion: new Date().toISOString()
        };
        localStorage.setItem(gamifKey, JSON.stringify(datosGamif));
    }

    // Inicializar metas
    const metasKey = `energix_goals_${sesion.email}`;
    if (!localStorage.getItem(metasKey)) {
        const hoy = new Date();
        const en30dias = new Date(hoy.getTime() + 30 * 24 * 60 * 60 * 1000);
        
        const metas = [
            {
                id: Date.now(),
                tipo: 'reduccion',
                objetivo: 10,
                plazo: en30dias.toISOString(),
                descripcion: 'Reducir consumo 10% este mes',
                fechaCreacion: new Date().toISOString(),
                progreso: 65,
                completada: false,
                activa: true
            },
            {
                id: Date.now() + 1,
                tipo: 'dias_consecutivos',
                objetivo: 30,
                plazo: new Date(hoy.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
                descripcion: 'Registrar 30 días consecutivos',
                fechaCreacion: new Date().toISOString(),
                progreso: 40,
                completada: false,
                activa: true
            },
            {
                id: Date.now() - 1000,
                tipo: 'limite',
                objetivo: 200,
                plazo: new Date(hoy.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                descripcion: 'No superar 200 kWh el mes pasado',
                fechaCreacion: new Date(hoy.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString(),
                progreso: 100,
                completada: true,
                activa: false,
                fechaCompletada: new Date(hoy.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        localStorage.setItem(metasKey, JSON.stringify(metas));
    }

    // Inicializar notificaciones del navegador como desactivadas
    const notifKey = `energix_notif_enabled_${sesion.email}`;
    if (!localStorage.getItem(notifKey)) {
        localStorage.setItem(notifKey, 'false');
    }

    // Inicializar configuración de clima
    const climaKey = `energix_weather_config_${sesion.email}`;
    if (!localStorage.getItem(climaKey)) {
        localStorage.setItem(climaKey, JSON.stringify({
            apiKey: null,
            ciudad: 'Bogota'
        }));
    }

    // Agregar datos de gamificación para otros usuarios (para ranking)
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    usuarios.forEach(usuario => {
        if (usuario.email === sesion.email) return;
        
        const userGamifKey = `energix_gamification_${usuario.email}`;
        if (!localStorage.getItem(userGamifKey)) {
            const puntos = Math.floor(Math.random() * 800) + 100;
            const nivel = puntos < 300 ? 2 : puntos < 600 ? 3 : puntos < 1000 ? 4 : 5;
            const logros = Math.floor(Math.random() * 6) + 1;
            
            localStorage.setItem(userGamifKey, JSON.stringify({
                puntos,
                logrosDesbloqueados: Array(logros).fill(0).map((_, i) => `logro_${i}`),
                nivel,
                recomendacionesImplementadas: Math.floor(Math.random() * 10),
                ultimaActualizacion: new Date().toISOString()
            }));
        }
    });
}

// Función para generar datos de consumo más realistas
function generarDatosConsumoRealistas(email) {
    const key = `energix_consumo_${email}`;
    
    if (localStorage.getItem(key)) {
        return; // Ya tiene datos
    }
    
    const registros = [];
    const hoy = new Date();
    
    // Generar 90 días de datos
    for (let i = 89; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - i);
        
        // 2-4 registros por día
        const numRegistros = Math.floor(Math.random() * 3) + 2;
        
        for (let j = 0; j < numRegistros; j++) {
            const hora = Math.floor(Math.random() * 24);
            const minuto = Math.floor(Math.random() * 60);
            
            fecha.setHours(hora, minuto, 0, 0);
            
            // Consumo más realista basado en la hora
            let consumoBase = 1.5;
            
            // Horas pico (6am-9am, 6pm-10pm): mayor consumo
            if ((hora >= 6 && hora <= 9) || (hora >= 18 && hora <= 22)) {
                consumoBase = 2.5;
            }
            // Horas nocturnas (11pm-5am): menor consumo
            else if (hora >= 23 || hora <= 5) {
                consumoBase = 0.8;
            }
            
            // Variación aleatoria
            const variacion = (Math.random() - 0.5) * 1.5;
            const consumo = Math.max(0.3, consumoBase + variacion);
            
            registros.push({
                id: Date.now() + Math.random(),
                fecha: new Date(fecha).toISOString(),
                consumo: parseFloat(consumo.toFixed(2)),
                costo: parseFloat((consumo * 700).toFixed(2))
            });
        }
    }
    
    localStorage.setItem(key, JSON.stringify(registros));
}

// Inicializar datos para todos los usuarios demo
function inicializarTodosLosDatosDemo() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    
    usuarios.forEach(usuario => {
        generarDatosConsumoRealistas(usuario.email);
    });
    
    // Inicializar datos del usuario actual si está logueado
    const sesion = obtenerSesion();
    if (sesion) {
        inicializarDatosDemo();
    }
}
