/**
 * Echo Chamber - JavaScript del Frontend
 * 
 * Maneja:
 * - Interacción del usuario
 * - Comunicación con la API
 * - Actualización de la interfaz
 * - Gestión de memoria
 */

// ============================================================================
// ELEMENTOS DEL DOM
// ============================================================================

const sequenceInput = document.getElementById('sequenceInput');
const predictBtn = document.getElementById('predictBtn');
const demoBtn = document.getElementById('demoBtn');
const resultSection = document.getElementById('resultSection');
const resultContent = document.getElementById('resultContent');
const demoSection = document.getElementById('demoSection');
const demoResults = document.getElementById('demoResults');
const closeDemoBtn = document.getElementById('closeDemoBtn');
const memoriesList = document.getElementById('memoriesList');
const totalMemoriesSpan = document.getElementById('totalMemories');
const avgDifferenceSpan = document.getElementById('avgDifference');
const refreshBtn = document.getElementById('refreshBtn');
const clearBtn = document.getElementById('clearBtn');

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Botón Predecir
 */
predictBtn.addEventListener('click', handlePredict);

/**
 * Enter en el campo de entrada
 */
sequenceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handlePredict();
    }
});

/**
 * Botón Demostración
 */
demoBtn.addEventListener('click', handleDemo);

/**
 * Cerrar Demostración
 */
closeDemoBtn.addEventListener('click', () => {
    demoSection.classList.add('hidden');
});

/**
 * Actualizar Memoria
 */
refreshBtn.addEventListener('click', loadMemories);

/**
 * Limpiar Memorias
 */
clearBtn.addEventListener('click', handleClear);

// ============================================================================
// FUNCIONES PRINCIPALES
// ============================================================================

/**
 * Maneja la predicción de una secuencia
 */
async function handlePredict() {
    const input = sequenceInput.value.trim();
    
    if (!input) {
        showError('Por favor, ingresa una secuencia.');
        return;
    }

    try {
        // Parsear la entrada
        const sequence = input
            .split(',')
            .map(num => parseFloat(num.trim()))
            .filter(num => !isNaN(num));

        if (sequence.length === 0) {
            showError('No se detectaron números válidos.');
            return;
        }

        // Enviar al servidor
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sequence })
        });

        const result = await response.json();

        if (result.success) {
            displayResult(result, sequence);
            sequenceInput.value = '';
            await loadMemories();
        } else {
            showError(result.message);
        }
    } catch (error) {
        showError('Error al procesar la solicitud: ' + error.message);
    }
}

/**
 * Ejecuta la demostración
 */
async function handleDemo() {
    try {
        demoSection.classList.remove('hidden');
        demoResults.innerHTML = '<p class="pulse">Ejecutando demostración...</p>';

        const response = await fetch('/api/run-demo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const results = await response.json();
        displayDemoResults(results);
    } catch (error) {
        showError('Error al ejecutar la demostración: ' + error.message);
    }
}

/**
 * Limpia todas las memorias
 */
async function handleClear() {
    if (!confirm('¿Estás seguro de que deseas limpiar todas las memorias?')) {
        return;
    }

    try {
        const response = await fetch('/api/clear-memories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (result.success) {
            showSuccess(result.message);
            await loadMemories();
        }
    } catch (error) {
        showError('Error al limpiar memorias: ' + error.message);
    }
}

/**
 * Carga las memorias del servidor
 */
async function loadMemories() {
    try {
        const response = await fetch('/api/memories');
        const data = await response.json();

        displayMemories(data.memories);
        displayStats(data.stats);
    } catch (error) {
        console.error('Error al cargar memorias:', error);
    }
}

// ============================================================================
// FUNCIONES DE VISUALIZACIÓN
// ============================================================================

/**
 * Muestra el resultado de una predicción
 */
function displayResult(result, sequence) {
    resultSection.classList.remove('hidden');
    
    const { prediction, validation } = result;
    const { difference } = validation;

    let html = `
        <div class="result-box fadeIn">
            <div class="result-item">
                <span class="result-label">📊 Secuencia Original</span>
                <span class="result-value">[${sequence.join(', ')}]</span>
            </div>
            <div class="result-item">
                <span class="result-label">➕ Diferencia Común</span>
                <span class="result-value">${difference}</span>
            </div>
            <div class="result-item">
                <span class="result-label">🔮 Próximo Eco Predicho</span>
                <span class="result-value">${prediction}</span>
            </div>
            <div class="result-item">
                <span class="result-label">📐 Fórmula</span>
                <span class="result-value">${sequence[sequence.length - 1]} + ${difference} = ${prediction}</span>
            </div>
            <div class="result-message">
                ✨ ${result.message}
            </div>
        </div>
    `;

    resultContent.innerHTML = html;
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Muestra los resultados de la demostración
 */
function displayDemoResults(results) {
    let html = results.map((item, index) => {
        const { name, sequence, result } = item;
        const status = result.success ? '✓' : '✗';
        const statusClass = result.success ? 'success' : 'error';
        const message = result.success 
            ? `Predicción: ${result.prediction}` 
            : result.message;

        return `
            <div class="demo-item fadeIn">
                <div class="demo-name">${status} ${name}</div>
                <div class="demo-sequence">Secuencia: [${sequence.join(', ')}]</div>
                <div class="demo-prediction">${message}</div>
            </div>
        `;
    }).join('');

    demoResults.innerHTML = html;
}

/**
 * Muestra las memorias almacenadas
 */
function displayMemories(memories) {
    if (memories.length === 0) {
        memoriesList.innerHTML = '<p class="empty-message">No hay memorias registradas aún.</p>';
        return;
    }

    let html = memories.map((memory, index) => {
        const time = new Date(memory.timestamp).toLocaleTimeString('es-ES');
        const sequence = memory.sequence.join(', ');
        const prediction = memory.prediction;

        return `
            <div class="memory-item fadeIn" style="animation-delay: ${index * 0.05}s">
                <div class="memory-sequence">
                    <strong>#${index + 1}</strong> [${sequence}] → ${prediction}
                </div>
                <div class="memory-prediction">
                    Patrón: +${memory.difference} | ${time}
                </div>
            </div>
        `;
    }).join('');

    memoriesList.innerHTML = html;
}

/**
 * Muestra las estadísticas
 */
function displayStats(stats) {
    totalMemoriesSpan.textContent = stats.totalMemories;
    avgDifferenceSpan.textContent = stats.totalMemories > 0 ? stats.averageDifference : '-';
}

/**
 * Muestra un error
 */
function showError(message) {
    resultSection.classList.remove('hidden');
    resultContent.innerHTML = `
        <div class="result-box result-error fadeIn">
            <div class="result-message">
                ❌ ${message}
            </div>
        </div>
    `;
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Muestra un mensaje de éxito
 */
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(16, 185, 129, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 1000;
        animation: fadeIn 0.3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

/**
 * Carga inicial de la página
 */
document.addEventListener('DOMContentLoaded', () => {
    loadMemories();
    sequenceInput.focus();
});

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Formatea un número para mostrar
 */
function formatNumber(num) {
    return num.toLocaleString('es-ES');
}

/**
 * Copia al portapapeles
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccess('Copiado al portapapeles');
    });
}
