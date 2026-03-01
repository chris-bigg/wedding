# Wedding Website

A modern, elegant wedding website template built with Astro, React, and Tailwind CSS. Features smooth animations, interactive components, dark mode, RSVP form with confetti celebration, and a fully customizable content system. Perfect for creating a beautiful, performant wedding website.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Overview](#-project-overview)
- [Architecture](#-architecture)
- [Key Features](#-key-features)
- [Customization Guide](#-customization-guide)
- [Guest tier URL parameters](#42-guest-tier-url-parameters)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Deployment](#-deployment)
- [Tech Stack](#-tech-stack)
- [Learn More](#-learn-more)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher (recommended: 20.x LTS)
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** (for version control)

To verify your installations:

```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
```

## 🚀 Quick Start

```bash
# Clone the repository (or download the project)
git clone <repository-url>
cd wedding-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The development server will start at `http://localhost:4321`

## 📖 Project Overview

This is a fully customizable wedding website template that uses Astro's Islands Architecture for optimal performance. The majority of the site is built with static Astro components, with React components only hydrating where interactivity is needed. All content is centralized in a single configuration file, making it easy to customize without touching component code.

### What's Included

- ✨ Fully responsive design (mobile-first)
- 🎨 Dark mode with smooth transitions
- 🎭 Smooth scrolling with Lenis
- 🎉 Interactive RSVP form with confetti animation
- 📸 Photo gallery section
- 🗺️ Google Maps integration
- 🏨 Accommodation recommendations carousel
- 🎵 Optional background music player
- ⏰ Countdown timer to wedding day
- 🌤️ Weather widget
- 🎨 Custom animations with GSAP
- 📱 Mobile-optimized touch interactions

## 🏗️ Architecture

This project follows **Astro's Islands Architecture**:

- **Static Astro Components** (`.astro`): Used for content sections (Hero, Story, Details, FAQ, etc.). These render as static HTML with zero JavaScript by default, providing maximum performance.

- **Interactive React Components** (`.tsx`): Used only where interactivity is needed (RSVP form, navigation, dark mode toggle, etc.). These are hydrated with the `client:load` or `client:visible` directives:
  - `client:load`: Hydrates immediately (for above-the-fold interactive elements)
  - `client:visible`: Hydrates when scrolled into view (for below-the-fold elements)

- **Content Management**: All wedding content lives in `src/config/wedding-content.ts` as a single source of truth. Edit this file to customize your wedding information.

### Component Hydration Strategy

- **Immediate hydration** (`client:load`): Navigation, SmoothScroll, CustomCursor, SplashScreen, MusicPlayer
- **On-scroll hydration** (`client:visible`): FloralAnimation, SectionAnimations
- **No hydration**: Static Astro components (Hero, Story, Details, FAQ, etc.)

This strategy ensures optimal performance with minimal JavaScript sent to the browser.

## 🎯 Key Features

### Performance
- **Static Generation**: All content rendered at build time for maximum speed
- **Astro Islands Architecture**: React components hydrated selectively, minimizing JavaScript bundle
- **Optimized Assets**: Lazy loading for images, preloaded critical fonts, no external font requests
- **Code Efficiency**: Shared utilities and hooks reduce duplication and bundle size
- **Smooth Scrolling**: Lenis library for buttery-smooth scroll experience
- **GPU Acceleration**: Optimized animations with GSAP and CSS transforms
- **Mobile Optimized**: Special handling for touch devices, debounced resize handlers
- **Tailwind CSS v4**: Modern utility-first CSS with minimal bundle size

### Interactive Components
- **Animated Hero Title**: GSAP-powered scroll-triggered parallax effect
- **Splash Screen**: Elegant intro animation with Lottie
- **Confetti Celebration**: Triggers on successful RSVP submission
- **Dark Mode**: Persistent theme toggle with localStorage (no flash on load)
- **Music Player**: Optional background music with controls
- **Countdown Timer**: Real-time countdown to wedding day
- **Active Section Tracking**: Navigation highlights current section via IntersectionObserver
- **Custom Cursor**: Styled cursor effect on desktop
- **Weather Widget**: Displays weather information in footer
- **Accommodation Carousel**: Swiper-powered hotel recommendations carousel
- **Section Animations**: Scroll-triggered fade-in animations for sections

### Content Management
- **Single Source of Truth**: All content in `wedding-content.ts`
- **HTML Support**: Description fields support HTML formatting (`<strong>`, `<a>`, etc.)
- **Google Maps Integration**: Embedded map with "Get Directions" CTA overlay
- **Honeymoon Modal**: Clickable modal with PayPal link; flippable card reveals copyable bank details (sort code & account number) for traditional transfers

## 📝 Customization Guide

### 1. Update Wedding Content

Edit `src/config/wedding-content.ts` to update all wedding information:

```typescript
export const weddingContent = {
  couple: {
    name1: "Your Name",
    name2: "Partner Name",
  },
  date: {
    full: "Saturday, August 1st, 2026",
    time: "1pm",
  },
  venue: {
    name: "Venue Name",
    address: "Full address",
    // ... etc
  },
  // ... more content
};
```

This file controls:
- Couple names
- Wedding date and time
- Venue details
- Schedule
- FAQs (see FAQ section below for details)
- Accommodation info
- Travel details
- Gift registry message
- Contact email

### 2. Add Photos

1. Place engagement photos in `/public/images/us/`
2. Update `src/components/Story.astro` to display your photos using Astro's `<Image>` component

### 3. Customize Colors & Styling

The site uses a **dark forest green and warm cream/beige** color scheme with white typography in dark mode. To change:

1. **Light Mode Colors**: 
   - Primary green: Dark forest green shades (`green-800`, `green-900`, `green-950`)
   - Accent colors: Warm cream/beige tones (`#F8F6F2`, `#E8E6E1`, `#D9D7D2`, `#C9C7C1`, `#BAB8B2`, `#AAA8A2`)
   - Edit Tailwind classes in components (search for `green-*` classes)

2. **Dark Mode Colors**:
   - Typography: White (`text-white`, `text-stone-200`)
   - Backgrounds: Cream/white gradients (`dark:from-stone-200/30 dark:to-stone-300/40`)
   - Secondary elements: Slightly darker white/cream tones

3. **Fonts**: Custom fonts are preloaded for optimal performance:
   - Montserrat (variable font) - body text
   - Greater Theory - headings
   - Mon de Tresor - decorative script (single weight only; do not use bold/semibold with this font)
   - Auteur Script - special elements
   - Font files located in `/public/font/`

4. **Animations**: Custom animations are defined in `src/styles/global.css`

5. **Global Styles**: Tailwind configuration and custom CSS in `src/styles/global.css`

**Color Locations:**
- Champagne/cream colors: `SplashScreen.tsx`, `HeroTitle.tsx`, `HeroBackground.tsx`, `RSVPForm.tsx`
- Green colors: All component files (search for `green-*` Tailwind classes)
- Dark mode overrides: Look for `dark:` variants in component files

### 4. RSVP Form Configuration

The RSVP form uses Formspree for form submissions:

1. Sign up at [formspree.io](https://formspree.io) (free tier available)
2. Create a form and get your form ID
3. Update the endpoint in `src/components/RSVPForm.tsx`:

```typescript
// Find this line (around line 57):
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

**Current endpoint**: The template uses `xgvpanpe` - **you must change this** to your own Formspree form ID.

**Features:**
- Conditional fields (dietary restrictions, song request, food selection) only shown when attending
- Confetti animation triggers on successful "Joyfully accepts" submission
- Custom colors matching site theme
- Mobile-optimized with smooth fade-out

### 4.1. RSVP Guest List & Unique IDs

The RSVP system supports personalized guest invitations using unique ID slugs. Instead of putting names directly in the URL, guests receive links with a single `id` parameter (e.g., `?id=jon-abby`).

#### How It Works

1. **Guest List**: All guest data is stored in `src/data/guests.ts` in the `GUEST_LIST` object
2. **URL Parameter**: Guests visit links like `/rsvp?id=jon-abby`
3. **Auto-Population**: The form automatically pre-fills with the guest's name(s) from the guest list
4. **Dynamic Fields**: The form shows separate input fields for each person (e.g., 2 fields for a couple)
5. **URL Cleanup**: After loading, the `?id=...` parameter is automatically removed from the URL for a clean appearance

#### Adding Guests

Edit `src/data/guests.ts` to add or modify guests:

```typescript
export const GUEST_LIST: Record<string, GuestData> = {
  'jon-abby': {
    names: ['Jon', 'Abby'],
  },
  'ewan': {
    names: ['Ewan'],
  },
  'spence-amanda': {
    names: ['Spence', 'Amanda'],
    email: 'spence@example.com', // Optional: pre-fill email
  },
  // Add more guests here...
};
```

**Key Points:**
- **ID Format**: Use lowercase with hyphens (e.g., `jon-abby`, `spence-amanda`)
- **Names Array**: Supports 1, 2, or more names per guest entry
- **Optional Email**: You can include an email to pre-fill that field too
- **Easy to Extend**: Just add new entries to the `GUEST_LIST` object

#### Creating Guest Links

Generate personalized RSVP links for your guests:

- Single person: `https://yourwebsite.com/rsvp?id=ewan`
- Couple: `https://yourwebsite.com/rsvp?id=jon-abby`
- Multiple people: `https://yourwebsite.com/rsvp?id=family-smith` (if you add a family entry)

#### Form Behavior

- **Single Name**: Shows one "Your Name" field
- **Multiple Names**: Shows separate fields for each person (e.g., "Name 1", "Name 2")
- **Editable**: Guests can modify pre-filled names or add/remove fields as needed
- **Submission**: All names are combined into a single field for Formspree submission

#### Personalized Greeting

The `PersonalizedGreeting` component also uses the same ID system. When a guest visits with `?id=...`, they'll see a personalized greeting like "Hi Jon & Abby, we can't wait to celebrate with you!" just after the Hero section.

### 4.2. Guest tier URL parameters

The site supports different **guest tiers** via the `type` and `id` query parameters so you can send day guests and evening-only guests different links. **Day view (food, full FAQs, day schedule) is only shown when `type=day` and `id` is present and valid** (i.e. the `id` exists in the guest list). Anything else—wrong or missing `type`/`id`, or `type` not equal to `day` or `evening`—is treated as **fallback** (no food, no schedule block, fewer FAQs).

#### Query parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Unique guest identifier (e.g. `jon-abby`). Must be a key in the guest list. Pre-fills the RSVP form and shows the personalized greeting. Required for **day** view. |
| `type` | Guest tier. Accepted values: `day` or `evening`. Any other value (or missing) → fallback. |

#### Behaviour by URL

| URL state | Schedule (Details) | RSVP form | FAQs |
|-----------|--------------------|-----------|------|
| `?type=day&id=<valid-id>` | Full “Plan of the Day” (confirmed times + blurred TBC block). | All fields, including Food Selection; food required when attending. | All FAQs shown. |
| `?type=evening` (with or without `id`) | Evening view: TBC message + 3 blurred rows (no daytime ceremony times). | No Food Selection; food not required. | “What are the key timings?” and “Can I take photographs with my phone/camera?” are hidden. |
| **Fallback** (no params, `?type=test`, `?type=day` without `id`, invalid `id`, or any `type` other than `day`/`evening`) | **No schedule block**—Details card shows only the Kings Head video (no gradient at bottom). | No Food Selection; food not required. | Same as evening: the two day-only FAQs are hidden. |

- **Day** = `type=day` **and** a valid `id` (must exist in the guest list). If `id` is missing or invalid, the site uses fallback.
- **Evening** = `type=evening` only. Works standalone (no `id` required).
- **Fallback** = default for everyone else: no schedule, no food fields, fewer FAQs.

#### Implementation notes

- **Layout** (`src/layouts/Layout.astro`): Inline scripts (head and body) read `type` and `id` from the URL, validate `id` against `window.__GUEST_LIST__`, and set on `<html>`:
  - `data-guest-type`: `day` (only when `type=day` and valid `id`), otherwise `evening`.
  - `data-show-schedule`: `true` when day (valid id) or evening; otherwise unset so the schedule block is hidden.
- **url.ts** (`src/utils/url.ts`): `getGuestViewType()` returns `day` only when `type=day` and `id` is in the guest list (via `getGuestList()`); returns `evening` for `type=evening` or fallback. Used by the RSVP form for food visibility and validation.
- **Details** (`src/components/Details.astro`): Schedule block has `data-details-schedule`; it is hidden when `html` does not have `data-show-schedule="true"`. When hidden, the video card has no bottom gradient or mask. Day vs evening content is toggled with `data-schedule-tier="day"` / `data-schedule-tier="evening"` and `data-guest-type`.
- **RSVP** (`src/components/RSVPForm.tsx`): Uses `getGuestViewType()` to hide the Food Selection block and skip food validation when not day.
- **FAQs** (`src/components/FAQ.astro`): Two questions use `data-faq-tier="day"` and are hidden when `html[data-guest-type="evening"]` (so hidden for both evening and fallback).

#### Example links

- Day guest (full day + food): `https://yoursite.com/?id=jon-abby&type=day` (both `id` and valid guest required).
- Evening guest (evening schedule, no food): `https://yoursite.com/?type=evening` or `https://yoursite.com/?id=jon-abby&type=evening`
- Fallback (video-only details, no food, fewer FAQs): `https://yoursite.com/`, `https://yoursite.com/?type=test`, or `https://yoursite.com/?type=day` (missing/invalid `id`)

### 5. Update Favicon

Replace `/public/marriage-light.svg` and `/public/marriage-dark.svg` with your own icons. The site supports different favicons for light and dark modes.

### 6. Customize FAQs

The FAQs section displays in a **2-column grid on desktop** and a single column on mobile. Edit the FAQs in `src/config/wedding-content.ts`:

```typescript
faqs: [
  {
    question: "What time should I arrive?",
    answer: "Your answer here...",
  },
  {
    question: "What is the dress code?",
    answer: "Your answer here...",
  },
  // Add more FAQs...
  {
    question: "When should I RSVP by?",
    answer: null, // This is automatically populated from rsvp.deadline
  },
]
```

**Features:**
- **2-Column Layout**: Automatically displays in 2 columns on desktop (md breakpoint and up)
- **Single Column on Mobile**: Stacks vertically on mobile devices
- **Auto RSVP Deadline**: The "When should I RSVP by?" question automatically uses the `rsvp.deadline` value
- **HTML Support**: Answer fields support HTML formatting if needed
- **Animated Stagger**: FAQs animate in sequence with scroll-triggered animations

**Layout Details:**
- Container: `max-w-6xl` (wider to accommodate 2 columns)
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-4`
- Responsive: Single column on mobile, 2 columns on desktop

### 7. Customize Google Maps

Update the Google Maps embed URL in `wedding-content.ts`:

```typescript
venue: {
  mapUrl: "https://www.google.com/maps/embed?pb=YOUR_MAP_URL"
}
```

## 🎨 Project Structure

```
/
├── src/
│   ├── components/           # UI components (Astro & React)
│   │   ├── Hero.astro              # Hero section with background
│   │   ├── HeroBackground.tsx      # Animated hero background
│   │   ├── HeroContent.tsx          # Hero content component
│   │   ├── HeroTitle.tsx            # Animated title with GSAP ScrollTrigger
│   │   ├── Story.astro              # Couple's story section
│   │   ├── Details.astro            # Wedding details with venue photo
│   │   ├── Location.astro           # Travel info with Google Maps
│   │   ├── Accommodation.astro      # Hotel recommendations wrapper
│   │   ├── AccommodationCarousel.tsx # Swiper carousel for hotels
│   │   ├── AccommodationHero.tsx    # Kings Head hero, slideshow, voucher/rates sub-card
│   │   ├── FAQ.astro                # Frequently asked questions (2-column layout)
│   │   ├── Gift.astro               # Gift registry message
│   │   ├── HoneymoonModal.tsx       # Modal for honeymoon donation info
│   │   ├── RSVPForm.tsx             # Interactive RSVP, custom food dropdowns, confetti & guest ID
│   │   ├── PersonalizedGreeting.tsx # Personalized greeting based on guest ID
│   │   ├── Navigation.tsx           # Sticky nav with active section tracking
│   │   ├── SplashScreen.tsx         # Animated intro screen
│   │   ├── MusicPlayer.tsx          # Background music player
│   │   ├── FloralAnimation.tsx      # Decorative Lottie animation
│   │   ├── DarkModeToggle.tsx       # Theme switcher
│   │   ├── SmoothScroll.tsx         # Lenis smooth scrolling
│   │   ├── CustomCursor.tsx         # Custom cursor effect
│   │   ├── CountdownTimer.tsx       # Countdown to wedding day
│   │   ├── WeatherWidget.tsx        # Weather display in footer
│   │   ├── SectionAnimations.tsx    # Scroll-triggered section animations
│   │   └── AnimatedText.tsx         # Text animation component (tech page)
│   ├── config/
│   │   └── wedding-content.ts        # Central content configuration
│   ├── data/
│   │   ├── guests.ts                 # Guest list for RSVP personalization
│   │   └── guests-data.stub.ts       # Guest data stub template
│   ├── hooks/                # Custom React hooks
│   │   └── useWindowSize.ts          # Debounced window size hook
│   ├── layouts/
│   │   └── Layout.astro              # Base layout with meta tags & dark mode init
│   ├── pages/
│   │   ├── index.astro               # Main wedding page
│   │   └── tech.astro                # Tech stack showcase page
│   ├── styles/
│   │   └── global.css                # Tailwind + custom animations
│   ├── types/                # TypeScript type definitions
│   │   └── guest.ts                  # Guest data interface
│   └── utils/                # Shared utility functions
│       ├── darkMode.ts               # Dark mode utilities
│       ├── formatters.ts             # Name formatting functions
│       ├── guests.ts                 # Guest list access utilities
│       ├── scroll.ts                 # Scroll management utilities
│       └── url.ts                    # URL parameter utilities
├── public/
│   ├── images/                       # Photos, venue images, icons
│   │   ├── us/                       # Engagement photos
│   │   ├── KH/                       # Kings Head Hotel images
│   │   ├── hotels/                   # Hotel images
│   │   └── icons/                    # Tech stack icons
│   ├── audio/                        # Background music
│   ├── lottie/                       # Lottie animation files
│   ├── font/                         # Custom fonts
│   │   ├── greater-theory/           # Greater Theory font
│   │   ├── Montserrat/               # Montserrat variable font
│   │   ├── Mon de Tresor.otf         # Mon de Tresor font
│   │   └── Auteur Script.otf         # Auteur Script font
│   ├── marriage-light.svg            # Light mode favicon
│   └── marriage-dark.svg             # Dark mode favicon
├── netlify.toml                      # Netlify deployment configuration
├── astro.config.mjs                   # Astro configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # Dependencies and scripts
└── REFACTORING.md                     # Performance refactoring documentation
```

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands directly

### Development Workflow

1. **Content Changes**: Edit `src/config/wedding-content.ts` for quick content updates
2. **Component Changes**: Modify components in `src/components/` as needed
3. **Styling Changes**: 
   - Use Tailwind classes directly in components
   - Add custom CSS in `src/styles/global.css`
4. **Adding Features**: 
   - For static content: Create `.astro` components
   - For interactivity: Create `.tsx` React components with appropriate hydration directive

### Environment Variables

- **`import.meta.env.BASE_URL`** – Used for routing (automatically set by Astro).
- **`GUEST_LIST`** (optional) – JSON string of guest data for personalised RSVP links. Set in Netlify (or `.env` locally) so guest data is not in the repo. See guest list / RSVP docs.
- **`CONTACT_PHONE_FELEENA`** and **`CONTACT_PHONE_CHRIS`** (optional) – Phone numbers shown in the “Who should I call with questions?” FAQ. Set in Netlify (or `.env`) to keep numbers out of the public repo. If unset, the FAQ shows “Please contact us via the email address below.”

### TypeScript

The project is fully typed with TypeScript. All components use TypeScript, and the config file is typed for content structure.

**Shared Types:**
- `src/types/guest.ts` - Guest data interface used across components

**Utility Functions:**
- `src/utils/guests.ts` - Guest list access
- `src/utils/url.ts` - URL parameter handling
- `src/utils/formatters.ts` - Name formatting
- `src/utils/darkMode.ts` - Dark mode management
- `src/utils/scroll.ts` - Scroll behavior utilities

**Custom Hooks:**
- `src/hooks/useWindowSize.ts` - Debounced window dimensions

## 🚀 Deployment

### Netlify (Recommended)

The project includes a `netlify.toml` configuration file for easy deployment:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the configuration:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Other Platforms

**Vercel:**
1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Astro settings (no configuration needed)

**Cloudflare Pages:**
1. Push code to GitHub
2. Connect to Cloudflare Pages
3. Configure:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 18 or higher

### Custom Domain

All recommended platforms support custom domains with automatic SSL certificates. Configure your domain in your hosting platform's dashboard after deployment.

## 📦 Tech Stack

- **[Astro 5](https://astro.build)** - Static site generator with Islands Architecture
- **[React 19](https://react.dev)** - Interactive UI components
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[GSAP](https://greensock.com/gsap/)** - Professional scroll animations and parallax
- **[Lenis](https://lenis.darkroom.engineering/)** - Smooth scrolling library
- **[Lottie](https://lottiefiles.com/)** - Lightweight vector animations
- **[Swiper](https://swiperjs.com/)** - Touch-enabled carousel/slider
- **[React Confetti](https://www.npmjs.com/package/react-confetti)** - Celebration effects
- **[Formspree](https://formspree.io)** - Form backend service (no server required)
- **[Cursor](https://cursor.com)** - AI-powered editor used to build the site (credited on the [Tech](/tech) page)

## 📚 Learn More

### Documentation
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- [Astro Discord Community](https://astro.build/chat)

### Getting Help

- Check the [Astro documentation](https://docs.astro.build) for framework-specific questions
- Visit the [Astro Discord](https://astro.build/chat) for community support
- Review component source code in `src/components/` for implementation examples

## 📄 License

This project is open source and available for personal use. Feel free to use this template for your own wedding website!

---

**Made with ❤️ for couples celebrating their special day**

Happy wedding planning! 🎉💍
