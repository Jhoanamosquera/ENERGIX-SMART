// ============================================
// GESTIÓN DE DATOS
// ============================================

const TARIFA_KWH = 700;

function generarDatosIniciales(email) {
    const key = `energix_consumo_${email}`;
    
    if (localStorage.getItem(key)) {
        return;
    }
    
    const registros = [];
    const hoy = new Date();
    
    for (let i = 29; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(fecha.getDate() - i);
        
        const numRegistros = Math.floor(Math.random() * 3) + 2;
        
        for (let j = 0; j < numRegistros; j++) {
            const hora = Math.floor(Math.random() * 24);
            const minuto = Math.floor(Math.random() * 60);
            
            fecha.setHours(hora, minuto, 0, 0);
            
            const consumo = (Math.random() * 3 + 0.5).toFixed(2);
            
            registros.push({
                id: Date.now() + Math.random(),
                fecha: fecha.toISOString(),
                consumo: parseFloat(consumo),
                costo: parseFloat(consumo) * TARIFA_KWH
            });
        }
    }
    
    localStorage.setItem(key, JSON.stringify(registros));
}

function obtenerConsumoUsuario(email) {
    const key = `energix_consumo_${email}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function guardarConsumoUsuario(email, registros) {
    const key = `energix_consumo_${email}`;
    localStorage.setItem(key, JSON.stringify(registros));
}

function calcularEstadisticas(registros) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    
    const mesAnteriorInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
    const mesAnteriorFin = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
    
    const consumoHoy = registros
        .filter(r => new Date(r.fecha) >= hoy)
        .reduce((sum, r) => sum + r.consumo, 0);
    
    const consumoMes = registros
        .filter(r => {
            const fecha = new Date(r.fecha);
            return fecha >= inicioMes && fecha <= finMes;
        })
        .reduce((sum, r) => sum + r.consumo, 0);
    
    const consumoMesAnterior = registros
        .filter(r => {
            const fecha = new Date(r.fecha);
            return fecha >= mesAnteriorInicio && fecha <= mesAnteriorFin;
        })
        .reduce((sum, r) => sum + r.consumo, 0);
    
    const diasTranscurridos = hoy.getDate();
    const diasMes = finMes.getDate();
    const promedioMes = consumoMes / diasTranscurridos;
    const proyeccion = promedioMes * diasMes;
    
    const ahorro = consumoMesAnterior > 0 
        ? ((consumoMesAnterior - consumoMes) / consumoMesAnterior * 100)
        : 0;
    
    return {
        consumoHoy,
        costoHoy: consumoHoy * TARIFA_KWH,
        consumoMes,
        costoMes: consumoMes * TARIFA_KWH,
        proyeccion,
        costoProyeccion: proyeccion * TARIFA_KWH,
        ahorro,
        consumoMesAnterior,
        costoMesAnterior: consumoMesAnterior * TARIFA_KWH
    };
}

function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);
}
