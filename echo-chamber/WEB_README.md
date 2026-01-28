# 🌐 Interfaz Web - Cámara de Ecos

Interfaz web moderna y responsiva para la aplicación de predicción de secuencias de la Cámara de Ecos.

## 📋 Características

### Frontend
- 🎨 Diseño temático medieval con elementos mágicos
- 📱 Completamente responsivo (móvil, tablet, desktop)
- ✨ Interfaz interactiva con animaciones suaves
- 🎯 Panel lateral con estadísticas y memoria
- 📊 Visualización clara de resultados

### Backend
- ⚡ Servidor Express.js
- 🔌 API REST para predicciones
- 💾 Gestión de sesiones
- 🎬 Modo demostración automático
- 📈 Estadísticas en tiempo real

### Características
- ✅ Validación de progresiones aritméticas
- 📝 Historial de predicciones
- 📊 Estadísticas de memoria
- 🎬 Modo demostración con 6 secuencias
- 🗑️ Limpieza de memoria
- 🔄 Actualización en tiempo real

## 🚀 Instalación

### Requisitos Previos
- Node.js 12.0 o superior
- npm (incluido con Node.js)

### Instalación de Dependencias

```bash
# Navega al directorio echo-chamber
cd echo-chamber

# Instala las dependencias
npm install
```

Esto instalará:
- `express` - Framework web
- `express-session` - Gestión de sesiones

## 🎯 Cómo Ejecutar

### Iniciar el Servidor Web

```bash
# Desde el directorio echo-chamber
npm run web

# O directamente
cd web && node server.js
```

### Acceder a la Interfaz

1. Abre tu navegador
2. Ve a: `http://localhost:3000`
3. ¡Comienza a usar la Cámara de Ecos!

### Comandos Disponibles

```bash
# Modo interactivo CLI (original)
npm start

# Ejecutar pruebas
npm test

# Iniciar interfaz web
npm run web

# O equivalentemente
npm run web:dev
```

## 📁 Estructura de Carpetas

```
web/
├── server.js                    # Servidor Express
├── public/
│   ├── index.html              # Página HTML principal
│   ├── css/
│   │   └── style.css           # Estilos CSS
│   └── js/
│       └── app.js              # JavaScript del frontend
```

## 🔌 API REST

### Endpoints Disponibles

#### Predicción
```
POST /api/predict
Content-Type: application/json

{
  "sequence": [3, 6, 9, 12]
}

Response:
{
  "success": true,
  "prediction": 15,
  "message": "✓ El siguiente número en la secuencia es: 15",
  "validation": {
    "isValid": true,
    "difference": 3
  },
  "memoryEntry": { ... }
}
```

#### Obtener Memoria
```
GET /api/memories

Response:
{
  "memories": [
    {
      "sequence": [3, 6, 9, 12],
      "difference": 3,
      "prediction": 15,
      "timestamp": "2026-01-28T..."
    }
  ],
  "stats": {
    "totalMemories": 1,
    "averageDifference": "3.00"
  }
}
```

#### Limpiar Memoria
```
POST /api/clear-memories

Response:
{
  "success": true,
  "message": "✓ Todas las memorias han sido eliminadas."
}
```

#### Demostración
```
POST /api/run-demo

Response: [
  {
    "name": "El Eco del Principiante",
    "sequence": [3, 6, 9, 12],
    "result": { ... }
  },
  ...
]
```

## 🎨 Diseño y Tema

