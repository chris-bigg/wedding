# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build for production to dist/
npm run preview    # Preview production build locally
```

### Running Single Pages
```bash
# Dev server automatically serves all routes
# Access specific pages: http://localhost:4321/ or http://localhost:4321/tech
```

## Architecture Overview

This is an **Astro-based wedding website** with React components for interactive features. The architecture follows Astro's "Islands" pattern where static Astro components comprise the majority of the site, with React components hydrated only where interactivity is needed.

### Key Architectural Patterns

**1. Content Centralization**
- All wedding content lives in `src/config/wedding-content.ts` as a single source of truth
- Components import and consume from this centralized config
- To update any text, dates, or information, edit this file only

**2. Hybrid Component Architecture**
- **Static Astro components** (`.astro`): Hero, Story, Details, Location, Accommodation, FAQ, Gift
- **Interactive React components** (`.tsx`): RSVPForm, Navigation, DarkModeToggle, SmoothScroll, CountdownTimer, MusicPlayer, SplashScreen
- React components use `client:load` (loads immediately) or `client:visible` (loads when scrolled into view) directives in `index.astro`

**3. Smooth Scrolling System**
- Uses Lenis library for smooth scrolling experience
- Initialized in `SmoothScroll.tsx` component with `client:load` directive in `Layout.astro`
- All anchor link navigation (#home, #story, etc.) is intercepted and animated via Lenis
- Navigation component uses IntersectionObserver to track active section

**4. Dark Mode Implementation**
- Toggle component in `DarkModeToggle.tsx` manages `.dark` class on `<html>` element
- Persists preference to localStorage
- Inline script in `Layout.astro` prevents flash by applying dark mode before page renders
- Tailwind dark mode uses custom `@custom-variant` syntax in `global.css`

**5. Styling System**
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Custom animations defined in `src/styles/global.css`
- Emerald-stone color scheme with gradients
- "Great Vibes" script font for headings (loaded from Google Fonts)

**6. Form Handling**
- RSVP form in `RSVPForm.tsx` is set up with Formspree integration
- Current endpoint: `https://formspree.io/f/xgvpanpe`
- Conditional rendering: plus-one and dietary fields only show when attending

## File Structure Highlights

```
src/
├── config/
│   └── wedding-content.ts      # Single source of truth for all content
├── layouts/
│   └── Layout.astro            # Base layout with Tailwind, dark mode script
├── pages/
│   ├── index.astro             # Main page - assembles all sections
│   └── tech.astro              # Tech stack page
├── components/
│   ├── *.astro                 # Static sections
│   └── *.tsx                   # Interactive React components
└── styles/
    └── global.css              # Tailwind imports + custom animations
```

## Important Context

### When Editing Content
Always update `src/config/wedding-content.ts` rather than hardcoding values in components. Components destructure and reference values from the centralized config.

### When Adding Interactive Features
- Use React components (`.tsx`) with appropriate `client:*` directive
- Import and use in `index.astro` with `client:load` or `client:visible`
- For scroll-based interactions, use IntersectionObserver (see `Navigation.tsx`)

### When Styling Components
- Use Tailwind classes with dark mode variants: `dark:text-stone-100`
- Emerald is the primary accent color, stone for neutrals
- Reference custom animations from `global.css`: `animate-fade-in`, `animate-slide-in-left`, `button-sparkle`

### Asset Management
- Images go in `public/images/` directory
- Reference without `/public` prefix: `/images/hotels/example.jpg`
- Lottie animations in `public/lottie/`
- Audio files in `public/audio/`

### Dark Mode Guidelines
- Always provide both light and dark variants: `bg-white dark:bg-stone-900`
- Use opacity and backdrop-blur for glass-morphism effects
- Test both modes when making styling changes

### Navigation Structure
- Main sections have IDs matching navigation hrefs: `#home`, `#story`, `#details`, `#location`, `#accommodation`, `#faq`, `#gift`, `#rsvp`
- Active section tracking via IntersectionObserver in `Navigation.tsx`
- RSVP is highlighted as primary CTA in navigation

### TypeScript Configuration
- Extends Astro's strict TypeScript config
- JSX uses React runtime (`"jsx": "react-jsx"`)
- All React components should use TypeScript with proper types
