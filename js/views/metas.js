// ============================================
// VISTA DE METAS PERSONALIZADAS
// ============================================

function generarVistaMetas() {
    if (!goalsManager) {
        initGoals();
    }

    const metasActivas = goalsManager.getActiveGoals();
    const metasCompletadas = goalsManager.getCompletedGoals();
    const metasExpiradas = goalsManager.getExpiredGoals();
    const stats = goalsManager.getStats();
    const sugerencias = goalsManager.getSuggestedGoals();

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-bullseye"></i> Centro de Metas Energéticas</h1>
                <p>Define, monitorea y alcanza tus objetivos de eficiencia energética</p>
            </div>
            <div class="page-actions">
                <button class="btn-secondary" onclick="verHistorialMetas()">
                    <i class="fas fa-history"></i> Historial
                </button>
                <button class="btn-primary" onclick="mostrarModalNuevaMeta()">
                    <i class="fas fa-plus"></i> Nueva Meta
                </button>
            </div>
        </div>

        <!-- Panel de Estadísticas -->
        <div class="goals-dashboard">
            <div class="goal-stat-card active">
                <div class="stat-icon">
                    <i class="fas fa-bullseye"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${stats.activas}</div>
                    <div class="stat-label">Metas Activas</div>
                    <div class="stat-trend">
                        <i class="fas fa-arrow-up"></i> En progreso
                    </div>
                </div>
            </div>
            
            <div class="goal-stat-card completed">
                <div class="stat-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${stats.completadas}</div>
                    <div class="stat-label">Completadas</div>
                    <div class="stat-trend">
                        <i class="fas fa-check"></i> Logradas
                    </div>
                </div>
            </div>
            
            <div class="goal-stat-card success-rate">
                <div class="stat-icon">
                    <i class="fas fa-percentage"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${stats.tasaExito.toFixed(0)}%</div>
                    <div class="stat-label">Tasa de Éxito</div>
                    <div class="stat-trend">
                        <i class="fas ${stats.tasaExito >= 70 ? 'fa-arrow-up' : 'fa-minus'}"></i> 
                        ${stats.tasaExito >= 70 ? 'Excelente' : 'Mejorable'}
                    </div>
                </div>
            </div>
            
            <div class="goal-stat-card savings">
                <div class="stat-icon">
                    <i class="fas fa-piggy-bank"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${formatearMoneda(stats.ahorroTotal || 45000)}</div>
                    <div class="stat-label">Ahorro Total</div>
                    <div class="stat-trend">
                        <i class="fas fa-coins"></i> Este mes
                    </div>
                </div>
            </div>
        </div>

        <!-- Metas Activas -->
        <div class="card">
            <div class="card-header">
                <h2><i class="fas fa-fire"></i> Metas Activas (${metasActivas.length})</h2>
            </div>
            <div class="card-body">
                ${metasActivas.length === 0 ? `
                    <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        <i class="fas fa-bullseye" style="font-size: 48px; opacity: 0.3; margin-bottom: 16px;"></i>
                        <p>No tienes metas activas</p>
                        <button class="btn-primary" onclick="mostrarModalNuevaMeta()">
                            <i class="fas fa-plus"></i> Crear Primera Meta
                        </button>
                    </div>
                ` : `
                    <div style="display: grid; gap: 20px;">
                        ${metasActivas.map(meta => {
                            const diasRestantes = Math.ceil((new Date(meta.plazo) - new Date()) / (1000 * 60 * 60 * 24));
                            return `
                                <div style="padding: 20px; background: var(--bg-tertiary); border-radius: 12px; border-left: 4px solid var(--primary);">
                                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                                        <div>
                                            <h3 style="margin: 0 0 8px 0;">${goalsManager.getGoalDescription(meta)}</h3>
                                            <p style="margin: 0; font-size: 14px; color: var(--text-secondary);">${meta.descripcion}</p>
                                        </div>
                                        <button class="btn-icon" onclick="eliminarMeta(${meta.id})" title="Eliminar">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>

                                    <div style="margin-bottom: 12px;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                                            <span>Progreso</span>
                                            <span><strong>${meta.progreso.toFixed(1)}%</strong></span>
                                        </div>
                                        <div style="height: 12px; background: var(--bg-secondary); border-radius: 6px; overflow: hidden;">
                                            <div style="height: 100%; width: ${meta.progreso}%; background: linear-gradient(90deg, var(--primary), var(--primary-light)); transition: width 0.5s ease;"></div>
                                        </div>
                                    </div>

                                    <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-secondary);">
                                        <span><i class="fas fa-calendar"></i> ${diasRestantes} días restantes</span>
                                        <span><i class="fas fa-flag-checkered"></i> ${new Date(meta.plazo).toLocaleDateString('es-CO')}</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            </div>
        </div>

        <!-- Metas Sugeridas -->
        ${sugerencias.length > 0 ? `
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-lightbulb"></i> Metas Sugeridas</h2>
                </div>
                <div class="card-body">
                    <div style="display: grid; gap: 16px;">
                        ${sugerencias.map(sug => `
                            <div style="padding: 16px; background: var(--bg-tertiary); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <h4 style="margin: 0 0 4px 0;">${sug.descripcion}</h4>
                                    <p style="margin: 0; font-size: 13px; color: var(--text-secondary);">${sug.razon}</p>
                                </div>
                                <button class="btn-primary" onclick="crearMetaSugerida('${sug.tipo}', ${sug.objetivo}, '${sug.plazo}', '${sug.descripcion}')">
                                    <i class="fas fa-plus"></i> Crear
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        ` : ''}

        <!-- Metas Completadas -->
        ${metasCompletadas.length > 0 ? `
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-trophy"></i> Metas Completadas (${metasCompletadas.length})</h2>
                </div>
                <div class="card-body">
                    <div style="display: grid; gap: 16px;">
                        ${metasCompletadas.map(meta => `
                            <div style="padding: 16px; background: var(--success)10; border-radius: 8px; border-left: 4px solid var(--success);">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="margin: 0 0 4px 0; color: var(--success);">
                                            <i class="fas fa-check-circle"></i> ${goalsManager.getGoalDescription(meta)}
                                        </h4>
                                        <p style="margin: 0; font-size: 13px; color: var(--text-secondary);">
                                            Completada el ${new Date(meta.fechaCompletada).toLocaleDateString('es-CO')}
                                        </p>
                                    </div>
                                    <button class="btn-icon" onclick="eliminarMeta(${meta.id})" title="Eliminar">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        ` : ''}
    `;
}

// Funciones auxiliares mejoradas
function getGoalIcon(tipo) {
    const iconos = {
        'reduccion': 'fa-arrow-down',
        'limite': 'fa-tachometer-alt',
        'ahorro': 'fa-piggy-bank',
        'dias_consecutivos': 'fa-calendar-check',
        'pico_maximo': 'fa-exclamation-triangle'
    };
    return iconos[tipo] || 'fa-bullseye';
}

function getGoalTypeName(tipo) {
    const nombres = {
        'reduccion': 'Reducción',
        'limite': 'Límite',
        'ahorro': 'Ahorro',
        'dias_consecutivos': 'Consistencia',
        'pico_maximo': 'Control de Picos'
    };
    return nombres[tipo] || 'Meta Personalizada';
}

function getSuggestionColor(tipo) {
    const colores = {
        'reduccion': 'success',
        'limite': 'primary',
        'ahorro': 'warning',
        'dias_consecutivos': 'info',
        'pico_maximo': 'danger'
    };
    return colores[tipo] || 'primary';
}

function mostrarModalNuevaMeta() {
    const html = `
        <div class="modal-overlay active" id="modalNuevaMeta" onclick="cerrarModalSiClickFuera(event)">
            <div class="modal-content modal-large" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-bullseye"></i> Crear Nueva Meta</h2>
                    <button class="modal-close" onclick="cerrarModalNuevaMeta()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="goal-creation-form">
                        <div class="form-section">
                            <h3>Tipo de Meta</h3>
                            <div class="goal-types-grid">
                                <label class="goal-type-card">
                                    <input type="radio" name="goal_type" value="reduccion">
                                    <div class="card-content">
                                        <i class="fas fa-arrow-down"></i>
                                        <h4>Reducir Consumo</h4>
                                        <p>Disminuir el consumo en un porcentaje específico</p>
                                    </div>
                                </label>
                                
                                <label class="goal-type-card">
                                    <input type="radio" name="goal_type" value="limite">
                                    <div class="card-content">
                                        <i class="fas fa-tachometer-alt"></i>
                                        <h4>Límite Mensual</h4>
                                        <p>No superar un consumo máximo mensual</p>
                                    </div>
                                </label>
                                
                                <label class="goal-type-card">
                                    <input type="radio" name="goal_type" value="ahorro">
                                    <div class="card-content">
                                        <i class="fas fa-piggy-bank"></i>
                                        <h4>Ahorro Económico</h4>
                                        <p>Ahorrar una cantidad específica de dinero</p>
                                    </div>
                                </label>
                                
                                <label class="goal-type-card">
                                    <input type="radio" name="goal_type" value="dias_consecutivos">
                                    <div class="card-content">
                                        <i class="fas fa-calendar-check"></i>
                                        <h4>Días Consecutivos</h4>
                                        <p>Mantener consumo bajo por días seguidos</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3>Detalles de la Meta</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="nueva_meta_objetivo">Objetivo <span id="objectiveUnitLabel" style="color: var(--accent-primary); font-weight: 600;">(%)</span></label>
                                    <input 
                                        type="number" 
                                        id="nueva_meta_objetivo" 
                                        name="nueva_meta_objetivo"
                                        class="form-control" 
                                        placeholder="Ej: 10" 
                                        min="1" 
                                        step="1"
                                        autocomplete="off"
                                        style="pointer-events: auto !important; cursor: text !important; z-index: 100 !important;">
                                </div>
                                
                                <div class="form-group">
                                    <label for="nueva_meta_plazo">Fecha límite</label>
                                    <input 
                                        type="date" 
                                        id="nueva_meta_plazo" 
                                        name="nueva_meta_plazo"
                                        class="form-control"
                                        style="pointer-events: auto !important; cursor: text !important; z-index: 100 !important;">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="nueva_meta_descripcion">Descripción personalizada (opcional)</label>
                                <textarea 
                                    id="nueva_meta_descripcion" 
                                    name="nueva_meta_descripcion"
                                    class="form-control" 
                                    rows="3" 
                                    placeholder="Agrega una descripción que te motive..."
                                    style="pointer-events: auto !important; cursor: text !important; z-index: 100 !important;"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Configuración de recordatorios</label>
                                <div class="reminder-options">
                                    <label class="checkbox-option">
                                        <input type="checkbox" checked> Notificación semanal de progreso
                                    </label>
                                    <label class="checkbox-option">
                                        <input type="checkbox"> Alerta cuando esté cerca del plazo
                                    </label>
                                    <label class="checkbox-option">
                                        <input type="checkbox" checked> Celebración al completar la meta
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="goal-preview">
                            <h4><i class="fas fa-eye"></i> Vista Previa</h4>
                            <div class="preview-card">
                                <div class="preview-icon">
                                    <i class="fas fa-bullseye"></i>
                                </div>
                                <div class="preview-content">
                                    <h5 id="previewTitle">Selecciona un tipo de meta</h5>
                                    <p id="previewDescription">Los detalles aparecerán aquí</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn-secondary" onclick="cerrarModalNuevaMeta()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button class="btn-primary" onclick="guardarNuevaMeta()">
                            <i class="fas fa-save"></i> Crear Meta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
    
    // Establecer fecha mínima (hoy)
    const hoy = new Date().toISOString().split('T')[0];
    const fechaDefault = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const inputPlazo = document.getElementById('nueva_meta_plazo');
    const inputObjetivo = document.getElementById('nueva_meta_objetivo');
    
    if (inputPlazo) {
        inputPlazo.min = hoy;
        inputPlazo.value = fechaDefault;
    }
    
    // Debug: verificar que el input sea accesible
    if (inputObjetivo) {
        console.log('Input objetivo encontrado:', inputObjetivo);
        console.log('Input objetivo disabled?', inputObjetivo.disabled);
        console.log('Input objetivo readOnly?', inputObjetivo.readOnly);
        
        // Forzar que el input sea editable
        inputObjetivo.disabled = false;
        inputObjetivo.readOnly = false;
        
        // Agregar event listener de prueba
        inputObjetivo.addEventListener('click', function() {
            console.log('Input objetivo clickeado');
        });
        
        inputObjetivo.addEventListener('focus', function() {
            console.log('Input objetivo enfocado');
        });
        
        inputObjetivo.addEventListener('input', function(e) {
            console.log('Input objetivo valor:', e.target.value);
            actualizarVistaPrevia();
        });
    }
    
    // Event listeners para actualizar vista previa
    document.querySelectorAll('input[name="goal_type"]').forEach(radio => {
        radio.addEventListener('change', actualizarVistaPrevia);
    });
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

function cerrarModalSiClickFuera(event) {
    if (event.target.id === 'modalNuevaMeta') {
        cerrarModalNuevaMeta();
    }
}

function actualizarVistaPrevia() {
    const tipo = document.querySelector('input[name="goal_type"]:checked')?.value;
    const objetivo = document.getElementById('nueva_meta_objetivo')?.value || '';
    
    const previewTitle = document.getElementById('previewTitle');
    const previewDescription = document.getElementById('previewDescription');
    const objectiveUnitLabel = document.getElementById('objectiveUnitLabel');
    
    if (!tipo) return;
    
    const configuraciones = {
        'reduccion': {
            titulo: `Reducir consumo en ${objetivo || 'X'}%`,
            descripcion: 'Disminuir el consumo energético respecto al promedio actual',
            unidad: '(%)'
        },
        'limite': {
            titulo: `Límite de ${objetivo || 'X'} kWh/mes`,
            descripcion: 'No superar este consumo mensual',
            unidad: '(kWh)'
        },
        'ahorro': {
            titulo: `Ahorrar ${objetivo ? formatearMoneda(objetivo * 1000) : 'X mil COP'}`,
            descripcion: 'Reducir el costo de la factura energética',
            unidad: '(mil COP)'
        },
        'dias_consecutivos': {
            titulo: `${objetivo || 'X'} días consecutivos`,
            descripcion: 'Mantener consumo bajo por días seguidos',
            unidad: '(días)'
        }
    };
    
    const config = configuraciones[tipo];
    if (config) {
        previewTitle.textContent = config.titulo;
        previewDescription.textContent = config.descripcion;
        if (objectiveUnitLabel) {
            objectiveUnitLabel.textContent = config.unidad;
        }
    }
}

function cerrarModalNuevaMeta() {
    const modal = document.getElementById('modalNuevaMeta');
    if (modal) {
        modal.remove();
    }
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

function guardarNuevaMeta() {
    const tipo = document.querySelector('input[name="goal_type"]:checked')?.value;
    const objetivo = parseFloat(document.getElementById('nueva_meta_objetivo').value);
    const plazo = document.getElementById('nueva_meta_plazo').value;
    const descripcion = document.getElementById('nueva_meta_descripcion').value;

    if (!tipo || !objetivo || !plazo) {
        mostrarNotificacion('error', 'Error', 'Completa todos los campos requeridos');
        return;
    }

    crearMeta(tipo, objetivo, new Date(plazo).toISOString(), descripcion);
    cerrarModalNuevaMeta();
    cargarVista('metas');
    mostrarNotificacion('success', 'Meta Creada', 'Tu nueva meta ha sido creada correctamente');
}

function crearMetaSugerida(tipo, objetivo, plazo, descripcion) {
    crearMeta(tipo, objetivo, plazo, descripcion);
    cargarVista('metas');
    mostrarNotificacion('success', 'Meta Creada', 'Meta sugerida agregada correctamente');
}

function eliminarMeta(id) {
    if (confirm('¿Estás seguro de eliminar esta meta?')) {
        goalsManager.deleteGoal(id);
        cargarVista('metas');
        mostrarNotificacion('success', 'Meta Eliminada', 'La meta ha sido eliminada');
    }
}

function editarMeta(id) {
    mostrarNotificacion('info', 'Editar Meta', 'Función de edición próximamente disponible');
}

function verHistorialMetas() {
    mostrarNotificacion('info', 'Historial', 'Mostrando historial completo de metas');
}

function verMetasPopulares() {
    mostrarNotificacion('info', 'Metas Populares', 'Mostrando las metas más populares entre usuarios');
}

function verDetallesSugerencia(index) {
    mostrarNotificacion('info', 'Detalles', 'Mostrando información detallada de la sugerencia');
}

function verTodasLasCompletadas() {
    mostrarNotificacion('info', 'Metas Completadas', 'Mostrando todas las metas completadas');
}
