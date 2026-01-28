# 🔌 Documentación de API

## Base URL
```
http://localhost:3000
```

---

## Endpoints

### 1. Health Check
```
GET /api/health
```

**Descripción**: Verifica el estado del servidor

**Respuesta Exitosa**:
```json
{
  "status": "healthy",
  "version": "3.0.0",
  "uptime": 3600.5,
  "timestamp": "2024-01-28T10:30:00.000Z"
}
```

---

### 2. Predecir Secuencia
```
POST /api/predict
```

**Descripción**: Analiza una secuencia y predice los siguientes valores

**Request Body**:
```json
{
  "sequence": [3, 6, 9, 12]
}
```

**Respuesta Exitosa**:
```json
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
```

**Códigos de Error**:
- `400`: Secuencia inválida o insuficiente
- `500`: Error en el análisis

---

### 3. Obtener Memoria de Sesión
```
GET /api/memories
```

**Descripción**: Obtiene el historial de predicciones de la sesión actual

**Respuesta Exitosa**:
```json
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
```

---

### 4. Limpiar Memoria de Sesión
```
POST /api/clear-memories
```

**Descripción**: Limpia todas las predicciones almacenadas en la sesión

**Respuesta Exitosa**:
```json
{
  "success": true,
  "message": "Memoria de sesión limpiada"
}
```

---

### 5. Ejecutar Demostración
```
POST /api/run-demo
```

**Descripción**: Ejecuta 6 secuencias de demostración predefinidas

**Respuesta Exitosa**:
```json
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
```

---

### 6. Obtener Estadísticas Globales
```
GET /api/statistics
```

**Descripción**: Obtiene estadísticas de todos los análisis globales

**Respuesta Exitosa**:
```json
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
```

---

### 7. Analizar Lote (Batch)
```
POST /api/analyze-batch
```

**Descripción**: Analiza múltiples secuencias en una sola solicitud

**Request Body**:
```json
{
  "sequences": [
    [3, 6, 9, 12],
    [2, 6, 18, 54],
    [1, 4, 9, 16]
  ]
}
```

**Respuesta Exitosa**:
```json
{
  "success": true,
  "totalProcessed": 3,
  "successful": 3,
  "results": [...]
}
```

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
```bash
# Predecir una secuencia
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"sequence": [3, 6, 9, 12]}'

# Obtener estadísticas
curl http://localhost:3000/api/statistics
```

### Con JavaScript/Fetch
```javascript
const response = await fetch('/api/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sequence: [3, 6, 9, 12] })
});

const data = await response.json();
console.log(data);
```

### Con Python
```python
import requests

response = requests.post('http://localhost:3000/api/predict', json={
    'sequence': [3, 6, 9, 12]
})

data = response.json()
print(data)
```

---

## Autenticación

No se requiere autenticación. Las sesiones se identifican automáticamente mediante cookies.

