// ============================================
// EXPORTACIÓN AVANZADA A PDF
// Generar PDFs de reportes con gráficos usando jsPDF
// ============================================

class PDFExporter {
    constructor() {
        this.loaded = false;
        this.loadLibrary();
    }

    async loadLibrary() {
        if (typeof jspdf === 'undefined') {
            // Cargar jsPDF dinámicamente
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                this.loaded = true;
            };
            document.head.appendChild(script);
        } else {
            this.loaded = true;
        }
    }

    async waitForLibrary() {
        while (!this.loaded) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    async generateReport(tipo = 'mensual') {
        await this.waitForLibrary();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const sesion = obtenerSesion();
        const registros = obtenerConsumoUsuario(sesion.email);
        const stats = calcularEstadisticas(registros);

        // Configuración
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = margin;

        // Header
        doc.setFillColor(0, 200, 83);
        doc.rect(0, 0, pageWidth, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('⚡ ENERGIX SMART', margin, 20);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Reporte de Consumo Energético', margin, 30);

        yPos = 50;

        // Información del usuario
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Usuario:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(sesion.nombre, margin + 25, yPos);
        
        yPos += 7;
        doc.setFont('helvetica', 'bold');
        doc.text('Email:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(sesion.email, margin + 25, yPos);
        
        yPos += 7;
        doc.setFont('helvetica', 'bold');
        doc.text('Fecha:', margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(new Date().toLocaleDateString('es-CO', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }), margin + 25, yPos);

        yPos += 15;

        // Línea separadora
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        // Resumen Ejecutivo
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 200, 83);
        doc.text('Resumen Ejecutivo', margin, yPos);
        yPos += 10;

        // KPIs en cajas
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        const kpis = [
            { label: 'Consumo del Mes', value: `${stats.consumoMes.toFixed(2)} kWh`, color: [33, 150, 243] },
            { label: 'Costo Estimado', value: formatearMoneda(stats.costoMes), color: [255, 152, 0] },
            { label: 'Ahorro vs Mes Anterior', value: `${stats.ahorro.toFixed(1)}%`, color: stats.ahorro > 0 ? [76, 175, 80] : [244, 67, 54] }
        ];

        const boxWidth = (pageWidth - 2 * margin - 20) / 3;
        let xPos = margin;

        kpis.forEach((kpi, index) => {
            // Caja
            doc.setFillColor(kpi.color[0], kpi.color[1], kpi.color[2]);
            doc.roundedRect(xPos, yPos, boxWidth, 25, 3, 3, 'F');
            
            // Texto
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.text(kpi.label, xPos + 5, yPos + 8);
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(kpi.value, xPos + 5, yPos + 18);
            
            xPos += boxWidth + 10;
        });

        yPos += 35;

        // Estadísticas Detalladas
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 200, 83);
        doc.text('Estadísticas Detalladas', margin, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');

        const detalles = [
            { label: 'Total de Registros:', value: registros.length.toString() },
            { label: 'Consumo Hoy:', value: `${stats.consumoHoy.toFixed(2)} kWh` },
            { label: 'Proyección Mensual:', value: `${stats.proyeccion.toFixed(2)} kWh` },
            { label: 'Costo Proyectado:', value: formatearMoneda(stats.costoProyeccion) },
            { label: 'Consumo Mes Anterior:', value: `${stats.consumoMesAnterior.toFixed(2)} kWh` },
            { label: 'Diferencia:', value: `${(stats.consumoMes - stats.consumoMesAnterior).toFixed(2)} kWh` }
        ];

        detalles.forEach(detalle => {
            doc.setFont('helvetica', 'bold');
            doc.text(detalle.label, margin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(detalle.value, margin + 60, yPos);
            yPos += 7;
        });

        yPos += 10;

        // Gráfico (captura del canvas si existe)
        const canvas = document.querySelector('canvas');
        if (canvas) {
            try {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                if (yPos + imgHeight > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                }
                
                doc.addImage(imgData, 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 10;
            } catch (error) {
                console.error('Error al capturar gráfico:', error);
            }
        }

        // Tabla de últimos registros
        if (yPos > pageHeight - 80) {
            doc.addPage();
            yPos = margin;
        }

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 200, 83);
        doc.text('Últimos 10 Registros', margin, yPos);
        yPos += 10;

        // Encabezados de tabla
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Fecha', margin + 2, yPos + 6);
        doc.text('Consumo', margin + 60, yPos + 6);
        doc.text('Costo', margin + 100, yPos + 6);
        
        yPos += 10;

        // Filas
        doc.setFont('helvetica', 'normal');
        const ultimos = registros.slice(-10).reverse();
        
        ultimos.forEach((registro, index) => {
            if (yPos > pageHeight - margin) {
                doc.addPage();
                yPos = margin;
            }

            if (index % 2 === 0) {
                doc.setFillColor(250, 250, 250);
                doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F');
            }

            const fecha = new Date(registro.fecha);
            doc.text(fecha.toLocaleString('es-CO'), margin + 2, yPos + 2);
            doc.text(`${registro.consumo.toFixed(2)} kWh`, margin + 60, yPos + 2);
            doc.text(formatearMoneda(registro.costo), margin + 100, yPos + 2);
            
            yPos += 8;
        });

        // Footer
        const footerY = pageHeight - 15;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.setFont('helvetica', 'italic');
        doc.text('Generado por ENERGIX SMART - Sistema de Monitoreo Energético', pageWidth / 2, footerY, { align: 'center' });
        doc.text(`Página 1 de ${doc.internal.getNumberOfPages()}`, pageWidth - margin, footerY, { align: 'right' });

        // Guardar
        const filename = `ENERGIX_Reporte_${tipo}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);

        return { success: true, filename };
    }

    async generateCustomReport(titulo, datos) {
        await this.waitForLibrary();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Implementación similar pero con datos personalizados
        // ... (código similar al anterior pero más flexible)

        const filename = `ENERGIX_${titulo}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);

        return { success: true, filename };
    }
}

// Instancia global
const pdfExporter = new PDFExporter();

// Función para exportar desde UI
async function exportarPDF(tipo = 'mensual') {
    try {
        mostrarNotificacion('info', 'Generando PDF', 'Por favor espera...');
        const result = await pdfExporter.generateReport(tipo);
        mostrarNotificacion('success', 'PDF Generado', `Archivo: ${result.filename}`);
        return result;
    } catch (error) {
        console.error('Error al generar PDF:', error);
        mostrarNotificacion('error', 'Error', 'No se pudo generar el PDF');
        return { success: false, error };
    }
}
