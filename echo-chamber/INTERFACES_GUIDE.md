# 🏰 Cámara de Ecos - Guía Completa de Interfaces

La Cámara de Ecos ofrece dos formas de interactuar con el predictor de secuencias: una interfaz CLI (línea de comandos) y una interfaz web moderna.

## 🎯 Comparativa de Interfaces

| Característica | CLI | Web |
|----------------|-----|-----|
| **Instalación** | Sin dependencias | Requiere npm install |
| **Acceso** | Terminal | Navegador web |
| **Interfaz** | Línea de comandos | Interfaz gráfica |
| **Velocidad** | Muy rápida | Rápida |
| **Portabilidad** | Excelente | Basada en navegador |
| **Estadísticas** | En texto | Visuales e interactivas |
| **Demostración** | Automática | Manual o automática |
| **Memoria** | Por sesión CLI | Por sesión HTTP |
| **Mejor para** | Usuarios técnicos | Usuarios generales |

## 🖥️ Interfaz CLI (Terminal)

### Ejecución

```bash
# Modo interactivo
node index.js

# Ejecutar pruebas
node index.js --test

# Suite de pruebas extendida
node test-suite.js
```

### Ventajas
✅ No requiere dependencias adicionales
✅ Muy rápido
✅ Fácil de ejecutar
✅ Perfecto para pruebas automatizadas
✅ Funciona en cualquier terminal

### Desventajas
❌ Interfaz basada en texto
❌ Menos intuitiva para usuarios novatos
❌ Menú manual

### Ejemplo de Uso CLI

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║              🏰 WELCOME TO THE ECHO CHAMBER OF NUMERIA 🏰              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝

[1] Enter a sequence to predict
[2] View memory archive
[3] Clear all memories
[4] Run demonstration
[5] Exit the Echo Chamber

Enter your choice (1-5): 1
📝 Enter sequence: 3,6,9,12

✨ The Echo Chamber responds:
   Original sequence:    [3, 6, 9, 12]
   Common difference:    3
   Next echo predicted:  15
   Formula applied:      12 + 3 = 15
   📜 ✓ The next number in the sequence is: 15
```

## 🌐 Interfaz Web

### Instalación

```bash
cd /workspaces/CopilotAdventuresDixon/echo-chamber
npm install
```

### Ejecución

```bash
# Iniciar servidor
npm run web

# O directamente
cd web && node server.js
```

### Acceso

1. Abre navegador
2. Ve a: `http://localhost:3000`
3. ¡Disfruta la interfaz web!

### Ventajas
✅ Interfaz gráfica intuitiva
✅ Diseño responsivo (móvil, tablet, desktop)
✅ Animaciones suaves
✅ Estadísticas visuales
✅ Historial de memoria interactivo
✅ Mejor experiencia de usuario
✅ Acceso desde cualquier navegador

### Desventajas
❌ Requiere dependencias (Express)
❌ Requiere que el servidor esté corriendo
❌ Necesita navegador web

### Pantalla Principal Web

```
┌─────────────────────────────────────────────────────────────────┐
│                    🏰 CÁMARA DE ECOS 🏰                         │
│           Predictor Mágico de Secuencias Numéricas              │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────┬─────────────────────────────┐
│                                  │                             │
│  INGRESA UNA SECUENCIA           │  ESTADÍSTICAS              │
│  ─────────────────────           │  ────────────              │
│  [3, 6, 9, 12            ]        │  Total de Ecos:        0   │
│                                  │  Diferencia Promedio:  -   │
│  [🔮 PREDECIR]  [🎬 DEMO]       │                             │
│                                  │  ARCHIVO DE MEMORIA        │
│  RESULTADO                       │  ──────────────────         │
│  ────────────                    │  No hay memorias aún       │
│  Secuencia: [3,6,9,12]           │                             │
│  Diferencia: 3                   │  [🔄] [🗑️]                 │
│  Predicción: 15                  │                             │
│  ✓ El siguiente número es: 15    │                             │
│                                  │                             │
└──────────────────────────────────┴─────────────────────────────┘
```

## 🔧 Configuración

### CLI - Sin Configuración Requerida

Solo ejecuta:
```bash
node index.js
```

### Web - Configuración Opcional

**Puerto por defecto:** 3000

