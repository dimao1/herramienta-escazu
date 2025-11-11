# Herramienta de Autodiagnóstico - Ruta de Escazú 567

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/dimao1-6459s-projects/v0-next-js-diagnostic-tool)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

## 📋 Descripción

Herramienta de autodiagnóstico para la implementación del Acuerdo de Escazú y la promoción del Gobierno Abierto Ambiental en Colombia. Parte del Programa Sistema Nacional de Control Social Ambiental #AlertaPorMiAmbiente.

## ✨ Características

- ✅ Evaluación de 39 preguntas distribuidas en 3 módulos
- 📊 Cálculo automático de puntuación y clasificación
- 📄 Generación de reportes PDF descargables
- 💾 Guardado automático de progreso (localStorage)
- 🗄️ Almacenamiento de evaluaciones en base de datos
- 👨‍💼 Panel de administrador para consultar resultados
- 📱 Diseño completamente responsive
- 🎨 Animaciones suaves con Framer Motion

## 🚀 Inicio Rápido (Desarrollo Local)

### Prerrequisitos

- Node.js 18+
- Docker Desktop
- Git

### Configuración Rápida

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd herramienta-escazu

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar base de datos PostgreSQL (Docker)
docker compose up -d

# 5. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Usando el Script de PowerShell

```powershell
# Configuración automática de la base de datos
.\scripts\setup-local-db.ps1

# Luego iniciar la aplicación
npm run dev
```

Para más detalles, consulta [SETUP_LOCAL.md](./SETUP_LOCAL.md)

## Deployment

Your project is live at:

**[https://vercel.com/dimao1-6459s-projects/v0-next-js-diagnostic-tool](https://vercel.com/dimao1-6459s-projects/v0-next-js-diagnostic-tool)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/skAHZw7b48t](https://v0.dev/chat/projects/skAHZw7b48t)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
