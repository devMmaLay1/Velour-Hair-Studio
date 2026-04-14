# Velour Hair Studio — Full Project Roadmap

> **6 Phases · 14 Pages · ~25–38 Days to Launch**

---

## Step 01 — Brand Identity

### Colour Palette

#### Light Mode

| Name | Hex | Role |
|---|---|---|
| Royal Plum | `#6B3F5E` | Primary — headings, buttons, borders |
| Ivory Cream | `#F5EFE6` | Background — page and section backgrounds |
| Dusty Rose | `#D4A5A5` | Accent — hover states, tags, soft highlights |
| Warm Gold | `#C9A96E` | Highlight — CTAs, labels, links |
| Deep Ink | `#1a0f17` | Text — body paragraphs |

#### Dark Mode

| Name | Hex | Role |
|---|---|---|
| Near Black | `#0D0A0E` | Page Background |
| Dark Surface | `#1A1220` | Cards, Modals |
| Dark Border | `#2E1F2A` | Dividers |
| Gold (unchanged) | `#C9A96E` | CTAs, Highlights |
| Cream Text | `#F5EFE6` | Headings, Body |

**Add custom colors to `tailwind.config.js`:**
```js
extend: {
  colors: {
    plum: '#6B3F5E',
    cream: '#F5EFE6',
    rose: '#D4A5A5',
    gold: '#C9A96E',
    ink: '#1a0f17',
    'dark-bg': '#0D0A0E',
    'dark-surface': '#1A1220'
  }
}
```

### Typography

- **Headings:** Fraunces (serif) — light weight (300), italic for emphasis
- **Body / UI:** Outfit (sans-serif) — weights 300, 400, 500, 600

---

## Step 02 — Tech Stack

- **HTML5** — semantic, accessible markup
- **Tailwind CSS** — utility-first styling (CDN for prototyping, build for production)
- **Vanilla JavaScript** — no framework needed
- **GSAP** — premium animations (CDN)
- **AOS** — scroll reveal animations
- **Formspree** — form submissions
- **Paystack** — Nigerian payment processing
- **Netlify** — hosting and deployment

---

## Step 03 — Project Structure

