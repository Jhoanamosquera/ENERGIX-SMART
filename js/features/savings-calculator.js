// ============================================
// CALCULADORA DE AHORRO
// Herramienta interactiva para estimar ahorros
// ============================================

class SavingsCalculator {
    constructor() {
        this.tarifa = 700; // COP por kWh
        this.dispositivos = [
            { id: 'nevera', nombre: 'Nevera', consumoPromedio: 1.5, horas: 24 },
            { id: 'tv', nombre: 'Televisor', consumoPromedio: 0.15, horas: 6 },
            { id: 'lavadora', nombre: 'Lavadora', consumoPromedio: 0.8, horas: 1 },
            { id: 'aire', nombre: 'Aire Acondicionado', consumoPromedio: 1.5, horas: 8 },
            { id: 'computador', nombre: 'Computador', consumoPromedio: 0.3, horas: 8 },
            { id: 'bombillos', nombre: 'Bombillos (10 unidades)', consumoPromedio: 0.6, horas: 6 },
            { id: 'calentador', nombre: 'Calentador de Agua', consumoPromedio: 2.0, horas: 2 },
            { id: 'microondas', nombre: 'Microondas', consumoPromedio: 1.2, horas: 0.5 },
            { id: 'plancha', nombre: 'Plancha', consumoPromedio: 1.0, horas: 1 },
            { id: 'ventilador', nombre: 'Ventilador', consumoPromedio: 0.075, horas: 8 }
        ];
    }

    // Calcular consumo diario de un dispositivo
    calcularConsumoDiario(dispositivo, horasUso) {
        return dispositivo.consumoPromedio * horasUso;
    }

    // Calcular consumo mensual
    calcularConsumoMensual(consumoDiario) {
        return consumoDiario * 30;
    }

    // Calcular costo
    calcularCosto(consumoKwh) {
        return consumoKwh * this.tarifa;
    }

    // Calcular ahorro por reducción de horas
    calcularAhorroPorReduccion(dispositivo, horasActuales, horasNuevas) {
        const consumoActual = this.calcularConsumoDiario(dispositivo, horasActuales);
        const consumoNuevo = this.calcularConsumoDiario(dispositivo, horasNuevas);
        const ahorroDiario = consumoActual - consumoNuevo;
        const ahorroMensual = ahorroDiario * 30;
        const ahorroCosto = ahorroMensual * this.tarifa;

        return {
            ahorroDiario,
            ahorroMensual,
            ahorroCosto,
            porcentaje: (ahorroDiario / consumoActual) * 100
        };
    }

    // Calcular ahorro por reemplazo de dispositivo
    calcularAhorroPorReemplazo(dispositivoViejo, dispositivoNuevo, horas) {
        const consumoViejo = this.calcularConsumoDiario(dispositivoViejo, horas);
        const consumoNuevo = this.calcularConsumoDiario(dispositivoNuevo, horas);
        const ahorroDiario = consumoViejo - consumoNuevo;
        const ahorroMensual = ahorroDiario * 30;
        const ahorroCosto = ahorroMensual * this.tarifa;

        return {
            ahorroDiario,
            ahorroMensual,
            ahorroCosto,
            porcentaje: (ahorroDiario / consumoViejo) * 100
        };
    }

    // Calcular ahorro por cambio a LED
    calcularAhorroLED(numBombillos, horasDiarias, wattsIncandescente = 60, wattsLED = 9) {
        const consumoIncandescente = (wattsIncandescente / 1000) * horasDiarias * numBombillos;
        const consumoLED = (wattsLED / 1000) * horasDiarias * numBombillos;
        const ahorroDiario = consumoIncandescente - consumoLED;
        const ahorroMensual = ahorroDiario * 30;
        const ahorroAnual = ahorroMensual * 12;
        const ahorroCosto = ahorroMensual * this.tarifa;

        return {
            ahorroDiario,
            ahorroMensual,
            ahorroAnual,
            ahorroCosto,
            ahorroCostoAnual: ahorroAnual * this.tarifa,
            porcentaje: (ahorroDiario / consumoIncandescente) * 100
        };
    }

    // Calcular ahorro por optimización de temperatura AC
    calcularAhorroTemperaturaAC(horasDiarias, tempActual, tempOptima) {
        // Por cada grado de aumento, se ahorra aproximadamente 8% de energía
        const diferenciaTemp = tempOptima - tempActual;
        const porcentajeAhorro = diferenciaTemp * 8;
        
        const consumoActual = 1.5 * horasDiarias; // 1.5 kW promedio AC
        const ahorroDiario = consumoActual * (porcentajeAhorro / 100);
        const ahorroMensual = ahorroDiario * 30;
        const ahorroCosto = ahorroMensual * this.tarifa;

        return {
            ahorroDiario,
            ahorroMensual,
            ahorroCosto,
            porcentaje: porcentajeAhorro
        };
    }

