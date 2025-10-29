# Wedding Website

A modern, elegant wedding website built with Astro, React, and Tailwind CSS featuring smooth animations, interactive components, and a delightful user experience.

## 🚀 Quick Start

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server will start at `http://localhost:4321`

## 📝 Customizing Your Site

### 1. Update Wedding Content

Edit `src/config/wedding-content.ts` to update all wedding information:
- Couple names
- Wedding date and time
- Venue details
- Schedule
- FAQs
- Accommodation info
- Travel details
- Gift registry message

### 2. Add Photos

- Place engagement photos in `/public/images/`
- Update `src/components/Story.astro` to display your photos using Astro's Image component

### 3. Customize Colors & Styling

The site uses an emerald green and champagne/stone color scheme. To change colors:
- Edit Tailwind classes in components (search for `emerald-` and champagne hex codes)
- Custom animations are defined in `src/styles/global.css`

### 4. RSVP Form Configuration

The RSVP form uses Formspree and includes confetti celebration for accepted RSVPs:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your form ID
3. Update the endpoint in `RSVPForm.tsx` (line ~54):
```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

**Features:**
- Conditional fields (plus-one, dietary restrictions) only shown when attending
- Confetti animation triggers on successful "Joyfully accepts" submission
- Custom colors matching site theme
- Mobile-optimized with smooth fade-out

### 5. Update Favicon

Replace `/public/favicon.svg` with your own icon

## 🎨 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Hero.astro              # Hero section with background
│   │   ├── HeroTitle.tsx           # Animated title with GSAP ScrollTrigger
│   │   ├── Story.astro             # Couple's story section
│   │   ├── Details.astro           # Wedding details with venue photo
│   │   ├── Location.astro          # Travel info with Google Maps
│   │   ├── Accommodation.astro     # Hotel recommendations
│   │   ├── FAQ.astro               # Frequently asked questions
│   │   ├── Gift.astro              # Gift registry message
│   │   ├── RSVPForm.tsx            # Interactive RSVP with confetti
│   │   ├── Navigation.tsx          # Sticky nav with active section tracking
│   │   ├── SplashScreen.tsx        # Animated intro screen
│   │   ├── MusicPlayer.tsx         # Background music player
│   │   ├── FloralAnimation.tsx     # Decorative Lottie animation
│   │   ├── DarkModeToggle.tsx      # Theme switcher
│   │   ├── SmoothScroll.tsx        # Lenis smooth scrolling
│   │   └── CountdownTimer.tsx      # Countdown to wedding day
│   ├── config/
│   │   └── wedding-content.ts      # Central content configuration
│   ├── layouts/
│   │   └── Layout.astro            # Base layout with meta tags
│   ├── pages/
│   │   ├── index.astro             # Main wedding page
│   │   └── tech.astro              # Tech stack showcase page
│   └── styles/
│       └── global.css              # Tailwind + custom animations
├── public/
│   ├── images/                     # Photos and venue images
│   ├── audio/                      # Background music
│   └── lottie/                     # Lottie animation files
└── package.json
```

## 🚀 Deployment

### Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Astro settings

### Cloudflare Pages
1. Push code to GitHub
2. Connect to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `dist`

## 🎯 Key Features

### Performance
- **Static Generation**: All content rendered at build time for maximum speed
- **Astro Islands Architecture**: React components hydrated selectively with `client:load` or `client:visible`
- **Smooth Scrolling**: Lenis library for buttery-smooth scroll experience
- **GPU Acceleration**: Optimized animations with GSAP and CSS transforms
- **Mobile Optimized**: Special handling for touch devices and fast scrolling
- **Tailwind CSS v4**: Modern utility-first CSS with minimal bundle size

### Interactive Components
- **Animated Hero Title**: GSAP-powered scroll-triggered parallax effect
- **Splash Screen**: Elegant intro animation with Lottie
- **Confetti Celebration**: Triggers on successful RSVP submission
- **Dark Mode**: Persistent theme toggle with localStorage
- **Music Player**: Optional background music with controls
- **Countdown Timer**: Real-time countdown to wedding day
- **Active Section Tracking**: Navigation highlights current section via IntersectionObserver

### Content Management
- **Single Source of Truth**: All content in `wedding-content.ts`
- **HTML Support**: Description fields support HTML formatting (`<strong>`, `<a>`, etc.)
- **Google Maps Integration**: Embedded map with "Get Directions" CTA overlay

## 📦 Tech Stack

- **[Astro](https://astro.build)** - Static site generator
- **[React 19](https://react.dev)** - Interactive components
- **[Tailwind CSS v4](https://tailwindcss.com)** - Styling
- **[GSAP](https://greensock.com/gsap/)** - Scroll animations and parallax
- **[Lenis](https://lenis.darkroom.engineering/)** - Smooth scrolling
- **[Lottie](https://lottiefiles.com/)** - Vector animations
- **[Swiper](https://swiperjs.com/)** - Touch sliders (if used)
- **[React Confetti](https://www.npmjs.com/package/react-confetti)** - Celebration effects
- **[Formspree](https://formspree.io)** - Form backend

## ✅ Implementation Checklist

### Content
- [ ] Update all content in `src/config/wedding-content.ts`
- [ ] Add venue photos to `/public/images/`
- [ ] Add background music to `/public/audio/`
- [ ] Update Google Maps embed URL if needed
- [ ] Customize FAQ section
- [ ] Update accommodation recommendations

### Configuration
- [ ] Set up Formspree account and update form endpoint
- [ ] Update favicon in `/public/`
- [ ] Configure meta tags and SEO in `Layout.astro`
- [ ] Test RSVP form submission
- [ ] Verify confetti animation on mobile

### Testing
- [ ] Test on iOS Safari (mobile)
- [ ] Test on Android Chrome (mobile)
- [ ] Test desktop browsers (Chrome, Firefox, Safari)
- [ ] Test dark mode toggle
- [ ] Test smooth scrolling behavior
- [ ] Verify all links and CTAs work
- [ ] Test fast scrolling on mobile devices
- [ ] Run Lighthouse audit (`npm run build` → `npm run preview`)

### Deployment
- [ ] Push code to GitHub repository
- [ ] Connect to hosting (Netlify/Vercel/Cloudflare Pages)
- [ ] Verify build succeeds
- [ ] Test production site
- [ ] Purchase and connect custom domain
- [ ] SSL/HTTPS enabled (automatic with most hosts)
- [ ] Set up analytics (optional)

## 🐛 Troubleshooting

### Animations glitching on mobile
- The project includes mobile-specific optimizations in `HeroTitle.tsx`
- GPU acceleration is enabled via CSS transforms
- ScrollTrigger scrub values are reduced on mobile for better performance

### Confetti not showing
- Ensure form submission is successful (check browser console)
- Verify "Joyfully accepts" option is selected
- Check that window dimensions are being captured (not 0x0)

### Dark mode not persisting
- Check browser localStorage is enabled
- Verify inline script in `Layout.astro` runs before page render

### Smooth scrolling not working
- Ensure Lenis is initialized in `SmoothScroll.tsx` with `client:load`
- Check that `lenis` class is applied to `<html>` element

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- [Astro Discord](https://astro.build/chat)

## 📄 License

Feel free to use this template for your own wedding website!

Happy wedding planning! 🎉💍