```
├── assets/
│   ├── images/              # all site images
│   │   ├── hero-banner.jpg
│   │   ├── logo.svg
│   │   ├── logo-dark.svg    # white version for dark bg
│   │   ├── og-image.jpg     # social media share image
│   │   └── favicon.ico
│   ├── icons/               # downloaded Heroicons SVGs
│   └── fonts/               # if self-hosting fonts
│
├── css/
│   ├── output.css           # Tailwind compiled output
│   └── custom.css           # your own styles on top
│
├── js/
│   ├── main.js              # global JS (dark mode, navbar)
│   ├── animations.js        # scroll animations, GSAP
│   ├── booking.js           # booking form logic
│   ├── gallery.js           # lightbox, filter
│   └── map.js               # branch locator map
│
├── components/              # reusable HTML snippets
│   ├── navbar.html
│   ├── footer.html
│   ├── booking-modal.html
│   ├── cookie-banner.html
│   └── newsletter-popup.html
│
├── pages/                   # all sub-pages
│   ├── services.html
│   ├── booking.html
│   ├── about.html
│   ├── team.html
│   ├── gallery.html
│   ├── branches.html
│   ├── shop.html
│   ├── product.html         # single product page
│   ├── blog.html
│   ├── blog-post.html       # single blog article
│   ├── careers.html
│   ├── contact.html
│   └── 404.html
│
├── index.html               # Homepage (root)
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Step 04 — Full Sitemap (14 Pages)

### 🏠 `index.html` — Homepage
First impression. Tells the brand story and drives visitors to book or explore.

**Sections:** Navbar · Hero (full-screen) · Brand Statement · Services Preview · Why Choose Us · Featured Work Gallery · Testimonials · Branches Strip · CTA Banner · Blog Teaser · Footer

---

### ✂️ `pages/services.html` — Services
All treatments listed with pricing, duration, and descriptions.

**Sections:** Page Hero · Service Categories Filter · Services Grid · Pricing Table · Book CTA

---

### 📅 `pages/booking.html` — Book Appointment
Multi-step booking form. Choose branch → service → stylist → date/time → confirm.

**Sections:** Step Progress Bar · Step 1: Branch Select · Step 2: Service Select · Step 3: Stylist Select · Step 4: Date & Time · Step 5: Confirm & Pay

---

### 💎 `pages/about.html` — About Us
Brand story, mission, vision, and history since founding.

**Sections:** Page Hero · Our Story · Mission & Vision · Stats / Milestones · Values · Awards · Meet the Team CTA

---

### 👩‍🎨 `pages/team.html` — Our Team
Stylists and staff profiles with specialties and social links.

**Sections:** Page Hero · Team Grid · Stylist Cards (photo, name, specialty) · Book with Stylist CTA

---

### 📸 `pages/gallery.html` — Gallery
Before/after work, salon atmosphere, product shots.

**Sections:** Page Hero · Filter Tabs (Braids, Locs, Colour etc) · Masonry Image Grid · Lightbox Viewer · Instagram Feed Strip

---

### 📍 `pages/branches.html` — Branches & Locations
HQ + all branches displayed with map, hours, and contact.

**Sections:** Page Hero · Branch Cards Grid · Interactive Map · Branch Details (hours, phone, address) · Get Directions CTA

---

### 🛍️ `pages/shop.html` — Shop / Store
Hair products, tools, and Velour-branded merchandise.

**Sections:** Page Hero · Category Filter · Product Grid · Cart Sidebar · Featured Product Banner

---

### 📦 `pages/product.html` — Single Product
Detailed view of one product with images, description, reviews.

**Sections:** Product Image Gallery · Title, Price, Description · Add to Cart · Reviews Section · Related Products

---

### 📝 `pages/blog.html` — Blog / Hair Tips
Hair care tips, style guides, and brand updates.

**Sections:** Page Hero · Featured Article · Article Grid · Category Tags Filter · Newsletter Signup

---

### 📄 `pages/blog-post.html` — Blog Article
Individual blog post with rich content layout.

**Sections:** Article Header · Reading Progress Bar · Article Body · Author Card · Related Posts · Comments / Share

---

### 💼 `pages/careers.html` — Careers
Attract top stylists and staff to join the Velour team.

**Sections:** Page Hero · Why Work With Us · Open Positions · Application Form · Culture Section

---

### 📬 `pages/contact.html` — Contact
Get in touch, ask questions, find HQ.

**Sections:** Page Hero · Contact Form · HQ Address + Map · Social Media Links · FAQ Accordion

---

### 🚫 `pages/404.html` — 404 Page
Custom branded error page. Don't lose visitors.

**Sections:** Velour-styled error message · Back to Home button · Search bar · Quick links

---

## Step 05 — Reusable Components

> Build once, use everywhere. Load with JavaScript `fetch()` or copy into pages.

### 🔝 Navbar — `components/navbar.html`
**Used on:** ALL 14 pages

- Logo (SVG) left-aligned, switches to white logo in dark mode
- Navigation links: Home · Services · About · Gallery · Shop · Branches · Blog
- Right side: Dark mode toggle 🌙 + Book Now button (gold CTA)
- Mobile: hamburger menu → full-screen slide-down mobile nav
- Sticky on scroll with blur backdrop: `backdrop-blur-md bg-cream/80 dark:bg-dark-bg/80`
- Active page link has gold underline indicator
- Uses Heroicons for hamburger, moon/sun, X icons

### 🔻 Footer — `components/footer.html`
**Used on:** ALL 14 pages

- 4-column layout: Brand + tagline | Quick Links | Services | Contact
- Bottom bar: copyright · privacy policy · terms of use
- Social media icons (Instagram, TikTok, Facebook, Twitter/X)
- Newsletter signup field embedded in footer
- Dark background always (even on light mode pages)

### 📅 Booking Modal — `components/booking-modal.html`
**Used on:** Homepage, Services, Team pages

- Opens when "Book Now" is clicked anywhere on site
- Overlay with blur background
- Quick 3-step booking: Service → Branch → Date
- Redirects to full `booking.html` for more detail

### 🍪 Cookie Banner — `components/cookie-banner.html`
**Used on:** First visit (all pages)

- Slides up from bottom on first visit
- Accept / Decline buttons
- Saved in `localStorage` so it doesn't show again

### 💌 Newsletter Popup — `components/newsletter-popup.html`
**Used on:** Homepage, Blog, Shop

- Triggers after 15 seconds or on exit intent
- Email input + subscribe button
- "No thanks" dismiss option saved in `localStorage`

### 🃏 Service Card — inline component
**Used on:** Homepage, Services page

- Icon + Service name + short description + price + Book button
- Hover: lifts with shadow + gold border glow

### ⭐ Testimonial Card — inline component
**Used on:** Homepage, About, Services

- Star rating + quote text + client name + photo
- Auto-scrolling carousel on mobile

> **How to reuse navbar/footer with plain HTML+JS:**
> In each page, add `<div id="navbar-placeholder"></div>` then in `main.js` use:
> ```js
> fetch('/components/navbar.html')
>   .then(r => r.text())
>   .then(html => { document.getElementById('navbar-placeholder').innerHTML = html })
> ```

---

## Step 06 — Homepage Hero

The most important section. Must be bold, premium, and immediately communicate luxury.

### Full-Screen Split Hero (Recommended Layout)

**Layout:** Left 55% = full-height background image (model with styled hair, dark overlay). Right 45% = cream background with text content.

**Left side:** Large portrait photo, dark gradient overlay at bottom, "Rated #1 Salon in Lagos" floating badge, animated floating gold particles.

**Right side content (top to bottom):**
1. Small gold label: `EST. 2020 · LAGOS, NIGERIA`
2. H1: *"Where Every Strand Tells a Story"* (Fraunces, 64px, light weight)
3. Subtext paragraph (Outfit, 16px, muted)
4. Two CTA buttons: `[Book Appointment — gold filled]` `[View Services — outlined plum]`
5. Stats row: 5,000+ Clients · 3 Branches · 15 Expert Stylists

**Animation:** Text elements stagger-fade in on load (0.1s delay each). Image has subtle Ken Burns zoom (scale 1.0 → 1.05 over 8s). Stats count up from 0 on scroll into view.

> **Mobile hero:** Stack vertically — image takes top 50vh, text below. Reduce heading to 36px. Move stats to a 3-column grid below the CTA buttons. Always test on 375px screen width first (iPhone SE).

---

## Step 07 — Animations

> Soft, slow, elegant. Never jarring or fast. Think silk, not a bounce.

| Animation | Where | How to Build | Feel |
|---|---|---|---|
| Fade + Slide Up | All section headings, cards | Intersection Observer + CSS class `.reveal` with `opacity-0 translate-y-8 → opacity-100 translate-y-0` | Elegant |
| Staggered Cards | Service cards, team grid | Each card gets `animation-delay: 0.1s × index` | Premium |
| Ken Burns | Hero image, gallery | CSS `@keyframes kenBurns { scale(1) → scale(1.08) }` over 8–10s ease | Cinematic |
| Counter Animate | Stats (clients, branches) | JS: count from 0 to target number over 2s when in viewport | Satisfying |
| Smooth Scroll | Anchor links | CSS `scroll-behavior: smooth` + JS `scrollIntoView` | Polished |
| Dark Mode Toggle | Navbar | Toggle `dark` class on `<html>`, save in `localStorage` | Essential |
| Hover Lift | Cards, buttons | `transition: transform 0.3s ease` + `hover:-translate-y-1 shadow-lg` | Interactive |

---

## Step 08 — Build Phases

### Phase 1 — Setup & Foundation ⏱ 2–3 Days

1. Create the `velour-hair-studio/` root folder. Create all subfolders as listed in the folder structure.
2. Open VS Code. Install extensions: **Tailwind CSS IntelliSense**, **Prettier**, **Live Server**.
3. Initialize Tailwind CSS. Run `npm init -y` and `npm install -D tailwindcss`. Create `tailwind.config.js` with custom colors.
4. Create `css/input.css` with the three Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`
5. Add the Tailwind build script to `package.json`: `"build": "tailwindcss -i css/input.css -o css/output.css --watch"`
6. Create `index.html` with the full HTML boilerplate. Link `css/output.css`, Google Fonts (Fraunces + Outfit), and your `js/main.js`.
7. Build the **Navbar component**. Code it in `components/navbar.html`. Test it renders correctly.
8. Build the **Footer component**. Code it in `components/footer.html`.
9. In `js/main.js`, write the `fetch()` loader for navbar and footer so they inject into every page.

