# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

3D interactive portfolio website for Iksang Jung (정익상). Built with Next.js 16 App Router, React Three Fiber, GSAP, and Zustand. The actual source code lives in the `Iksang_resume/` subdirectory.

## Commands

All commands must be run from `Iksang_resume/`:

```bash
cd Iksang_resume
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint via Next.js
```

Pre-commit hook runs `eslint --fix` on staged files via lint-staged. Pre-push hook runs full lint.

## Architecture

### Rendering Pipeline

The app is a single-page 3D experience composed in `app/page.tsx`:

```
CanvasLoader (Three.js Canvas + ScrollControls, 4 scroll pages)
  └── ScrollWrapper (camera position/rotation driven by scroll + pointer)
        ├── Hero (title animation, window model, clouds, stars)
        ├── Experience (portal grid tiles)
        │     ├── GridTile "work" → Work (timeline + Memory 3D model)
        │     └── GridTile "projects" → Projects (carousel + Wanderer 3D model)
        └── Footer (social links)
```

### Portal System

`GridTile` components use `MeshPortalMaterial` from drei to create interactive portals. When a user clicks a tile, `portalStore.activePortalId` updates, the camera transitions via GSAP, and the portal scene becomes the active view. The portal ID (`"work"` or `"projects"`) controls which sub-scene renders.

### Scroll-Driven Animation

`ScrollWrapper` reads `useScroll()` from drei and maps scroll offset (0-1) to camera position/rotation along predefined paths. Pointer movement adds subtle parallax. Components like `Timeline` and `Experience` title use scroll ranges for their own animations.

### State Management (Zustand)

Three stores in `app/stores/`:
- **scrollStore** - scroll progress (0-1)
- **portalStore** - active portal ID (null | "work" | "projects")
- **themeStore** - persisted theme (light/dark) with `persist` middleware

### 3D Models

GLTF models in `public/models/` loaded via `useGLTF`:
- `window.glb` - Hero section window with animated handle
- `wanderer_above_the_sea_of_fog.glb` - Projects section backdrop
- `dalithe_persistence_of_memory.glb` - Work section backdrop

Files ending in `-old.glb` are backups.

### Path Aliases

Defined in `tsconfig.json`:
- `@/*` → `./` (project root)
- `@stores` → `./app/stores`
- `@types` → `./app/types`
- `@constants` → `./app/constants`

### Mobile Handling

Extensive mobile-specific behavior throughout:
- `react-device-detect` (`isMobile`) gates desktop vs mobile rendering paths
- `OrientationOverlay` warns portrait users to rotate to landscape
- `TouchPanControls` provides custom touch pan for project carousel
- `GridTile` uses triangles on mobile vs planes on desktop
- `ProgressLoader` renders a simple bar on mobile vs SVG perimeter on desktop

## Code Style

- Indentation: tabs (enforced by `.editorconfig`)
- Quotes: single
- Semicolons: required
- `react-hooks/exhaustive-deps` rule is disabled
- `reactStrictMode` is `false` in next.config.ts (Three.js compatibility)

## Deployment

GitHub Pages via `.github/workflows/nextjs.yml` — triggers on push to `master`. Builds with Next.js static export to `out/` directory.

## Custom Fonts

Loaded in `app/layout.tsx` via `next/font/local`:
- **Soria** (`--font-soria`) - serif, titles
- **Vercetti** (`--font-vercetti`) - sans, body
- **MaruBuri** - Korean text (loaded in components)
- **Pretendard** - Korean detail text (loaded in components)
