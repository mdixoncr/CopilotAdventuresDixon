# 🏰 Cámara de Ecos - Predictor de Secuencias Numéricas Mágicas

Una aplicación Node.js que simula una Cámara de Ecos encantada donde los usuarios predicen el siguiente número en secuencias de progresión aritmética. Este proyecto educativo demuestra validación de secuencias, reconocimiento de patrones y diseño de interfaz interactiva basada en consola.

## 📖 Contexto de la Historia

Profundamente dentro de la antigua biblioteca de Numeria se encuentra la **Cámara de Ecos** mística, una sala donde números mágicos danzaban en patrones perfectos. Cada número se repite de acuerdo con una ley antigua: *"Cada eco difiere del anterior por la misma cantidad mística."*

Como el aprendiz más nuevo de la Cámara, ¡debes dominar el arte de la predicción y descubrir cuál será el siguiente eco!

## ✨ Características

### Funcionalidad Principal
- **Validación de Secuencias**: Verifica que las secuencias de entrada formen progresiones aritméticas válidas
- **Motor de Predicción**: Calcula el siguiente número usando la fórmula de diferencia común
- **Almacenamiento de Memoria**: Registra todas las predicciones y mantiene un archivo completo de memoria
- **Manejo de Errores**: Cobertura integral de casos límite y mensajes de error amigables

### Interfaz de Usuario
- **Menú Interactivo**: Navegación fácil entre diferentes operaciones
- **Experiencia Temática**: Contexto narrativo envolvente para el acertijo
- **Modo Demostración**: Secuencias de prueba preconfiguradas para ver el sistema en acción
- **Archivo de Memoria**: Ver todas las predicciones anteriores con estadísticas
- **Resultados Detallados**: Explicación clara de cómo se calcularon las predicciones

### Pruebas y Validación
- **6 Pruebas Automatizadas**: Validación integral de la funcionalidad principal
- **Cobertura de Casos Límite**: Pruebas para progresiones inválidas, matrices vacías, elementos únicos
- **Progresiones Negativas**: Soporte para secuencias descendentes
- **Modo de Prueba**: Ejecuta todas las pruebas automáticamente con la bandera `--test`

## 🚀 Cómo Comenzar

### Requisitos Previos
- Node.js 12.0 o superior
- Acceso a terminal/línea de comandos

### Instalación

1. Navega al directorio echo-chamber:
```bash
cd echo-chamber
```

2. Sin dependencias adicionales requeridas - utiliza el módulo integrado `readline` de Node.js

### Ejecutar la Aplicación

#### Modo Interactivo
```bash
node index.js
```
Inicia la experiencia interactiva de la Cámara de Ecos con navegación por menú.

#### Modo de Prueba
```bash
node index.js --test
```
Ejecuta las 6 pruebas automatizadas y muestra los resultados de éxito/fallo.

#### Con Node Shebang (en sistemas tipo Unix)
```bash
./index.js
```

## 📚 Cómo Usar

### Opciones del Menú Principal

**[1] Ingresar una secuencia para predecir**
- Ingresa números separados por comas (ej: `3,6,9,12`)
- El sistema valida la secuencia
- Si es válida, predice el siguiente número
- El resultado se añade al archivo de memoria

**[2] Ver archivo de memoria**
- Muestra todas las predicciones anteriores
- Presenta la secuencia original, diferencia común y predicción
- Incluye estadísticas: total de memorias y diferencia promedio

**[3] Limpiar todas las memorias**
- Reinicia el archivo de memoria
- Útil para comenzar de nuevo

**[4] Ejecutar demostración**
- Prueba automáticamente 6 secuencias preconfiguradas
- Muestra varios tipos de progresión:
  - Progresión básica (3, 6, 9, 12)
  - Secuencia de múltiples elementos (2, 4, 6, 8, 10)
  - Diferentes patrones (5, 10, 15, 20)
  - Progresión descendente (100, 90, 80, 70)
  - Secuencia constante (1, 1, 1, 1)

**[5] Salir de la Cámara de Ecos**
- Cierra la aplicación de manera correcta

## 💡 Ejemplo de Uso

### Entrada/Salida de Muestra

```
Entrada: 3,6,9,12
Salida:
✨ La Cámara de Ecos responde:

   Secuencia original:   [3, 6, 9, 12]
   Diferencia común:     3
   Próximo eco predicho: 15
   Fórmula aplicada:     12 + 3 = 15

   📜 ✓ El siguiente número en la secuencia es: 15
```

### Pruebas con Secuencias Inválidas

```
Entrada: 1,2,4,7
Salida:
❌ ¡No es una progresión aritmética! 
   Se detectó una diferencia inconsistente entre 2 y 4.
```

## 🔬 Detalles de Implementación

### Clase EchoChamber (Predictor de Secuencias)

**Métodos Principales:**

- `validateSequence(sequence)`: Valida la progresión aritmética
  - Devuelve estado de validación, mensajes de error y diferencia común
  - Verifica al menos 2 elementos
  - Verifica que todas las diferencias consecutivas sean iguales

- `predictNext(sequence)`: Predice el siguiente número
  - Valida la secuencia primero
  - Calcula: `siguiente = último + diferencia`
  - Almacena el resultado en memoria
  - Devuelve objeto de resultado detallado

- `getMemories()`: Recupera todas las predicciones almacenadas
  - Devuelve matriz de entradas de memoria con marcas de tiempo

- `getMemoryStats()`: Calcula estadísticas de memoria
  - Incluye: total de memorias y diferencia promedio

### Clase EchoChamberUI (Interfaz de Usuario)