### Esquema de Colores
- **Púrpura Mágico** (#7c3aed) - Color primario
- **Rosa Místico** (#ec4899) - Color secundario
- **Oro Antiguo** (#f59e0b) - Acentos
- **Fondo Oscuro** (#0f172a) - Fondo principal

### Elementos de Diseño
- Bordes con sombras
- Gradientes sutiles
- Animaciones suaves
- Tipografía clara
- Espaciado consistente

## 📱 Responsividad

La interfaz web se adapta a diferentes tamaños de pantalla:

- **Desktop** (1200px+): Layout de dos columnas
- **Tablet** (768px-1199px): Layout flexible
- **Móvil** (<768px): Layout de una columna optimizado

## 🔄 Flujo de Trabajo

1. **Usuario Ingresa Secuencia**
   - Escribe números separados por comas
   - Presiona "Predecir" o Enter

2. **Validación**
   - El servidor valida la progresión aritmética
   - Si es válida, calcula la predicción
   - Si no es válida, muestra mensaje de error

3. **Resultado**
   - Muestra secuencia, diferencia, predicción y fórmula
   - Almacena en memoria
   - Actualiza estadísticas

4. **Memoria**
   - Ver todas las predicciones anteriores
   - Visualizar estadísticas
   - Limpiar memoria si es necesario

## 🎬 Modo Demostración

El modo demostración prueba automáticamente 6 secuencias:

1. **El Eco del Principiante** - `[3, 6, 9, 12]` → `15`
2. **La Ruta del Aritmancista** - `[2, 4, 6, 8, 10]` → `12`
3. **El Eco Quíntuple** - `[5, 10, 15, 20]` → `25`
4. **La Resonancia Décuple** - `[10, 20, 30]` → `40`
5. **El Eco Silencioso** - `[1, 1, 1, 1]` → `1`
6. **La Espiral Descendente** - `[100, 90, 80, 70]` → `60`

## 🛠️ Desarrollo

### Estructura del Código

**server.js:**
- Configuración de Express
- Clase EchoChamber (lógica de predicción)
- Rutas de API
- Manejo de errores

**app.js (Frontend):**
- Event listeners
- Comunicación con API
- Actualización de DOM
- Gestión de estado

**style.css:**
- Variables CSS
- Estilos temáticos
- Responsive design
- Animaciones

## 🔐 Seguridad

### Consideraciones
- Las sesiones se almacenan en servidor
- Las memorias se limpian al cerrar sesión
- Cada usuario tiene su propia cámara de ecos
- Validación de entrada en servidor y cliente

## 🌍 Multiidioma

La interfaz está disponible en español e inglés:

### En Español
- Interfaz completa en español
- Mensajes y etiquetas en español
- Ejemplos en español

### En Inglés
- Ver versión CLI: `npm start`

## 📊 Características Avanzadas

### Estadísticas
- Total de predicciones realizadas
- Diferencia promedio de progresiones
- Historial completo de sesión

### Rendimiento
- Carga rápida de página
- Respuesta instantánea de API
- Actualización en tiempo real
- Optimización de CSS

## 🐛 Solución de Problemas

### Puerto en Uso
```bash
# Si el puerto 3000 está en uso, cambiar el puerto:
PORT=3001 npm run web
```

### Dependencias No Instaladas
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Problemas de Conexión
```bash
# Verificar que el servidor está corriendo
curl http://localhost:3000

# Ver logs del servidor
npm run web
```

## 📚 Archivos de Documentación

- **README.md** - Documentación principal (CLI)
- **README.es.md** - Documentación en español (CLI)
- **QUICKSTART.md** - Guía rápida (CLI)
- **QUICKSTART.es.md** - Guía rápida en español (CLI)
- **WEB_README.md** - Este archivo (Interfaz web)

## 🚀 Próximas Mejoras

- Base de datos persistente
- Autenticación de usuarios
- Compartir resultados
- Tabla de clasificación
- Temas personalizables
- Soporte para más idiomas
- Análisis y gráficos
- Exportar datos

## 📄 Licencia

Parte del proyecto CopilotAdventures. MIT License.

---

**Estado**: ✅ Completamente Funcional

**Versión Web**: 1.0
**Última Actualización**: Enero 28, 2026

🏰 ¡Bienvenido a la Cámara de Ecos en la Web! ✨
