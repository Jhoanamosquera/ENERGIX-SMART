// ============================================
// VISTA: REPORTES
// ============================================

function generarVistaReportes() {
    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-file-pdf"></i> Centro de Reportes</h1>
                <p>Genera reportes profesionales en PDF con análisis detallado de tu consumo energético</p>
            </div>
            <div class="page-actions">
                <button class="btn-secondary" onclick="programarReporte()">
                    <i class="fas fa-clock"></i> Programar
                </button>
                <button class="btn-secondary" onclick="configurarReportes()">
                    <i class="fas fa-cog"></i> Configurar
                </button>
            </div>
        </div>

        <!-- Reportes Rápidos -->
        <div class="quick-reports">
            <div class="quick-report-item">
                <div class="report-icon weekly">
                    <i class="fas fa-calendar-week"></i>
                </div>
                <div class="report-info">
                    <h3>Reporte Semanal</h3>
                    <p>Últimos 7 días con gráficos y tendencias</p>
                </div>
                <button class="btn-report" onclick="generarReportePDF('semanal')">
                    <i class="fas fa-download"></i> Generar PDF
                </button>
            </div>
            
            <div class="quick-report-item">
                <div class="report-icon monthly">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="report-info">
                    <h3>Reporte Mensual</h3>
                    <p>Análisis completo del mes actual</p>
                </div>
                <button class="btn-report" onclick="generarReportePDF('mensual')">
                    <i class="fas fa-download"></i> Generar PDF
                </button>
            </div>
            
            <div class="quick-report-item">
                <div class="report-icon annual">
                    <i class="fas fa-calendar"></i>
                </div>
                <div class="report-info">
                    <h3>Reporte Anual</h3>
                    <p>Resumen ejecutivo del año completo</p>
                </div>
                <button class="btn-report" onclick="generarReportePDF('anual')">
                    <i class="fas fa-download"></i> Generar PDF
                </button>
            </div>
        </div>

        <!-- Reportes Personalizados -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-sliders-h"></i> Reporte Personalizado
                </h3>
                <p class="card-description">Crea reportes con parámetros específicos según tus necesidades</p>
            </div>
            <div class="card-body">
                <div class="custom-report-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Período del Reporte</label>
                            <select id="reportPeriodo" class="form-control">
                                <option value="custom">Personalizado</option>
                                <option value="last7">Últimos 7 días</option>
                                <option value="last30">Últimos 30 días</option>
                                <option value="thisMonth">Este mes</option>
                                <option value="lastMonth">Mes anterior</option>
                                <option value="thisYear">Este año</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="customDateRange" style="display: none;">
                            <label>Rango de Fechas</label>
                            <div class="date-range">
                                <input type="date" id="fechaInicio" class="form-control">
                                <span>hasta</span>
                                <input type="date" id="fechaFin" class="form-control">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tipo de Análisis</label>
                            <div class="analysis-options">
                                <label class="checkbox-option">
                                    <input type="checkbox" checked> Consumo y costos
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox" checked> Gráficos de tendencias
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox" checked> Comparación con períodos anteriores
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox"> Análisis de picos de consumo
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox"> Recomendaciones de ahorro
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox"> Proyecciones futuras
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Formato del Reporte</label>
                            <div class="format-options">
                                <label class="radio-option">
                                    <input type="radio" name="reportFormat" value="ejecutivo" checked>
                                    <div class="option-content">
                                        <span class="option-title">Ejecutivo</span>
                                        <span class="option-desc">Resumen de 2-3 páginas</span>
                                    </div>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="reportFormat" value="detallado">
                                    <div class="option-content">
                                        <span class="option-title">Detallado</span>
                                        <span class="option-desc">Análisis completo con gráficos</span>
                                    </div>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="reportFormat" value="tecnico">
                                    <div class="option-content">
                                        <span class="option-title">Técnico</span>
                                        <span class="option-desc">Datos técnicos y estadísticas</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn-secondary" onclick="previsualizarReporte()">
                            <i class="fas fa-eye"></i> Vista Previa
                        </button>
                        <button class="btn-primary" onclick="generarReportePersonalizado()">
                            <i class="fas fa-file-pdf"></i> Generar Reporte PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Exportación de Datos -->
        <div class="export-section">
            <h3><i class="fas fa-database"></i> Exportación de Datos</h3>
            <div class="export-options">
                <div class="export-option">
                    <div class="export-icon csv">
                        <i class="fas fa-file-csv"></i>
                    </div>
                    <div class="export-content">
                        <h4>Datos en CSV</h4>
                        <p>Exporta todos tus registros para análisis en Excel</p>
                    </div>
                    <button class="btn-export" onclick="exportarDatos('csv')">
                        <i class="fas fa-download"></i> Descargar CSV
                    </button>
                </div>
                
                <div class="export-option">
                    <div class="export-icon json">
                        <i class="fas fa-code"></i>
                    </div>
                    <div class="export-content">
                        <h4>Datos en JSON</h4>
                        <p>Formato estructurado para desarrolladores</p>
                    </div>
                    <button class="btn-export" onclick="exportarDatos('json')">
                        <i class="fas fa-download"></i> Descargar JSON
                    </button>
                </div>
                
                <div class="export-option">
                    <div class="export-icon backup">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="export-content">
                        <h4>Respaldo Completo</h4>
                        <p>Incluye configuración y todos los datos</p>
                    </div>
                    <button class="btn-export" onclick="exportarRespaldoCompleto()">
                        <i class="fas fa-download"></i> Crear Respaldo
                    </button>
                </div>
            </div>
        </div>

        <!-- Historial de Reportes -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-history"></i> Historial de Reportes
                </h3>
                <div class="card-actions">
                    <button class="btn-secondary btn-sm" onclick="limpiarHistorial()">
                        <i class="fas fa-trash"></i> Limpiar
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div id="historialReportes" class="reports-history">
                    <!-- Se llena dinámicamente -->
                </div>
            </div>
        </div>
    `;
}

function configurarReportes() {
    // Mostrar modal de configuración
    mostrarNotificacion('info', 'Configuración', 'Abriendo configuración de reportes automáticos');
}

// Función principal para generar reportes PDF
function generarReportePDF(tipo) {
    mostrarNotificacion('info', 'Generando Reporte', 'Creando documento PDF profesional...');
    
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    
    let fechaInicio, fechaFin, titulo;
    const hoy = new Date();
    
    switch(tipo) {
        case 'semanal':
            fechaInicio = new Date(hoy);
            fechaInicio.setDate(hoy.getDate() - 7);
            fechaFin = hoy;
            titulo = 'Reporte Semanal de Consumo Energético';
            break;
        case 'mensual':
            fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            fechaFin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
            titulo = 'Reporte Mensual de Consumo Energético';
            break;
        case 'anual':
            fechaInicio = new Date(hoy.getFullYear(), 0, 1);
            fechaFin = new Date(hoy.getFullYear(), 11, 31);
            titulo = 'Reporte Anual de Consumo Energético';
            break;
    }
    
    const registrosFiltrados = registros.filter(r => {
        const fecha = new Date(r.fecha);
        return fecha >= fechaInicio && fecha <= fechaFin;
    });
    
    // Usar la función de exportación PDF existente
    if (typeof exportToPDF === 'function') {
        exportToPDF(tipo, registrosFiltrados, titulo, fechaInicio, fechaFin);
    } else {
        // Fallback: generar PDF básico
        generarPDFBasico(tipo, registrosFiltrados, titulo, fechaInicio, fechaFin);
    }
}

function generarPDFBasico(tipo, registrosFiltrados, titulo, fechaInicio, fechaFin) {
    const sesion = obtenerSesion();
    
    // Crear contenido HTML para convertir a PDF
    const consumoTotal = registrosFiltrados.reduce((sum, r) => sum + r.consumo, 0);
    const costoTotal = registrosFiltrados.reduce((sum, r) => sum + r.costo, 0);
    const promedioDiario = consumoTotal / Math.max(1, registrosFiltrados.length);
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${titulo}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #00C853; padding-bottom: 20px; }
                .logo { color: #00C853; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .title { font-size: 20px; margin-bottom: 10px; }
                .subtitle { color: #666; font-size: 14px; }
                .info-section { margin: 30px 0; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
                .info-item { padding: 15px; background: #f5f5f5; border-radius: 8px; }
                .info-label { font-weight: bold; color: #00C853; }
                .info-value { font-size: 18px; margin-top: 5px; }
                .summary-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .summary-table th, .summary-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                .summary-table th { background: #00C853; color: white; }
                .recommendations { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">⚡ ENERGIX SMART</div>
                <div class="title">${titulo}</div>
                <div class="subtitle">Sistema de Monitoreo Energético Residencial</div>
            </div>
            
            <div class="info-section">
                <h3>Información del Usuario</h3>
                <p><strong>Usuario:</strong> ${sesion.nombre}</p>
                <p><strong>Email:</strong> ${sesion.email}</p>
                <p><strong>Fecha de generación:</strong> ${new Date().toLocaleString('es-CO')}</p>
                <p><strong>Período:</strong> ${fechaInicio.toLocaleDateString('es-CO')} - ${fechaFin.toLocaleDateString('es-CO')}</p>
            </div>
            
            <div class="info-section">
                <h3>Resumen Ejecutivo</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Consumo Total</div>
                        <div class="info-value">${consumoTotal.toFixed(2)} kWh</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Costo Total</div>
                        <div class="info-value">${formatearMoneda(costoTotal)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Registros</div>
                        <div class="info-value">${registrosFiltrados.length}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Promedio Diario</div>
                        <div class="info-value">${promedioDiario.toFixed(2)} kWh</div>
                    </div>
                </div>
            </div>
            
            ${registrosFiltrados.length > 0 ? `
                <div class="info-section">
                    <h3>Detalle de Registros</h3>
                    <table class="summary-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Consumo (kWh)</th>
                                <th>Costo (COP)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${registrosFiltrados.slice(0, 20).map(r => `
                                <tr>
                                    <td>${new Date(r.fecha).toLocaleString('es-CO')}</td>
                                    <td>${r.consumo.toFixed(2)}</td>
                                    <td>${formatearMoneda(r.costo)}</td>
                                </tr>
                            `).join('')}
                            ${registrosFiltrados.length > 20 ? `
                                <tr>
                                    <td colspan="3" style="text-align: center; font-style: italic;">
                                        ... y ${registrosFiltrados.length - 20} registros más
                                    </td>
                                </tr>
                            ` : ''}
                        </tbody>
                    </table>
                </div>
            ` : ''}
            
            <div class="recommendations">
                <h3>Recomendaciones</h3>
                <ul>
                    <li>Mantén un consumo constante para optimizar costos energéticos</li>
                    <li>Considera el uso de dispositivos LED para reducir el consumo</li>
                    <li>Programa electrodomésticos en horarios de menor tarifa</li>
                    <li>Revisa periódicamente el estado de tus equipos eléctricos</li>
                </ul>
            </div>
            
            <div class="footer">
                Generado por ENERGIX SMART - Sistema de Monitoreo Energético<br>
                Universidad Nacional Abierta y a Distancia (UNAD) - Proyecto de Grado 2026
            </div>
        </body>
        </html>
    `;
    
    // Crear y descargar el PDF usando window.print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Configurar para imprimir como PDF
    printWindow.onload = function() {
        printWindow.print();
        setTimeout(() => printWindow.close(), 1000);
    };
    
    // Guardar en historial
    const nombreArchivo = `ENERGIX_${tipo}_${new Date().toISOString().split('T')[0]}.pdf`;
    guardarEnHistorial(tipo, nombreArchivo, registrosFiltrados.length);
    
    mostrarNotificacion('success', 'Reporte Generado', 
        `Se ha generado el reporte ${tipo} en PDF con ${registrosFiltrados.length} registros.`
    );
}

