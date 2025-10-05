# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for a midterm frequency trading system. It uses:
- Next.js 15.5.4 with Turbopack
- React 19
- TypeScript with strict mode
- Tailwind CSS v4 with `@tailwindcss/postcss`
- shadcn/ui component library (New York style)
- pnpm as the package manager

## Common Commands

### Development
```bash
pnpm dev           # Start development server with Turbopack
pnpm build         # Production build with Turbopack
pnpm start         # Start production server
pnpm lint          # Run ESLint
```

### Adding UI Components
The project is configured with shadcn/ui. To add components:
```bash
npx shadcn@latest add <component-name>
```

Components will be added to `@/components/ui` with the New York style variant.

## Architecture

### File Structure
- `app/` - Next.js 15 App Router directory
  - `app/page.tsx` - Homepage
  - `app/layout.tsx` - Root layout with Geist fonts
  - `app/globals.css` - Global Tailwind styles
- `lib/` - Utility functions
  - `lib/utils.ts` - Contains `cn()` utility for class merging
- `components/` - React components (when created, organized by shadcn/ui conventions)
- `public/` - Static assets

### Path Aliases
The project uses `@/*` path alias mapping to the root directory:
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/hooks` → `hooks/`

### Styling
- Uses Tailwind CSS v4 with CSS variables for theming
- Base color: neutral
- Includes `cn()` utility (`lib/utils.ts`) for conditional class merging with `clsx` and `tailwind-merge`
- Geist Sans and Geist Mono fonts are pre-configured

### TypeScript Configuration
- Strict mode enabled
- Target: ES2017
- Path aliases configured via `tsconfig.json`
- React Server Components (RSC) enabled

## Development Notes

### Tailwind CSS v4
This project uses Tailwind CSS v4 with the new PostCSS plugin (`@tailwindcss/postcss`). No `tailwind.config.js` is needed - configuration is CSS-based.

### Turbopack
Both `dev` and `build` commands use Turbopack (`--turbopack` flag) for faster builds.

### shadcn/ui
- Style: "new-york"
- RSC: enabled
- Icon library: lucide-react
- CSS variables: enabled
- Component registry configured in `components.json`