    // Calcular ahorro por eliminar consumo fantasma
    calcularAhorroConsumoFantasma(numDispositivos, wattsPromedio = 5) {
        const consumoDiario = (wattsPromedio / 1000) * 24 * numDispositivos;
        const consumoMensual = consumoDiario * 30;
        const costo = consumoMensual * this.tarifa;

        return {
            consumoDiario,
            consumoMensual,
            costo,
            descripcion: `${numDispositivos} dispositivos en standby consumen ${consumoMensual.toFixed(2)} kWh/mes`
        };
    }

    // Calcular ahorro total de múltiples acciones
    calcularAhorroTotal(acciones) {
        let ahorroTotal = 0;
        let costoTotal = 0;

        acciones.forEach(accion => {
            ahorroTotal += accion.ahorroMensual || 0;
            costoTotal += accion.ahorroCosto || 0;
        });

        return {
            ahorroMensual: ahorroTotal,
            ahorroCosto: costoTotal,
            ahorroAnual: ahorroTotal * 12,
            ahorroCostoAnual: costoTotal * 12
        };
    }

    // Obtener recomendaciones personalizadas
    obtenerRecomendaciones(consumoActual) {
        const recomendaciones = [];

        // Recomendación LED
        const ahorroLED = this.calcularAhorroLED(10, 6);
        recomendaciones.push({
            titulo: 'Cambiar a Bombillos LED',
            descripcion: `Reemplaza 10 bombillos incandescentes por LED`,
            ahorro: ahorroLED,
            prioridad: 'alta',
            icono: 'fa-lightbulb'
        });

        // Recomendación AC
        if (consumoActual > 200) {
            const ahorroAC = this.calcularAhorroTemperaturaAC(8, 20, 24);
            recomendaciones.push({
                titulo: 'Optimizar Temperatura del AC',
                descripcion: 'Aumenta la temperatura de 20°C a 24°C',
                ahorro: ahorroAC,
                prioridad: 'alta',
                icono: 'fa-snowflake'
            });
        }

        // Recomendación consumo fantasma
        const ahorroFantasma = this.calcularAhorroConsumoFantasma(8);
        recomendaciones.push({
            titulo: 'Eliminar Consumo Fantasma',
            descripcion: 'Desconecta 8 dispositivos en standby',
            ahorro: {
                ahorroMensual: ahorroFantasma.consumoMensual,
                ahorroCosto: ahorroFantasma.costo,
                porcentaje: (ahorroFantasma.consumoMensual / consumoActual) * 100
            },
            prioridad: 'media',
            icono: 'fa-plug'
        });

        return recomendaciones;
    }

    // Generar escenarios de ahorro
    generarEscenarios(consumoActual) {
        return {
            conservador: {
                nombre: 'Conservador',
                descripcion: 'Cambios mínimos en hábitos',
                ahorroEstimado: consumoActual * 0.05,
                costoAhorrado: consumoActual * 0.05 * this.tarifa,
                acciones: [
                    'Apagar luces al salir',
                    'Desconectar cargadores',
                    'Usar luz natural'
                ]
            },
            moderado: {
                nombre: 'Moderado',
                descripcion: 'Cambios significativos',
                ahorroEstimado: consumoActual * 0.12,
                costoAhorrado: consumoActual * 0.12 * this.tarifa,
                acciones: [
                    'Cambiar a LED',
                    'Optimizar AC',
                    'Lavar con agua fría',
                    'Eliminar consumo fantasma'
                ]
            },
            agresivo: {
                nombre: 'Agresivo',
                descripcion: 'Máximo ahorro posible',
                ahorroEstimado: consumoActual * 0.20,
                costoAhorrado: consumoActual * 0.20 * this.tarifa,
                acciones: [
                    'Todas las anteriores',
                    'Electrodomésticos eficientes',
                    'Paneles solares (opcional)',
                    'Horarios optimizados',
                    'Monitoreo constante'
                ]
            }
        };
    }
}

// Instancia global
const savingsCalculator = new SavingsCalculator();

// Función para usar desde UI
function calcularAhorro(tipo, params) {
    switch (tipo) {
        case 'reduccion':
            return savingsCalculator.calcularAhorroPorReduccion(
                params.dispositivo,
                params.horasActuales,
                params.horasNuevas
            );
        case 'led':
            return savingsCalculator.calcularAhorroLED(
                params.numBombillos,
                params.horasDiarias
            );
        case 'temperatura':
            return savingsCalculator.calcularAhorroTemperaturaAC(
                params.horasDiarias,
                params.tempActual,
                params.tempOptima
            );
        case 'fantasma':
            return savingsCalculator.calcularAhorroConsumoFantasma(
                params.numDispositivos
            );
        default:
            return null;
    }
}
