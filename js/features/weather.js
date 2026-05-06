// ============================================
// WIDGET DE CLIMA
// Correlacionar consumo con temperatura
// ============================================

class WeatherWidget {
    constructor() {
        this.apiKey = null; // Usuario debe configurar su propia API key
        this.ciudad = 'Bogota';
        this.loadConfig();
    }

    loadConfig() {
        const sesion = obtenerSesion();
        if (!sesion) return;
        
        const config = localStorage.getItem(`energix_weather_config_${sesion.email}`);
        if (config) {
            const data = JSON.parse(config);
            this.apiKey = data.apiKey;
            this.ciudad = data.ciudad || 'Bogota';
        }
    }

    saveConfig(apiKey, ciudad) {
        const sesion = obtenerSesion();
        if (!sesion) return;
        
        this.apiKey = apiKey;
        this.ciudad = ciudad;
        
        localStorage.setItem(`energix_weather_config_${sesion.email}`, JSON.stringify({
            apiKey,
            ciudad
        }));
    }

    // Obtener clima actual (simulado si no hay API key)
    async getCurrentWeather() {
        if (!this.apiKey) {
            return this.getSimulatedWeather();
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${this.ciudad}&appid=${this.apiKey}&units=metric&lang=es`
            );
            
            if (!response.ok) {
                throw new Error('Error al obtener clima');
            }

            const data = await response.json();
            
            return {
                temperatura: Math.round(data.main.temp),
                sensacion: Math.round(data.main.feels_like),
                humedad: data.main.humidity,
                descripcion: data.weather[0].description,
                icono: data.weather[0].icon,
                ciudad: data.name,
                real: true
            };
        } catch (error) {
            console.error('Error al obtener clima:', error);
            return this.getSimulatedWeather();
        }
    }

    // Clima simulado para demo
    getSimulatedWeather() {
        const temperaturas = [18, 20, 22, 24, 26, 28, 30];
        const descripciones = [
            { desc: 'Soleado', icono: '01d' },
            { desc: 'Parcialmente nublado', icono: '02d' },
            { desc: 'Nublado', icono: '03d' },
            { desc: 'Lluvia ligera', icono: '10d' }
        ];

        const temp = temperaturas[Math.floor(Math.random() * temperaturas.length)];
        const clima = descripciones[Math.floor(Math.random() * descripciones.length)];

        return {
            temperatura: temp,
            sensacion: temp + Math.floor(Math.random() * 3) - 1,
            humedad: 60 + Math.floor(Math.random() * 30),
            descripcion: clima.desc,
            icono: clima.icono,
            ciudad: this.ciudad,
            real: false
        };
    }

    // Correlacionar temperatura con consumo
    async correlateWithConsumption() {
        const sesion = obtenerSesion();
        if (!sesion) return null;

        const registros = obtenerConsumoUsuario(sesion.email);
        const clima = await this.getCurrentWeather();

        // Agrupar registros por temperatura (simulada basada en fecha)
        const correlacion = this.analyzeCorrelation(registros);

        return {
            clima,
            correlacion,
            insights: this.generateInsights(clima, correlacion)
        };
    }

    analyzeCorrelation(registros) {
        // Simular temperaturas históricas basadas en la fecha
        const registrosConTemp = registros.map(r => {
            const fecha = new Date(r.fecha);
            const mes = fecha.getMonth();
            
            // Temperatura base por mes (Colombia)
            const tempBase = [19, 19, 19, 20, 20, 19, 18, 19, 19, 19, 19, 19][mes];
            const tempSimulada = tempBase + Math.random() * 6 - 3;
            
            return {
                ...r,
                temperatura: Math.round(tempSimulada)
            };
        });

        // Agrupar por rangos de temperatura
        const rangos = [
            { min: 0, max: 18, label: 'Frío (<18°C)', consumo: [] },
            { min: 18, max: 22, label: 'Templado (18-22°C)', consumo: [] },
            { min: 22, max: 26, label: 'Cálido (22-26°C)', consumo: [] },
            { min: 26, max: 100, label: 'Caluroso (>26°C)', consumo: [] }
        ];

        registrosConTemp.forEach(r => {
            const rango = rangos.find(rg => r.temperatura >= rg.min && r.temperatura < rg.max);
            if (rango) {
                rango.consumo.push(r.consumo);
            }
        });

        // Calcular promedios
        const resultado = rangos.map(rango => ({
            label: rango.label,
            promedio: rango.consumo.length > 0 
                ? rango.consumo.reduce((sum, c) => sum + c, 0) / rango.consumo.length 
                : 0,
            registros: rango.consumo.length
        }));

        return resultado;
    }

    generateInsights(clima, correlacion) {
        const insights = [];

        // Insight de temperatura actual
        if (clima.temperatura > 26) {
            insights.push({
                tipo: 'warning',
                icono: 'fa-temperature-high',
                titulo: 'Temperatura Alta',
                mensaje: `Con ${clima.temperatura}°C, el consumo de AC puede aumentar. Considera usar ventiladores.`,
                recomendacion: 'Establece el AC a 24°C para ahorrar hasta 30% de energía'
            });
        } else if (clima.temperatura < 18) {
            insights.push({
                tipo: 'info',
                icono: 'fa-temperature-low',
                titulo: 'Temperatura Baja',
                mensaje: `Con ${clima.temperatura}°C, aprovecha para reducir el uso de ventilación.`,
                recomendacion: 'Usa luz natural y ventilación natural'
            });
        } else {
            insights.push({
                tipo: 'success',
                icono: 'fa-thermometer-half',
                titulo: 'Temperatura Ideal',
                mensaje: `${clima.temperatura}°C es ideal. Minimiza el uso de climatización.`,
                recomendacion: 'Aprovecha para ventilar naturalmente'
            });
        }

        // Insight de humedad
        if (clima.humedad > 70) {
            insights.push({
                tipo: 'info',
                icono: 'fa-tint',
                titulo: 'Humedad Alta',
                mensaje: `Humedad del ${clima.humedad}% puede hacer sentir más calor.`,
                recomendacion: 'Usa deshumidificador o ventiladores en lugar de AC'
            });
        }

        // Insight de correlación
        const rangoCaluroso = correlacion.find(c => c.label.includes('Caluroso'));
        const rangoTemplado = correlacion.find(c => c.label.includes('Templado'));
        
        if (rangoCaluroso && rangoTemplado && rangoCaluroso.promedio > rangoTemplado.promedio * 1.3) {
            const diferencia = ((rangoCaluroso.promedio - rangoTemplado.promedio) / rangoTemplado.promedio * 100).toFixed(1);
            insights.push({
                tipo: 'warning',
                icono: 'fa-chart-line',
                titulo: 'Impacto del Calor',
                mensaje: `Tu consumo aumenta ${diferencia}% en días calurosos.`,
                recomendacion: 'Planifica actividades de alto consumo en días templados'
            });
        }

        return insights;
    }

    // Obtener pronóstico (simulado)
    async getForecast() {
        if (!this.apiKey) {
            return this.getSimulatedForecast();
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${this.ciudad}&appid=${this.apiKey}&units=metric&lang=es`
            );
            
            if (!response.ok) {
                throw new Error('Error al obtener pronóstico');
            }

            const data = await response.json();
            
            // Tomar un pronóstico por día (cada 8 registros = 24 horas)
            const pronostico = [];
            for (let i = 0; i < data.list.length; i += 8) {
                const item = data.list[i];
                pronostico.push({
                    fecha: new Date(item.dt * 1000),
                    temperatura: Math.round(item.main.temp),
                    descripcion: item.weather[0].description,
                    icono: item.weather[0].icon
                });
            }

            return pronostico.slice(0, 5); // 5 días
        } catch (error) {
            console.error('Error al obtener pronóstico:', error);
            return this.getSimulatedForecast();
        }
    }

    getSimulatedForecast() {
        const pronostico = [];
        const hoy = new Date();

        for (let i = 0; i < 5; i++) {
            const fecha = new Date(hoy);
            fecha.setDate(fecha.getDate() + i);

            pronostico.push({
                fecha,
                temperatura: 20 + Math.floor(Math.random() * 10),
                descripcion: ['Soleado', 'Nublado', 'Lluvia'][Math.floor(Math.random() * 3)],
                icono: ['01d', '03d', '10d'][Math.floor(Math.random() * 3)]
            });
        }

        return pronostico;
    }

    // Obtener icono del clima
    getWeatherIcon(iconCode) {
        const iconMap = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };

        return iconMap[iconCode] || '🌤️';
    }
}

// Instancia global
const weatherWidget = new WeatherWidget();

// Funciones para usar desde UI
async function obtenerClima() {
    return await weatherWidget.getCurrentWeather();
}

async function obtenerCorrelacionClima() {
    return await weatherWidget.correlateWithConsumption();
}

async function obtenerPronostico() {
    return await weatherWidget.getForecast();
}

function configurarClima(apiKey, ciudad) {
    weatherWidget.saveConfig(apiKey, ciudad);
    mostrarNotificacion('success', 'Configuración Guardada', 'Widget de clima configurado correctamente');
}
