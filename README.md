# Wedding Website

A modern, elegant wedding website template built with Astro, React, and Tailwind CSS. Features smooth animations, interactive components, dark mode, RSVP form with confetti celebration, and a fully customizable content system. Perfect for creating a beautiful, performant wedding website.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Overview](#-project-overview)
- [Architecture](#-architecture)
- [Key Features](#-key-features)
- [Customization Guide](#-customization-guide)
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
- **Smooth Scrolling**: Lenis library for buttery-smooth scroll experience
- **GPU Acceleration**: Optimized animations with GSAP and CSS transforms
- **Mobile Optimized**: Special handling for touch devices and fast scrolling
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
- **Honeymoon Modal**: Clickable modal for honeymoon donation information

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
- FAQs
- Accommodation info
- Travel details
- Gift registry message
- Contact email

### 2. Add Photos

1. Place engagement photos in `/public/images/us/`
2. Update `src/components/Story.astro` to display your photos using Astro's `<Image>` component

### 3. Customize Colors & Styling

The site uses an emerald green and champagne/stone color scheme. To change:

1. **Colors**: Edit Tailwind classes in components (search for `emerald-` and stone color codes)
2. **Fonts**: The "Great Vibes" script font is loaded from Google Fonts in `Layout.astro`
3. **Animations**: Custom animations are defined in `src/styles/global.css`
4. **Global Styles**: Tailwind configuration and custom CSS in `src/styles/global.css`

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
- Conditional fields (plus-one, dietary restrictions) only shown when attending
- Confetti animation triggers on successful "Joyfully accepts" submission
- Custom colors matching site theme
- Mobile-optimized with smooth fade-out

### 5. Update Favicon

Replace `/public/marriage-light.svg` and `/public/marriage-dark.svg` with your own icons. The site supports different favicons for light and dark modes.

### 6. Customize Google Maps

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
│   ├── components/
│   │   ├── Hero.astro              # Hero section with background
│   │   ├── HeroBackground.tsx      # Animated hero background
│   │   ├── HeroContent.tsx          # Hero content component
│   │   ├── HeroTitle.tsx            # Animated title with GSAP ScrollTrigger
│   │   ├── Story.astro              # Couple's story section
│   │   ├── Details.astro            # Wedding details with venue photo
│   │   ├── Location.astro           # Travel info with Google Maps
│   │   ├── Accommodation.astro      # Hotel recommendations wrapper
│   │   ├── AccommodationCarousel.tsx # Swiper carousel for hotels
│   │   ├── FAQ.astro                # Frequently asked questions
│   │   ├── Gift.astro               # Gift registry message
│   │   ├── HoneymoonModal.tsx       # Modal for honeymoon donation info
│   │   ├── RSVPForm.tsx             # Interactive RSVP with confetti
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
│   ├── layouts/
│   │   └── Layout.astro              # Base layout with meta tags & dark mode init
│   ├── pages/
│   │   ├── index.astro               # Main wedding page
│   │   └── tech.astro                # Tech stack showcase page
│   └── styles/
│       └── global.css                # Tailwind + custom animations
├── public/
│   ├── images/                       # Photos, venue images, icons
│   │   ├── us/                       # Engagement photos
│   │   ├── hotels/                   # Hotel images
│   │   └── icons/                    # Tech stack icons
│   ├── audio/                        # Background music
│   ├── lottie/                       # Lottie animation files
│   ├── font/                         # Custom fonts (Greater Theory, Montserrat)
│   ├── marriage-light.svg            # Light mode favicon
│   └── marriage-dark.svg             # Dark mode favicon
├── netlify.toml                      # Netlify deployment configuration
├── astro.config.mjs                   # Astro configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies and scripts
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

No environment variables are required. The project uses `import.meta.env.BASE_URL` for routing (automatically handled by Astro).

### TypeScript

The project is fully typed with TypeScript. All components use TypeScript, and the config file is typed for content structure.

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
