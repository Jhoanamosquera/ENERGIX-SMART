// ============================================
// METAS PERSONALIZADAS
// Sistema de objetivos de ahorro con seguimiento
// ============================================

class GoalsManager {
    constructor() {
        this.sesion = obtenerSesion();
        if (!this.sesion) return;
        this.key = `energix_goals_${this.sesion.email}`;
        this.goals = this.loadGoals();
    }

    loadGoals() {
        const saved = localStorage.getItem(this.key);
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    }

    saveGoals() {
        localStorage.setItem(this.key, JSON.stringify(this.goals));
    }

    // Crear nueva meta
    createGoal(tipo, objetivo, plazo, descripcion = '') {
        const goal = {
            id: Date.now(),
            tipo, // 'reduccion', 'limite', 'ahorro'
            objetivo, // valor numérico
            plazo, // fecha límite
            descripcion,
            fechaCreacion: new Date().toISOString(),
            progreso: 0,
            completada: false,
            activa: true
        };

        this.goals.push(goal);
        this.saveGoals();
        return goal;
    }

    // Actualizar progreso de metas
    updateProgress() {
        const registros = obtenerConsumoUsuario(this.sesion.email);
        const stats = calcularEstadisticas(registros);

        this.goals.forEach(goal => {
            if (!goal.activa || goal.completada) return;

            switch (goal.tipo) {
                case 'reduccion':
                    // Meta: reducir X% el consumo
                    goal.progreso = Math.min(100, (Math.abs(stats.ahorro) / goal.objetivo) * 100);
                    break;

                case 'limite':
                    // Meta: no superar X kWh al mes
                    if (stats.consumoMes <= goal.objetivo) {
                        goal.progreso = 100;
                    } else {
                        goal.progreso = (goal.objetivo / stats.consumoMes) * 100;
                    }
                    break;

                case 'ahorro':
                    // Meta: ahorrar X COP al mes
                    const ahorroActual = (stats.consumoMesAnterior - stats.consumoMes) * 700;
                    goal.progreso = Math.min(100, (ahorroActual / goal.objetivo) * 100);
                    break;

                case 'dias_consecutivos':
                    // Meta: registrar X días consecutivos
                    const diasConsecutivos = this.calcularDiasConsecutivos(registros);
                    goal.progreso = Math.min(100, (diasConsecutivos / goal.objetivo) * 100);
                    break;

                case 'pico_maximo':
                    // Meta: no superar X kWh en un solo registro
                    const maxRegistro = Math.max(...registros.map(r => r.consumo));
                    if (maxRegistro <= goal.objetivo) {
                        goal.progreso = 100;
                    } else {
                        goal.progreso = (goal.objetivo / maxRegistro) * 100;
                    }
                    break;
            }

            // Verificar si se completó
            if (goal.progreso >= 100 && !goal.completada) {
                goal.completada = true;
                goal.fechaCompletada = new Date().toISOString();
                this.onGoalCompleted(goal);
            }

            // Verificar si expiró
            if (new Date(goal.plazo) < new Date() && !goal.completada) {
                goal.activa = false;
                goal.expirada = true;
            }
        });

        this.saveGoals();
    }

    calcularDiasConsecutivos(registros) {
        if (registros.length === 0) return 0;

        const fechas = [...new Set(registros.map(r => {
            const d = new Date(r.fecha);
            return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        }))].sort();

        let consecutivos = 1;
        let maxConsecutivos = 1;

        for (let i = 1; i < fechas.length; i++) {
            const anterior = new Date(fechas[i - 1]);
            const actual = new Date(fechas[i]);
            const diff = (actual - anterior) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
                consecutivos++;
                maxConsecutivos = Math.max(maxConsecutivos, consecutivos);
            } else {
                consecutivos = 1;
            }
        }

