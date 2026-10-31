# Calculadora Full Stack

Monorepo que reúne el frontend React/Vite y la API REST de la calculadora construida con Spring Boot. Ambos componentes viven bajo el repositorio principal y comparten una única configuración de Git y GitHub Actions.

## Estructura

```text
.
├── frontend/                 # Aplicación React/Vite
├── backend/                  # API Spring Boot
└── .github/workflows/        # CI/CD centralizado del monorepo
```

## Tecnologías

- Frontend: React, Vite, JavaScript y Vitest
- Backend: Java 21, Spring Boot, Maven
- Contenedores: Docker y Docker Compose
- CI/CD: GitHub Actions, Amazon S3/ECR, EC2 y CodeDeploy

## Desarrollo local

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

La API estará disponible en `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm ci
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` y el proxy de Vite redirigirá las peticiones al backend en el puerto 8080. Para más opciones, consulta la [documentación del frontend](frontend/README.md).

## Docker Compose

Cada componente puede iniciarse desde su directorio:

```bash
cd backend && docker compose up --build
cd frontend && docker compose up --build
```

## Pruebas

```bash
(cd frontend && npm ci && npm test -- --run)
(cd backend && ./mvnw test)
```

## GitHub Actions

Todos los workflows se mantienen en la raíz, en [.github/workflows/](.github/workflows/):

| Workflow | Responsabilidad |
| --- | --- |
| `Unit tests` | Prueba frontend y backend |
| `Dependency scan` | Audita npm y escanea las dependencias de Maven con Trivy |
| `Build and deploy frontend to S3` | Compila y publica el frontend en S3 |
| `Deploy backend to EC2 with CodeDeploy` | Construye, publica y despliega la imagen Docker del backend |

Los workflows ejecutan los comandos dentro de `frontend/` o `backend/` porque el checkout es el monorepo completo. Las variables y secretos necesarios para los despliegues se configuran una vez en el repositorio principal, no en los directorios de componentes. Consulta las instrucciones específicas de AWS y CodeDeploy en la [documentación del backend](backend/README.md) y del [frontend](frontend/README.md).

## Historial y control de versiones

Este proyecto utiliza un único repositorio Git en la raíz. Los directorios `frontend/` y `backend/` forman parte del mismo checkout y no contienen repositorios Git independientes.
