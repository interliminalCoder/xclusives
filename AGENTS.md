# Xclusives — Manual del Proyecto

## Stack
- **React 19 + TypeScript + Vite 8**
- **CSS puro** con variables custom (sin frameworks CSS)
- **Hosting**: Vercel (alias: https://xclusives.vercel.app)
- **GitHub**: https://github.com/interliminalCoder/xclusives

## Estructura del proyecto

```
xclusives/
├── scripts/
│   └── enrich-from-rawg.ts   # Enriquecer metadata desde RAWG API
├── src/
│   ├── components/
│   │   ├── GameSlider/       # Slider principal + tarjeta flotante
│   │   ├── Layout/
│   │   │   ├── Header.tsx    # Logo + título gradiente
│   │   │   └── PlatformBar.tsx # Chips de plataforma (glassmorphism)
│   │   └── ThemeToggle/      # Botón ☀️/🌙 modo claro/oscuro
│   ├── data/
│   │   ├── games.json        # Catálogo de juegos exclusivos
│   │   └── platforms.json    # Metadatos de cada plataforma
│   └── types/
│       └── index.ts          # Interfaces Platform, Game, GameLink
├── .env.example              # Template para RAWG_API_KEY
├── AGENTS.md                 # Este archivo
└── vite.config.ts
```

## Diseño visual

### Inspiración
- **Wii U**: Tarjetas flotantes, fondo negro, navegación por plataforma
- **iiSU**: Glassmorphism, animaciones bounce, aesthetic moderno
- **ES-DE**: Organización por plataforma, carátulas como centro visual
- **Y2K**: Gradientes, vidrio esmerilado, mesh background, glow

### Sistema de tema
- Dos modos: `dark` (default) y `light`
- Controlado por atributo `data-theme` en `<html>`
- Persistencia en `localStorage` clave `xclusives-theme`
- Variables CSS: `--bg`, `--bg-glass`, `--text-card`, `--border-glass`, etc.
- Transición suave entre temas (0.6s)

### Glassmorphism
- `background: var(--bg-glass)` → rgba semitransparente
- `backdrop-filter: blur(20px)` → desenfoque del fondo
- `border: 1px solid var(--border-glass)` → borde sutil
- `box-shadow: var(--shadow-glass)` → sombra flotante suave

### Background
- Fondo `#0a0a0f` (dark) / `#e8e6e0` (light)
- 3 radial gradients sutiles vía `body::before` para efecto mesh glow
- Acents: `#ff2d55` → `#ff6b35` (dark) / `#e60012` → `#ff6b35` (light)

## Plataformas actuales (V1)

| ID | Nombre | Color | Juegos |
|---|---|---|---|
| `xbox-360` | Xbox 360 | `#2ecc40` | 7 |
| `ps2` | PlayStation 2 | `#0070d2` | 7 |
| `ps3` | PlayStation 3 | `#003791` | 7 |
| `ds` | Nintendo DS | `#e53935` | 6 |
| `3ds` | Nintendo 3DS | `#ff6f00` | 7 |

**Total: 34 juegos exclusivos curados.**

## Tipos TypeScript

```ts
interface Platform {
  id: string
  name: string
  shortName: string
  manufacturer: string
  releaseYear: number
  color: string
  icon: string
  description: string
}

interface GameLink {
  type: 'buy' | 'download' | 'emulation' | 'info'
  label: string
  url: string
}

interface Game {
  id: string
  platformId: string
  name: string
  alternativeNames?: string[]
  developer?: string
  publisher?: string
  releaseYear?: number
  genre?: string[]
  description?: string
  coverUrl?: string
  backgroundUrl?: string
  rating?: number
  links: GameLink[]
  isExclusive: boolean
  notes?: string
}
```

## Comandos

```bash
npm run dev       # Desarrollo local
npm run build     # Build producción (tsc + vite)
npm run preview   # Preview del build local
npm run enrich    # Enriquecer metadata via RAWG API (requiere .env)
npm run lint      # Linter (oxlint)
```

## RAWG API

Para enriquecer carátulas y metadata automáticamente:
1. Crear `.env` con `RAWG_API_KEY=tu_key` (ver `.env.example`)
2. Obtener key gratis en https://rawg.io/apidocs
3. Ejecutar `npm run enrich`
4. El script lee `games.json`, consulta RAWG, escribe campos faltantes (coverUrl, description, genre, developer, etc.)

**Rate limit**: 250ms entre requests. ~10 segundos para el catálogo actual.

## Deploy

- **Automatizado**: push a `main` → build en Vercel
- **Manual**: `npx vercel --prod --yes` desde el directorio
- **Dominio**: https://xclusives.vercel.app

## Agregar una plataforma nueva

1. Agregar entrada en `src/data/platforms.json`
2. Agregar entrada de mapping en `PLATFORM_MAP` en `scripts/enrich-from-rawg.ts`
3. Agregar juegos en `src/data/games.json` con el `platformId` correspondiente
4. Build y deploy

## Agregar un juego nuevo

Agregar objeto en `src/data/games.json` con:
- `id`: único, kebab-case
- `platformId`: match con el id de platforms.json
- `name`, `developer`, `publisher`, `releaseYear`, `genre[]`, `description`
- `links[]`: objetos con type (`buy`|`download`|`emulation`|`info`), label, url
- `isExclusive`: true (para esta app todos lo son)

## Notas de diseño

- No se usa ningún framework CSS ni librería de componentes
- Tipografía: Inter (Google Fonts)
- Animaciones: cubic-bezier(0.34, 1.56, 0.64, 1) → overshoot bounce
- Las plataformas tienen un color distintivo que se usa en badges y hover de links
- El cover usa fallback con iniciales del juego + gradiente del color de plataforma
- Navegación por teclado: flechas ← → para cambiar de juego