        return maxConsecutivos;
    }

    // Callback cuando se completa una meta
    onGoalCompleted(goal) {
        // Notificación del navegador
        if (notificationManager?.isEnabled()) {
            notificationManager.show({
                title: '🎉 ¡Meta Alcanzada!',
                body: `Has completado: ${goal.descripcion || this.getGoalDescription(goal)}`,
                tag: 'goal-completed',
                requireInteraction: true,
                onClick: () => {
                    window.focus();
                    cargarVista('metas');
                }
            });
        }

        // Agregar puntos de gamificación
        if (gamificationManager) {
            gamificationManager.data.puntos += 50;
            gamificationManager.saveData();
            gamificationManager.checkAchievements();
        }

        // Agregar a notificaciones internas
        const notifs = obtenerNotificaciones();
        notifs.unshift({
            id: Date.now(),
            tipo: 'success',
            icono: 'fa-trophy',
            titulo: '¡Meta Alcanzada!',
            descripcion: goal.descripcion || this.getGoalDescription(goal),
            fecha: new Date(),
            vista: 'metas',
            leida: false
        });
        guardarNotificaciones(notifs);
    }

    // Obtener descripción de meta
    getGoalDescription(goal) {
        switch (goal.tipo) {
            case 'reduccion':
                return `Reducir consumo ${goal.objetivo}%`;
            case 'limite':
                return `No superar ${goal.objetivo} kWh/mes`;
            case 'ahorro':
                return `Ahorrar ${formatearMoneda(goal.objetivo)}/mes`;
            case 'dias_consecutivos':
                return `Registrar ${goal.objetivo} días consecutivos`;
            case 'pico_maximo':
                return `No superar ${goal.objetivo} kWh por registro`;
            default:
                return goal.descripcion;
        }
    }

    // Obtener metas activas
    getActiveGoals() {
        return this.goals.filter(g => g.activa && !g.completada);
    }

    // Obtener metas completadas
    getCompletedGoals() {
        return this.goals.filter(g => g.completada);
    }

    // Obtener metas expiradas
    getExpiredGoals() {
        return this.goals.filter(g => g.expirada);
    }

    // Eliminar meta
    deleteGoal(id) {
        this.goals = this.goals.filter(g => g.id !== id);
        this.saveGoals();
    }

    // Editar meta
    editGoal(id, updates) {
        const goal = this.goals.find(g => g.id === id);
        if (goal) {
            Object.assign(goal, updates);
            this.saveGoals();
        }
    }

    // Obtener estadísticas de metas
    getStats() {
        return {
            total: this.goals.length,
            activas: this.getActiveGoals().length,
            completadas: this.getCompletedGoals().length,
            expiradas: this.getExpiredGoals().length,
            tasaExito: this.goals.length > 0 
                ? (this.getCompletedGoals().length / this.goals.length) * 100 
                : 0
        };
    }

    // Obtener metas sugeridas
    getSuggestedGoals() {
        const registros = obtenerConsumoUsuario(this.sesion.email);
        const stats = calcularEstadisticas(registros);

        const sugerencias = [];

        // Sugerir reducción si el consumo es alto
        if (stats.consumoMes > 250) {
            sugerencias.push({
                tipo: 'reduccion',
                objetivo: 10,
                plazo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                descripcion: 'Reducir consumo 10% este mes',
                razon: 'Tu consumo está por encima del promedio'
            });
        }

        // Sugerir límite
        sugerencias.push({
            tipo: 'limite',
            objetivo: Math.floor(stats.consumoMes * 0.9),
            plazo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            descripcion: `No superar ${Math.floor(stats.consumoMes * 0.9)} kWh este mes`,
            razon: 'Mantén tu consumo bajo control'
        });

        // Sugerir días consecutivos
        sugerencias.push({
            tipo: 'dias_consecutivos',
            objetivo: 30,
            plazo: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            descripcion: 'Registrar consumo 30 días consecutivos',
            razon: 'El monitoreo constante ayuda a identificar patrones'
        });

        // Sugerir ahorro económico
        const ahorroSugerido = stats.costoMes * 0.15;
        sugerencias.push({
            tipo: 'ahorro',
            objetivo: ahorroSugerido,
            plazo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            descripcion: `Ahorrar ${formatearMoneda(ahorroSugerido)} este mes`,
            razon: 'Un ahorro del 15% es alcanzable con pequeños cambios'
        });

        return sugerencias;
    }
}

// Instancia global
let goalsManager = null;

// Inicializar
function initGoals() {
    const sesion = obtenerSesion();
    if (sesion) {
        goalsManager = new GoalsManager();
        goalsManager.updateProgress();
    }
}

// Funciones para usar desde UI
function crearMeta(tipo, objetivo, plazo, descripcion) {
    if (!goalsManager) initGoals();
    return goalsManager?.createGoal(tipo, objetivo, plazo, descripcion);
}

function obtenerMetasActivas() {
    if (!goalsManager) initGoals();
    return goalsManager?.getActiveGoals() || [];
}

function actualizarProgresoMetas() {
    if (!goalsManager) initGoals();
    goalsManager?.updateProgress();
}
