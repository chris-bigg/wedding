# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Accommodation & RSVP updates - 2026-02-16

#### Added
- **AccommodationHero.tsx** - Rates and voucher sub-card below hero: displays voucher code "Feleena and Chris", room rates (31 Jul £158 / 1 Aug £168 Classic Room), and upgrades (Superior +£30, Feature +£75, Family +£120) in a two-column layout.
- **RSVPForm.tsx** - Custom food dropdowns (Starter, Main, Dessert) with bold dish names and plain descriptions; menu options defined as `STARTER_OPTIONS`, `MAIN_OPTIONS`, `DESSERT_OPTIONS`.

#### Changed
- **AccommodationHero.tsx** - Booking URL and promo code moved to module-level constants; booking link rendered only after mount to avoid first-click issues with rezcontrol.com. Hero copy updated; voucher code display text set to "Feleena and Chris". Removed `font-bold` / `font-semibold` from all elements using Mon de Tresor (font has no bold weight).
- **Typography** - Mon de Tresor used only at normal weight across the site; avoid `font-bold` or `font-semibold` with this font.

### Performance Refactoring - 2026-02-08

#### Added
- **Shared Type System:**
  - `src/types/guest.ts` - Guest data interface

- **Utility Modules:**
  - `src/utils/guests.ts` - Guest list access utilities
  - `src/utils/url.ts` - URL parameter handling utilities
  - `src/utils/formatters.ts` - Name formatting utilities
  - `src/utils/darkMode.ts` - Dark mode management utilities
  - `src/utils/scroll.ts` - Scroll behavior utilities

- **Custom Hooks:**
  - `src/hooks/useWindowSize.ts` - Debounced window dimensions hook

- **Performance Optimizations:**
  - Font preloading for critical fonts (Montserrat, Greater Theory)
  - Lazy loading for non-critical images
  - Optimized font-display strategy (optional for non-critical fonts)

- **Documentation:**
  - `REFACTORING.md` - Comprehensive refactoring documentation
  - `CHANGELOG.md` - This file

#### Changed
- **RSVPForm.tsx** - Uses shared utilities and custom hook, reduced code duplication
- **PersonalizedGreeting.tsx** - Uses shared utilities, cleaner imports
- **DarkModeToggle.tsx** - Uses shared dark mode utilities
- **SmoothScroll.tsx** - Uses shared scroll utilities, fixed TypeScript types
- **AccommodationHero.tsx** - Added lazy loading to images
- **AccommodationCarousel.tsx** - Added lazy loading to hotel images
- **Layout.astro** - Removed Google Fonts, added font preloading, simplified inline scripts
- **global.css** - Added SplashScreen styles (extracted from inline styles)
- **README.md** - Updated with new project structure and removed outdated font information
- **package.json** - Removed duplicate @studio-freight/lenis package

#### Removed
- **Unused Assets** (~50MB):
  - 16 unused image files from `/public/images/`
  - 18 static Montserrat font files
  - 1 unused Lottie animation file
  - 1 unused component (`ScrollProgress.tsx`)

- **External Dependencies:**
  - Google Fonts external request (Great Vibes font)
  - Duplicate `@studio-freight/lenis` npm package

- **Code Duplication:**
  - 3 duplicate `getGuestList()` implementations
  - 2 duplicate URL parameter parsing implementations
  - Duplicate dark mode initialization logic
  - Duplicate scroll management code
  - Manual window resize handlers (replaced with custom hook)

#### Performance Metrics
- **Assets:** Removed ~50MB of unused images + 500KB+ of fonts
- **HTTP Requests:** -1 (removed Google Fonts external request)
- **Code Duplication:** Eliminated 4 major duplicate patterns
- **Dependencies:** Removed 1 duplicate package
- **Build Time:** ~2.7 seconds (optimized)
- **TypeScript:** 100% type-safe, all checks passing

#### Technical Details
- Build output: 36MB
- Pages built: 2 (index, tech)
- New utility files: 7
- Modified components: 9
- Deleted files: 37+

#### Migration Notes
- No breaking changes to public API
- All functionality remains unchanged
- Build and type checks passing
- See `REFACTORING.md` for detailed documentation

---

## [1.0.0] - Initial Release

### Features
- Modern wedding website built with Astro, React, and Tailwind CSS
- Astro Islands Architecture for optimal performance
- Dark mode with persistent theme toggle
- Interactive RSVP form with confetti animation
- Personalized greeting system with guest IDs
- Smooth scrolling with Lenis
- GSAP-powered scroll animations
- Splash screen with Lottie animations
- Accommodation carousel with Swiper
- Google Maps integration
- Weather widget
- Countdown timer to wedding day
- Background music player
- Custom cursor effect (desktop)
- Mobile-responsive design
- Section-based navigation with active tracking
- Customizable content system
- Netlify deployment ready

### Tech Stack
- Astro 5.15.1
- React 19.2.0
- Tailwind CSS v4.1.16
- GSAP 3.13.0
- Lenis 1.3.13
- Lottie React 2.4.1
- Swiper 12.0.3
- React Confetti 6.4.0
- TypeScript

---

**Note:** This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
