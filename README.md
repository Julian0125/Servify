# Servify - Marketplace de Servicios Profesionales

Plataforma que conecta profesionales independientes verificados con hogares que necesitan servicios confiables en Bucaramanga y su area metropolitana.

## Estructura del Proyecto (Monorepo)

```
servify/
├── backend/          # Spring Boot API (Java 17)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/servify/
│   │       │   ├── config/         # Configuracion CORS
│   │       │   ├── controller/     # REST Controllers
│   │       │   ├── model/          # Entidades/DTOs
│   │       │   └── service/        # Logica de negocio
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/         # React + Vite + TypeScript
    ├── src/
    │   ├── components/
    │   │   ├── layout/     # Header, Footer
    │   │   └── sections/   # Hero, Categories, Professionals, etc.
    │   ├── services/       # API client
    │   ├── types/          # TypeScript interfaces
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## Requisitos

### Backend
- Java 17+
- Maven 3.8+

### Frontend
- Node.js 18+
- pnpm (o npm/yarn)

## Ejecucion

### 1. Backend (Spring Boot)

```bash
cd backend

# Con Maven Wrapper (recomendado)
./mvnw spring-boot:run

# O con Maven instalado
mvn spring-boot:run
```

El servidor estara disponible en: `http://localhost:8080`

### 2. Frontend (React + Vite)

```bash
cd frontend

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

La aplicacion estara disponible en: `http://localhost:5173`

## API Endpoints

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/professionals` | Lista todos los profesionales |
| GET | `/api/professionals?query=&location=&categoryId=` | Busqueda con filtros |
| GET | `/api/professionals/{id}` | Detalle de un profesional |
| GET | `/api/professionals/featured` | Profesionales destacados (premium) |
| GET | `/api/professionals/category/{categoryId}` | Por categoria |
| GET | `/api/categories` | Lista de categorias |
| GET | `/api/subscriptions` | Planes de suscripcion |
| GET | `/api/testimonials` | Testimonios |
| GET | `/api/business/metrics` | Metricas del modelo de negocio |

## Caracteristicas

### Para Clientes (Gratis)
- Buscar profesionales por categoria y ubicacion
- Ver perfiles verificados con resenas
- Contactar directamente a los profesionales
- Filtrar por cercania

### Para Profesionales (Suscripcion)
- **Plan Basico** ($35,000/mes): Perfil verificado, 5 fotos, posicionamiento estandar
- **Plan Premium** ($62,500/mes): Mayor visibilidad, aparece primero en busquedas
- **Plan Empresarial** ($150,000/mes): Multiples perfiles, dashboard, API

### Seccion Modelo de Negocio
- Propuesta de valor
- Analisis de mercado (TAM/SAM/SOM)
- Fuentes de ingresos
- Proyecciones financieras
- Plan de inversiones
- Analisis de riesgos

## Modo Demo

Si el backend no esta corriendo, el frontend automaticamente usa datos de demostracion (mock data) y muestra un indicador "Modo Demo" en la esquina inferior derecha.

## Para la Presentacion

1. Ejecutar el backend primero
2. Ejecutar el frontend
3. Abrir `http://localhost:5173` en el navegador
4. La pagina tiene navegacion por secciones usando el header fijo

## Tecnologias

### Backend
- Spring Boot 3.2
- Java 17
- Lombok
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (iconos)

## Equipo

Proyecto academico - Ingenieria de Software
Universidad Industrial de Santander
