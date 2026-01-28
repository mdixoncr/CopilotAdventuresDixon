/**
 * Echo Castle Frontend
 * Advanced UI for Sequence Analysis with Visualization
 */

class EchoCastleApp {
  constructor() {
    this.history = [];
    this.currentAnalysis = null;
    this.charts = {};
    this.demoSequences = [
      [3, 6, 9, 12],
      [2, 6, 18, 54],
      [1, 4, 9, 16],
      [1, 8, 27, 64],
      [5, 5, 5, 5],
      [100, 95, 90, 85]
    ];
    this.demoNames = [
      'Progresión Aritmética',
      'Progresión Geométrica',
      'Cuadrática',
      'Cúbica',
      'Constante',
      'Decreciente'
    ];

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.setupEventListeners();
    this.loadHistory();
    this.updateAnalytics();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });

    // Analyzer buttons
    document.getElementById('analyze-btn').addEventListener('click', () => this.analyzeSequence());
    document.getElementById('demo-btn').addEventListener('click', () => this.runDemo());

    // History controls
    document.getElementById('export-history-btn').addEventListener('click', () => this.exportHistory());
    document.getElementById('clear-history-btn').addEventListener('click', () => this.clearHistory());

    // Enter key for input
    document.getElementById('sequence-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        this.analyzeSequence();
      }
    });
  }

  /**
   * Switch between tabs
   */
  switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Initialize charts if switching to visualization
    if (tabName === 'visualization') {
      this.initializeCharts();
    }

    // Update analytics if switching to analytics
    if (tabName === 'analytics') {
      this.updateAnalytics();
    }
  }

  /**
   * Analyze sequence from input
   */
  async analyzeSequence() {
    const input = document.getElementById('sequence-input').value.trim();

    if (!input) {
      this.showNotification('Por favor ingresa una secuencia', 'error');
      return;
    }

    try {
      const sequence = input.split(',').map(v => {
        const num = parseFloat(v.trim());
        if (isNaN(num)) throw new Error(`"${v.trim()}" no es un número válido`);
        return num;
      });

      if (sequence.length < 2) {
        throw new Error('Se necesitan al menos 2 números');
      }

      const result = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence })
      });

      if (!result.ok) {
        throw new Error((await result.json()).error || 'Error en el análisis');
      }

      const data = await result.json();
      this.displayResults(data);
      this.currentAnalysis = data;
      this.addToHistory(sequence, data);
      this.showNotification('✓ Análisis completado', 'success');
    } catch (error) {
      this.showNotification(`Error: ${error.message}`, 'error');
    }
  }

  /**
   * Display analysis results
   */
  displayResults(data) {
    const container = document.getElementById('results-container');
    const html = `
      <div class="result-card">
        <div class="result-item">
          <div class="result-label">Siguiente número predicho:</div>
          <div class="result-value">${data.nextValue.toFixed(4)}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Patrón detectado:</div>
          <div class="result-value">${data.pattern}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Predicciones adicionales (siguientes 5):</div>
          <div class="result-value">[${data.predictions.slice(0, 5).map(p => p.toFixed(2)).join(', ')}]</div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    container.classList.add('filled');

    // Update details
    document.getElementById('pattern-type').textContent = data.pattern;
    document.getElementById('pattern-confidence').textContent = (data.confidence * 100).toFixed(1) + '%';

    const params = data.parameters;
    let paramsHtml = '<div>';
    Object.keys(params).forEach(key => {
      let value = params[key];
      if (typeof value === 'number') value = value.toFixed(4);
      paramsHtml += `<p><strong>${key}:</strong> ${value}</p>`;
    });
    paramsHtml += '</div>';
    document.getElementById('pattern-params').innerHTML = paramsHtml;

    const predHTML = data.predictions.slice(0, 10)
      .map((p, i) => `<strong>${i + 1}:</strong> ${p.toFixed(4)}`)
      .join(' | ');
    document.getElementById('additional-predictions').innerHTML = predHTML;
  }

  /**
   * Run demonstration
   */
  async runDemo() {
    const randomIndex = Math.floor(Math.random() * this.demoSequences.length);
    const sequence = this.demoSequences[randomIndex];
    const name = this.demoNames[randomIndex];

    document.getElementById('sequence-input').value = sequence.join(', ');
    this.showNotification(`Demostración: ${name}`, 'info');
    
    setTimeout(() => this.analyzeSequence(), 500);
  }

  /**
   * Add to history
   */
  addToHistory(sequence, analysis) {
    const record = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      sequence,
      pattern: analysis.pattern,
      confidence: analysis.confidence,
      nextValue: analysis.nextValue
    };

    this.history.unshift(record);
    this.saveHistory();
    this.updateHistoryDisplay();
  }

  /**
   * Update history display
   */
  updateHistoryDisplay() {
    const container = document.getElementById('history-list');

    if (this.history.length === 0) {
      container.innerHTML = '<p class="placeholder">No hay registros aún</p>';
      return;
    }

    const html = this.history.map(r => `
      <div class="history-item">
        <div class="history-item-time">📅 ${r.timestamp}</div>
        <div class="history-item-sequence">[${r.sequence.join(', ')}]</div>
        <span class="history-item-pattern">${r.pattern}</span>
        <div><strong>Predicción:</strong> ${r.nextValue.toFixed(4)} | <strong>Confianza:</strong> ${(r.confidence * 100).toFixed(1)}%</div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  /**
   * Export history as JSON
   */
  exportHistory() {
    const dataStr = JSON.stringify(this.history, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr));
    element.setAttribute('download', `echo-castle-history-${Date.now()}.json`);
    element.click();
    this.showNotification('✓ Historial exportado', 'success');
  }

  /**
   * Clear history
   */
  clearHistory() {
    if (confirm('¿Estás seguro de que deseas limpiar todo el historial?')) {
      this.history = [];
      this.saveHistory();
      this.updateHistoryDisplay();
      this.updateAnalytics();
      this.showNotification('✓ Historial limpiado', 'success');
    }
  }

  /**
   * Save history to localStorage
   */
  saveHistory() {
    localStorage.setItem('echoCastle_history', JSON.stringify(this.history));
  }

  /**
   * Load history from localStorage
   */
  loadHistory() {
    try {
      const saved = localStorage.getItem('echoCastle_history');
      if (saved) {
        this.history = JSON.parse(saved);
        this.updateHistoryDisplay();
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }

  /**
   * Initialize charts
   */
  initializeCharts() {
    if (!this.currentAnalysis) {
      this.showNotification('Primero realiza un análisis', 'info');
      return;
    }

    this.createSequenceChart();
    this.createPatternComparisonChart();
  }

  /**
   * Create sequence visualization chart
   */
  createSequenceChart() {
    const canvas = document.getElementById('sequence-chart');
    const ctx = canvas.getContext('2d');

    if (this.charts.sequence) {
      this.charts.sequence.destroy();
    }

    const sequence = this.currentAnalysis.sequence || [];
    const predictions = (this.currentAnalysis.predictions || []).slice(0, 5);
    const allData = [...sequence, ...predictions];

    this.charts.sequence = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: allData.length }, (_, i) => `n=${i + 1}`),
        datasets: [
          {
            label: 'Secuencia Original',
            data: sequence,
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#f59e0b'
          },
          {
            label: 'Predicciones',
            data: [null, ...predictions],
            borderColor: '#f59e0b',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: '#10b981'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#f1f5f9' } }
        },
        scales: {
          y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(71, 85, 105, 0.2)' } },
          x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(71, 85, 105, 0.2)' } }
        }
      }
    });
  }

  /**
   * Create pattern comparison chart
   */
  createPatternComparisonChart() {
    const canvas = document.getElementById('pattern-comparison-chart');
    const ctx = canvas.getContext('2d');

    if (this.charts.comparison) {
      this.charts.comparison.destroy();
    }

    this.charts.comparison = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Aritmética', 'Geométrica', 'Cuadrática', 'Cúbica', 'Constante'],
        datasets: [{
          label: 'Confianza del Patrón',
          data: [75, 60, 90, 50, 30],
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124, 58, 237, 0.2)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: '#f59e0b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#f1f5f9' } }
        },
        scales: {
          r: {
            ticks: { color: '#cbd5e1' },
            grid: { color: 'rgba(71, 85, 105, 0.2)' }
          }
        }
      }
    });
  }

  /**
   * Update analytics
   */
  async updateAnalytics() {
    if (this.history.length === 0) {
      document.getElementById('total-sequences').textContent = '0';
      document.getElementById('success-rate').textContent = '0%';
      document.getElementById('avg-confidence').textContent = '0%';
      document.getElementById('most-common-pattern').textContent = '-';
      return;
    }

    // Calculate statistics
    const total = this.history.length;
    const avgConfidence = (this.history.reduce((sum, r) => sum + r.confidence, 0) / total * 100).toFixed(1);

    // Pattern distribution
    const patterns = {};
    this.history.forEach(r => {
      patterns[r.pattern] = (patterns[r.pattern] || 0) + 1;
    });

    const mostCommon = Object.keys(patterns).reduce((a, b) => 
      patterns[a] > patterns[b] ? a : b
    );

    // Update stats
    document.getElementById('total-sequences').textContent = total;
    document.getElementById('success-rate').textContent = '100%';
    document.getElementById('avg-confidence').textContent = avgConfidence + '%';
    document.getElementById('most-common-pattern').textContent = mostCommon;

    // Update distribution chart
    this.updateDistributionChart(patterns);

    // Update trends
    this.updateTrends();
  }

  /**
   * Update distribution chart
   */
  updateDistributionChart(patterns) {
    const canvas = document.getElementById('distribution-chart');
    const ctx = canvas.getContext('2d');

    if (this.charts.distribution) {
      this.charts.distribution.destroy();
    }

    const colors = ['#7c3aed', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'];

    this.charts.distribution = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(patterns),
        datasets: [{
          data: Object.values(patterns),
          backgroundColor: colors.slice(0, Object.keys(patterns).length),
          borderColor: '#0f172a',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#f1f5f9' } }
        }
      }
    });
  }

  /**
   * Update trends
   */
  updateTrends() {
    const recent = this.history.slice(0, 10);
    const patterns = {};

    recent.forEach(r => {
      patterns[r.pattern] = (patterns[r.pattern] || 0) + 1;
    });

    const html = `
      <p><strong>Últimas 10 secuencias analizadas:</strong></p>
      <ul>
        ${Object.entries(patterns).map(([pattern, count]) => 
          `<li>${pattern}: <strong>${count}</strong> veces</li>`
        ).join('')}
      </ul>
    `;

    document.getElementById('trends-info').innerHTML = html;
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.className = `notification ${type}`;
    notif.style.display = 'block';

    setTimeout(() => {
      notif.style.display = 'none';
    }, 3000);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.echoCastleApp = new EchoCastleApp();
});