### Phase 2 — Homepage ⏱ 4–6 Days

1. Start with the **Hero section** — code the full-screen split layout first. Get the image, typography, and CTA buttons right before moving on.
2. Add the hero **text animations** using GSAP `gsap.from()` with staggered timelines for each text element.
3. Build the **Brand Statement** strip — full-width cream section with a centered italic heading.
4. Build the **Services Preview** grid — 6 service cards in a responsive grid. Hover effects included.
5. Build the **Why Choose Us** section — 4 value props with icons, heading, and description.
6. Build the **Featured Work Gallery** — a 6-image masonry-style preview grid.
7. Build the **Testimonials** section — auto-scrolling carousel using `setInterval` + CSS `transform`.
8. Build the **Branches Strip** — horizontal scrollable row of 4 branch cards.
9. Build the **CTA Banner** — full-width dark section with a large headline and Book Now button.
10. Add **AOS scroll animations** to all sections. Install AOS via CDN, add `data-aos="fade-up"` attributes.
11. **Mobile test** every section at 375px, 390px, 430px widths. Fix any overflow or spacing issues.

### Phase 3 — Core Pages ⏱ 5–7 Days `Build in Order`

1. **Services page** — page hero banner, category filter tabs (All / Hair Care / Braids / Colour / Relaxer / Treatments), service cards grid, pricing table, book CTA
2. **About page** — brand story with large image, mission/vision in quote-style layout, milestone timeline, values grid
3. **Team page** — stylist cards with photo, name, title, specialties, and a "Book with [Name]" button
4. **Gallery page** — masonry grid layout using CSS columns. Filter tabs using JS to show/hide by category. Click opens lightbox.
5. **Branches page** — a card for each branch (image, name, address, hours, phone, "Get Directions" button). Embed Google Maps iframe for HQ.
6. **Contact page** — contact form (use Formspree action), HQ details, Google Maps embed, FAQ accordion built with JS toggle
7. **404 page** — styled with brand colors, funny/elegant message, back home button

