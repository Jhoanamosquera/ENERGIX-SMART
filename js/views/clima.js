// Vista de Clima - Prototipo con Datos Simulados
function generarVistaClimaSimulada() {
    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-cloud-sun"></i> Clima y Eficiencia Energética</h1>
                <p>Analiza cómo el clima afecta tu consumo energético (Prototipo TRL 5-6)</p>
            </div>
        </div>

        <div class="service-status demo">
            <div class="status-indicator"><i class="fas fa-flask"></i></div>
            <div class="status-content">
                <span class="status-label">Modo Demostración</span>
                <span class="status-description">Datos simulados para validación del prototipo</span>
            </div>
        </div>

        <div class="weather-dashboard">
            <div class="current-weather-card">
                <div class="weather-main">
                    <div class="weather-icon-large">⛅</div>
                    <div class="weather-info">
                        <div class="temperature-display">
                            <span class="temperature">22</span>
                            <span class="unit">°C</span>
                        </div>
                        <div class="weather-description">Parcialmente nublado</div>
                        <div class="location"><i class="fas fa-map-marker-alt"></i> Bogotá</div>
                    </div>
                </div>
                <div class="weather-details">
                    <div class="detail-item">
                        <div class="detail-icon"><i class="fas fa-thermometer-half"></i></div>
                        <div class="detail-content">
                            <span class="detail-label">Sensación</span>
                            <span class="detail-value">23°C</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon"><i class="fas fa-tint"></i></div>
                        <div class="detail-content">
                            <span class="detail-label">Humedad</span>
                            <span class="detail-value">65%</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon"><i class="fas fa-wind"></i></div>
                        <div class="detail-content">
                            <span class="detail-label">Viento</span>
                            <span class="detail-value">12 km/h</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon"><i class="fas fa-eye"></i></div>
                        <div class="detail-content">
                            <span class="detail-label">Visibilidad</span>
                            <span class="detail-value">10 km</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="energy-impact-card">
                <h3><i class="fas fa-bolt"></i> Impacto Energético Actual</h3>
                <div class="impact-meter">
                    <div class="meter-display">
                        <div class="meter-value">Medio</div>
                        <div class="meter-label">Impacto en Consumo</div>
                    </div>
                    <div class="meter-bar">
                        <div class="meter-fill medio" style="width: 50%"></div>
                    </div>
                </div>
                <div class="impact-recommendations">
                    <h4><i class="fas fa-lightbulb"></i> Recomendaciones</h4>
                    <div class="recommendations-list">
                        <div class="recommendation-item">
                            <i class="fas fa-snowflake"></i>
                            <span>Ajusta el aire acondicionado a 24°C</span>
                        </div>
                        <div class="recommendation-item">
                            <i class="fas fa-window-maximize"></i>
                            <span>Aprovecha la ventilación natural</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="insights-section">
            <h3><i class="fas fa-brain"></i> Análisis Inteligente</h3>
            <div class="insights-grid">
                <div class="insight-card success">
                    <div class="insight-icon"><i class="fas fa-thermometer-half"></i></div>
                    <div class="insight-content">
                        <h4>Temperatura Ideal</h4>
                        <p>Con 22°C actual, tu consumo está en rango normal.</p>
                    </div>
                </div>
                <div class="insight-card info">
                    <div class="insight-icon"><i class="fas fa-tint"></i></div>
                    <div class="insight-content">
                        <h4>Humedad Normal</h4>
                        <p>Humedad del 65% está en rango confortable.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-chart-line"></i> Correlación Temperatura-Consumo</h3>
            </div>
            <div class="card-body">
                <div class="correlation-analysis">
                    <div class="correlation-summary">
                        <div class="summary-item">
                            <div class="summary-icon primary"><i class="fas fa-chart-line"></i></div>
                            <div class="summary-content">
                                <span class="summary-value">0.73</span>
                                <span class="summary-label">Coeficiente</span>
                            </div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-icon success"><i class="fas fa-thermometer-half"></i></div>
                            <div class="summary-content">
                                <span class="summary-value">22°C</span>
                                <span class="summary-label">Temp. Óptima</span>
                            </div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-icon warning"><i class="fas fa-bolt"></i></div>
                            <div class="summary-content">
                                <span class="summary-value">18%</span>
                                <span class="summary-label">Ahorro Potencial</span>
                            </div>
                        </div>
                    </div>
                    <div class="correlation-ranges">
                        <div class="range-item">
                            <div class="range-header">
                                <h4>Frío (&lt;18°C)</h4>
                                <span class="range-count">12 registros</span>
                            </div>
                            <div class="range-content">
                                <div class="consumption-display">
                                    <span class="consumption-value">15.80</span>
                                    <span class="consumption-unit">kWh</span>
                                </div>
                                <div class="consumption-bar">
                                    <div class="bar-fill" style="width: 85%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="range-item">
                            <div class="range-header">
                                <h4>Templado (18-25°C)</h4>
                                <span class="range-count">18 registros</span>
                            </div>
                            <div class="range-content">
                                <div class="consumption-display">
                                    <span class="consumption-value">12.30</span>
                                    <span class="consumption-unit">kWh</span>
                                </div>
                                <div class="consumption-bar">
                                    <div class="bar-fill" style="width: 60%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="range-item">
                            <div class="range-header">
                                <h4>Caluroso (&gt;25°C)</h4>
                                <span class="range-count">8 registros</span>
                            </div>
                            <div class="range-content">
                                <div class="consumption-display">
                                    <span class="consumption-value">18.70</span>
                                    <span class="consumption-unit">kWh</span>
                                </div>
                                <div class="consumption-bar">
                                    <div class="bar-fill" style="width: 100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-calendar-week"></i> Pronóstico 5 Días</h3>
            </div>
            <div class="card-body">
                <div class="forecast-container">
                    <div class="forecast-day today">
                        <div class="day-header">
                            <div class="day-label">Hoy</div>
                            <div class="day-date">5 May</div>
                        </div>
                        <div class="weather-preview">
                            <div class="weather-icon">☀️</div>
                            <div class="temperature-range">
                                <span class="temp-high">24°</span>
                                <span class="temp-low">18°</span>
                            </div>
                        </div>
                        <div class="energy-forecast">
                            <div class="consumption-prediction">
                                <span class="prediction-value">14.2</span>
                                <span class="prediction-unit">kWh</span>
                            </div>
                        </div>
                    </div>
                    <div class="forecast-day">
                        <div class="day-header">
                            <div class="day-label">Mañana</div>
                            <div class="day-date">6 May</div>
                        </div>
                        <div class="weather-preview">
                            <div class="weather-icon">⛅</div>
                            <div class="temperature-range">
                                <span class="temp-high">23°</span>
                                <span class="temp-low">17°</span>
                            </div>
                        </div>
                        <div class="energy-forecast">
                            <div class="consumption-prediction">
                                <span class="prediction-value">13.8</span>
                                <span class="prediction-unit">kWh</span>
                            </div>
                        </div>
                    </div>
                    <div class="forecast-day">
                        <div class="day-header">
                            <div class="day-label">Mié</div>
                            <div class="day-date">7 May</div>
                        </div>
                        <div class="weather-preview">
                            <div class="weather-icon">☁️</div>
                            <div class="temperature-range">
                                <span class="temp-high">21°</span>
                                <span class="temp-low">16°</span>
                            </div>
                        </div>
                        <div class="energy-forecast">
                            <div class="consumption-prediction">
                                <span class="prediction-value">12.5</span>
                                <span class="prediction-unit">kWh</span>
                            </div>
                        </div>
                    </div>
                    <div class="forecast-day">
                        <div class="day-header">
                            <div class="day-label">Jue</div>
                            <div class="day-date">8 May</div>
                        </div>
                        <div class="weather-preview">
                            <div class="weather-icon">🌦️</div>
                            <div class="temperature-range">
                                <span class="temp-high">20°</span>
                                <span class="temp-low">15°</span>
                            </div>
                        </div>
                        <div class="energy-forecast">
                            <div class="consumption-prediction">
                                <span class="prediction-value">13.1</span>
                                <span class="prediction-unit">kWh</span>
                            </div>
                        </div>
                    </div>
                    <div class="forecast-day">
                        <div class="day-header">
                            <div class="day-label">Vie</div>
                            <div class="day-date">9 May</div>
                        </div>
                        <div class="weather-preview">
                            <div class="weather-icon">☀️</div>
                            <div class="temperature-range">
                                <span class="temp-high">25°</span>
                                <span class="temp-low">19°</span>
                            </div>
                        </div>
                        <div class="energy-forecast">
                            <div class="consumption-prediction">
                                <span class="prediction-value">15.6</span>
                                <span class="prediction-unit">kWh</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="demo-notice">
            <div class="notice-icon"><i class="fas fa-flask"></i></div>
            <div class="notice-content">
                <h4>Prototipo TRL 5-6 - Datos Simulados</h4>
                <p>Demostración funcional con datos simulados para validación del concepto.</p>
            </div>
        </div>
    `;
}
