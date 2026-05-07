// ============================================
// VISTA DE GAMIFICACIÓN
// ============================================

function generarVistaGamificacion() {
    if (!gamificationManager) {
        initGamification();
    }

    const nivel = gamificationManager.getCurrentLevel();
    const nextLevel = gamificationManager.getNextLevel();
    const progress = gamificationManager.getLevelProgress();
    const logrosDesbloqueados = gamificationManager.getUnlockedAchievements();
    const logrosBloqueados = gamificationManager.getLockedAchievements();
    const stats = gamificationManager.getStats();
    const ranking = getGlobalRanking();

    return `
        <div class="page-header">
            <div>
                <h1><i class="fas fa-trophy"></i> Sistema de Logros</h1>
                <p>Desbloquea logros y sube de nivel ahorrando energía</p>
            </div>
            <div class="page-actions">
                <button class="btn-secondary" onclick="mostrarTutorialLogros()">
                    <i class="fas fa-question-circle"></i> ¿Cómo funciona?
                </button>
            </div>
        </div>

        <!-- Estadísticas Rápidas -->
        <div class="stats-grid">
            <div class="stat-card primary">
                <div class="stat-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${gamificationManager.data.puntos}</div>
                    <div class="stat-label">Puntos Totales</div>
                </div>
            </div>
            <div class="stat-card success">
                <div class="stat-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${logrosDesbloqueados.length}</div>
                    <div class="stat-label">Logros Desbloqueados</div>
                </div>
            </div>
            <div class="stat-card warning">
                <div class="stat-icon">
                    <i class="fas fa-medal"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">${nivel.nivel}</div>
                    <div class="stat-label">Nivel Actual</div>
                </div>
            </div>
            <div class="stat-card info">
                <div class="stat-icon">
                    <i class="fas fa-ranking-star"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">#${ranking.findIndex(r => r.email === gamificationManager.sesion.email) + 1}</div>
                    <div class="stat-label">Posición Global</div>
                </div>
            </div>
        </div>

        <!-- Progreso de Nivel -->
        <div class="card level-progress-card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-chart-line"></i> Progreso de Nivel
                </h3>
            </div>
            <div class="card-body">
                <div class="level-display">
                    <div class="current-level">
                        <div class="level-badge" style="background: linear-gradient(135deg, ${nivel.color}, ${nivel.color}dd);">
                            <i class="fas ${nivel.icono}"></i>
                        </div>
                        <div class="level-info">
                            <h3>${nivel.nombre}</h3>
                            <p>Nivel ${nivel.nivel}</p>
                        </div>
                    </div>
                    
                    <div class="progress-section">
                        <div class="progress-header">
                            <span><strong>${gamificationManager.data.puntos}</strong> puntos</span>
                            ${nextLevel ? `<span>Siguiente: <strong>${nextLevel.minPuntos}</strong> puntos</span>` : '<span class="max-level">¡Nivel Máximo Alcanzado!</span>'}
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%; background: linear-gradient(90deg, ${nivel.color}, ${nextLevel?.color || nivel.color});"></div>
                            </div>
                            <div class="progress-percentage">${Math.round(progress)}%</div>
                        </div>
                        ${nextLevel ? `
                            <p class="progress-text">
                                <i class="fas fa-target"></i> 
                                Necesitas <strong>${nextLevel.minPuntos - gamificationManager.data.puntos}</strong> puntos más para alcanzar <strong>${nextLevel.nombre}</strong>
                            </p>
                        ` : `
                            <p class="progress-text max-level">
                                <i class="fas fa-crown"></i> 
                                ¡Felicitaciones! Has alcanzado el nivel máximo del sistema
                            </p>
                        `}
                    </div>

                    ${nextLevel ? `
                        <div class="next-level">
                            <div class="level-badge next" style="background: linear-gradient(135deg, ${nextLevel.color}, ${nextLevel.color}dd);">
                                <i class="fas ${nextLevel.icono}"></i>
                            </div>
                            <div class="level-info">
                                <h3>${nextLevel.nombre}</h3>
                                <p>Nivel ${nextLevel.nivel}</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>

        <!-- Logros Desbloqueados -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-trophy"></i> Logros Desbloqueados
                </h3>
                <div class="card-actions">
                    <span class="badge success">${logrosDesbloqueados.length} de ${logrosDesbloqueados.length + logrosBloqueados.length}</span>
                </div>
            </div>
            <div class="card-body">
                ${logrosDesbloqueados.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h3>¡Comienza tu aventura!</h3>
                        <p>Aún no has desbloqueado ningún logro. Registra tu consumo energético y comienza a ganar puntos.</p>
                        <button class="btn-primary" onclick="irAVista('consumo')">
                            <i class="fas fa-plus"></i> Registrar Consumo
                        </button>
                    </div>
                ` : `
                    <div class="achievements-grid">
                        ${logrosDesbloqueados.map(logro => `
                            <div class="achievement-card unlocked" data-achievement="${logro.id}">
                                <div class="achievement-glow" style="background: ${logro.color};"></div>
                                <div class="achievement-icon" style="background: ${logro.color};">
                                    <i class="fas ${logro.icono}"></i>
                                </div>
                                <div class="achievement-content">
                                    <h4>${logro.nombre}</h4>
                                    <p>${logro.descripcion}</p>
                                    <div class="achievement-meta">
                                        <span class="points">
                                            <i class="fas fa-star"></i> ${logro.puntos} puntos
                                        </span>
                                        <span class="status unlocked">
                                            <i class="fas fa-check-circle"></i> Desbloqueado
                                        </span>
                                    </div>
                                </div>
                                <div class="achievement-badge">
                                    <i class="fas fa-crown"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        </div>

        <!-- Próximos Logros -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-target"></i> Próximos Logros
                </h3>
                <div class="card-actions">
                    <span class="badge secondary">${logrosBloqueados.length} disponibles</span>
                </div>
            </div>
            <div class="card-body">
                <div class="achievements-grid">
                    ${logrosBloqueados.slice(0, 6).map(logro => `
                        <div class="achievement-card locked" data-achievement="${logro.id}">
                            <div class="achievement-icon locked">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div class="achievement-content">
                                <h4>Logro Misterioso</h4>
                                <p>${logro.descripcion}</p>
                                <div class="achievement-meta">
                                    <span class="points">
                                        <i class="fas fa-star"></i> ${logro.puntos} puntos
                                    </span>
                                    <span class="status locked">
                                        <i class="fas fa-lock"></i> Bloqueado
                                    </span>
                                </div>
                            </div>
                            <div class="achievement-hint">
                                <i class="fas fa-question-circle"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ${logrosBloqueados.length > 6 ? `
                    <div class="text-center" style="margin-top: 20px;">
                        <button class="btn-secondary" onclick="mostrarTodosLosLogros()">
                            <i class="fas fa-eye"></i> Ver todos los logros (${logrosBloqueados.length - 6} más)
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>

        <!-- Ranking Global -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">
                    <i class="fas fa-ranking-star"></i> Ranking Global de Ahorro
                </h3>
                <div class="card-actions">
                    <button class="btn-secondary btn-sm" onclick="actualizarRanking()">
                        <i class="fas fa-sync-alt"></i> Actualizar
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="ranking-container">
                    ${ranking.slice(0, 10).map((user, index) => {
                        const userLevel = LEVELS.find(l => l.nivel === user.nivel) || LEVELS[0];
                        const isCurrentUser = user.email === gamificationManager.sesion.email;
                        const medals = ['🥇', '🥈', '🥉'];
                        
                        return `
                            <div class="ranking-item ${isCurrentUser ? 'current-user' : ''}" ${isCurrentUser ? 'id="current-user-rank"' : ''}>
                                <div class="rank-position">
                                    ${index < 3 ? medals[index] : `#${index + 1}`}
                                </div>
                                <div class="user-info">
                                    <div class="user-avatar" style="background: ${userLevel.color};">
                                        ${user.avatar}
                                    </div>
                                    <div class="user-details">
                                        <div class="user-name">
                                            ${user.nombre} ${isCurrentUser ? '<span class="you-badge">TÚ</span>' : ''}
                                        </div>
                                        <div class="user-level">
                                            <i class="fas ${userLevel.icono}"></i>
                                            ${userLevel.nombre}
                                        </div>
                                    </div>
                                </div>
                                <div class="user-stats">
                                    <div class="stat-item">
                                        <span class="stat-value">${user.puntos}</span>
                                        <span class="stat-label">puntos</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-value">${user.logros}</span>
                                        <span class="stat-label">logros</span>
                                    </div>
                                </div>
                                ${index < 3 ? '<div class="podium-glow"></div>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                
                ${ranking.length > 10 ? `
                    <div class="ranking-footer">
                        <button class="btn-secondary btn-full" onclick="mostrarRankingCompleto()">
                            <i class="fas fa-list"></i> Ver ranking completo (${ranking.length} usuarios)
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Funciones auxiliares para la gamificación
function mostrarTutorialLogros() {
    const html = `
        <div class="modal active" id="tutorialLogrosModal">
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2><i class="fas fa-graduation-cap"></i> ¿Cómo Funciona el Sistema de Logros?</h2>
                    <button class="modal-close" onclick="cerrarTutorialLogros()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="tutorial-section">
                        <div class="tutorial-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <h3>Gana Puntos</h3>
                        <p>Cada vez que registras tu consumo energético, analizas tus datos o cumples metas, ganas puntos que te ayudan a subir de nivel.</p>
                    </div>

                    <div class="tutorial-section">
                        <div class="tutorial-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <h3>Desbloquea Logros</h3>
                        <p>Completa desafíos específicos para desbloquear logros especiales. Cada logro te otorga puntos adicionales y reconocimiento en la comunidad.</p>
                        <ul class="tutorial-list">
                            <li><strong>Primer Paso:</strong> Registra tu primer consumo (10 puntos)</li>
                            <li><strong>Semana Completa:</strong> 7 días consecutivos (50 puntos)</li>
                            <li><strong>Ahorrador Oro:</strong> Reduce 15% tu consumo (150 puntos)</li>
                            <li><strong>Maestro Energético:</strong> Alcanza 1000 puntos (500 puntos)</li>
                        </ul>
                    </div>

                    <div class="tutorial-section">
                        <div class="tutorial-icon">
                            <i class="fas fa-level-up-alt"></i>
                        </div>
                        <h3>Sube de Nivel</h3>
                        <p>A medida que acumulas puntos, subes de nivel y desbloqueas nuevos beneficios:</p>
                        <div class="levels-preview">
                            <div class="level-item">
                                <span class="level-badge-mini" style="background: #9E9E9E;">1</span>
                                <span>Novato (0 pts)</span>
                            </div>
                            <div class="level-item">
                                <span class="level-badge-mini" style="background: #8BC34A;">2</span>
                                <span>Aprendiz (100 pts)</span>
                            </div>
                            <div class="level-item">
                                <span class="level-badge-mini" style="background: #4CAF50;">3</span>
                                <span>Intermedio (300 pts)</span>
                            </div>
                            <div class="level-item">
                                <span class="level-badge-mini" style="background: #2196F3;">4</span>
                                <span>Avanzado (600 pts)</span>
                            </div>
                            <div class="level-item">
                                <span class="level-badge-mini" style="background: #9C27B0;">5</span>
                                <span>Experto (1000 pts)</span>
                            </div>
                            <div class="level-item">
                                <span class="level-badge-mini" style="background: #FF9800;">6</span>
                                <span>Maestro (1500 pts)</span>
                            </div>
                            <div class="level-item">
                                <span class="level-badge-mini" style="background: #FFD700;">7</span>
                                <span>Leyenda (2500 pts)</span>
                            </div>
                        </div>
                    </div>

                    <div class="tutorial-section">
                        <div class="tutorial-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3>Compite con la Comunidad</h3>
                        <p>Compara tu progreso con otros usuarios en el ranking global. Los mejores ahorradores aparecen en el podio y reciben reconocimiento especial.</p>
                    </div>

                    <div class="tutorial-tips">
                        <h4><i class="fas fa-lightbulb"></i> Consejos para Ganar Más Puntos</h4>
                        <ul>
                            <li>Registra tu consumo diariamente para mantener rachas</li>
                            <li>Implementa las recomendaciones de ahorro sugeridas</li>
                            <li>Reduce tu consumo mensual para desbloquear logros de ahorro</li>
                            <li>Evita picos de consumo durante 30 días seguidos</li>
                            <li>Participa activamente en la comunidad</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="cerrarTutorialLogros()">
                        <i class="fas fa-check"></i> Entendido
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
}

function cerrarTutorialLogros() {
    document.getElementById('tutorialLogrosModal')?.remove();
}

function mostrarTodosLosLogros() {
    // Implementar modal con todos los logros
    console.log('Mostrar todos los logros');
}

function actualizarRanking() {
    // Simular actualización
    mostrarNotificacion('info', 'Ranking Actualizado', 'El ranking global ha sido actualizado');
}

function mostrarRankingCompleto() {
    // Implementar vista completa del ranking
    console.log('Mostrar ranking completo');
}