### Phase 4 — Booking & Shop ⏱ 5–8 Days `Revenue Pages`

1. **Booking page** — multi-step form with progress bar. Step 1: select branch. Step 2: select service. Step 3: select stylist. Step 4: pick date & time (use a date picker library). Step 5: enter name, phone, email. Step 6: confirm screen.
2. Wire booking form to **Formspree or EmailJS** so you receive bookings in email. Show success message after submission.
3. **Shop page** — product grid with filter (Shampoo / Conditioner / Oils / Tools / Merch). Each product card has image, name, price, add to cart button.
4. Build **cart sidebar** — slides in from right when cart icon is clicked. Shows items, quantities, total. Uses `localStorage` to persist cart.
5. **Single product page** — image gallery (thumbnail scroll), description, size/variant selector, quantity input, add to cart, reviews section.
6. Add **Paystack** payment button to checkout. When user clicks "Pay Now", Paystack popup opens. On success, clear cart and show order confirmation.

### Phase 5 — Blog & Careers ⏱ 3–4 Days

1. **Blog listing page** — featured article at top (full-width card), then article grid below. Category filter. Newsletter signup strip.
2. **Blog post page** — reading progress bar at top, article header (title, date, author, hero image), article body with good typography (comfortable line-length, 680px max-width), author card at bottom, related posts grid.
3. **Careers page** — "Why work with us" section with perks icons, open positions list (each expandable), application form powered by Formspree.

### Phase 6 — Polish, SEO & Launch ⏱ 3–5 Days `Final Step`

1. Add **meta tags** to every page: title, description, og:image, og:title for social sharing previews
2. Add **favicon** and apple-touch-icon from your logo SVG
3. **Compress all images** — use squoosh.app. Convert to WebP format. Add `loading="lazy"` on all images below the fold.
4. Switch from Tailwind CDN to **proper Tailwind build** (`npm install`) to purge unused classes and reduce CSS file size drastically
5. Test ALL pages with **Chrome DevTools mobile emulator** at 375px, 390px, 768px, 1024px, 1440px
6. Run **Google Lighthouse** on every page. Target: Performance 90+, Accessibility 95+, SEO 100
7. Fix any accessibility issues: add `alt` text to all images, `aria-label` to icon buttons, ensure color contrast ratios pass
8. **Deploy** on Netlify (free) — drag and drop your folder or connect GitHub. Get a free SSL certificate automatically.
9. Connect a custom domain: **velourhairstudio.com** — buy from Namecheap or Whogohost (Nigerian registrar). Point DNS to Netlify.
10. Set up **Google Analytics** — add GA4 tracking script to every page to monitor visitors

---

## Bonus — Tools & Resources

> All free or freemium. No excuses.

| Tool | What It's For | Cost |
|---|---|---|
| VS Code | Code editor | Free |
| Tailwind CSS | Utility CSS framework | Free |
| GSAP (CDN) | Advanced animations | Free |
| AOS Library | Scroll reveal animations | Free |
| Heroicons | SVG icons (Tailwind made) | Free |
| Lucide Icons | SVG icons (clean, modern) | Free |
| Unsplash.com | Free high-quality photos | Free |
| Squoosh.app | Image compression + WebP | Free |
| Formspree.io | Form submissions to email | Free tier |
| Netlify | Hosting + SSL + deployment | Free |
| Paystack | Nigerian payment processing | % per txn |
| Google Fonts | Fraunces + Outfit fonts | Free |
| Figma | Design mockups (optional) | Free |
| ChatGPT / Claude | Help with code & copy | Free tier |
| Whogohost.com | Buy .com domain (Nigeria) | ~₦15,000/yr |

---

## You've Got This

**Start with Phase 1. One step at a time.**

You have the skills, the idea, the brand, and now the complete plan. The only thing left is to open VS Code and start building. Velour Hair Studio will be something you're proud to show clients.

---

*VELOUR HAIR STUDIO · FULL PROJECT ROADMAP · 2025*
