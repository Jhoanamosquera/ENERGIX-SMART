// ============================================
// VISTA: REPORTES
// ============================================

function generarVistaReportes() {
    return `
        <div class="page-header">
            <h1><i class="fas fa-file-pdf"></i> Reportes</h1>
            <p>Genera reportes detallados de tu consumo energético</p>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-calendar-week"></i>
                        Reporte Semanal
                    </h3>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">
                    Genera un reporte con el consumo de los últimos 7 días
                </p>
                <button class="btn-primary btn-full" onclick="generarReporte('semanal')">
                    <i class="fas fa-download"></i> Generar Reporte Semanal
                </button>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-calendar-alt"></i>
                        Reporte Mensual
                    </h3>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">
                    Genera un reporte con el consumo del mes actual
                </p>
                <button class="btn-primary btn-full" onclick="generarReporte('mensual')">
                    <i class="fas fa-download"></i> Generar Reporte Mensual
                </button>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-calendar"></i>
                        Reporte Anual
                    </h3>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">
                    Genera un reporte con el consumo del año actual
                </p>
                <button class="btn-primary btn-full" onclick="generarReporte('anual')">
                    <i class="fas fa-download"></i> Generar Reporte Anual
                </button>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-database"></i>
                        Exportar Datos
                    </h3>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">
                    Exporta todos tus datos en formato CSV
                </p>
                <button class="btn-secondary btn-full" onclick="exportarDatos()">
                    <i class="fas fa-file-csv"></i> Exportar a CSV
                </button>
            </div>
        </div>
    `;
}

function configurarReportes() {
    // Configuración adicional si es necesaria
}

function generarReporte(tipo) {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    
    let fechaInicio, fechaFin;
    const hoy = new Date();
    
    switch(tipo) {
        case 'semanal':
            fechaInicio = new Date(hoy);
            fechaInicio.setDate(hoy.getDate() - 7);
            fechaFin = hoy;
            break;
        case 'mensual':
            fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            fechaFin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
            break;
        case 'anual':
            fechaInicio = new Date(hoy.getFullYear(), 0, 1);
            fechaFin = new Date(hoy.getFullYear(), 11, 31);
            break;
    }
    
    const registrosFiltrados = registros.filter(r => {
        const fecha = new Date(r.fecha);
        return fecha >= fechaInicio && fecha <= fechaFin;
    });
    
    const consumoTotal = registrosFiltrados.reduce((sum, r) => sum + r.consumo, 0);
    const costoTotal = registrosFiltrados.reduce((sum, r) => sum + r.costo, 0);
    
    let reporte = `ENERGIX SMART - Reporte ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}\n`;
    reporte += `==============================================\n\n`;
    reporte += `Usuario: ${sesion.nombre}\n`;
    reporte += `Email: ${sesion.email}\n`;
    reporte += `Fecha de generación: ${new Date().toLocaleString('es-CO')}\n`;
    reporte += `Período: ${fechaInicio.toLocaleDateString('es-CO')} - ${fechaFin.toLocaleDateString('es-CO')}\n\n`;
    reporte += `RESUMEN\n`;
    reporte += `-------\n`;
    reporte += `Consumo Total: ${consumoTotal.toFixed(2)} kWh\n`;
    reporte += `Costo Total: ${formatearMoneda(costoTotal)}\n`;
    reporte += `Número de Registros: ${registrosFiltrados.length}\n`;
    reporte += `Promedio Diario: ${(consumoTotal / Math.max(1, registrosFiltrados.length)).toFixed(2)} kWh\n\n`;
    reporte += `DETALLE DE REGISTROS\n`;
    reporte += `--------------------\n`;
    reporte += `Fecha\t\t\tConsumo (kWh)\tCosto (COP)\n`;
    
    registrosFiltrados.forEach(r => {
        const fecha = new Date(r.fecha);
        reporte += `${fecha.toLocaleString('es-CO')}\t${r.consumo.toFixed(2)}\t\t${r.costo.toFixed(0)}\n`;
    });
    
    const blob = new Blob([reporte], { type: 'text/plain;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energix_reporte_${tipo}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    mostrarNotificacion('success', 'Reporte Generado', 
        `Se ha generado el reporte ${tipo} con ${registrosFiltrados.length} registros.`
    );
}

function exportarDatos() {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    
    if (registros.length === 0) {
        mostrarNotificacion('warning', 'Sin Datos', 
            'No tienes registros de consumo para exportar.'
        );
        return;
    }
    
    let csv = 'Datos de Consumo - ENERGIX SMART\n';
    csv += `Usuario: ${sesion.nombre}\n`;
    csv += `Email: ${sesion.email}\n`;
    csv += `Fecha de Exportación: ${new Date().toLocaleString('es-CO')}\n\n`;
    csv += 'Fecha,Hora,Consumo (kWh),Costo (COP)\n';
    
    registros.forEach(r => {
        const fecha = new Date(r.fecha);
        csv += `${fecha.toLocaleDateString('es-CO')},${fecha.toLocaleTimeString('es-CO')},${r.consumo},${r.costo}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energix_datos_${sesion.email}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    mostrarNotificacion('success', 'Datos Exportados', 
        `Se han exportado ${registros.length} registros correctamente.`
    );
}
