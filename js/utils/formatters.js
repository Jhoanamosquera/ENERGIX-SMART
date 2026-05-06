// ============================================
// FUNCIONES DE FORMATO
// ============================================

// Formatear fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Formatear fecha y hora
function formatearFechaHora(fecha) {
    return new Date(fecha).toLocaleString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Formatear número con decimales
function formatearNumero(numero, decimales = 2) {
    return parseFloat(numero).toFixed(decimales);
}
