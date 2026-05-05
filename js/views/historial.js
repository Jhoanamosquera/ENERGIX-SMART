// ============================================
// VISTA: HISTORIAL DE CONSUMO
// ============================================

function generarVistaHistorial() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    
    // Ordenar por fecha descendente
    registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-history"></i> Historial de Consumo</h1>
            <p>Todos tus registros de consumo energético</p>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-table"></i>
                    Registros de Consumo
                </h3>
                <button class="btn-secondary" onclick="exportarDatos()">
                    <i class="fas fa-download"></i> Exportar CSV
                </button>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Consumo (kWh)</th>
                            <th>Costo (COP)</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${registros.map(r => {
                            const fecha = new Date(r.fecha);
                            return `
                                <tr>
                                    <td>${fecha.toLocaleDateString('es-CO')}</td>
                                    <td>${fecha.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td><strong>${r.consumo.toFixed(2)}</strong> kWh</td>
                                    <td>${formatearMoneda(r.costo)}</td>
                                    <td>
                                        <button class="btn-secondary" onclick="eliminarRegistro(${r.id})" style="padding: 6px 12px; font-size: 12px;">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            ${registros.length === 0 ? `
                <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
                    <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                    <p>No hay registros de consumo aún</p>
                    <button class="btn-primary" onclick="cargarVista('consumo')" style="margin-top: 16px;">
                        <i class="fas fa-plus"></i> Registrar Consumo
                    </button>
                </div>
            ` : ''}
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-area"></i>
                    Tendencia de Consumo
                </h3>
            </div>
            <div class="chart-container" style="height: 350px;">
                <canvas id="chartHistorial"></canvas>
            </div>
        </div>
    `;
}

function eliminarRegistro(id) {
    if (!confirm('¿Estás seguro de eliminar este registro?')) {
        return;
    }
    
    const sesion = obtenerSesion();
    let registros = obtenerConsumoUsuario(sesion.email);
    
    registros = registros.filter(r => r.id !== id);
    guardarConsumoUsuario(sesion.email, registros);
    
    mostrarNotificacion('success', 'Registro Eliminado', 'El registro ha sido eliminado correctamente');
    
    cargarVista('historial');
}
