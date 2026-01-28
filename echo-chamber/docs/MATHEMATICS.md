# 📐 Guía Matemática de Echo Castle

## Progresiones Aritméticas (AP)

### Definición
Una progresión aritmética es una secuencia donde la diferencia entre términos consecutivos es constante.

### Fórmula General
```
a_n = a_1 + (n-1)d
```

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
```
S_n = n/2 × (a_1 + a_n) = n/2 × (2a_1 + (n-1)d)
```

---

## Progresiones Geométricas (GP)

### Definición
Una progresión geométrica es una secuencia donde cada término se obtiene multiplicando el anterior por un factor constante.

### Fórmula General
```
a_n = a_1 × r^(n-1)
```

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
```
Si r ≠ 1:  S_n = a_1 × (1 - r^n) / (1 - r)
Si r = 1:  S_n = n × a_1
```

### Suma infinita
```
Si |r| < 1:  S_∞ = a_1 / (1 - r)
```

---

## Secuencias Polinómicas

### Cuadrática (Grado 2)
```
a_n = an² + bn + c
```

Ejemplo: 1, 4, 9, 16, 25 (cuadrados perfectos)
- Diferencias de primer orden: 3, 5, 7, 9
- Diferencias de segundo orden: 2, 2, 2 (constante)

### Cúbica (Grado 3)
```
a_n = an³ + bn² + cn + d
```

Ejemplo: 1, 8, 27, 64, 125 (cubos perfectos)
- Diferencias de primer orden: 7, 19, 37, 61
- Diferencias de segundo orden: 12, 18, 24
- Diferencias de tercer orden: 6, 6 (constante)

### Método de Diferencias Finitas

El método de diferencias finitas permite identificar polinomios detectando cuándo las diferencias sucesivas se vuelven constantes.

```
Secuencia:     1    4    9   16   25
Dif 1:           3    5    7    9
Dif 2:             2    2    2
```

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

```javascript
const TOLERANCE = 1e-10;
```

### Secuencias Constantes
Una secuencia donde todos los elementos son iguales es una AP con d=0.

### Sucesión de Fibonacci
No es un AP, GP, ni polinomio simple. Se sigue:
```
F_n = F_{n-1} + F_{n-2}
```

---

## Referencias Matemáticas

1. Stewart, J. (2015). Calculus: Early Transcendentals (8th ed.)
2. Larson, R. E., & Edwards, B. H. (2016). Precalculus (10th ed.)
3. OEIS Foundation (2023). The On-Line Encyclopedia of Integer Sequences

