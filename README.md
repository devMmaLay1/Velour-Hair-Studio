# Velour Hair Studio — Premium Luxury Hair Salon Website

![Version](https://img.shields.io/badge/version-1.0.0-C9A96E.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-plum.svg)

A meticulously crafted, production-ready website for premium hair salons and beauty studios. Built with modern web technologies, featuring a sophisticated dark/light mode system, complete booking flow, and elegant animations.

---

## ✨ Features

### Core Functionality
- **14 fully-functional pages** with semantic HTML5
- **Dark/light mode** with localStorage persistence
- **6-step booking system** with service selection, stylist matching, and datetime picker
- **Component-based architecture** with dynamic navbar and footer loading
- **Responsive design** optimized for mobile, tablet, and desktop
- **Premium animations** using GSAP and AOS
- **Form integration** with Formspree
- **Payment processing** ready for Paystack integration

### Pages
| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | Hero section, services showcase, gallery preview, testimonials |
| Services | `pages/services.html` | 18 services across 6 categories with filtering |
| Book Appointment | `pages/booking.html` | 6-step booking flow (branch → service → stylist → date → time → contact) |
| About Us | `pages/about.html` | Brand story, philosophy, and team preview |
| Our Team | `pages/team.html` | 6 stylists with specialties and bios |
| Gallery | `pages/gallery.html` | Portfolio with category filtering and lightbox |
| Branches | `pages/branches.html` | 3 locations (Victoria Island, Lekki Phase 1, Wuse 2 Abuja) |
| Shop | `pages/shop.html` | Product catalogue (coming soon overlay) |
| Product Detail | `pages/product.html` | Single product page (coming soon overlay) |
| Blog | `pages/blog.html` | Blog listing with category filters |
| Blog Post | `pages/blog-post.html` | Single blog post template |
| Careers | `pages/careers.html` | Open positions and application flow |
| Contact | `pages/contact.html` | Contact form with branch selector and map |
| 404 | `pages/404.html` | Custom error page |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- A code editor (VS Code recommended)
- Live Server extension (for local development)

### Installation

1. **Clone or download** the project files

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Tailwind build process**:
   ```bash
   npm run build
   ```
   This runs Tailwind in watch mode, automatically recompiling CSS on changes.

4. **Open with Live Server**:
   - Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
   - Right-click `index.html` and select "Open with Live Server"
   - Site will open at `http://localhost:5500`

   Alternatively, use the built-in serve script:
   ```bash
   npm run serve
   ```
   Site will open at `http://localhost:3000`

---

## 🎨 Design System

### Color Palette

Defined in `tailwind.config.js`:

```javascript
colors: {
  plum: "#6B3F5E",        // Primary brand color
  cream: "#F5EFE6",       // Light backgrounds
  rose: "#D4A5A5",        // Accents and highlights
  gold: "#C9A96E",        // Premium accents
  ink: "#1a0f17",         // Dark text
  "dark-bg": "#0D0A0E",   // Dark mode background
  "dark-surface": "#1A1220" // Dark mode surfaces
}
```

### Typography

- **Headings**: Fraunces (serif, elegant)
- **Body**: Outfit (sans-serif, modern)

Fonts are loaded via Google Fonts CDN in `index.html`.

### Dark Mode

The site supports system preference detection and manual toggle:

```javascript
// Stored in localStorage as 'velour-theme'
// Values: 'light' | 'dark'
// Toggle buttons: [data-theme-toggle] (desktop), [data-theme-toggle-mobile] (mobile)
```

Dark mode is implemented using Tailwind's `dark:` variant and the `class` strategy.

---

## 📁 Project Structure

```
velour-hair-studio/
├── assets/
│   ├── images/
│   │   ├── blog/              # Blog featured images (8 posts)
│   │   ├── branches/          # Branch exterior photos (3 locations)
│   │   ├── Gallery/           # Portfolio images (16 images, 6 categories)
│   │   ├── servicesCards/     # Service preview cards (6 services)
│   │   └── workers/           # Team member photos (9 stylists)
│   ├── icons/                 # SVG icons
│   └── fonts/                 # Custom fonts (if any)
├── components/
│   ├── navbar.html            # Site header with dark mode toggle
│   ├── footer.html            # Site footer with newsletter signup
│   ├── booking-modal.html     # Booking confirmation modal
│   ├── cookie-banner.html     # GDPR cookie consent
│   └── newsletter-popup.html  # Exit-intent newsletter popup
├── css/
│   ├── input.css              # Tailwind directives (@tailwind base, etc.)
│   ├── output.css             # Compiled Tailwind (auto-generated)
│   ├── custom.css             # Global styles, navbar states, animations
│   ├── about.css              # About page specific styles
│   ├── blog.css               # Blog listing and post styles
│   ├── booking.css            # Booking flow steps
│   ├── branches.css           # Branch cards and map
│   ├── careers.css            # Careers page
│   ├── cart-page.css          # Shopping cart (coming soon)
│   ├── checkout.css           # Checkout flow (coming soon)
│   ├── contact.css            # Contact form and map
│   ├── gallery.css            # Gallery grid and filters
│   ├── product.css            # Product detail page (coming soon)
│   ├── shop.css               # Shop grid (coming soon)
│   └── team.css               # Team member cards
├── js/
│   ├── main.js                # Core: component loader, dark mode, mobile menu
│   ├── animations.js          # GSAP and AOS scroll animations
│   ├── booking.js             # 6-step booking flow with validation
│   ├── gallery.js             # Gallery filtering and lightbox
│   ├── map.js                 # Google Maps integration
│   ├── blog-data.js           # Blog post data (8 posts)
│   ├── products-data.js       # Product catalogue (coming soon)
│   ├── services.js            # Service catalogue with filtering
│   ├── team.js                # Team member filtering
│   ├── about.js               # About page animations
│   ├── branches.js            # Branch selector
│   ├── careers.js             # Job listing filters
│   ├── contact.js             # Contact form validation
│   ├── shop.js                # Shop grid and filters (coming soon)
│   ├── product.js             # Product detail page (coming soon)
│   ├── cart.js                # Shopping cart state (coming soon)
│   ├── cart-page.js           # Cart page logic (coming soon)
│   ├── checkout.js            # Checkout flow (coming soon)
│   └── coming-soon.js         # Page lock overlay system
├── pages/                     # All sub-pages (14 total)
├── index.html                 # Homepage
├── tailwind.config.js         # Tailwind configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

---

## 🎯 Customization Guide

### 1. Brand Identity

#### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  plum: "#YOUR_PRIMARY_COLOR",
  cream: "#YOUR_LIGHT_BG",
  rose: "#YOUR_ACCENT",
  gold: "#YOUR_PREMIUM_ACCENT",
  // ...
}
```

#### Typography

Replace Google Fonts in `index.html` (around line 10):

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Update font families in `tailwind.config.js`:

```javascript
fontFamily: {
  fraunces: ['Your Serif Font', 'serif'],
  outfit: ['Your Sans Font', 'sans-serif']
}
```

#### Logo

Replace the logo SVG in `components/navbar.html` (around line 15-25) with your own logo image or SVG.

### 2. Content

#### Services

Edit `js/booking.js` to modify the service catalogue:

```javascript
const BK_SERVICES = [
  {
    id: 1,
    category: 'hair-care',
    tag: 'Hair Care',
    name: 'Your Service Name',
    price: 'From ₦15,000',
    duration: '2 – 2.5 hrs'
  },
  // Add more services...
];
```

The booking system includes 18 services across 6 categories:
- Hair Care (4 services)
- Braids (5 services)
- Colour (3 services)
- Relaxer (2 services)
- Treatments (4 services)

#### Team Members

Edit `js/booking.js` to update stylists:

```javascript
const BK_STYLISTS = [
  {
    id: 'your-id',
    name: 'Stylist Name',
    role: 'Role',
    specialty: 'Specialty',
    img: '/assets/images/workers/your-photo.webp',
    badge: 'Founder' // or null
  },
  // Add more stylists...
];
```

Also update the team page at `pages/team.html` to match.

#### Branch Locations

Edit `js/booking.js` to update branch labels:

```javascript
const BRANCH_LABELS = {
  vi: 'Your Location 1',
  lekki: 'Your Location 2',
  abuja: 'Your Location 3'
};
```

Update branch details in `pages/branches.html`.

#### Blog Posts

Edit `js/blog-data.js` to add/modify blog posts:

```javascript
export const BLOG_POSTS = [
  {
    id: 'your-post-slug',
    title: 'Your Post Title',
    excerpt: 'Post excerpt',
    category: 'hair-care', // hair-care | styling | trends | salon-news
    date: '2026-01-15',
    readTime: '5 min read',
    author: 'Author Name',
    authorRole: 'Author Role',
    authorImg: 'path/to/author.webp',
    featuredImage: 'path/to/featured.webp',
    content: [
      { type: 'paragraph', text: 'Paragraph text' },
      { type: 'heading', text: 'Heading text' },
      { type: 'image', src: 'path/to/image.webp', alt: 'Alt text' }
    ]
  }
];
```

### 3. Images

Replace placeholder images in `assets/images/` with your own:

**Image Guidelines**:
- Use WebP format for optimal performance
- Recommended sizes:
  - Hero images: 1920×1080px
  - Gallery images: 600×800px (3:4 aspect ratio)
  - Team photos: 400×500px
  - Blog featured images: 1200×630px
  - Service cards: 800×600px

### 4. Navigation

Edit `components/navbar.html` to modify navigation links (around line 30-50):

```html
<nav class="nav-links">
  <a href="/your-page.html" class="nav-link">Your Page</a>
  <!-- Add more links -->
</nav>
```

The active link is automatically highlighted based on the current page URL.

### 5. Footer

Edit `components/footer.html` to update:
- Contact information
- Social media links
- Newsletter signup form
- Footer navigation links

---

## 📋 Booking System

The booking flow is a 6-step process managed by `js/booking.js`:

### Steps

1. **Branch Selection** — Choose location (Victoria Island, Lekki Phase 1, or Wuse 2 Abuja)
2. **Service Selection** — Browse 18 services with category filtering
3. **Stylist Selection** — Choose from 6 stylists or "No Preference"
4. **Date Selection** — Pick appointment date with calendar
5. **Time Selection** — Choose available time slot
6. **Contact Info** — Enter name, phone, email, and optional notes

### Data Structure

```javascript
const booking = {
  branch: 'vi',              // 'vi' | 'lekki' | 'abuja'
  service: { id, name, price, duration },
  stylist: { id, name, role, specialty },
  date: '2026-03-20',
  time: '10:00 AM',
  name: 'Client Name',
  phone: '+234XXXXXXXXXX',
  email: 'client@example.com',
  notes: 'Optional notes'
};
```

### Validation

- All steps require selection before proceeding
- Phone numbers are validated for Nigerian format
- Email addresses are validated with regex
- Date selection is restricted to future dates only

### Submission

Currently, booking data is logged to console. To integrate with a backend:

1. Add your API endpoint in `js/booking.js` (around line 400)
2. Replace `console.log(booking)` with an API call:

```javascript
fetch('https://your-api.com/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(booking)
})
.then(response => response.json())
.then(data => {
  // Show success message
})
.catch(error => {
  // Handle error
});
```

---

## 🔒 Coming Soon Pages

The template includes a "coming soon" overlay system for pages you want to lock before launch.

### Locked Pages

- `pages/shop.html`
- `pages/product.html`
- `pages/cart.html` (referenced but not in file tree)
- `pages/checkout.html` (referenced but not in file tree)
- `pages/order-success.html` (referenced but not in file tree)

These pages display a full-screen overlay with:
- Animated grain texture and ambient orbs
- Lock icon and "Coming Soon" message
- Email notification signup form
- ETA badge

### Unlock Pages

To unlock a page, remove the coming-soon script tag:

```html
<!-- Remove this line from the page -->
<script src="../js/coming-soon.js" defer data-page="shop"></script>
```

### Customize Overlay

Edit `js/coming-soon.js` to change:
- Message text
- ETA date
- Colors and styling
- Email storage (currently saves to `localStorage` under `velour-notify-emails`)

---

## 🎬 Animations

The site uses two animation libraries:

### GSAP (GreenSock Animation Platform)

Loaded via CDN in `index.html`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

Used for:
- Hero section animations
- Scroll-triggered reveals
- Smooth transitions

### AOS (Animate On Scroll)

Loaded via CDN in `index.html`:

```html
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
```

Used for:
- Fade-in effects
- Slide-in animations
- Stagger animations

Initialize AOS in `js/animations.js`:

```javascript
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
});
```

---

## 📱 Responsive Design

The template is fully responsive with mobile-first breakpoints:

```css
/* Mobile: 320px - 639px (base styles) */

/* Tablet: 640px - 1023px */
@media (min-width: 640px) { ... }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { ... }

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) { ... }
```

### Mobile Menu

The mobile menu is a slide-in drawer with:
- Smooth transitions
- Dark mode toggle
- Active link highlighting
- Close on outside click

Managed by `initMobileMenu()` in `js/main.js`.

---

## 🔌 Integrations

### Formspree (Contact Form)

The contact form uses Formspree for submissions. To set up:

1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form and get your form ID
3. Update the form action in `pages/contact.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

### Paystack (Payment Processing)

The template is ready for Paystack integration. To set up:

1. Sign up at [Paystack](https://paystack.com/)
2. Get your public key from the dashboard
3. Add Paystack script to checkout page:

```html
<script src="https://js.paystack.co/v1/inline.js"></script>
```

4. Implement payment in `js/checkout.js`:

```javascript
const paystack = PaystackPop.setup({
  key: 'pk_test_YOUR_PUBLIC_KEY',
  email: customerEmail,
  amount: totalAmount * 100, // Amount in kobo
  currency: 'NGN',
  callback: function(response) {
    // Payment successful
    console.log(response.reference);
  },
  onClose: function() {
    // Payment cancelled
  }
});
paystack.openIframe();
```

### Google Maps (Branch Locator)

To add Google Maps to the branches/contact pages:

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add the Maps JavaScript API script:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```

3. Implement map initialization in `js/map.js`:

```javascript
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 6.4281, lng: 3.4219 }, // Victoria Island coordinates
    zoom: 12
  });

  // Add markers for each branch
  const branches = [
    { lat: 6.4281, lng: 3.4219, title: 'Victoria Island' },
    { lat: 6.4474, lng: 3.4700, title: 'Lekki Phase 1' },
    { lat: 9.0765, lng: 7.4165, title: 'Wuse 2 Abuja' }
  ];

  branches.forEach(branch => {
    new google.maps.Marker({
      position: { lat: branch.lat, lng: branch.lng },
      map: map,
      title: branch.title
    });
  });
}
```

---

## 🚢 Deployment

### Netlify (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.` (root)

3. **Deploy**:
   - Netlify will automatically build and deploy
   - Your site will be live at `https://your-site.netlify.app`

### Custom Domain

1. Add your domain in Netlify dashboard
2. Update DNS records with your domain provider
3. Enable HTTPS (automatic with Netlify)

---

## 🛠️ Development Tips

### Component Loading

The site uses dynamic component loading for navbar and footer:

```javascript
// In main.js
fetch("/components/navbar.html")
  .then(r => r.text())
  .then(html => {
    document.getElementById("navbar-placeholder").innerHTML = html;
    // Initialize navbar features
  });
```

This allows you to edit the navbar/footer once and have changes reflect across all pages.

### Dark Mode Testing

Toggle dark mode programmatically in the console:

```javascript
// Enable dark mode
document.documentElement.classList.add('dark');
localStorage.setItem('velour-theme', 'dark');

// Disable dark mode
document.documentElement.classList.remove('dark');
localStorage.setItem('velour-theme', 'light');
```

### Tailwind Purging

Tailwind automatically purges unused CSS in production. Ensure all class names are complete strings (not dynamically generated) to avoid purging issues:

```javascript
// ✅ Good - Tailwind can detect these
<div class="text-plum bg-cream">

// ❌ Bad - Tailwind will purge these
<div class={`text-${color} bg-${bg}`}>
```

### Performance Optimization

- Images are in WebP format for smaller file sizes
- Fonts are preloaded for faster rendering
- CSS is minified in production
- JavaScript is deferred where possible
- Components are loaded asynchronously

---

## 📄 License

This project is licensed under the MIT License. You are free to use, modify, and distribute this template for personal or commercial projects.

---

## 🤝 Support

For questions, issues, or feature requests:

- Open an issue on GitHub
- Email: devMmalay@gmail.com
- Documentation: This README

---

## 🎉 Credits

- **Design**: Velour Hair Studio
- **Development**: [Axhigbue Emmanuel]
- **Fonts**: Google Fonts (Fraunces, Outfit)
- **Icons**: Custom SVG icons
- **Animations**: GSAP, AOS
- **Images**: Placeholder images (replace with your own)

---

**Velour Hair Studio** · Lagos, Nigeria · Est. 2020

*Crafted with care for premium salon experiences.*
