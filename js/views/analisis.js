// ============================================
// VISTA: ANÁLISIS DE CONSUMO
// ============================================

function generarVistaAnalisis() {
    return `
        <div class="page-header">
            <h1><i class="fas fa-chart-bar"></i> Análisis de Consumo</h1>
            <p>Análisis detallado de tus patrones de consumo energético</p>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-calendar-week"></i>
                        Consumo por Día de la Semana
                    </h3>
                </div>
                <div class="chart-container">
                    <canvas id="chartConsumoSemanal"></canvas>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-clock"></i>
                        Consumo por Hora del Día
                    </h3>
                </div>
                <div class="chart-container">
                    <canvas id="chartConsumoHorario"></canvas>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-line"></i>
                    Tendencia Mensual
                </h3>
            </div>
            <div class="chart-container" style="height: 350px;">
                <canvas id="chartTendenciaMensual"></canvas>
            </div>
        </div>
        
        <div class="grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-percentage"></i>
                        Distribución de Consumo
                    </h3>
                </div>
                <div class="chart-container">
                    <canvas id="chartDistribucion"></canvas>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-info-circle"></i>
                        Insights
                    </h3>
                </div>
                <div id="insightsConsumo"></div>
            </div>
        </div>
    `;
}
