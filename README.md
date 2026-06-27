# Xclusives ✦

Recopilación de **videojuegos exclusivos** de distintas plataformas. Una vitrina para revalorizar joyas que quedaron perdidas en la historia del gaming.

Inspirado visualmente en **Wii U**, **iiSU** y **ES-DE**. Cada juego incluye links de compra, descarga y emulación.

## Stack

- React 19 + TypeScript + Vite 8
- CSS puro con glassmorphism y Y2K aesthetic
- Hosting en Vercel

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Enriquecer metadata (RAWG API)

```bash
# 1. Crear .env con RAWG_API_KEY=tu_key
# 2. Ejecutar:
npm run enrich
```

## Deploy

```bash
npx vercel --prod --yes
```

Ver `AGENTS.md` para documentación completa del proyecto.
