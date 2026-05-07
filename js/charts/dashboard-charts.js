// ============================================
// GRÁFICOS DEL DASHBOARD
// ============================================

function inicializarGraficosDashboard(periodo = 'diario') {
    const sesion = obtenerSesion();
    const registros = obtenerConsumoUsuario(sesion.email);
    const hoy = new Date();
    let labels = [], consumoData = [], promedioData = [];

    if (periodo === 'diario') {
        for (let i = 6; i >= 0; i--) {
            const fecha = new Date(hoy);
            fecha.setDate(fecha.getDate() - i);
            fecha.setHours(0, 0, 0, 0);
            const sig = new Date(fecha); sig.setDate(sig.getDate() + 1);
            const c = registros.filter(r => { const f = new Date(r.fecha); return f >= fecha && f < sig; }).reduce((s, r) => s + r.consumo, 0);
            labels.push(fecha.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric' }));
            consumoData.push(c.toFixed(2));
            promedioData.push((Math.random() * 2 + 8).toFixed(2));
        }
    } else if (periodo === 'semanal') {
        for (let i = 3; i >= 0; i--) {
            const inicio = new Date(hoy); inicio.setDate(inicio.getDate() - (i * 7 + 6));
            const fin = new Date(hoy); fin.setDate(fin.getDate() - (i * 7));
            const c = registros.filter(r => { const f = new Date(r.fecha); return f >= inicio && f <= fin; }).reduce((s, r) => s + r.consumo, 0);
            labels.push(`Sem ${4 - i}`);
            consumoData.push(c.toFixed(2));
            promedioData.push((Math.random() * 10 + 60).toFixed(2));
        }
    } else {
        for (let i = 5; i >= 0; i--) {
            const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
            const fin = new Date(hoy.getFullYear(), hoy.getMonth() - i + 1, 0);
            const c = registros.filter(r => { const f = new Date(r.fecha); return f >= fecha && f <= fin; }).reduce((s, r) => s + r.consumo, 0);
            labels.push(fecha.toLocaleDateString('es-CO', { month: 'short' }));
            consumoData.push(c.toFixed(2));
            promedioData.push((Math.random() * 30 + 270).toFixed(2));
        }
    }

    const ctx = document.getElementById('chartConsumo7Dias');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    { label: 'Tu Consumo', data: consumoData, borderColor: '#00C853', backgroundColor: 'rgba(0,200,83,0.1)', tension: 0.4, fill: true, pointRadius: 5, pointHoverRadius: 7 },
                    { label: 'Promedio Hogares', data: promedioData, borderColor: '#00BFA5', backgroundColor: 'rgba(0,191,165,0.05)', tension: 0.4, fill: true, pointRadius: 4, pointHoverRadius: 6, borderDash: [5, 5] }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#B0BEC5', font: { family: 'Inter' } } },
                    tooltip: { backgroundColor: '#152535', titleColor: '#fff', bodyColor: '#B0BEC5', borderColor: '#1E3A4A', borderWidth: 1,
                        callbacks: { label: c => c.dataset.label + ': ' + c.parsed.y + ' kWh' } }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#B0BEC5', callback: v => v + ' kWh' }, grid: { color: '#1E3A4A' } },
                    x: { ticks: { color: '#B0BEC5' }, grid: { color: '#1E3A4A' } }
                }
            }
        });
    }

    // Comparación mensual
    const ctx2 = document.getElementById('chartComparacionMensual');
    if (ctx2) {
        const meses = [], datos = [];
        for (let i = 5; i >= 0; i--) {
            const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
            const fin = new Date(hoy.getFullYear(), hoy.getMonth() - i + 1, 0);
            const c = registros.filter(r => { const f = new Date(r.fecha); return f >= fecha && f <= fin; }).reduce((s, r) => s + r.consumo, 0);
            meses.push(fecha.toLocaleDateString('es-CO', { month: 'short' }));
            datos.push(c.toFixed(2));
        }
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{ label: 'Consumo (kWh)', data: datos,
                    backgroundColor: datos.map((_, i) => i === datos.length - 1 ? 'rgba(0,200,83,0.9)' : 'rgba(0,200,83,0.35)'),
                    borderColor: '#00C853', borderWidth: 2, borderRadius: 8 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: '#152535', titleColor: '#fff', bodyColor: '#B0BEC5', borderColor: '#1E3A4A', borderWidth: 1,
                        callbacks: { label: c => 'Consumo: ' + c.parsed.y + ' kWh · ' + formatearMoneda(c.parsed.y * TARIFA_KWH) } }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#B0BEC5', callback: v => v + ' kWh' }, grid: { color: '#1E3A4A' } },
                    x: { ticks: { color: '#B0BEC5' }, grid: { display: false } }
                }
            }
        });
    }

    // Alertas recientes
    const alertasDiv = document.getElementById('alertasRecientes');
    if (alertasDiv) {
        alertasDiv.innerHTML = `
            <div style="display:grid;gap:12px;">
                <div class="alert-item warning"><div class="alert-icon orange"><i class="fas fa-exclamation-triangle"></i></div><div class="alert-content"><div class="alert-title">Consumo Elevado</div><div class="alert-description">Tu consumo de hoy está 12% por encima del promedio</div></div></div>
                <div class="alert-item"><div class="alert-icon blue"><i class="fas fa-info-circle"></i></div><div class="alert-content"><div class="alert-title">Recomendación</div><div class="alert-description">Considera usar electrodomésticos en horario valle</div></div></div>
                <div class="alert-item"><div class="alert-icon green"><i class="fas fa-check-circle"></i></div><div class="alert-content"><div class="alert-title">Buen Trabajo</div><div class="alert-description">Has mantenido un consumo eficiente esta semana</div></div></div>
            </div>`;
    }

    // Recomendaciones del día
    const recomDiv = document.getElementById('recomendacionesDia');
    if (recomDiv) {
        recomDiv.innerHTML = `
            <div style="display:grid;gap:12px;">
                <div class="recommendation-card"><div class="recommendation-header"><div class="recommendation-icon"><i class="fas fa-lightbulb"></i></div><div class="recommendation-title">Apaga las luces innecesarias</div></div><div class="recommendation-description">Revisa que no haya luces encendidas en habitaciones vacías. Ahorra hasta un 10%.</div></div>
                <div class="recommendation-card"><div class="recommendation-header"><div class="recommendation-icon"><i class="fas fa-plug"></i></div><div class="recommendation-title">Desconecta cargadores</div></div><div class="recommendation-description">Los cargadores conectados sin dispositivos consumen energía fantasma.</div></div>
                <div class="recommendation-card"><div class="recommendation-header"><div class="recommendation-icon"><i class="fas fa-snowflake"></i></div><div class="recommendation-title">Optimiza el refrigerador</div></div><div class="recommendation-description">Mantén el refrigerador a 4°C y el congelador a -18°C.</div></div>
            </div>`;
    }
}

function inicializarGraficoHero() {
    const ctx = document.getElementById('heroChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Consumo',
                    data: [8.5, 9.2, 7.8, 10.1, 9.5, 11.2, 8.9],
                    borderColor: '#00C853',
                    backgroundColor: 'rgba(0, 200, 83, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { display: false }, x: { display: false } }
            }
        });
    }
}
