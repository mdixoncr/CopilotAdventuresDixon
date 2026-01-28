#!/usr/bin/env node

/**
 * Documentation Generator
 * Generates comprehensive documentation for Echo Chamber
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

// Ensure docs directory exists
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// ═══════════════════════════════════════════════════════════════════════════
// MATHEMATICAL DOCUMENTATION
// ═══════════════════════════════════════════════════════════════════════════

const mathDocs = `# 📐 Guía Matemática de Echo Castle

## Progresiones Aritméticas (AP)

### Definición
Una progresión aritmética es una secuencia donde la diferencia entre términos consecutivos es constante.

### Fórmula General
\`\`\`
a_n = a_1 + (n-1)d
\`\`\`

Donde:
- **a_n**: el n-ésimo término
- **a_1**: el primer término
- **d**: la diferencia común
- **n**: la posición del término

### Ejemplo
Secuencia: 2, 5, 8, 11, 14, ...
- Primer término (a_1) = 2
- Diferencia común (d) = 3
- Fórmula: a_n = 2 + (n-1)×3

### Suma de términos
\`\`\`
S_n = n/2 × (a_1 + a_n) = n/2 × (2a_1 + (n-1)d)
\`\`\`

---

## Progresiones Geométricas (GP)

### Definición
Una progresión geométrica es una secuencia donde cada término se obtiene multiplicando el anterior por un factor constante.

### Fórmula General
\`\`\`
a_n = a_1 × r^(n-1)
\`\`\`

Donde:
- **a_n**: el n-ésimo término
- **a_1**: el primer término
- **r**: la razón común
- **n**: la posición del término

### Ejemplo
Secuencia: 2, 6, 18, 54, 162, ...
- Primer término (a_1) = 2
- Razón común (r) = 3
- Fórmula: a_n = 2 × 3^(n-1)

### Suma de términos
\`\`\`
Si r ≠ 1:  S_n = a_1 × (1 - r^n) / (1 - r)
Si r = 1:  S_n = n × a_1
\`\`\`

### Suma infinita
\`\`\`
Si |r| < 1:  S_∞ = a_1 / (1 - r)
\`\`\`

---

## Secuencias Polinómicas

### Cuadrática (Grado 2)
\`\`\`
a_n = an² + bn + c
\`\`\`

Ejemplo: 1, 4, 9, 16, 25 (cuadrados perfectos)
- Diferencias de primer orden: 3, 5, 7, 9
- Diferencias de segundo orden: 2, 2, 2 (constante)

### Cúbica (Grado 3)
\`\`\`
a_n = an³ + bn² + cn + d
\`\`\`

Ejemplo: 1, 8, 27, 64, 125 (cubos perfectos)
- Diferencias de primer orden: 7, 19, 37, 61
- Diferencias de segundo orden: 12, 18, 24
- Diferencias de tercer orden: 6, 6 (constante)

### Método de Diferencias Finitas

El método de diferencias finitas permite identificar polinomios detectando cuándo las diferencias sucesivas se vuelven constantes.

\`\`\`
Secuencia:     1    4    9   16   25
Dif 1:           3    5    7    9
Dif 2:             2    2    2
\`\`\`

Si la diferencia de orden k es constante, la secuencia es un polinomio de grado k.

---

## Aplicaciones Prácticas

### Progresiones Aritméticas
- Crecimiento lineal
- Depreciación de bienes
- Calendarios y horarios
- Interés simple

### Progresiones Geométricas
- Crecimiento exponencial
- Desintegración radioactiva
- Interés compuesto
- Propagación de virus

### Secuencias Polinómicas
- Trayectorias de proyectiles
- Análisis de velocidad/aceleración
- Modelos de crecimiento complejos
- Series de potencias

---

## Casos Especiales

### Diferencias Numéricas
La precisión de punto flotante puede afectar cálculos. Echo Castle incluye tolerancias automáticas:

\`\`\`javascript
const TOLERANCE = 1e-10;
\`\`\`

### Secuencias Constantes
Una secuencia donde todos los elementos son iguales es una AP con d=0.

### Sucesión de Fibonacci
No es un AP, GP, ni polinomio simple. Se sigue:
\`\`\`
F_n = F_{n-1} + F_{n-2}
\`\`\`

---

## Referencias Matemáticas

1. Stewart, J. (2015). Calculus: Early Transcendentals (8th ed.)
2. Larson, R. E., & Edwards, B. H. (2016). Precalculus (10th ed.)
3. OEIS Foundation (2023). The On-Line Encyclopedia of Integer Sequences

`;

// ═══════════════════════════════════════════════════════════════════════════
// API DOCUMENTATION
// ═══════════════════════════════════════════════════════════════════════════

const apiDocs = `# 🔌 Documentación de API

## Base URL
\`\`\`
http://localhost:3000
\`\`\`

---

## Endpoints

### 1. Health Check
\`\`\`
GET /api/health
\`\`\`

**Descripción**: Verifica el estado del servidor

**Respuesta Exitosa**:
\`\`\`json
{
  "status": "healthy",
  "version": "3.0.0",
  "uptime": 3600.5,
  "timestamp": "2024-01-28T10:30:00.000Z"
}
\`\`\`

---

### 2. Predecir Secuencia
\`\`\`
POST /api/predict
\`\`\`

**Descripción**: Analiza una secuencia y predice los siguientes valores

**Request Body**:
\`\`\`json
{
  "sequence": [3, 6, 9, 12]
}
\`\`\`

**Respuesta Exitosa**:
\`\`\`json
{
  "success": true,
  "pattern": "Arithmetic Progression",
  "confidence": 1.0,
  "nextValue": 15,
  "predictions": [15, 18, 21, 24, 27],
  "parameters": {
    "firstTerm": 3,
    "commonDifference": 3,
    "count": 4
  },
  "timestamp": "2024-01-28T10:30:00.000Z"
}
\`\`\`

**Códigos de Error**:
- \`400\`: Secuencia inválida o insuficiente
- \`500\`: Error en el análisis

---

### 3. Obtener Memoria de Sesión
\`\`\`
GET /api/memories
\`\`\`

**Descripción**: Obtiene el historial de predicciones de la sesión actual

**Respuesta Exitosa**:
\`\`\`json
{
  "success": true,
  "count": 3,
  "memories": [
    {
      "sequence": [3, 6, 9, 12],
      "pattern": "Arithmetic Progression",
      "nextValue": 15,
      "confidence": 1.0,
      "timestamp": "2024-01-28T10:30:00.000Z"
    }
  ],
  "sessionId": "abc123def456"
}
\`\`\`

---

### 4. Limpiar Memoria de Sesión
\`\`\`
POST /api/clear-memories
\`\`\`

**Descripción**: Limpia todas las predicciones almacenadas en la sesión

**Respuesta Exitosa**:
\`\`\`json
{
  "success": true,
  "message": "Memoria de sesión limpiada"
}
\`\`\`

---

### 5. Ejecutar Demostración
\`\`\`
POST /api/run-demo
\`\`\`

**Descripción**: Ejecuta 6 secuencias de demostración predefinidas

**Respuesta Exitosa**:
\`\`\`json
{
  "success": true,
  "demoCount": 6,
  "results": [
    {
      "sequence": [3, 6, 9, 12],
      "pattern": "Arithmetic Progression",
      "nextValue": 15,
      "confidence": 1.0
    }
  ]
}
\`\`\`

---

### 6. Obtener Estadísticas Globales
\`\`\`
GET /api/statistics
\`\`\`

**Descripción**: Obtiene estadísticas de todos los análisis globales

**Respuesta Exitosa**:
\`\`\`json
{
  "success": true,
  "history": {
    "totalSequences": 150,
    "successRate": 98.5,
    "averageConfidence": 0.95,
    "mostCommonPattern": "Arithmetic Progression"
  },
  "accuracy": {
    "Arithmetic Progression": {
      "total": 75,
      "averageConfidence": 0.98
    }
  },
  "cache": {
    "hits": 234,
    "misses": 45,
    "hitRate": "83.93%"
  }
}
\`\`\`

---

### 7. Analizar Lote (Batch)
\`\`\`
POST /api/analyze-batch
\`\`\`

**Descripción**: Analiza múltiples secuencias en una sola solicitud

**Request Body**:
\`\`\`json
{
  "sequences": [
    [3, 6, 9, 12],
    [2, 6, 18, 54],
    [1, 4, 9, 16]
  ]
}
\`\`\`

**Respuesta Exitosa**:
\`\`\`json
{
  "success": true,
  "totalProcessed": 3,
  "successful": 3,
  "results": [...]
}
\`\`\`

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | Solicitud exitosa |
| 400 | Solicitud inválida |
| 404 | Ruta no encontrada |
| 500 | Error interno del servidor |

---

## Límites y Restricciones

- **Tamaño máximo de secuencia**: 10,000 elementos
- **Tamaño máximo de solicitud JSON**: 10MB
- **Sesión activa**: 24 horas
- **Caché**: 1,000 resultados únicos

---

## Ejemplos de Uso

### Con curl
\`\`\`bash
# Predecir una secuencia
curl -X POST http://localhost:3000/api/predict \\
  -H "Content-Type: application/json" \\
  -d '{"sequence": [3, 6, 9, 12]}'

# Obtener estadísticas
curl http://localhost:3000/api/statistics
\`\`\`

### Con JavaScript/Fetch
\`\`\`javascript
const response = await fetch('/api/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sequence: [3, 6, 9, 12] })
});

const data = await response.json();
console.log(data);
\`\`\`

### Con Python
\`\`\`python
import requests

response = requests.post('http://localhost:3000/api/predict', json={
    'sequence': [3, 6, 9, 12]
})

data = response.json()
print(data)
\`\`\`

---

## Autenticación

No se requiere autenticación. Las sesiones se identifican automáticamente mediante cookies.

`;

// ═══════════════════════════════════════════════════════════════════════════
// DEPLOYMENT GUIDE
// ═══════════════════════════════════════════════════════════════════════════

const deploymentDocs = `# 🚀 Guía de Despliegue

## Despliegue Local

### Requisitos
- Node.js 12.0 o superior
- npm 6.0 o superior

### Instalación
\`\`\`bash
# Clonar o descargar el repositorio
cd echo-chamber

# Instalar dependencias
npm install

# Iniciar el servidor
npm run web
\`\`\`

El servidor estará disponible en \`http://localhost:3000\`

---

## Despliegue en Heroku

### Pasos

1. **Crear aplicación Heroku**
\`\`\`bash
heroku login
heroku create your-app-name
\`\`\`

2. **Configurar Procfile**
\`\`\`
web: npm run web
\`\`\`

3. **Desplegar**
\`\`\`bash
git push heroku main
\`\`\`

---

## Despliegue en Azure App Service

### Con Azure CLI
\`\`\`bash
az appservice plan create \\
  --name myAppServicePlan \\
  --resource-group myResourceGroup \\
  --sku FREE

az webapp create \\
  --resource-group myResourceGroup \\
  --plan myAppServicePlan \\
  --name echo-castle

az webapp up --name echo-castle
\`\`\`

---

## Despliegue con Docker

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "web"]
\`\`\`

### Construir y ejecutar
\`\`\`bash
docker build -t echo-castle .
docker run -p 3000:3000 echo-castle
\`\`\`

---

## Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| PORT | Puerto del servidor | 3000 |
| NODE_ENV | Entorno | development |
| LOG_LEVEL | Nivel de logging | info |

### Ejemplo .env
\`\`\`
PORT=3000
NODE_ENV=production
LOG_LEVEL=debug
\`\`\`

---

## Monitoreo

### Logs
\`\`\`bash
# En Heroku
heroku logs --tail

# Local
npm run web 2>&1 | tee server.log
\`\`\`

### Health Check
\`\`\`bash
curl http://your-domain/api/health
\`\`\`

---

## Mantenimiento

### Limpieza de caché
\`\`\`bash
# El caché se limpia automáticamente después de 24 horas
# O reinicia el servidor
\`\`\`

### Backup de datos
\`\`\`bash
# Datos guardados en data/server-history.json
cp data/server-history.json backups/history-$(date +%Y%m%d).json
\`\`\`

---

## Solución de Problemas

### Puerto en uso
\`\`\`bash
# Cambiar puerto
PORT=4000 npm run web

# O encontrar qué usa el puerto
lsof -i :3000
\`\`\`

### Error de módulos
\`\`\`bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Problemas de sesión
\`\`\`bash
# Limpiar datos de sesión
rm -rf data/
npm run web
\`\`\`

`;

// ═══════════════════════════════════════════════════════════════════════════
// WRITE FILES
// ═══════════════════════════════════════════════════════════════════════════

fs.writeFileSync(path.join(docsDir, 'MATHEMATICS.md'), mathDocs);
fs.writeFileSync(path.join(docsDir, 'API.md'), apiDocs);
fs.writeFileSync(path.join(docsDir, 'DEPLOYMENT.md'), deploymentDocs);

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  ✓ Documentación generada exitosamente                        ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  📄 Archivos creados en ./docs/:                              ║
║                                                                ║
║   • MATHEMATICS.md     - Conceptos matemáticos                ║
║   • API.md             - Referencia de API REST               ║
║   • DEPLOYMENT.md      - Guías de despliegue                 ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);