**Métodos Principales:**

- `start()`: Bucle interactivo principal
  - Muestra menú y procesa opciones del usuario
  - Mantiene la sesión en ejecución hasta que el usuario salga

- `handleSequenceInput()`: Procesa entrada de secuencia del usuario
  - Analiza valores separados por comas
  - Valida formato de entrada
  - Muestra resultados

- `displayPredictionResult(result)`: Formatea y muestra predicciones
  - Muestra secuencia, patrón y fórmula
  - Códigos de color con símbolos (✓, ❌, 📜)

- `displayMemories()`: Muestra archivo de memoria con estadísticas

- `runDemonstration()`: Ejecuta 6 pruebas preconfiguradas

### Fórmula de Progresión Aritmética

Para una secuencia con diferencia común `d`:
```
Primer término:   a₁
Segundo término:  a₁ + d
Tercer término:   a₁ + 2d
...
n-ésimo término:  aₙ = a₁ + (n-1)d
Siguiente término: aₙ₊₁ = aₙ + d
```

## ✅ Cobertura de Pruebas

Las 6 pruebas principales pasan exitosamente:

| Prueba | Entrada | Esperado | Resultado |
|--------|---------|----------|-----------|
| 1 | [3, 6, 9, 12] | 15 | ✅ APROBADO |
| 2 | [2, 4, 6, 8] | 10 | ✅ APROBADO |
| 3 | [10, 5, 0, -5] | -10 | ✅ APROBADO |
| 4 | [1, 2, 4, 7] | Rechazado | ✅ APROBADO |
| 5 | [5] | Rechazado | ✅ APROBADO |
| 6 | [] | Rechazado | ✅ APROBADO |

### Ejecutar Pruebas

```bash
node index.js --test
```

La salida muestra el estado de éxito/fallo para cada prueba con detalles sobre fallos.

## 🎯 Objetivos de Aprendizaje

Esta aplicación enseña:

1. **Diseño de Algoritmos**: Implementación de lógica de validación y predicción de secuencias
2. **Validación de Entrada**: Manejo de casos límite y errores del usuario elegantemente
3. **Estructuras de Datos**: Uso de matrices y objetos para administración de datos
4. **Programación Orientada a Objetos**: Arquitectura basada en clases (EchoChamber, UI)
5. **Diseño de Interfaz de Consola**: Creación de experiencias interactivas envolventes en terminal
6. **Metodología de Pruebas**: Cobertura integral de pruebas y automatización
7. **Documentación de Código**: Comentarios extensos y docstrings para claridad
8. **Manejo de Errores**: Mensajes de error amigables para el usuario y administración de casos límite

## 🐛 Manejo de Errores

La aplicación maneja:

- **Entrada no numérica**: Filtra automáticamente números inválidos
- **Secuencias muy cortas**: Requiere al menos 2 números
- **Progresiones inválidas**: Detecta diferencias inconsistentes
- **Entrada vacía**: Proporciona orientación al usuario
- **Diferencias no enteras**: Soporta progresiones decimales
- **Progresiones negativas**: Funciona correctamente con secuencias descendentes

## 📝 Estructura del Código

```
index.js (500+ líneas)
├── Clase EchoChamber (Predictor de Secuencias)
│   ├── validateSequence()
│   ├── predictNext()
│   ├── getMemories()
│   ├── clearMemories()
│   └── getMemoryStats()
├── Clase EchoChamberUI (Interfaz de Usuario)
│   ├── displayWelcome()
│   ├── displayMenu()
│   ├── handleSequenceInput()
│   ├── displayPredictionResult()
│   ├── displayMemories()
│   ├── runDemonstration()
│   ├── promptUser()
│   └── start()
├── Módulo de Pruebas
│   └── runAutomatedTests()
└── Punto de Entrada Principal
    └── main()
```

## 🎨 Características Destacadas

### Experiencia del Usuario
- ✨ Narrativa temática impulsada por historia
- 🏰 Bordes ASCII visuales y formato
- 📊 Visualización clara de datos
- 📚 Archivo de memoria integral
- 🎬 Modo de demostración para aprendizaje

### Calidad del Código
- 📖 Documentación extensiva en línea
- 🔍 Validación de entrada en todas las entradas del usuario
- ⚠️ Manejo de errores elegante
- 🧪 Cobertura integral de pruebas
- 🎯 Estructura de clase bien organizada

### Extensibilidad
- Fácil agregar nuevas secuencias de prueba
- El sistema de memoria puede persistir a archivos
- La interfaz de usuario puede adaptarse a interfaz web
- El algoritmo puede extenderse para otros tipos de progresión

## 🔮 Mejoras Posibles

- **Persistencia de Archivo**: Guardar/cargar memorias a archivos JSON
- **Patrones Avanzados**: Soportar progresiones geométricas, secuencias de Fibonacci
- **Interfaz Web**: Convertir a web usando Express.js
- **Niveles de Dificultad**: Secuencias progresivamente más difíciles
- **Tabla de Clasificación**: Rastrear puntuaciones de precisión de predicción
- **Visualización**: Graficar secuencias usando arte ASCII

## 📄 Licencia

Este proyecto es parte del repositorio educativo CopilotAdventures.

## 🙋 Soporte

Para problemas o preguntas:
1. Revisa la documentación del código en línea
2. Ejecuta el modo demostración: `node index.js` → [4]
3. Ejecuta pruebas automatizadas: `node index.js --test`
4. Revisa los mensajes de error para obtener orientación específica

---

**Estado de la Aventura**: ¡La Cámara de Ecos espera tus predicciones! 🏰✨
