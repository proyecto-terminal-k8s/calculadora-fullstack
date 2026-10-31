# Calculadora frontend

Aplicación React con Vite que replica la interfaz BlueCompute de
`stitch_minimalist_blue_calculator_ui` e invoca las operaciones básicas descritas
en `api-docs.json`.

## Desarrollo local

```bash
npm install
npm run dev
```

El proxy de Vite dirige `/api/` y `/health` a `http://localhost:8080`. Inicia el
backend Spring Boot en ese host/puerto antes de probar operaciones.

## Docker y Nginx

Con Spring Boot escuchando en el puerto `8080` de la máquina host:

```bash
docker compose up --build
```

Abre `http://localhost:3000`. Nginx sirve el frontend y envía `/api/` y `/health`
al backend. Si la API está en otro host o puerto, configura `API_HOST` y
`API_PORT`; también puedes cambiar el puerto público con `FRONTEND_PORT`.

Por ejemplo:

```bash
API_HOST=host.docker.internal API_PORT=8080 FRONTEND_PORT=3000 docker compose up --build
```

La API debe exponer `GET /health` y las rutas
`/api/v1/calculadora/{sumar,restar,multiplicar,dividir}` con los parámetros de
consulta `numero1` y `numero2`. La respuesta satisfactoria puede ser un decimal
como texto o JSON; los errores `application/problem+json` se muestran en la UI.

## CI/CD en GitHub Actions

La automatización vive de forma centralizada en `.github/workflows/` del repositorio principal. Desde este monorepo:

- `Unit tests` ejecuta `npm test` en `frontend/` en cada push y pull request.
- `Dependency scan` ejecuta `npm audit` al nivel `high` y escanea también el backend.
- `Build and deploy frontend to S3` compila el frontend y publica los archivos de
  `dist/` en Amazon S3 al crear un tag `v*`; también puede ejecutarse manualmente.

Para publicar en S3, configura estas variables del repositorio de GitHub:

- `AWS_REGION`: región de AWS, por ejemplo `us-east-1`.
- `S3_BUCKET`: nombre del bucket S3 de destino, creado previamente.

Configura el secreto `AWS_ROLE_TO_ASSUME` con el ARN de un rol de IAM que
confíe en GitHub Actions mediante OIDC y tenga permisos para listar el bucket y
subir objetos (`s3:ListBucket` y `s3:PutObject`). No se requieren claves AWS
estáticas. El workflow no elimina objetos existentes del bucket.
