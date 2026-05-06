// ============================================
// SISTEMA DE GAMIFICACIÓN
// Logros, badges y rankings por ahorro energético
// ============================================

// Definición de logros
const ACHIEVEMENTS = [
    {
        id: 'first_record',
        nombre: 'Primer Paso',
        descripcion: 'Registra tu primer consumo',
        icono: 'fa-flag-checkered',
        color: '#4CAF50',
        puntos: 10,
        condicion: (stats) => stats.totalRegistros >= 1
    },
    {
        id: 'week_streak',
        nombre: 'Semana Completa',
        descripcion: 'Registra consumo durante 7 días consecutivos',
        icono: 'fa-calendar-week',
        color: '#2196F3',
        puntos: 50,
        condicion: (stats) => stats.diasConsecutivos >= 7
    },
    {
        id: 'month_streak',
        nombre: 'Mes Completo',
        descripcion: 'Registra consumo durante 30 días consecutivos',
        icono: 'fa-calendar-alt',
        color: '#9C27B0',
        puntos: 150,
        condicion: (stats) => stats.diasConsecutivos >= 30
    },
    {
        id: 'saver_bronze',
        nombre: 'Ahorrador Bronce',
        descripcion: 'Reduce tu consumo un 5% respecto al mes anterior',
        icono: 'fa-medal',
        color: '#CD7F32',
        puntos: 30,
        condicion: (stats) => stats.ahorroMensual >= 5
    },
    {
        id: 'saver_silver',
        nombre: 'Ahorrador Plata',
        descripcion: 'Reduce tu consumo un 10% respecto al mes anterior',
        icono: 'fa-medal',
        color: '#C0C0C0',
        puntos: 75,
        condicion: (stats) => stats.ahorroMensual >= 10
    },
    {
        id: 'saver_gold',
        nombre: 'Ahorrador Oro',
        descripcion: 'Reduce tu consumo un 15% respecto al mes anterior',
        icono: 'fa-medal',
        color: '#FFD700',
        puntos: 150,
        condicion: (stats) => stats.ahorroMensual >= 15
    },
    {
        id: 'eco_warrior',
        nombre: 'Guerrero Ecológico',
        descripcion: 'Mantén tu consumo bajo durante 3 meses',
        icono: 'fa-leaf',
        color: '#4CAF50',
        puntos: 200,
        condicion: (stats) => stats.mesesBajoConsumo >= 3
    },
    {
        id: 'night_owl',
        nombre: 'Búho Nocturno',
        descripcion: 'Reduce el consumo nocturno (12am-6am) en 20%',
        icono: 'fa-moon',
        color: '#3F51B5',
        puntos: 100,
        condicion: (stats) => stats.reduccionNocturna >= 20
    },
    {
        id: 'peak_avoider',
        nombre: 'Evita Picos',
        descripcion: 'Pasa un mes sin picos de consumo',
        icono: 'fa-chart-line',
        color: '#FF9800',
        puntos: 120,
        condicion: (stats) => stats.diasSinPicos >= 30
    },
    {
        id: 'hundred_records',
        nombre: 'Centenario',
        descripcion: 'Registra 100 consumos',
        icono: 'fa-trophy',
        color: '#E91E63',
        puntos: 250,
        condicion: (stats) => stats.totalRegistros >= 100
    },
    {
        id: 'recommendation_master',
        nombre: 'Maestro de Ahorro',
        descripcion: 'Implementa 10 recomendaciones',
        icono: 'fa-lightbulb',
        color: '#FFC107',
        puntos: 180,
        condicion: (stats) => stats.recomendacionesImplementadas >= 10
    },
    {
        id: 'energy_master',
        nombre: 'Maestro Energético',
        descripcion: 'Alcanza 1000 puntos',
        icono: 'fa-crown',
        color: '#FFD700',
        puntos: 500,
        condicion: (stats) => stats.puntosTotal >= 1000
    }
];

