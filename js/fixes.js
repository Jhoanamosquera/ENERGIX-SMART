// ============================================
// CORRECCIONES Y PARCHES
// ============================================

// Asegurar que las funciones globales estén disponibles
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que todas las funciones necesarias estén disponibles
    console.log('✓ Verificando funciones globales...');
    
    // Verificar gamification
    if (typeof gamificationManager === 'undefined') {
        console.log('⚠ gamificationManager no inicializado (se inicializará al cargar sesión)');
    }
    
    // Verificar goals
    if (typeof goalsManager === 'undefined') {
        console.log('⚠ goalsManager no inicializado (se inicializará al cargar sesión)');
    }
    
    // Verificar savingsCalculator
    if (typeof savingsCalculator === 'undefined') {
        console.error('✗ savingsCalculator no está definido');
    } else {
        console.log('✓ savingsCalculator disponible');
    }
});

// Parche para asegurar que clima funcione correctamente
if (typeof generarVistaClima !== 'undefined') {
    const originalGenerarVistaClima = generarVistaClima;
    generarVistaClima = async function() {
        try {
            return await originalGenerarVistaClima();
        } catch (error) {
            console.error('Error en generarVistaClima:', error);
            return `
                <div class="page-header">
                    <div>
                        <h1><i class="fas fa-cloud-sun"></i> Clima y Eficiencia Energética</h1>
                        <p>Error al cargar la vista de clima</p>
                    </div>
                </div>
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Error</strong>
                        <p>No se pudo cargar la vista de clima. Por favor, recarga la página.</p>
                    </div>
                </div>
            `;
        }
    };
}

// Función auxiliar para debugging
window.debugEnergix = function() {
    console.log('=== ENERGIX DEBUG ===');
    console.log('weatherWidget:', typeof weatherWidget !== 'undefined' ? 'OK' : 'ERROR');
    console.log('gamificationManager:', typeof gamificationManager !== 'undefined' ? 'OK' : 'NO INIT');
    console.log('goalsManager:', typeof goalsManager !== 'undefined' ? 'OK' : 'NO INIT');
    console.log('savingsCalculator:', typeof savingsCalculator !== 'undefined' ? 'OK' : 'ERROR');
    console.log('Chart:', typeof Chart !== 'undefined' ? 'OK' : 'ERROR');
    console.log('====================');
};

// Agregar manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error global capturado:', e.error);
    if (e.error && e.error.message && e.error.message.includes('generarVista')) {
        mostrarNotificacion('error', 'Error', 'Hubo un problema al cargar la vista. Por favor, intenta de nuevo.');
    }
});

// Asegurar que las funciones de calculadora estén disponibles
window.adjustValue = function(inputId, delta) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const currentValue = parseInt(input.value);
    const newValue = Math.max(parseInt(input.min), Math.min(parseInt(input.max), currentValue + delta));
    input.value = newValue;
    
    // Auto-calcular si es necesario
    if (inputId.includes('led') && typeof calcularAhorroLED !== 'undefined') calcularAhorroLED();
    if (inputId.includes('ac') && typeof calcularAhorroAC !== 'undefined') calcularAhorroAC();
};

window.adjustTemp = function(inputId, delta) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(inputId + '_display');
    if (!input || !display) return;
    const currentValue = parseInt(input.value);
    const newValue = Math.max(16, Math.min(30, currentValue + delta));
    input.value = newValue;
    display.textContent = newValue;
    if (typeof calcularAhorroAC !== 'undefined') calcularAhorroAC();
};

window.updateACHours = function(value) {
    const display = document.getElementById('calc_ac_horas_display');
    if (display) display.textContent = value;
    if (typeof calcularAhorroAC !== 'undefined') calcularAhorroAC();
};

window.updatePhantomTotal = function() {
    const checkboxes = document.querySelectorAll('.device-checkbox input[type="checkbox"]');
    let total = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) {
            total += parseInt(cb.dataset.consumption);
        }
    });
    const totalEl = document.getElementById('phantom_total');
    if (totalEl) totalEl.textContent = total + 'W';
};

console.log('✓ Correcciones y parches cargados');
