/**
 * Echo Castle Server
 * Advanced Express.js backend for Sequence Analysis
 * 
 * @version 3.0.0
 */

const express = require('express');
const session = require('express-session');
const path = require('path');
const { SequenceAnalyzer } = require('../lib/sequence-analyzer');
const HistoricalAnalyzer = require('../lib/historical-analyzer');
const { CacheManager, PerformanceAnalyzer } = require('../lib/performance-optimizer');

// ═══════════════════════════════════════════════════════════════════════════
// APP CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'echo-castle-secret-' + Date.now(),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true
  }
}));

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL STATE
// ═══════════════════════════════════════════════════════════════════════════

const globalCache = new CacheManager(1000);
const globalPerformance = new PerformanceAnalyzer();
const globalHistory = new HistoricalAnalyzer(path.join(__dirname, '../data/server-history.json'));

// Session analyzers
const sessionAnalyzers = new Map();

/**
 * Get or create analyzer for session
 */
function getSessionAnalyzer(sessionId) {
  if (!sessionAnalyzers.has(sessionId)) {
    sessionAnalyzers.set(sessionId, new SequenceAnalyzer());
  }
  return sessionAnalyzers.get(sessionId);
}

// ═══════════════════════════════════════════════════════════════════════════
// LOGGING MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Main page - Echo Castle
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'castle.html'));
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '3.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * API: Predict next value in sequence
 */
app.post('/api/predict', (req, res) => {
  try {
    const { sequence } = req.body;

    // Validation
    if (!sequence || !Array.isArray(sequence)) {
      return res.status(400).json({ error: 'Secuencia debe ser un array' });
    }

    if (sequence.length < 2) {
      return res.status(400).json({ error: 'Se necesitan al menos 2 elementos' });
    }

    // Check cache
    const cached = globalCache.get(sequence);
    if (cached) {
      console.log('  ✓ Resultado obtenido del cache');
      return res.json({ ...cached, source: 'cache' });
    }

    // Analyze
    const analyzer = getSessionAnalyzer(req.sessionID);
    const result = analyzer.predict(sequence, 5);

    // Store in session history
    if (!req.session.predictions) {
      req.session.predictions = [];
    }

    req.session.predictions.push({
      sequence,
      pattern: result.pattern,
      nextValue: result.nextValue,
      confidence: result.confidence,
      timestamp: new Date().toISOString()
    });

    // Add to global history
    globalHistory.addRecord({
      sequence,
      pattern: result.pattern,
      predictions: result.predictions,
      confidence: result.confidence
    });

    // Cache result
    globalCache.set(sequence, result);

    res.json({
      success: true,
      ...result,
      sessionId: req.sessionID
    });

  } catch (error) {
    console.error('Prediction error:', error.message);
    res.status(400).json({
      success: false,
      error: error.message || 'Error en el análisis'
    });
  }
});

/**
 * API: Get session predictions
 */
