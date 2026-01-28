# 🚀 Guía de Despliegue

## Despliegue Local

### Requisitos
- Node.js 12.0 o superior
- npm 6.0 o superior

### Instalación
```bash
# Clonar o descargar el repositorio
cd echo-chamber

# Instalar dependencias
npm install

# Iniciar el servidor
npm run web
```

El servidor estará disponible en `http://localhost:3000`

---

## Despliegue en Heroku

### Pasos

1. **Crear aplicación Heroku**
```bash
heroku login
heroku create your-app-name
```

2. **Configurar Procfile**
```
web: npm run web
```

3. **Desplegar**
```bash
git push heroku main
```

---

## Despliegue en Azure App Service

### Con Azure CLI
```bash
az appservice plan create \
  --name myAppServicePlan \
  --resource-group myResourceGroup \
  --sku FREE

az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name echo-castle

az webapp up --name echo-castle
```

---

## Despliegue con Docker

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "web"]
```

### Construir y ejecutar
```bash
docker build -t echo-castle .
docker run -p 3000:3000 echo-castle
```

---

## Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| PORT | Puerto del servidor | 3000 |
| NODE_ENV | Entorno | development |
| LOG_LEVEL | Nivel de logging | info |

### Ejemplo .env
```
PORT=3000
NODE_ENV=production
LOG_LEVEL=debug
```

---

## Monitoreo

### Logs
```bash
# En Heroku
heroku logs --tail

# Local
npm run web 2>&1 | tee server.log
```

### Health Check
```bash
curl http://your-domain/api/health
```

---

## Mantenimiento

### Limpieza de caché
```bash
# El caché se limpia automáticamente después de 24 horas
# O reinicia el servidor
```

### Backup de datos
```bash
# Datos guardados en data/server-history.json
cp data/server-history.json backups/history-$(date +%Y%m%d).json
```

---

## Solución de Problemas

### Puerto en uso
```bash
# Cambiar puerto
PORT=4000 npm run web

# O encontrar qué usa el puerto
lsof -i :3000
```

### Error de módulos
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Problemas de sesión
```bash
# Limpiar datos de sesión
rm -rf data/
npm run web
```

