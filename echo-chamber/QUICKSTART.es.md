# 🚀 Guía de Inicio Rápido - Cámara de Ecos

¡Comienza con la aplicación Cámara de Ecos en 5 minutos!

## Instalación y Configuración

```bash
# Navega al directorio echo-chamber
cd echo-chamber

# Sin dependencias que instalar - utiliza módulos integrados de Node.js
```

## Ejecutar la Aplicación

### Inicia la Experiencia Interactiva
```bash
node index.js
```

Esto inicia una aventura interactiva donde puedes:
- Ingresar secuencias y obtener predicciones
- Ver tu archivo de memoria
- Ejecutar una demostración
- Limpiar memorias

### Ejecutar Todas las Pruebas
```bash
node index.js --test
```

O usa la suite de pruebas dedicada con reportes detallados:
```bash
node test-suite.js
```

### Usar Scripts npm (si package.json está instalado)
```bash
npm start           # Lanza modo interactivo
npm test            # Ejecuta pruebas
npm run demo        # Lanza modo demo
```

## Recorrido para Primer Usuario

### 1. Lanza la Aplicación
```bash
node index.js
```

### 2. Menú Principal
Verás la historia de la Cámara de Ecos y un menú con 5 opciones.

### 3. Prueba la Demostración (Primer Paso Recomendado)
Selecciona la opción `[4] Ejecutar demostración`

Esto probará 6 secuencias preconfiguradas:
- `[3, 6, 9, 12]` → predice `15` ✓
- `[2, 4, 6, 8, 10]` → predice `12` ✓
- `[5, 10, 15, 20]` → predice `25` ✓
- `[10, 20, 30]` → predice `40` ✓
- `[1, 1, 1, 1]` → predice `1` ✓
- `[100, 90, 80, 70]` → predice `60` ✓

### 4. Prueba Tu Propia Secuencia
Selecciona la opción `[1] Ingresar una secuencia para predecir`

**Ejemplos que puedes intentar:**
- `5, 10, 15, 20` (múltiplos de 5)
- `10, 20, 30, 40` (múltiplos de 10)
- `100, 200, 300, 400` (centenas)
- `1, 2, 3, 4, 5` (conteo simple)
- `-10, -5, 0, 5` (negativo a positivo)

**Ingresa los números separados por comas:**
```
Ingresa tu opción (1-5): 1
Ingresa secuencia: 5,10,15,20

✨ La Cámara de Ecos responde:
   Secuencia original:   [5, 10, 15, 20]
   Diferencia común:     5
   Próximo eco predicho: 25
   Fórmula aplicada:     20 + 5 = 25
   📜 ✓ El siguiente número en la secuencia es: 25
```

### 5. Ver Tus Memorias
Selecciona la opción `[2] Ver archivo de memoria`

Muestra:
- Todas las secuencias que has ingresado
- Las predicciones realizadas
- Estadísticas (total de memorias, diferencia promedio)

### 6. Explora Más
- Intenta ingresar secuencias inválidas para ver el manejo de errores
- Ingresa secuencias con diferentes patrones
- Construye tu archivo de memoria

## Casos de Prueba de Ejemplo

### Progresiones Aritméticas Válidas (Tendrán Éxito)

| Secuencia | Diferencia | Predicción |
|-----------|-----------|-----------|
| [3, 6, 9, 12] | +3 | 15 |
| [2, 4, 6, 8] | +2 | 10 |
| [10, 5, 0, -5] | -5 | -10 |
| [100, 200, 300] | +100 | 400 |
| [5, 5, 5, 5] | 0 | 5 |

### Casos Inválidos (Serán Rechazados)

| Secuencia | Problema |
|-----------|----------|
| [1, 2, 4, 7] | No aritmética (diferencias: 1, 2, 3) |
| [1, 1, 2, 3, 5] | Patrón Fibonacci, no aritmético |
| [5] | Muy corta (necesita al menos 2 números) |
| [] | Secuencia vacía |

## Referencia de Comandos

```bash
# Modo interactivo
node index.js

# Modo de prueba
node index.js --test

# Suite de pruebas dedicada
node test-suite.js

# Con npm (si las dependencias de package.json están instaladas)
npm start
npm test
```

## Qué Hace Cada Opción del Menú

| Opción | Propósito |
|--------|-----------|
| [1] Ingresar una secuencia | Ingresa secuencias de números personalizadas |
| [2] Ver archivo de memoria | Ve todas las predicciones anteriores |
| [3] Limpiar todas las memorias | Reinicia el almacenamiento de memoria |
| [4] Ejecutar demostración | Ve 6 ejemplos preconfigurados |
| [5] Salir | Cierra la aplicación |

## Sistema de Memoria

La aplicación recuerda cada predicción que haces:
- **Información Almacenada**: Secuencia original, diferencia común, predicción, marca de tiempo
- **Ver Memorias**: Selecciona la opción [2]
- **Estadísticas**: Muestra total de memorias y diferencia promedio
- **Limpiar**: Selecciona la opción [3] para reiniciar todas las memorias

## Puntos de Aprendizaje

La Cámara de Ecos enseña:
1. **Progresiones Aritméticas**: Comprensión de secuencias con diferencias constantes
2. **Validación de Entrada**: Verificar datos antes de procesarlos
3. **Manejo de Errores**: Respuestas elegantes a entradas inválidas
4. **Almacenamiento de Datos**: Grabar y recuperar información
5. **Diseño de Algoritmos**: Implementación de lógica de predicción

## Solución de Problemas

### La aplicación no se inicia
```bash
# Verifica que Node.js está instalado
node --version

# Asegúrate de estar en el directorio echo-chamber
cd echo-chamber

# Intenta ejecutar la aplicación
node index.js
```

### Las pruebas fallan
```bash
# Ejecuta la suite de pruebas dedicada para salida detallada
node test-suite.js

# Verifica la versión de Node.js (necesita 12.0+)
node --version
```

### Salida extraña con decimales
La aplicación maneja correctamente la precisión de punto flotante. Algunas secuencias decimales pueden ser rechazadas si las diferencias no coinciden exactamente debido a la representación de punto flotante (ej: 0.1 + 0.2 ≠ 0.3 en JavaScript).

## Próximos Pasos

Después de explorar la funcionalidad básica:
1. Intenta crear secuencias de prueba propias
2. Explora el código en `index.js` para comprender la implementación
3. Lee el `README.md` completo para detalles técnicos
4. Ejecuta `node test-suite.js` para ver los 25 casos de prueba

## Desafíos Divertidos

1. **Encuentra una Secuencia con Diferencia 7**: Intenta `[7, 14, 21, 28]`
2. **Secuencia Descendente**: Intenta `[100, 80, 60, 40]` (diferencia: -20)
3. **Números Grandes**: Intenta `[1000, 2000, 3000, 4000]`
4. **Negativo a Positivo**: Intenta `[-10, -5, 0, 5]`
5. **Secuencia Constante**: Intenta `[42, 42, 42, 42]` (diferencia: 0)

---

**¡Que Disfrutes Explorando!** 🏰✨

Para más detalles, ve a `README.es.md`