app.get('/api/memories', (req, res) => {
  try {
    const predictions = req.session.predictions || [];
    const analyzer = getSessionAnalyzer(req.sessionID);

    res.json({
      success: true,
      count: predictions.length,
      memories: predictions,
      history: analyzer.history,
      sessionId: req.sessionID
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * API: Clear session memories
 */
app.post('/api/clear-memories', (req, res) => {
  try {
    req.session.predictions = [];
    req.session.save();

    res.json({
      success: true,
      message: 'Memoria de sesión limpiada'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * API: Get global statistics
 */
app.get('/api/statistics', (req, res) => {
  try {
    const stats = globalHistory.getStatistics();
    const accuracy = globalHistory.getAccuracyMetrics();
    const cacheStats = globalCache.getStats();

    res.json({
      success: true,
      history: stats,
      accuracy,
      cache: cacheStats,
      performance: globalPerformance.getStatistics()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * API: Run demo sequences
 */
app.post('/api/run-demo', (req, res) => {
  try {
    const demoSequences = [
      [3, 6, 9, 12],
      [2, 6, 18, 54],
      [1, 4, 9, 16],
      [1, 8, 27, 64],
      [5, 5, 5, 5],
      [100, 95, 90, 85]
    ];

    const results = [];
    const analyzer = getSessionAnalyzer(req.sessionID);

    for (const sequence of demoSequences) {
      try {
        const result = analyzer.predict(sequence, 3);
        results.push({
          sequence,
          pattern: result.pattern,
          nextValue: result.nextValue,
          confidence: result.confidence
        });
      } catch (e) {
        results.push({
          sequence,
          error: e.message
        });
      }
    }

    res.json({
      success: true,
      demoCount: demoSequences.length,
      results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * API: Get analyzer state
 */
app.get('/api/analyzer-info', (req, res) => {
  try {
    const analyzer = getSessionAnalyzer(req.sessionID);

    res.json({
      success: true,
      patterns: analyzer.getAllPatterns(),
      historyLength: analyzer.history.length,
      detectedPattern: analyzer.detectedPattern?.getInfo()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * API: Export all data
 */
app.get('/api/export', (req, res) => {
  try {
    const sessionPredictions = req.session.predictions || [];
    const globalStats = globalHistory.generateReport();

    res.json({
      success: true,
      exportDate: new Date().toISOString(),
      sessionData: {
        predictions: sessionPredictions
      },
      globalData: {
        statistics: globalStats,
        totalGlobalAnalyzes: globalHistory.records.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * API: Analyze batch sequences
 */
app.post('/api/analyze-batch', (req, res) => {
  try {
    const { sequences } = req.body;

    if (!Array.isArray(sequences)) {
      return res.status(400).json({ error: 'Se espera un array de secuencias' });
    }

    const results = [];
    const analyzer = getSessionAnalyzer(req.sessionID);

    for (const sequence of sequences) {
      try {
        if (!Array.isArray(sequence) || sequence.length < 2) {
          results.push({ sequence, error: 'Secuencia inválida' });
          continue;
        }

        const result = analyzer.predict(sequence);
        results.push({
          sequence,
          pattern: result.pattern,
          nextValue: result.nextValue,
          confidence: result.confidence
        });
      } catch (e) {
        results.push({ sequence, error: e.message });
      }
    }

    res.json({
      success: true,
      totalProcessed: sequences.length,
      successful: results.filter(r => !r.error).length,
      results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: err.message
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// SERVER STARTUP
// ═══════════════════════════════════════════════════════════════════════════

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║         🏰 Echo Castle Server v3.0.0 🏰                       ║
║                                                                ║
║  ✓ Servidor iniciado correctamente                            ║
║  ✓ Puerto: ${PORT}                                               ║
║  ✓ Interfaz disponible en: http://localhost:${PORT}           ║
║                                                                ║
║  Características:                                              ║
║  • Multi-patrón: Aritmética, Geométrica, Polinómica          ║
║  • Análisis en tiempo real con cache                          ║
║  • Historial persistente                                       ║
║  • Visualización interactiva                                  ║
║  • APIs REST completas                                         ║
║  • Sesiones de usuario aisladas                               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
  `);
});

// ═══════════════════════════════════════════════════════════════════════════
// GRACEFUL SHUTDOWN
// ═══════════════════════════════════════════════════════════════════════════

process.on('SIGTERM', () => {
  console.log('\n[SIGTERM] Iniciando cierre graceful...');
  server.close(() => {
    console.log('✓ Servidor cerrado');
    globalHistory.persistHistory();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n[SIGINT] Iniciando cierre graceful...');
  server.close(() => {
    console.log('✓ Servidor cerrado');
    globalHistory.persistHistory();
    process.exit(0);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// UNHANDLED ERRORS
// ═══════════════════════════════════════════════════════════════════════════

process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada sin manejar:', reason);
});

module.exports = app;