function generarReportePersonalizado() {
    const periodo = document.getElementById('reportPeriodo').value;
    const formato = document.querySelector('input[name="reportFormat"]:checked').value;
    
    mostrarNotificacion('info', 'Generando Reporte Personalizado', 
        `Creando reporte ${formato} para el período ${periodo}...`);
    
    // Simular generación
    setTimeout(() => {
        generarReportePDF('mensual'); // Por ahora usar el mensual como base
    }, 1000);
}

function previsualizarReporte() {
    mostrarNotificacion('info', 'Vista Previa', 'Generando vista previa del reporte...');
}

function exportarDatos(formato) {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    
    if (registros.length === 0) {
        mostrarNotificacion('warning', 'Sin Datos', 'No tienes registros de consumo para exportar.');
        return;
    }
    
    let contenido, mimeType, extension;
    
    switch(formato) {
        case 'csv':
            contenido = generarCSV(registros, sesion);
            mimeType = 'text/csv;charset=utf-8;';
            extension = 'csv';
            break;
        case 'json':
            contenido = JSON.stringify({
                usuario: sesion.nombre,
                email: sesion.email,
                fechaExportacion: new Date().toISOString(),
                registros: registros
            }, null, 2);
            mimeType = 'application/json;charset=utf-8;';
            extension = 'json';
            break;
    }
    
    const blob = new Blob([contenido], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energix_datos_${sesion.email}_${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    mostrarNotificacion('success', 'Datos Exportados', 
        `Se han exportado ${registros.length} registros en formato ${formato.toUpperCase()}.`);
}

function generarCSV(registros, sesion) {
    let csv = 'Datos de Consumo - ENERGIX SMART\n';
    csv += `Usuario: ${sesion.nombre}\n`;
    csv += `Email: ${sesion.email}\n`;
    csv += `Fecha de Exportación: ${new Date().toLocaleString('es-CO')}\n\n`;
    csv += 'Fecha,Hora,Consumo (kWh),Costo (COP)\n';
    
    registros.forEach(r => {
        const fecha = new Date(r.fecha);
        csv += `${fecha.toLocaleDateString('es-CO')},${fecha.toLocaleTimeString('es-CO')},${r.consumo},${r.costo}\n`;
    });
    
    return csv;
}

function exportarRespaldoCompleto() {
    const sesion = obtenerSesion();
    const respaldo = {
        version: '1.0',
        fechaRespaldo: new Date().toISOString(),
        usuario: sesion,
        registros: obtenerConsumoUsuario(sesion.email),
        configuracion: JSON.parse(localStorage.getItem(`energix_config_${sesion.email}`) || '{}'),
        gamificacion: JSON.parse(localStorage.getItem(`energix_gamification_${sesion.email}`) || '{}'),
        metas: JSON.parse(localStorage.getItem(`energix_goals_${sesion.email}`) || '{}')
    };
    
    const blob = new Blob([JSON.stringify(respaldo, null, 2)], { type: 'application/json;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energix_respaldo_completo_${sesion.email}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    mostrarNotificacion('success', 'Respaldo Creado', 'Se ha creado el respaldo completo de todos tus datos.');
}

function guardarEnHistorial(tipo, archivo, registros) {
    const historial = JSON.parse(localStorage.getItem('energix_reportes_historial') || '[]');
    historial.unshift({
        id: Date.now(),
        tipo: tipo,
        archivo: archivo,
        registros: registros,
        fecha: new Date().toISOString()
    });
    
    // Mantener solo los últimos 10 reportes
    if (historial.length > 10) {
        historial.splice(10);
    }
    
    localStorage.setItem('energix_reportes_historial', JSON.stringify(historial));
    actualizarHistorialUI();
}

function actualizarHistorialUI() {
    const historial = JSON.parse(localStorage.getItem('energix_reportes_historial') || '[]');
    const container = document.getElementById('historialReportes');
    
    if (!container) return;
    
    if (historial.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-pdf"></i>
                <p>No hay reportes generados aún</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = historial.map(item => `
        <div class="history-item">
            <div class="history-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <div class="history-content">
                <h4>${item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}</h4>
                <p>${item.registros} registros • ${new Date(item.fecha).toLocaleString('es-CO')}</p>
            </div>
            <div class="history-actions">
                <button class="btn-sm btn-secondary" onclick="regenerarReporte('${item.tipo}')">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function limpiarHistorial() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial de reportes?')) {
        localStorage.removeItem('energix_reportes_historial');
        actualizarHistorialUI();
        mostrarNotificacion('success', 'Historial Limpiado', 'El historial de reportes ha sido eliminado.');
    }
}

function regenerarReporte(tipo) {
    generarReportePDF(tipo);
}

function programarReporte() {
    mostrarNotificacion('info', 'Programación', 'Función de programación de reportes automáticos próximamente disponible.');
}

// Inicializar historial al cargar la vista
setTimeout(() => {
    actualizarHistorialUI();
}, 100);

// Event listener para el selector de período
document.addEventListener('change', function(e) {
    if (e.target.id === 'reportPeriodo') {
        const customRange = document.getElementById('customDateRange');
        if (customRange) {
            if (e.target.value === 'custom') {
                customRange.style.display = 'block';
            } else {
                customRange.style.display = 'none';
            }
        }
    }
});

// Mantener compatibilidad con función anterior
function generarReporte(tipo) {
    generarReportePDF(tipo);
}
