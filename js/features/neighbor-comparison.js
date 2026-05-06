// ============================================
// COMPARACIÓN CON VECINOS
// Comparar consumo con promedios anónimos
// ============================================

class NeighborComparison {
    constructor() {
        this.sesion = obtenerSesion();
    }

    // Obtener datos anónimos de todos los usuarios
    obtenerDatosAnonimos() {
        const usuarios = JSON.parse(localStorage.getItem('energix_usuarios') || '[]');
        const datos = [];

        usuarios.forEach(usuario => {
            if (usuario.email === this.sesion?.email) return; // Excluir usuario actual

            const registros = obtenerConsumoUsuario(usuario.email);
            if (registros.length === 0) return;

            const stats = calcularEstadisticas(registros);
            
            datos.push({
                id: this.generarIdAnonimo(usuario.email),
                consumoMensual: stats.consumoMes,
                consumoDiario: stats.consumoHoy,
                ahorro: stats.ahorro,
                totalRegistros: registros.length
            });
        });

        return datos;
    }

    // Generar ID anónimo
    generarIdAnonimo(email) {
        // Hash simple para anonimizar
        let hash = 0;
        for (let i = 0; i < email.length; i++) {
            hash = ((hash << 5) - hash) + email.charCodeAt(i);
            hash = hash & hash;
        }
        return `Usuario-${Math.abs(hash).toString(36).substring(0, 6).toUpperCase()}`;
    }

    // Calcular promedios
    calcularPromedios() {
        const datos = this.obtenerDatosAnonimos();
        
        if (datos.length === 0) {
            return {
                promedioMensual: 0,
                promedioDiario: 0,
                promedioAhorro: 0,
                totalUsuarios: 0
            };
        }

        const promedioMensual = datos.reduce((sum, d) => sum + d.consumoMensual, 0) / datos.length;
        const promedioDiario = datos.reduce((sum, d) => sum + d.consumoDiario, 0) / datos.length;
        const promedioAhorro = datos.reduce((sum, d) => sum + d.ahorro, 0) / datos.length;

        return {
            promedioMensual,
            promedioDiario,
            promedioAhorro,
            totalUsuarios: datos.length
        };
    }

    // Comparar con promedios
    compararConPromedios() {
        const registros = obtenerConsumoUsuario(this.sesion.email);
        const stats = calcularEstadisticas(registros);
        const promedios = this.calcularPromedios();

        const diferenciaMensual = stats.consumoMes - promedios.promedioMensual;
        const porcentajeMensual = (diferenciaMensual / promedios.promedioMensual) * 100;

        const diferenciaDiaria = stats.consumoHoy - promedios.promedioDiario;
        const porcentajeDiaria = (diferenciaDiaria / promedios.promedioDiario) * 100;

        return {
            tuConsumo: {
                mensual: stats.consumoMes,
                diario: stats.consumoHoy,
                ahorro: stats.ahorro
            },
            promedio: {
                mensual: promedios.promedioMensual,
                diario: promedios.promedioDiario,
                ahorro: promedios.promedioAhorro
            },
            diferencia: {
                mensual: diferenciaMensual,
                diaria: diferenciaDiaria,
                porcentajeMensual,
                porcentajeDiaria
            },
            posicion: this.calcularPosicion(stats.consumoMes),
            totalUsuarios: promedios.totalUsuarios
        };
    }

    // Calcular posición en ranking
    calcularPosicion(consumoMensual) {
        const datos = this.obtenerDatosAnonimos();
        const registros = obtenerConsumoUsuario(this.sesion.email);
        const stats = calcularEstadisticas(registros);

        datos.push({
            id: 'TU',
            consumoMensual: stats.consumoMes
        });

        // Ordenar de menor a mayor (mejor a peor)
        datos.sort((a, b) => a.consumoMensual - b.consumoMensual);

        const posicion = datos.findIndex(d => d.id === 'TU') + 1;
        const total = datos.length;

        return {
            posicion,
            total,
            percentil: ((total - posicion) / total) * 100
        };
    }

