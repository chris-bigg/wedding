# Wedding Website

A modern, high-performance wedding website built with Astro and Tailwind CSS.

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

The site uses a rose color scheme. To change colors:
- Edit Tailwind classes in components (search for `rose-` and replace)
- Or add custom colors to `tailwind.config.js`

### 4. Set Up RSVP Form Backend

The RSVP form (`src/components/RSVPForm.tsx`) needs a backend. Choose one:

#### Option A: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get your form ID
3. Update line 34 in `RSVPForm.tsx`:
```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

#### Option B: Netlify Forms
1. Add `data-netlify="true"` to the form tag
2. Deploy to Netlify

#### Option C: Custom API Route
Create an Astro API endpoint in `src/pages/api/rsvp.ts`

### 5. Update Favicon

Replace `/public/favicon.svg` with your own icon

## 🎨 Project Structure

```
/
├── src/
│   ├── components/        # Astro & React components
│   │   ├── Hero.astro
│   │   ├── Story.astro
│   │   ├── Details.astro
│   │   ├── Location.astro
│   │   ├── Accommodation.astro
│   │   ├── FAQ.astro
│   │   ├── Gift.astro
│   │   └── RSVPForm.tsx   # Interactive React component
│   ├── config/
│   │   └── wedding-content.ts  # Central content configuration
│   ├── layouts/
│   │   └── Layout.astro   # Base layout with Tailwind
│   ├── pages/
│   │   └── index.astro    # Main page
│   └── styles/
│       └── global.css     # Tailwind imports
├── public/                # Static assets
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

## 📊 Performance Features

- **Static Generation**: All content rendered at build time for maximum speed
- **Astro Islands**: React only loads for the RSVP form (client:visible)
- **Optimized Images**: Use Astro's Image component for automatic optimization
- **Minimal JavaScript**: Only ~5KB of JS for the RSVP form
- **Tailwind CSS**: Utility-first CSS with minimal bundle size

## 🛠️ Next Steps

1. ✅ Update content in `src/config/wedding-content.ts`
2. ⬜ Add engagement photos
3. ⬜ Set up RSVP form backend
4. ⬜ Customize colors/fonts if desired
5. ⬜ Test on mobile devices
6. ⬜ Run Lighthouse audit (`npm run build` then test the preview)
7. ⬜ Purchase domain & deploy to hosting
8. ⬜ Set up SSL/HTTPS (automatic with Netlify/Vercel)

## 👀 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Astro Discord](https://astro.build/chat)

Happy wedding planning! 🎉
