// ============================================
// VISTA: REGISTRO DE CONSUMO
// ============================================

function generarVistaConsumo() {
    return `
        <div class="page-header">
            <h1><i class="fas fa-chart-line"></i> Registrar Consumo</h1>
            <p>Ingresa tu consumo energético diario</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-plus-circle"></i>
                    Nuevo Registro de Consumo
                </h3>
            </div>
            <form id="formConsumo" class="form-professional">
                <div class="form-row">
                    <div class="form-group">
                        <label for="fechaConsumo">
                            <i class="fas fa-calendar"></i> Fecha *
                        </label>
                        <input type="date" id="fechaConsumo" class="form-control" required>
                        <small class="form-text">Fecha del registro de consumo</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="horaConsumo">
                            <i class="fas fa-clock"></i> Hora *
                        </label>
                        <input type="time" id="horaConsumo" class="form-control" required>
                        <small class="form-text">Hora del registro</small>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="consumoKwh">
                        <i class="fas fa-bolt"></i> Consumo (kWh) *
                    </label>
                    <input type="number" id="consumoKwh" class="form-control" step="0.01" min="0" placeholder="Ej: 2.5" required>
                    <small class="form-text">Ingresa el consumo en kilovatios-hora</small>
                </div>
                
                <div class="form-group">
                    <label>
                        <i class="fas fa-dollar-sign"></i> Costo Estimado
                    </label>
                    <div style="padding: 12px; background: var(--bg-sidebar); border-radius: 8px; border: 1px solid var(--border-color);">
                        <span id="costoEstimado" style="font-size: 24px; font-weight: 700; color: var(--accent-primary);">$0 COP</span>
                        <small style="display: block; margin-top: 4px; color: var(--text-secondary);">Tarifa: $700 COP/kWh</small>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="limpiarFormularioConsumo()">
                        <i class="fas fa-times"></i> Limpiar
                    </button>
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-save"></i> Guardar Registro
                    </button>
                </div>
            </form>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-info-circle"></i>
                    Información
                </h3>
            </div>
            <div class="alert alert-info">
                <i class="fas fa-lightbulb"></i>
                <div>
                    <strong>Consejos para registrar tu consumo</strong>
                    <p>• Registra tu consumo diariamente para un mejor seguimiento<br>
                       • Puedes obtener el consumo de tu medidor eléctrico<br>
                       • El sistema calculará automáticamente el costo basado en la tarifa actual<br>
                       • Los datos se utilizarán para generar análisis y recomendaciones personalizadas</p>
                </div>
            </div>
        </div>
    `;
}

function configurarFormularioConsumo() {
    // Establecer fecha y hora actual
    const ahora = new Date();
    document.getElementById('fechaConsumo').valueAsDate = ahora;
    document.getElementById('horaConsumo').value = ahora.toTimeString().slice(0, 5);
    
    // Calcular costo en tiempo real
    document.getElementById('consumoKwh')?.addEventListener('input', (e) => {
        const consumo = parseFloat(e.target.value) || 0;
        const costo = consumo * TARIFA_KWH;
        document.getElementById('costoEstimado').textContent = formatearMoneda(costo);
    });
    
    // Manejar envío del formulario
    document.getElementById('formConsumo')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fecha = document.getElementById('fechaConsumo').value;
        const hora = document.getElementById('horaConsumo').value;
        const consumo = parseFloat(document.getElementById('consumoKwh').value);
        
        if (!fecha || !hora || !consumo || consumo <= 0) {
            mostrarNotificacion('warning', 'Datos Incompletos', 'Por favor completa todos los campos correctamente');
            return;
        }
        
        const sesion = obtenerSesion();
        const registros = obtenerConsumoUsuario(sesion.email);
        
        const fechaHora = new Date(`${fecha}T${hora}`);
        const nuevoRegistro = {
            id: Date.now(),
            fecha: fechaHora.toISOString(),
            consumo: consumo,
            costo: consumo * TARIFA_KWH
        };
        
        registros.push(nuevoRegistro);
        guardarConsumoUsuario(sesion.email, registros);
        
        mostrarNotificacion('success', 'Registro Guardado', 
            `Consumo de ${consumo.toFixed(2)} kWh registrado correctamente. Costo: ${formatearMoneda(nuevoRegistro.costo)}`
        );
        
        limpiarFormularioConsumo();
    });
}

function limpiarFormularioConsumo() {
    document.getElementById('formConsumo')?.reset();
    const ahora = new Date();
    document.getElementById('fechaConsumo').valueAsDate = ahora;
    document.getElementById('horaConsumo').value = ahora.toTimeString().slice(0, 5);
    document.getElementById('costoEstimado').textContent = '$0 COP';
    document.getElementById('consumoKwh')?.focus();
}