    // Obtener distribución de consumo
    obtenerDistribucion() {
        const datos = this.obtenerDatosAnonimos();
        const registros = obtenerConsumoUsuario(this.sesion.email);
        const stats = calcularEstadisticas(registros);

        // Rangos de consumo
        const rangos = [
            { min: 0, max: 100, label: '0-100 kWh', count: 0 },
            { min: 100, max: 200, label: '100-200 kWh', count: 0 },
            { min: 200, max: 300, label: '200-300 kWh', count: 0 },
            { min: 300, max: 400, label: '300-400 kWh', count: 0 },
            { min: 400, max: Infinity, label: '400+ kWh', count: 0 }
        ];

        datos.forEach(d => {
            const rango = rangos.find(r => d.consumoMensual >= r.min && d.consumoMensual < r.max);
            if (rango) rango.count++;
        });

        // Encontrar rango del usuario
        const tuRango = rangos.find(r => stats.consumoMes >= r.min && stats.consumoMes < r.max);

        return {
            rangos,
            tuRango: tuRango?.label || 'N/A',
            tuConsumo: stats.consumoMes
        };
    }

    // Obtener insights
    obtenerInsights() {
        const comparacion = this.compararConPromedios();
        const insights = [];

        // Insight de consumo
        if (comparacion.diferencia.porcentajeMensual < -10) {
            insights.push({
                tipo: 'success',
                icono: 'fa-trophy',
                titulo: '¡Excelente!',
                mensaje: `Tu consumo está ${Math.abs(comparacion.diferencia.porcentajeMensual).toFixed(1)}% por debajo del promedio`
            });
        } else if (comparacion.diferencia.porcentajeMensual > 10) {
            insights.push({
                tipo: 'warning',
                icono: 'fa-exclamation-triangle',
                titulo: 'Oportunidad de Mejora',
                mensaje: `Tu consumo está ${comparacion.diferencia.porcentajeMensual.toFixed(1)}% por encima del promedio`
            });
        } else {
            insights.push({
                tipo: 'info',
                icono: 'fa-info-circle',
                titulo: 'En el Promedio',
                mensaje: 'Tu consumo está cerca del promedio de la comunidad'
            });
        }

        // Insight de posición
        if (comparacion.posicion.percentil >= 75) {
            insights.push({
                tipo: 'success',
                icono: 'fa-star',
                titulo: 'Top 25%',
                mensaje: `Estás entre el 25% de usuarios más eficientes`
            });
        } else if (comparacion.posicion.percentil <= 25) {
            insights.push({
                tipo: 'danger',
                icono: 'fa-chart-line',
                titulo: 'Área de Mejora',
                mensaje: 'Hay mucho potencial de ahorro comparado con otros usuarios'
            });
        }

        // Insight de ahorro
        if (comparacion.tuConsumo.ahorro > comparacion.promedio.ahorro) {
            insights.push({
                tipo: 'success',
                icono: 'fa-piggy-bank',
                titulo: 'Ahorro Superior',
                mensaje: `Tu ahorro (${comparacion.tuConsumo.ahorro.toFixed(1)}%) supera el promedio (${comparacion.promedio.ahorro.toFixed(1)}%)`
            });
        }

        return insights;
    }

    // Obtener recomendaciones basadas en comparación
    obtenerRecomendacionesComparativas() {
        const comparacion = this.compararConPromedios();
        const recomendaciones = [];

        if (comparacion.diferencia.porcentajeMensual > 20) {
            recomendaciones.push({
                titulo: 'Reducción Urgente',
                descripcion: 'Tu consumo es significativamente mayor. Revisa tus dispositivos de alto consumo.',
                ahorroPotencial: comparacion.diferencia.mensual * 0.3,
                prioridad: 'alta'
            });
        }

        if (comparacion.diferencia.porcentajeMensual > 10) {
            recomendaciones.push({
                titulo: 'Optimización Recomendada',
                descripcion: 'Implementa las recomendaciones de ahorro para acercarte al promedio.',
                ahorroPotencial: comparacion.diferencia.mensual * 0.5,
                prioridad: 'media'
            });
        }

        if (comparacion.posicion.percentil < 50) {
            recomendaciones.push({
                titulo: 'Mejora Continua',
                descripcion: 'Pequeños cambios pueden llevarte al top 50% de usuarios eficientes.',
                ahorroPotencial: (comparacion.promedio.mensual - comparacion.tuConsumo.mensual) * 0.2,
                prioridad: 'baja'
            });
        }

        return recomendaciones;
    }
}

// Instancia global
let neighborComparison = null;

// Inicializar
function initNeighborComparison() {
    const sesion = obtenerSesion();
    if (sesion) {
        neighborComparison = new NeighborComparison();
    }
}

// Función para usar desde UI
function obtenerComparacionVecinos() {
    if (!neighborComparison) {
        initNeighborComparison();
    }
    return neighborComparison?.compararConPromedios();
}