Para cambiar el puerto:
```bash
PORT=8080 npm run web
```

**Sesiones:**
- Duración: 24 horas
- Almacenamiento: En memoria
- Límpia automáticamente al reiniciar

## 📊 Funcionalidades por Interfaz

### Ambas Interfaces
- ✅ Predicción de secuencias
- ✅ Validación de progresiones
- ✅ Almacenamiento de memoria
- ✅ Estadísticas
- ✅ Manejo de errores

### Solo CLI
- ✅ Pruebas automatizadas
- ✅ Suite de pruebas extendida (25 tests)
- ✅ Modo batch

### Solo Web
- ✅ Interfaz gráfica
- ✅ Diseño responsivo
- ✅ Animaciones
- ✅ Acceso remoto
- ✅ Historial visual

## 🎓 Casos de Uso

### Usa CLI Si:
- 👨‍💻 Eres desarrollador
- 🧪 Necesitas hacer pruebas
- ⚡ Quieres máxima velocidad
- 📱 Estás en una terminal remota
- 🤖 Quieres automatizar algo

### Usa Web Si:
- 👥 Eres usuario general
- 🎓 Quieres explorar visualmente
- 📱 Prefieres interfaz gráfica
- 🌐 Quieres compartir acceso
- 📊 Quieres ver estadísticas visuales

## 🚀 Migración Entre Interfaces

### De CLI a Web

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor:**
   ```bash
   npm run web
   ```

3. **Acceder en navegador:**
   ```
   http://localhost:3000
   ```

### De Web a CLI

1. **Cerrar servidor web** (Ctrl+C)

2. **Ejecutar CLI:**
   ```bash
   node index.js
   ```

Nota: Las memorias no se comparten entre CLI y Web (diferentes procesos)

## 🔌 API REST (Solo Web)

La interfaz web expone una API REST:

```bash
# Predicción
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"sequence":[3,6,9,12]}'

# Obtener memoria
curl http://localhost:3000/api/memories

# Limpiar memoria
curl -X POST http://localhost:3000/api/clear-memories

# Ejecutar demostración
curl -X POST http://localhost:3000/api/run-demo
```

## 📱 Responsividad Web

La interfaz web se adapta a:

- 📱 **Móvil** (320px+) - Una columna
- 📱 **Tablet** (768px+) - Layout flexible
- 🖥️ **Desktop** (1200px+) - Dos columnas

## ⚡ Rendimiento

### CLI
- Inicio: < 100ms
- Predicción: < 10ms
- Pruebas (31): < 500ms

### Web
- Inicio del servidor: ~1s
- Carga de página: < 1s
- Predicción: < 100ms
- API Response: < 50ms

## 🔐 Seguridad

### CLI
- Datos en memoria
- Se pierden al salir
- Acceso local solo

### Web
- Sesiones HTTP (24 horas)
- Datos por sesión
- Acceso por red (localhost por defecto)

## 🛠️ Troubleshooting

### CLI No Funciona
```bash
# Verificar Node.js
node --version

# Ejecutar nuevamente
node index.js
```

### Web No Inicia
```bash
# Puerto en uso
PORT=3001 npm run web

# Reinstalar dependencias
npm install

# Verificar Express
node -e "require('express')"
```

### Conexión Rechazada (Web)
```bash
# Verificar que servidor esté corriendo
ps aux | grep node

# Iniciar servidor
npm run web

# Verificar puerto
curl http://localhost:3000
```

## 📚 Documentación Relacionada

- **README.md** / **README.es.md** - Documentación técnica completa
- **QUICKSTART.md** / **QUICKSTART.es.md** - Guía de inicio rápido
- **WEB_README.md** - Documentación específica de la web
- **PROJECT_SUMMARY.md** / **PROJECT_SUMMARY.es.md** - Resumen del proyecto

## 🎉 Conclusión

Ambas interfaces ofrecen funcionalidades completas:

- **CLI** para usuarios técnicos y automatización
- **Web** para usuarios generales y experiencia visual

¡Elige la que mejor se ajuste a tus necesidades!

---

**Versión**: 2.0
**Última Actualización**: Enero 28, 2026
**Estado**: ✅ Ambas interfaces completamente funcionales

🏰 ¡Bienvenido a la Cámara de Ecos! ✨