// Niveles de usuario
const LEVELS = [
    { nivel: 1, nombre: 'Novato', minPuntos: 0, color: '#9E9E9E', icono: 'fa-seedling' },
    { nivel: 2, nombre: 'Aprendiz', minPuntos: 100, color: '#8BC34A', icono: 'fa-leaf' },
    { nivel: 3, nombre: 'Intermedio', minPuntos: 300, color: '#4CAF50', icono: 'fa-tree' },
    { nivel: 4, nombre: 'Avanzado', minPuntos: 600, color: '#2196F3', icono: 'fa-star' },
    { nivel: 5, nombre: 'Experto', minPuntos: 1000, color: '#9C27B0', icono: 'fa-gem' },
    { nivel: 6, nombre: 'Maestro', minPuntos: 1500, color: '#FF9800', icono: 'fa-fire' },
    { nivel: 7, nombre: 'Leyenda', minPuntos: 2500, color: '#FFD700', icono: 'fa-crown' }
];

class GamificationManager {
    constructor() {
        this.sesion = obtenerSesion();
        if (!this.sesion) return;
        this.key = `energix_gamification_${this.sesion.email}`;
        this.data = this.loadData();
    }

    loadData() {
        const saved = localStorage.getItem(this.key);
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            puntos: 0,
            logrosDesbloqueados: [],
            nivel: 1,
            recomendacionesImplementadas: 0,
            ultimaActualizacion: new Date().toISOString()
        };
    }

    saveData() {
        this.data.ultimaActualizacion = new Date().toISOString();
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }

    // Calcular estadísticas del usuario
    calculateStats() {
        const registros = obtenerConsumoUsuario(this.sesion.email);
        const stats = calcularEstadisticas(registros);

        // Días consecutivos
        const diasConsecutivos = this.calcularDiasConsecutivos(registros);

        // Consumo nocturno
        const reduccionNocturna = this.calcularReduccionNocturna(registros);

        // Días sin picos
        const diasSinPicos = this.calcularDiasSinPicos(registros);

        // Meses de bajo consumo
        const mesesBajoConsumo = this.calcularMesesBajoConsumo(registros);

        return {
            totalRegistros: registros.length,
            diasConsecutivos,
            ahorroMensual: Math.abs(stats.ahorro),
            reduccionNocturna,
            diasSinPicos,
            mesesBajoConsumo,
            recomendacionesImplementadas: this.data.recomendacionesImplementadas,
            puntosTotal: this.data.puntos
        };
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

    calcularReduccionNocturna(registros) {
        const hoy = new Date();
        const hace30Dias = new Date(hoy.getTime() - 30 * 24 * 60 * 60 * 1000);
        const hace60Dias = new Date(hoy.getTime() - 60 * 24 * 60 * 60 * 1000);

        const nocturnos30 = registros.filter(r => {
            const fecha = new Date(r.fecha);
            const hora = fecha.getHours();
            return fecha >= hace30Dias && (hora >= 0 && hora < 6);
        });

        const nocturnos60 = registros.filter(r => {
            const fecha = new Date(r.fecha);
            const hora = fecha.getHours();
            return fecha >= hace60Dias && fecha < hace30Dias && (hora >= 0 && hora < 6);
        });

        if (nocturnos60.length === 0) return 0;

        const promedio30 = nocturnos30.reduce((sum, r) => sum + r.consumo, 0) / nocturnos30.length;
        const promedio60 = nocturnos60.reduce((sum, r) => sum + r.consumo, 0) / nocturnos60.length;

        return ((promedio60 - promedio30) / promedio60 * 100);
    }

    calcularDiasSinPicos(registros) {
        const hoy = new Date();
        let dias = 0;

        for (let i = 0; i < 30; i++) {
            const fecha = new Date(hoy.getTime() - i * 24 * 60 * 60 * 1000);
            fecha.setHours(0, 0, 0, 0);
            const finDia = new Date(fecha.getTime() + 24 * 60 * 60 * 1000);

            const registrosDia = registros.filter(r => {
                const f = new Date(r.fecha);
                return f >= fecha && f < finDia;
            });

            if (registrosDia.length === 0) break;

            const promedio = registrosDia.reduce((sum, r) => sum + r.consumo, 0) / registrosDia.length;
            const tienePico = registrosDia.some(r => r.consumo > promedio * 1.5);

            if (!tienePico) {
                dias++;
            } else {
                break;
            }
        }

        return dias;
    }

    calcularMesesBajoConsumo(registros) {
        let meses = 0;
        const hoy = new Date();

        for (let i = 0; i < 12; i++) {
            const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
            const finMes = new Date(hoy.getFullYear(), hoy.getMonth() - i + 1, 0);

            const registrosMes = registros.filter(r => {
                const f = new Date(r.fecha);
                return f >= inicioMes && f <= finMes;
            });

            if (registrosMes.length === 0) break;

            const promedio = registrosMes.reduce((sum, r) => sum + r.consumo, 0) / registrosMes.length;

            // Considerar "bajo" si está por debajo de 2.5 kWh/día
            if (promedio < 2.5) {
                meses++;
            } else {
                break;
            }
        }

        return meses;
    }

    // Verificar y desbloquear logros
    checkAchievements() {
        const stats = this.calculateStats();
        const nuevosLogros = [];

        ACHIEVEMENTS.forEach(achievement => {
            if (!this.data.logrosDesbloqueados.includes(achievement.id)) {
                if (achievement.condicion(stats)) {
                    this.data.logrosDesbloqueados.push(achievement.id);
                    this.data.puntos += achievement.puntos;
                    nuevosLogros.push(achievement);
                }
            }
        });

        // Actualizar nivel
        this.updateLevel();

        if (nuevosLogros.length > 0) {
            this.saveData();
        }

        return nuevosLogros;
    }

    // Actualizar nivel
    updateLevel() {
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (this.data.puntos >= LEVELS[i].minPuntos) {
                this.data.nivel = LEVELS[i].nivel;
                break;
            }
        }
    }

    // Obtener nivel actual
    getCurrentLevel() {
        return LEVELS.find(l => l.nivel === this.data.nivel) || LEVELS[0];
    }

    // Obtener siguiente nivel
    getNextLevel() {
        const current = this.getCurrentLevel();
        return LEVELS.find(l => l.nivel === current.nivel + 1);
    }

    // Progreso al siguiente nivel
    getLevelProgress() {
        const current = this.getCurrentLevel();
        const next = this.getNextLevel();

        if (!next) return 100;

        const progress = ((this.data.puntos - current.minPuntos) / (next.minPuntos - current.minPuntos)) * 100;
        return Math.min(100, Math.max(0, progress));
    }

    // Obtener logros desbloqueados
    getUnlockedAchievements() {
        return ACHIEVEMENTS.filter(a => this.data.logrosDesbloqueados.includes(a.id));
    }

    // Obtener logros bloqueados
    getLockedAchievements() {
        return ACHIEVEMENTS.filter(a => !this.data.logrosDesbloqueados.includes(a.id));
    }

    // Marcar recomendación como implementada
    markRecommendationImplemented() {
        this.data.recomendacionesImplementadas++;
        this.saveData();
        return this.checkAchievements();
    }

    // Obtener datos para ranking
    getRankingData() {
        return {
            email: this.sesion.email,
            nombre: this.sesion.nombre,
            puntos: this.data.puntos,
            nivel: this.data.nivel,
            logros: this.data.logrosDesbloqueados.length
        };
    }

    // Obtener estadísticas generales
    getStats() {
        const stats = this.calculateStats();
        return {
            totalRegistros: stats.totalRegistros,
            diasConsecutivos: stats.diasConsecutivos,
            ahorroMensual: stats.ahorroMensual,
            puntosTotal: this.data.puntos,
            nivel: this.data.nivel,
            logrosDesbloqueados: this.data.logrosDesbloqueados.length,
            recomendacionesImplementadas: this.data.recomendacionesImplementadas
        };
    }
}

// Obtener ranking global
function getGlobalRanking() {
    const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
    const ranking = [];

    usuarios.forEach(usuario => {
        const key = `energix_gamification_${usuario.email}`;
        const data = JSON.parse(localStorage.getItem(key) || '{"puntos":0,"nivel":1,"logrosDesbloqueados":[]}');
        
        ranking.push({
            email: usuario.email,
            nombre: usuario.nombre,
            avatar: usuario.avatar,
            puntos: data.puntos,
            nivel: data.nivel,
            logros: data.logrosDesbloqueados.length
        });
    });

    return ranking.sort((a, b) => b.puntos - a.puntos);
}

// Instancia global
let gamificationManager = null;

// Inicializar al cargar sesión
function initGamification() {
    const sesion = obtenerSesion();
    if (sesion) {
        gamificationManager = new GamificationManager();
    }
}
