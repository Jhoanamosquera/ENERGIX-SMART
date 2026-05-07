// ============================================
// VISTA DE CALCULADORA DE AHORRO
// ============================================

function generarVistaCalculadora() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    const stats = calcularEstadisticas(registros);
    const recomendaciones = savingsCalculator.obtenerRecomendaciones(stats.consumoMes);
    const escenarios = savingsCalculator.generarEscenarios(stats.consumoMes);

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-calculator"></i> Calculadora Inteligente de Ahorro</h1>
                <p>Descubre tu potencial de ahorro energético con análisis personalizados</p>
            </div>
            <div class="page-actions">
                <button class="btn-secondary" onclick="exportarCalculos()">
                    <i class="fas fa-download"></i> Exportar Cálculos
                </button>
                <button class="btn-secondary" onclick="compartirResultados()">
                    <i class="fas fa-share-alt"></i> Compartir
                </button>
            </div>
        </div>

        <!-- Resumen de Consumo Actual -->
        <div class="consumption-summary">
            <div class="summary-card primary">
                <div class="summary-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <div class="summary-content">
                    <div class="summary-value">${stats.consumoMes.toFixed(1)} kWh</div>
                    <div class="summary-label">Consumo Mensual Actual</div>
                </div>
            </div>
            <div class="summary-card success">
                <div class="summary-icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="summary-content">
                    <div class="summary-value">${formatearMoneda(stats.consumoMes * 700)}</div>
                    <div class="summary-label">Costo Mensual Estimado</div>
                </div>
            </div>
            <div class="summary-card warning">
                <div class="summary-icon">
                    <i class="fas fa-piggy-bank"></i>
                </div>
                <div class="summary-content">
                    <div class="summary-value">Hasta ${formatearMoneda(stats.consumoMes * 700 * 0.25)}</div>
                    <div class="summary-label">Ahorro Potencial</div>
                </div>
            </div>
        </div>

        <!-- Calculadoras Interactivas -->
        <div class="calculators-section">
            <h2><i class="fas fa-tools"></i> Calculadoras Especializadas</h2>
            
            <div class="calculators-grid">
                <!-- Calculadora LED Avanzada -->
                <div class="calculator-card">
                    <div class="calculator-header">
                        <div class="calculator-icon led">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div class="calculator-title">
                            <h3>Cambio a LED</h3>
                            <p>Calcula el ahorro al reemplazar bombillos tradicionales</p>
                        </div>
                    </div>
                    
                    <div class="calculator-body">
                        <div class="input-group">
                            <label>Tipo de bombillo actual</label>
                            <select id="calc_led_tipo" class="form-control">
                                <option value="incandescente">Incandescente (60W)</option>
                                <option value="fluorescente">Fluorescente (15W)</option>
                                <option value="halógeno">Halógeno (45W)</option>
                            </select>
                        </div>
                        
                        <div class="input-row">
                            <div class="input-group">
                                <label>Cantidad de bombillos</label>
                                <div class="input-with-controls">
                                    <button type="button" onclick="adjustValue('calc_led_num', -1)">-</button>
                                    <input type="number" id="calc_led_num" class="form-control" value="10" min="1" max="50">
                                    <button type="button" onclick="adjustValue('calc_led_num', 1)">+</button>
                                </div>
                            </div>
                            
                            <div class="input-group">
                                <label>Horas diarias de uso</label>
                                <div class="input-with-controls">
                                    <button type="button" onclick="adjustValue('calc_led_horas', -1)">-</button>
                                    <input type="number" id="calc_led_horas" class="form-control" value="6" min="1" max="24">
                                    <button type="button" onclick="adjustValue('calc_led_horas', 1)">+</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="usage-slider">
                            <label>Ajuste rápido de horas:</label>
                            <input type="range" id="calc_led_slider" min="1" max="24" value="6" 
                                   oninput="document.getElementById('calc_led_horas').value = this.value; calcularAhorroLED()">
                            <div class="slider-labels">
                                <span>1h</span>
                                <span>12h</span>
                                <span>24h</span>
                            </div>
                        </div>
                        
                        <button class="btn-calculator" onclick="calcularAhorroLED()">
                            <i class="fas fa-calculator"></i> Calcular Ahorro LED
                        </button>
                        
                        <div id="resultado_led" class="calculator-result"></div>
                    </div>
                </div>

                <!-- Calculadora Aire Acondicionado -->
                <div class="calculator-card">
                    <div class="calculator-header">
                        <div class="calculator-icon ac">
                            <i class="fas fa-snowflake"></i>
                        </div>
                        <div class="calculator-title">
                            <h3>Optimización de A/C</h3>
                            <p>Ahorra ajustando la temperatura del aire acondicionado</p>
                        </div>
                    </div>
                    
                    <div class="calculator-body">
                        <div class="input-group">
                            <label>Potencia del equipo</label>
                            <select id="calc_ac_potencia" class="form-control">
                                <option value="9000">9,000 BTU (2.6 kW)</option>
                                <option value="12000" selected>12,000 BTU (3.5 kW)</option>
                                <option value="18000">18,000 BTU (5.3 kW)</option>
                                <option value="24000">24,000 BTU (7.0 kW)</option>
                            </select>
                        </div>
                        
                        <div class="temperature-controls">
                            <div class="temp-control">
                                <label>Temperatura Actual</label>
                                <div class="temp-display">
                                    <button onclick="adjustTemp('calc_ac_temp_actual', -1)">-</button>
                                    <div class="temp-value">
                                        <span id="calc_ac_temp_actual_display">20</span>°C
                                    </div>
                                    <button onclick="adjustTemp('calc_ac_temp_actual', 1)">+</button>
                                    <input type="hidden" id="calc_ac_temp_actual" value="20">
                                </div>
                            </div>
                            
                            <div class="temp-arrow">
                                <i class="fas fa-arrow-right"></i>
                            </div>
                            
                            <div class="temp-control">
                                <label>Temperatura Óptima</label>
                                <div class="temp-display optimal">
                                    <button onclick="adjustTemp('calc_ac_temp_optima', -1)">-</button>
                                    <div class="temp-value">
                                        <span id="calc_ac_temp_optima_display">24</span>°C
                                    </div>
                                    <button onclick="adjustTemp('calc_ac_temp_optima', 1)">+</button>
                                    <input type="hidden" id="calc_ac_temp_optima" value="24">
                                </div>
                            </div>
                        </div>
                        
                        <div class="input-group">
                            <label>Horas de uso diario</label>
                            <input type="range" id="calc_ac_horas_slider" min="1" max="24" value="8" 
                                   oninput="document.getElementById('calc_ac_horas').value = this.value; updateACHours(this.value)">
                            <div class="range-display">
                                <span id="calc_ac_horas_display">8</span> horas/día
                            </div>
                            <input type="hidden" id="calc_ac_horas" value="8">
                        </div>
                        
                        <button class="btn-calculator" onclick="calcularAhorroAC()">
                            <i class="fas fa-calculator"></i> Calcular Ahorro A/C
                        </button>
                        
                        <div id="resultado_ac" class="calculator-result"></div>
                    </div>
                </div>

                <!-- Calculadora Consumo Fantasma -->
                <div class="calculator-card">
                    <div class="calculator-header">
                        <div class="calculator-icon phantom">
                            <i class="fas fa-ghost"></i>
                        </div>
                        <div class="calculator-title">
                            <h3>Consumo Fantasma</h3>
                            <p>Descubre cuánto gastas en dispositivos en standby</p>
                        </div>
                    </div>
                    
                    <div class="calculator-body">
                        <div class="devices-checklist">
                            <label class="device-checkbox">
                                <input type="checkbox" checked data-consumption="5">
                                <span class="checkmark"></span>
                                <div class="device-info">
                                    <span class="device-name">Televisor</span>
                                    <span class="device-consumption">~5W</span>
                                </div>
                            </label>
                            
                            <label class="device-checkbox">
                                <input type="checkbox" checked data-consumption="3">
                                <span class="checkmark"></span>
                                <div class="device-info">
                                    <span class="device-name">Decodificador</span>
                                    <span class="device-consumption">~3W</span>
                                </div>
                            </label>
                            
                            <label class="device-checkbox">
                                <input type="checkbox" checked data-consumption="2">
                                <span class="checkmark"></span>
                                <div class="device-info">
                                    <span class="device-name">Microondas</span>
                                    <span class="device-consumption">~2W</span>
                                </div>
                            </label>
                            
                            <label class="device-checkbox">
                                <input type="checkbox" data-consumption="1">
                                <span class="checkmark"></span>
                                <div class="device-info">
                                    <span class="device-name">Cargadores</span>
                                    <span class="device-consumption">~1W c/u</span>
                                </div>
                            </label>
                            
                            <label class="device-checkbox">
                                <input type="checkbox" data-consumption="4">
                                <span class="checkmark"></span>
                                <div class="device-info">
                                    <span class="device-name">Computador</span>
                                    <span class="device-consumption">~4W</span>
                                </div>
                            </label>
                            
                            <label class="device-checkbox">
                                <input type="checkbox" data-consumption="2">
                                <span class="checkmark"></span>
                                <div class="device-info">
                                    <span class="device-name">Impresora</span>
                                    <span class="device-consumption">~2W</span>
                                </div>
                            </label>
                        </div>
                        
                        <div class="phantom-summary">
                            <div class="phantom-total">
                                <span>Total estimado:</span>
                                <span id="phantom_total">17W</span>
                            </div>
                        </div>
                        
                        <button class="btn-calculator" onclick="calcularConsumoFantasma()">
                            <i class="fas fa-calculator"></i> Calcular Consumo Fantasma
                        </button>
                        
                        <div id="resultado_fantasma" class="calculator-result"></div>
                    </div>
                </div>

                <!-- Calculadora Solar -->
                <div class="calculator-card">
                    <div class="calculator-header">
                        <div class="calculator-icon solar">
                            <i class="fas fa-solar-panel"></i>
                        </div>
                        <div class="calculator-title">
                            <h3>Potencial Solar</h3>
                            <p>Estima el ahorro con paneles solares</p>
                        </div>
                    </div>
                    
                    <div class="calculator-body">
                        <div class="input-group">
                            <label>Área disponible en techo (m²)</label>
                            <input type="number" id="calc_solar_area" class="form-control" value="20" min="5" max="200">
                        </div>
                        
                        <div class="input-group">
                            <label>Horas de sol promedio/día</label>
                            <select id="calc_solar_horas" class="form-control">
                                <option value="4">4 horas (zona nublada)</option>
                                <option value="5" selected>5 horas (promedio Colombia)</option>
                                <option value="6">6 horas (zona soleada)</option>
                                <option value="7">7 horas (zona muy soleada)</option>
                            </select>
                        </div>
                        
                        <div class="solar-efficiency">
                            <label>Eficiencia del sistema</label>
                            <div class="efficiency-options">
                                <label class="radio-option">
                                    <input type="radio" name="solar_efficiency" value="0.15" checked>
                                    <span>Básico (15%)</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="solar_efficiency" value="0.18">
                                    <span>Estándar (18%)</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="solar_efficiency" value="0.22">
                                    <span>Premium (22%)</span>
                                </label>
                            </div>
                        </div>
                        
                        <button class="btn-calculator" onclick="calcularPotencialSolar()">
                            <i class="fas fa-calculator"></i> Calcular Potencial Solar
                        </button>
                        
                        <div id="resultado_solar" class="calculator-result"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Escenarios de Ahorro Inteligentes -->
        <div class="scenarios-section">
            <h2><i class="fas fa-chart-pie"></i> Escenarios de Ahorro Personalizados</h2>
            <p class="section-description">Basado en tu consumo actual de ${stats.consumoMes.toFixed(1)} kWh/mes</p>
            
            <div class="scenarios-grid">
                ${Object.values(escenarios).map((escenario, index) => {
                    const colores = ['#4CAF50', '#2196F3', '#FF9800'];
                    const iconos = ['fa-seedling', 'fa-bolt', 'fa-rocket'];
                    return `
                        <div class="scenario-card" data-scenario="${index}">
                            <div class="scenario-header">
                                <div class="scenario-icon" style="background: ${colores[index]};">
                                    <i class="fas ${iconos[index]}"></i>
                                </div>
                                <div class="scenario-info">
                                    <h3>${escenario.nombre}</h3>
                                    <p>${escenario.descripcion}</p>
                                </div>
                            </div>
                            
                            <div class="scenario-savings">
                                <div class="savings-primary">
                                    <span class="savings-value">${escenario.ahorroEstimado.toFixed(1)}</span>
                                    <span class="savings-unit">kWh/mes</span>
                                </div>
                                <div class="savings-secondary">
                                    <div class="savings-money">${formatearMoneda(escenario.costoAhorrado)}/mes</div>
                                    <div class="savings-annual">${formatearMoneda(escenario.costoAhorrado * 12)}/año</div>
                                </div>
                            </div>
                            
                            <div class="scenario-actions-list">
                                <h4>Plan de Acción:</h4>
                                <ul>
                                    ${escenario.acciones.map(accion => `<li>${accion}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="scenario-footer">
                                <button class="btn-scenario" onclick="implementarEscenario(${index})">
                                    <i class="fas fa-play"></i> Implementar Plan
                                </button>
                                <div class="scenario-difficulty ${escenario.dificultad || 'media'}">
                                    ${escenario.dificultad === 'facil' ? 'Fácil' : escenario.dificultad === 'dificil' ? 'Avanzado' : 'Intermedio'}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- Recomendaciones Inteligentes -->
        <div class="recommendations-section">
            <h2><i class="fas fa-brain"></i> Recomendaciones Personalizadas</h2>
            <div class="recommendations-grid">
                ${recomendaciones.map((rec, index) => `
                    <div class="recommendation-card ${rec.prioridad}">
                        <div class="recommendation-header">
                            <div class="recommendation-icon">
                                <i class="fas ${rec.icono}"></i>
                            </div>
                            <div class="recommendation-priority">
                                <span class="priority-badge ${rec.prioridad}">${rec.prioridad.toUpperCase()}</span>
                            </div>
                        </div>
                        
                        <div class="recommendation-content">
                            <h3>${rec.titulo}</h3>
                            <p>${rec.descripcion}</p>
                        </div>
                        
                        <div class="recommendation-savings">
                            <div class="savings-item">
                                <span class="savings-label">Ahorro Mensual</span>
                                <span class="savings-value">${rec.ahorro.ahorroMensual.toFixed(1)} kWh</span>
                            </div>
                            <div class="savings-item">
                                <span class="savings-label">Ahorro Económico</span>
                                <span class="savings-value">${formatearMoneda(rec.ahorro.ahorroCosto)}</span>
                            </div>
                            <div class="savings-item">
                                <span class="savings-label">Reducción</span>
                                <span class="savings-value">${rec.ahorro.porcentaje.toFixed(1)}%</span>
                            </div>
                        </div>
                        
                        <div class="recommendation-actions">
                            <button class="btn-recommendation" onclick="aplicarRecomendacion(${index})">
                                <i class="fas fa-check"></i> Aplicar
                            </button>
                            <button class="btn-recommendation-info" onclick="verDetallesRecomendacion(${index})">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Funciones auxiliares mejoradas
function adjustValue(inputId, delta) {
    const input = document.getElementById(inputId);
    const currentValue = parseInt(input.value);
    const newValue = Math.max(parseInt(input.min), Math.min(parseInt(input.max), currentValue + delta));
    input.value = newValue;
    
    // Auto-calcular si es necesario
    if (inputId.includes('led')) calcularAhorroLED();
    if (inputId.includes('ac')) calcularAhorroAC();
}

function adjustTemp(inputId, delta) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(inputId + '_display');
    const currentValue = parseInt(input.value);
    const newValue = Math.max(16, Math.min(30, currentValue + delta));
    input.value = newValue;
    display.textContent = newValue;
    calcularAhorroAC();
}

function updateACHours(value) {
    document.getElementById('calc_ac_horas_display').textContent = value;
    calcularAhorroAC();
}

function updatePhantomTotal() {
    const checkboxes = document.querySelectorAll('.device-checkbox input[type="checkbox"]');
    let total = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) {
            total += parseInt(cb.dataset.consumption);
        }
    });
    document.getElementById('phantom_total').textContent = total + 'W';
}

// Agregar event listeners para consumo fantasma
document.addEventListener('change', function(e) {
    if (e.target.matches('.device-checkbox input[type="checkbox"]')) {
        updatePhantomTotal();
        calcularConsumoFantasma();
    }
});

// Funciones de cálculo mejoradas
function calcularAhorroLED() {
    const tipo = document.getElementById('calc_led_tipo').value;
    const num = parseInt(document.getElementById('calc_led_num').value);
    const horas = parseInt(document.getElementById('calc_led_horas').value);
    
    const potencias = {
        'incandescente': { actual: 60, led: 9 },
        'fluorescente': { actual: 15, led: 9 },
        'halógeno': { actual: 45, led: 9 }
    };
    
    const potencia = potencias[tipo];
    const ahorroWatts = (potencia.actual - potencia.led) * num;
    const ahorroKwhDiario = (ahorroWatts * horas) / 1000;
    const ahorroKwhMensual = ahorroKwhDiario * 30;
    const ahorroCosto = ahorroKwhMensual * 700; // COP por kWh
    const porcentaje = ((potencia.actual - potencia.led) / potencia.actual) * 100;
    
    document.getElementById('resultado_led').innerHTML = `
        <div class="result-card success">
            <div class="result-header">
                <i class="fas fa-check-circle"></i>
                <h4>Resultado del Cálculo LED</h4>
            </div>
            <div class="result-content">
                <div class="result-primary">
                    <span class="result-value">${formatearMoneda(ahorroCosto)}</span>
                    <span class="result-period">/mes</span>
                </div>
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">Ahorro energético:</span>
                        <span class="detail-value">${ahorroKwhMensual.toFixed(2)} kWh/mes</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Ahorro anual:</span>
                        <span class="detail-value">${formatearMoneda(ahorroCosto * 12)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Reducción:</span>
                        <span class="detail-value">${porcentaje.toFixed(1)}%</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Inversión estimada:</span>
                        <span class="detail-value">${formatearMoneda(num * 15000)}</span>
                    </div>
                </div>
                <div class="result-payback">
                    <i class="fas fa-clock"></i>
                    Recuperación de inversión: ${Math.ceil((num * 15000) / ahorroCosto)} meses
                </div>
            </div>
        </div>
    `;
}

function calcularAhorroAC() {
    const potencia = parseInt(document.getElementById('calc_ac_potencia').value);
    const horas = parseInt(document.getElementById('calc_ac_horas').value);
    const tempActual = parseInt(document.getElementById('calc_ac_temp_actual').value);
    const tempOptima = parseInt(document.getElementById('calc_ac_temp_optima').value);
    
    const diferencia = tempOptima - tempActual;
    const ahorrosPorGrado = 0.08; // 8% por grado
    const porcentajeAhorro = Math.abs(diferencia) * ahorrosPorGrado * 100;
    
    const consumoActualKw = (potencia / 3412) * 1.2; // BTU a kW con factor de eficiencia
    const consumoActualKwhDiario = consumoActualKw * horas;
    const consumoActualKwhMensual = consumoActualKwhDiario * 30;
    
    const ahorroKwhMensual = consumoActualKwhMensual * (porcentajeAhorro / 100);
    const ahorroCosto = ahorroKwhMensual * 700;
    
    const tipoAjuste = diferencia > 0 ? 'aumentar' : 'disminuir';
    const colorResult = diferencia > 0 ? 'success' : 'warning';
    
    document.getElementById('resultado_ac').innerHTML = `
        <div class="result-card ${colorResult}">
            <div class="result-header">
                <i class="fas ${diferencia > 0 ? 'fa-leaf' : 'fa-exclamation-triangle'}"></i>
                <h4>Resultado Optimización A/C</h4>
            </div>
            <div class="result-content">
                <div class="result-primary">
                    <span class="result-value">${formatearMoneda(ahorroCosto)}</span>
                    <span class="result-period">/mes</span>
                </div>
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">Ahorro energético:</span>
                        <span class="detail-value">${ahorroKwhMensual.toFixed(2)} kWh/mes</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Reducción consumo:</span>
                        <span class="detail-value">${porcentajeAhorro.toFixed(1)}%</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Ajuste requerido:</span>
                        <span class="detail-value">${tipoAjuste} ${Math.abs(diferencia)}°C</span>
                    </div>
                </div>
                <div class="result-tip">
                    <i class="fas fa-lightbulb"></i>
                    ${diferencia > 0 ? 
                        'Aumentar la temperatura del A/C reduce significativamente el consumo' : 
                        'Disminuir la temperatura aumentará el consumo energético'}
                </div>
            </div>
        </div>
    `;
}

function calcularConsumoFantasma() {
    const checkboxes = document.querySelectorAll('.device-checkbox input[type="checkbox"]:checked');
    let totalWatts = 0;
    
    checkboxes.forEach(cb => {
        totalWatts += parseInt(cb.dataset.consumption);
    });
    
    const consumoKwhDiario = (totalWatts * 24) / 1000;
    const consumoKwhMensual = consumoKwhDiario * 30;
    const costo = consumoKwhMensual * 700;
    
    document.getElementById('resultado_fantasma').innerHTML = `
        <div class="result-card warning">
            <div class="result-header">
                <i class="fas fa-ghost"></i>
                <h4>Consumo Fantasma Detectado</h4>
            </div>
            <div class="result-content">
                <div class="result-primary">
                    <span class="result-value">${formatearMoneda(costo)}</span>
                    <span class="result-period">/mes</span>
                </div>
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">Consumo mensual:</span>
                        <span class="detail-value">${consumoKwhMensual.toFixed(2)} kWh</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Potencia total:</span>
                        <span class="detail-value">${totalWatts}W continuos</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Costo anual:</span>
                        <span class="detail-value">${formatearMoneda(costo * 12)}</span>
                    </div>
                </div>
                <div class="result-action">
                    <i class="fas fa-unplug"></i>
                    Desconecta estos dispositivos cuando no los uses para eliminar este gasto
                </div>
            </div>
        </div>
    `;
}

function calcularPotencialSolar() {
    const area = parseFloat(document.getElementById('calc_solar_area').value);
    const horasSol = parseFloat(document.getElementById('calc_solar_horas').value);
    const eficiencia = parseFloat(document.querySelector('input[name="solar_efficiency"]:checked').value);
    
    // Cálculos solares
    const potenciaInstalada = area * 0.2; // 200W por m² aproximadamente
    const generacionDiaria = potenciaInstalada * horasSol * eficiencia;
    const generacionMensual = generacionDiaria * 30;
    const ahorroMensual = generacionMensual * 700; // COP por kWh
    const inversionEstimada = potenciaInstalada * 2500000; // COP por kW instalado
    
    document.getElementById('resultado_solar').innerHTML = `
        <div class="result-card info">
            <div class="result-header">
                <i class="fas fa-solar-panel"></i>
                <h4>Potencial de Energía Solar</h4>
            </div>
            <div class="result-content">
                <div class="result-primary">
                    <span class="result-value">${formatearMoneda(ahorroMensual)}</span>
                    <span class="result-period">/mes</span>
                </div>
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">Generación mensual:</span>
                        <span class="detail-value">${generacionMensual.toFixed(1)} kWh</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Potencia instalada:</span>
                        <span class="detail-value">${potenciaInstalada.toFixed(1)} kW</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Inversión estimada:</span>
                        <span class="detail-value">${formatearMoneda(inversionEstimada)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Retorno inversión:</span>
                        <span class="detail-value">${Math.ceil(inversionEstimada / (ahorroMensual * 12))} años</span>
                    </div>
                </div>
                <div class="result-environmental">
                    <i class="fas fa-leaf"></i>
                    Evitarías ${(generacionMensual * 0.5 * 12).toFixed(1)} kg CO₂/año
                </div>
            </div>
        </div>
    `;
}

// Funciones adicionales
function exportarCalculos() {
    mostrarNotificacion('info', 'Exportando...', 'Generando reporte de cálculos de ahorro');
}

function compartirResultados() {
    mostrarNotificacion('success', 'Enlace Copiado', 'El enlace para compartir ha sido copiado al portapapeles');
}

function implementarEscenario(index) {
    mostrarNotificacion('success', 'Plan Activado', `El escenario de ahorro #${index + 1} ha sido activado en tu perfil`);
}

function aplicarRecomendacion(index) {
    mostrarNotificacion('success', 'Recomendación Aplicada', 'La configuración ha sido ajustada según la recomendación');
}

function verDetallesRecomendacion(index) {
    mostrarNotificacion('info', 'Detalles', 'Mostrando información detallada de la recomendación');
}
