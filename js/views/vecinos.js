// ============================================
// VISTA DE COMPARACIÓN CON VECINOS
// ============================================

function generarVistaVecinos() {
    if (!neighborComparison) {
        initNeighborComparison();
    }

    const comparacion = neighborComparison.compararConPromedios();
    const distribucion = neighborComparison.obtenerDistribucion();
    const insights = neighborComparison.obtenerInsights();
    const recomendaciones = neighborComparison.obtenerRecomendacionesComparativas();

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-users"></i> Centro de Comparación Comunitaria</h1>
                <p>Compara tu eficiencia energética con la comunidad y descubre oportunidades de mejora</p>
            </div>
            <div class="page-actions">
                <button class="btn-secondary" onclick="actualizarComparacion()">
                    <i class="fas fa-sync-alt"></i> Actualizar Datos
                </button>
                <button class="btn-secondary" onclick="compartirLogros()">
                    <i class="fas fa-share-alt"></i> Compartir Logros
                </button>
            </div>
        </div>

        <!-- Panel de Insights Inteligentes -->
        <div class="insights-dashboard">
            ${insights.map(insight => `
                <div class="insight-card ${insight.tipo}">
                    <div class="insight-icon">
                        <i class="fas ${insight.icono}"></i>
                    </div>
                    <div class="insight-content">
                        <h3>${insight.titulo}</h3>
                        <p>${insight.mensaje}</p>
                    </div>
                    <div class="insight-action">
                        <button class="btn-insight" onclick="verDetalleInsight('${insight.tipo}')">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Comparación Principal Mejorada -->
        <div class="card comparison-main">
            <div class="card-header">
                <h2 class="card-title">
                    <i class="fas fa-chart-bar"></i> Análisis Comparativo de Consumo
                </h2>
                <p class="card-description">Basado en datos anónimos de ${comparacion.totalUsuarios} usuarios activos</p>
            </div>
            <div class="card-body">
                <div class="comparison-grid">
                    <!-- Tu Consumo -->
                    <div class="comparison-card user-consumption">
                        <div class="comparison-header">
                            <div class="comparison-icon user">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="comparison-label">Tu Consumo</div>
                        </div>
                        <div class="comparison-value primary">
                            <span class="value-number">${comparacion.tuConsumo.mensual.toFixed(1)}</span>
                            <span class="value-unit">kWh/mes</span>
                        </div>
                        <div class="comparison-cost">
                            <span class="cost-amount">${formatearMoneda(comparacion.tuConsumo.mensual * 700)}</span>
                            <span class="cost-period">/mes</span>
                        </div>
                        <div class="comparison-badge user-badge">
                            <i class="fas fa-star"></i> Tu Perfil
                        </div>
                    </div>

                    <!-- Promedio Comunidad -->
                    <div class="comparison-card community-average">
                        <div class="comparison-header">
                            <div class="comparison-icon community">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="comparison-label">Promedio Comunidad</div>
                        </div>
                        <div class="comparison-value info">
                            <span class="value-number">${comparacion.promedio.mensual.toFixed(1)}</span>
                            <span class="value-unit">kWh/mes</span>
                        </div>
                        <div class="comparison-cost">
                            <span class="cost-amount">${formatearMoneda(comparacion.promedio.mensual * 700)}</span>
                            <span class="cost-period">/mes</span>
                        </div>
                        <div class="comparison-badge community-badge">
                            <i class="fas fa-chart-line"></i> Promedio
                        </div>
                    </div>

                    <!-- Diferencia -->
                    <div class="comparison-card difference-card ${comparacion.diferencia.porcentajeMensual < 0 ? 'positive' : 'negative'}">
                        <div class="comparison-header">
                            <div class="comparison-icon difference">
                                <i class="fas ${comparacion.diferencia.porcentajeMensual < 0 ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                            </div>
                            <div class="comparison-label">Tu Diferencia</div>
                        </div>
                        <div class="comparison-value ${comparacion.diferencia.porcentajeMensual < 0 ? 'success' : 'danger'}">
                            <span class="value-number">${comparacion.diferencia.porcentajeMensual > 0 ? '+' : ''}${comparacion.diferencia.porcentajeMensual.toFixed(1)}</span>
                            <span class="value-unit">%</span>
                        </div>
                        <div class="comparison-impact">
                            <span class="impact-amount">${comparacion.diferencia.mensual > 0 ? '+' : ''}${comparacion.diferencia.mensual.toFixed(1)} kWh</span>
                            <span class="impact-period">/mes</span>
                        </div>
                        <div class="comparison-badge ${comparacion.diferencia.porcentajeMensual < 0 ? 'success-badge' : 'warning-badge'}">
                            <i class="fas ${comparacion.diferencia.porcentajeMensual < 0 ? 'fa-leaf' : 'fa-exclamation-triangle'}"></i> 
                            ${comparacion.diferencia.porcentajeMensual < 0 ? 'Eficiente' : 'Mejorable'}
                        </div>
                    </div>
                </div>
                
                <!-- Gráfico de Comparación Visual -->
                <div class="comparison-chart">
                    <h4><i class="fas fa-chart-area"></i> Comparación Visual</h4>
                    <div class="chart-container">
                        <div class="chart-bar user-bar" style="height: ${(comparacion.tuConsumo.mensual / Math.max(comparacion.tuConsumo.mensual, comparacion.promedio.mensual)) * 100}%">
                            <div class="bar-label">Tú</div>
                            <div class="bar-value">${comparacion.tuConsumo.mensual.toFixed(1)}</div>
                        </div>
                        <div class="chart-bar community-bar" style="height: ${(comparacion.promedio.mensual / Math.max(comparacion.tuConsumo.mensual, comparacion.promedio.mensual)) * 100}%">
                            <div class="bar-label">Comunidad</div>
                            <div class="bar-value">${comparacion.promedio.mensual.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ranking y Posición Mejorada -->
        <div class="card ranking-card">
            <div class="card-header">
                <h2 class="card-title">
                    <i class="fas fa-trophy"></i> Tu Posición en el Ranking de Eficiencia
                </h2>
                <p class="card-description">Clasificación basada en eficiencia energética entre ${comparacion.posicion.total} usuarios</p>
            </div>
            <div class="card-body">
                <div class="ranking-display">
                    <div class="ranking-position">
                        <div class="position-number">
                            #${comparacion.posicion.posicion}
                        </div>
                        <div class="position-context">
                            de ${comparacion.posicion.total} usuarios
                        </div>
                    </div>
                    
                    <div class="ranking-visualization">
                        <div class="ranking-bar-container">
                            <div class="ranking-bar">
                                <div class="efficiency-gradient"></div>
                                <div class="user-position-marker" style="left: ${((comparacion.posicion.total - comparacion.posicion.posicion) / comparacion.posicion.total) * 100}%">
                                    <div class="position-indicator">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="position-tooltip">Tu posición</div>
                                </div>
                            </div>
                            <div class="ranking-labels">
                                <span class="label-left">
                                    <i class="fas fa-leaf"></i> Más Eficiente
                                </span>
                                <span class="label-right">
                                    <i class="fas fa-exclamation-triangle"></i> Menos Eficiente
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="percentile-display">
                        <div class="percentile-badge ${comparacion.posicion.percentil <= 25 ? 'excellent' : comparacion.posicion.percentil <= 50 ? 'good' : comparacion.posicion.percentil <= 75 ? 'average' : 'needs-improvement'}">
                            <div class="percentile-number">Top ${Math.round(comparacion.posicion.percentil)}%</div>
                            <div class="percentile-description">
                                ${comparacion.posicion.percentil <= 25 ? 'Excelente eficiencia' : 
                                  comparacion.posicion.percentil <= 50 ? 'Buena eficiencia' : 
                                  comparacion.posicion.percentil <= 75 ? 'Eficiencia promedio' : 'Oportunidad de mejora'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="ranking-achievements">
                        <h4><i class="fas fa-medal"></i> Logros de Eficiencia</h4>
                        <div class="achievements-grid">
                            <div class="achievement-item ${comparacion.posicion.percentil <= 50 ? 'unlocked' : 'locked'}">
                                <i class="fas fa-leaf"></i>
                                <span>Eco-Consciente</span>
                            </div>
                            <div class="achievement-item ${comparacion.posicion.percentil <= 25 ? 'unlocked' : 'locked'}">
                                <i class="fas fa-star"></i>
                                <span>Top Performer</span>
                            </div>
                            <div class="achievement-item ${comparacion.posicion.percentil <= 10 ? 'unlocked' : 'locked'}">
                                <i class="fas fa-crown"></i>
                                <span>Líder Energético</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Análisis de Distribución Mejorado -->
        <div class="card distribution-card">
            <div class="card-header">
                <h2 class="card-title">
                    <i class="fas fa-chart-pie"></i> Análisis de Distribución Comunitaria
                </h2>
                <p class="card-description">Cómo se distribuye el consumo energético en la comunidad</p>
            </div>
            <div class="card-body">
                <div class="distribution-overview">
                    <div class="distribution-stats">
                        <div class="stat-item">
                            <span class="stat-label">Tu Rango:</span>
                            <span class="stat-value highlight">${distribucion.tuRango}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Usuarios en tu rango:</span>
                            <span class="stat-value">${distribucion.rangos.find(r => r.label === distribucion.tuRango)?.count || 0}</span>
                        </div>
                    </div>
                </div>
                
                <div class="distribution-chart">
                    ${distribucion.rangos.map(rango => {
                        const porcentaje = (rango.count / comparacion.totalUsuarios) * 100;
                        const esTuRango = rango.label === distribucion.tuRango;
                        return `
                            <div class="distribution-item ${esTuRango ? 'user-range' : ''}">
                                <div class="range-header">
                                    <div class="range-info">
                                        <span class="range-label">
                                            ${rango.label}
                                            ${esTuRango ? '<span class="user-indicator">TÚ ESTÁS AQUÍ</span>' : ''}
                                        </span>
                                        <span class="range-stats">
                                            ${rango.count} usuarios • ${porcentaje.toFixed(1)}%
                                        </span>
                                    </div>
                                    ${esTuRango ? '<div class="range-badge"><i class="fas fa-user"></i></div>' : ''}
                                </div>
                                <div class="range-bar-container">
                                    <div class="range-bar">
                                        <div class="range-fill ${esTuRango ? 'user-fill' : 'community-fill'}" 
                                             style="width: ${porcentaje}%"></div>
                                    </div>
                                    <div class="range-percentage">${porcentaje.toFixed(1)}%</div>
                                </div>
                                ${esTuRango ? `
                                    <div class="range-insight">
                                        <i class="fas fa-lightbulb"></i>
                                        <span>Estás entre el ${porcentaje.toFixed(0)}% de usuarios con este nivel de consumo</span>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="distribution-summary">
                    <div class="summary-card">
                        <h4><i class="fas fa-chart-line"></i> Tendencias de la Comunidad</h4>
                        <ul class="trend-list">
                            <li><i class="fas fa-arrow-down text-success"></i> 68% de usuarios están reduciendo su consumo</li>
                            <li><i class="fas fa-leaf text-success"></i> Promedio comunitario ha mejorado 12% este mes</li>
                            <li><i class="fas fa-users text-info"></i> ${comparacion.totalUsuarios} usuarios activos participando</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recomendaciones Comparativas -->
        ${recomendaciones.length > 0 ? `
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-lightbulb"></i> Recomendaciones Basadas en Comparación</h2>
                </div>
                <div class="card-body">
                    <div style="display: grid; gap: 16px;">
                        ${recomendaciones.map(rec => `
                            <div style="padding: 20px; background: var(--bg-tertiary); border-radius: 12px; border-left: 4px solid ${rec.prioridad === 'alta' ? 'var(--danger)' : rec.prioridad === 'media' ? 'var(--warning)' : 'var(--info)'};">
                                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                                    <h3 style="margin: 0;">${rec.titulo}</h3>
                                    <span style="padding: 4px 12px; background: ${rec.prioridad === 'alta' ? 'var(--danger)' : rec.prioridad === 'media' ? 'var(--warning)' : 'var(--info)'}20; color: ${rec.prioridad === 'alta' ? 'var(--danger)' : rec.prioridad === 'media' ? 'var(--warning)' : 'var(--info)'}; border-radius: 12px; font-size: 12px; text-transform: uppercase;">
                                        ${rec.prioridad}
                                    </span>
                                </div>
                                <p style="margin: 0 0 12px 0; color: var(--text-secondary);">${rec.descripcion}</p>
                                <div style="padding: 12px; background: var(--success)10; border-radius: 8px;">
                                    <strong style="color: var(--success);">Ahorro potencial: ${rec.ahorroPotencial.toFixed(2)} kWh/mes</strong>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        ` : ''}
        <!-- Recomendaciones Inteligentes -->
        ${recomendaciones.length > 0 ? `
            <div class="card recommendations-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-brain"></i> Recomendaciones Inteligentes
                    </h2>
                    <p class="card-description">Sugerencias personalizadas basadas en el análisis comparativo</p>
                </div>
                <div class="card-body">
                    <div class="recommendations-grid">
                        ${recomendaciones.map((rec, index) => `
                            <div class="recommendation-card ${rec.prioridad}">
                                <div class="recommendation-header">
                                    <div class="recommendation-icon ${rec.prioridad}">
                                        <i class="fas ${getRecommendationIcon(rec.prioridad)}"></i>
                                    </div>
                                    <div class="recommendation-priority">
                                        <span class="priority-badge ${rec.prioridad}">
                                            ${rec.prioridad.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="recommendation-content">
                                    <h3>${rec.titulo}</h3>
                                    <p>${rec.descripcion}</p>
                                </div>
                                
                                <div class="recommendation-impact">
                                    <div class="impact-item">
                                        <span class="impact-label">Ahorro Potencial</span>
                                        <span class="impact-value success">
                                            ${rec.ahorroPotencial.toFixed(1)} kWh/mes
                                        </span>
                                    </div>
                                    <div class="impact-item">
                                        <span class="impact-label">Ahorro Económico</span>
                                        <span class="impact-value success">
                                            ${formatearMoneda(rec.ahorroPotencial * 700)}/mes
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="recommendation-actions">
                                    <button class="btn-recommendation primary" onclick="aplicarRecomendacionVecino(${index})">
                                        <i class="fas fa-check"></i> Aplicar
                                    </button>
                                    <button class="btn-recommendation secondary" onclick="verDetalleRecomendacionVecino(${index})">
                                        <i class="fas fa-info-circle"></i> Detalles
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        ` : ''}

        <!-- Centro de Acciones Comunitarias -->
        <div class="card community-actions">
            <div class="card-header">
                <h2 class="card-title">
                    <i class="fas fa-handshake"></i> Acciones Comunitarias
                </h2>
                <p class="card-description">Participa en iniciativas colectivas de ahorro energético</p>
            </div>
            <div class="card-body">
                <div class="actions-grid">
                    <div class="action-card challenge">
                        <div class="action-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="action-content">
                            <h4>Desafío Mensual</h4>
                            <p>Únete al reto comunitario de reducir 15% el consumo este mes</p>
                            <div class="action-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 67%"></div>
                                </div>
                                <span class="progress-text">67% de participación</span>
                            </div>
                        </div>
                        <button class="btn-action" onclick="unirseDesafio()">
                            <i class="fas fa-plus"></i> Unirse
                        </button>
                    </div>
                    
                    <div class="action-card tips">
                        <div class="action-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div class="action-content">
                            <h4>Consejos Comunitarios</h4>
                            <p>Comparte y descubre tips de ahorro de otros usuarios</p>
                            <div class="action-stats">
                                <span><i class="fas fa-comments"></i> 24 consejos nuevos</span>
                            </div>
                        </div>
                        <button class="btn-action" onclick="verConsejosComunitarios()">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </div>
                    
                    <div class="action-card leaderboard">
                        <div class="action-icon">
                            <i class="fas fa-medal"></i>
                        </div>
                        <div class="action-content">
                            <h4>Tabla de Líderes</h4>
                            <p>Conoce a los usuarios más eficientes de la comunidad</p>
                            <div class="action-stats">
                                <span><i class="fas fa-star"></i> Top 10 del mes</span>
                            </div>
                        </div>
                        <button class="btn-action" onclick="verTablaLideres()">
                            <i class="fas fa-ranking-star"></i> Ver Ranking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Funciones auxiliares para la vista de vecinos
function getRecommendationIcon(prioridad) {
    const iconos = {
        'alta': 'fa-exclamation-triangle',
        'media': 'fa-info-circle',
        'baja': 'fa-lightbulb'
    };
    return iconos[prioridad] || 'fa-lightbulb';
}

function actualizarComparacion() {
    mostrarNotificacion('info', 'Actualizando...', 'Obteniendo los datos más recientes de la comunidad');
    setTimeout(() => {
        cargarVista('vecinos');
        mostrarNotificacion('success', 'Datos Actualizados', 'La comparación ha sido actualizada con los últimos datos');
    }, 1500);
}

function compartirLogros() {
    const sesion = obtenerSesion();
    const mensaje = `¡Estoy en el Top 25% de eficiencia energética en ENERGIX SMART! 🌱⚡ #AhorroEnergetico #Sostenibilidad`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mis Logros en ENERGIX SMART',
            text: mensaje,
            url: window.location.href
        });
    } else {
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(mensaje).then(() => {
            mostrarNotificacion('success', 'Mensaje Copiado', 'El mensaje ha sido copiado al portapapeles');
        });
    }
}

function verDetalleInsight(tipo) {
    mostrarNotificacion('info', 'Análisis Detallado', `Mostrando información detallada sobre ${tipo}`);
}

function aplicarRecomendacionVecino(index) {
    mostrarNotificacion('success', 'Recomendación Aplicada', 'La configuración ha sido ajustada según la recomendación comunitaria');
}

function verDetalleRecomendacionVecino(index) {
    mostrarNotificacion('info', 'Detalles de Recomendación', 'Mostrando información detallada y pasos de implementación');
}

function unirseDesafio() {
    mostrarNotificacion('success', 'Desafío Aceptado', '¡Te has unido al desafío mensual de la comunidad! Recibirás actualizaciones de progreso.');
}

function verConsejosComunitarios() {
    mostrarNotificacion('info', 'Consejos Comunitarios', 'Abriendo el centro de consejos y tips de la comunidad');
}

function verTablaLideres() {
    mostrarNotificacion('info', 'Tabla de Líderes', 'Mostrando el ranking completo de eficiencia energética');
}
