# Velour Hair Studio - Navbar Implementation Roadmap

## 📋 Project Overview

**Goal:** Build a premium, fully-functional navigation system for the Velour Hair Studio website that works seamlessly across all devices with smooth animations, mobile menu, and brand-consistent styling.

**Approach:** Implement the navbar in small, testable phases to minimize bugs and ensure each feature works before moving to the next.

**Design Philosophy:** Premium, elegant, minimal - matching the existing Velour brand (Plum, Gold, Cream colors).

**Timeline:** 5 phases, estimated 2-3 days for complete implementation

---

## 🎯 Success Criteria (Definition of Done)

- ✅ Navbar displays on all pages
- ✅ Logo and brand name visible and clickable
- ✅ Desktop navigation links work (7 links: Home, Services, About, Gallery, Shop, Branches, Blog)
- ✅ Mobile hamburger menu opens/closes smoothly
- ✅ All nav links visible on mobile (no cutoff)
- ✅ Active page highlighted in navigation
- ✅ Scroll effect: transparent at top, frosted glass on scroll
- ✅ Cart and wishlist icons functional
- ✅ Book Now CTA button prominent
- ✅ Dark mode styling consistent
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ No layout shift or flicker on page load
- ✅ Accessible (keyboard navigation, ARIA labels)

---

## 📊 Phase Breakdown

### **Phase 1: Basic HTML Structure** (30 minutes)
*Creating the foundation*

#### Step 1.1: Create Navbar Component File
- [ ] Create `components/navbar.html` file
- [ ] Add HTML5 semantic `<header>` element with id `site-header`
- [ ] Add fixed positioning classes: `fixed top-0 left-0 right-0 z-50`
- [ ] Add transition class for smooth effects: `transition-all duration-500`

#### Step 1.2: Add Top Accent Bar
- [ ] Add decorative gold line at top of navbar
- [ ] Use gradient: `bg-gradient-to-r from-transparent via-gold/60 to-transparent`
- [ ] Set height to 1px

#### Step 1.3: Create Main Nav Container
- [ ] Add `<nav>` element inside header
- [ ] Add max-width container: `max-w-7xl mx-auto`
- [ ] Add flexbox layout: `flex items-center justify-between`
- [ ] Add padding: `px-6 lg:px-8 py-4`

#### Step 1.4: Build Logo Section
- [ ] Create logo link wrapping to `/index.html`
- [ ] Add "Velour" text with Fraunces font
- [ ] Add vertical separator (hidden on mobile)
- [ ] Add "Hair Studio" subtitle (hidden on mobile)
- [ ] Add hover underline animation

**Phase 1 Deliverables:**
- ✅ Basic navbar HTML structure
- ✅ Logo section complete
- ✅ Container and layout ready

---

### **Phase 2: Desktop Navigation Links** (45 minutes)
*Building the main navigation*

#### Step 2.1: Create Desktop Nav Links Container
- [ ] Add div with class `hidden lg:flex items-center gap-1`
- [ ] This hides on mobile, shows on desktop (1024px+)

#### Step 2.2: Add Navigation Links (One by One)
Add each link with this structure:
```html
<a href="/path.html" class="nav-link group relative px-4 py-2 text-[13px] uppercase tracking-[0.15em] font-outfit font-medium text-ink/70 dark:text-cream/70 hover:text-plum dark:hover:text-gold transition-colors duration-300">
  Link Text
  <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gold group-hover:w-3/4 transition-all duration-300"></span>
</a>
```

- [ ] Add Home link → `/index.html`
- [ ] Add Services link → `/pages/services.html`
- [ ] Add About link → `/pages/about.html`
- [ ] Add Gallery link → `/pages/gallery.html`
- [ ] Add Shop link → `/ecommerce/pages/shop.html`
- [ ] Add Branches link → `/pages/branches.html`
- [ ] Add Blog link → `/pages/blog.html`

#### Step 2.3: Test Desktop Links
- [ ] Open index.html in browser
- [ ] Verify all 7 links are visible on desktop
- [ ] Test hover effects (gold underline appears)
- [ ] Test clicking each link (navigates correctly)

**Phase 2 Deliverables:**
- ✅ 7 desktop navigation links working
- ✅ Hover effects functional
- ✅ Links navigate correctly

---

### **Phase 3: Right Side Actions (Icons & CTA)** (45 minutes)
*Adding cart, wishlist, and book button*

#### Step 3.1: Create Right Side Container
- [ ] Add div with class `flex items-center gap-3`
- [ ] This will hold wishlist icon, cart icon, book button, and mobile menu button

#### Step 3.2: Add Wishlist Icon
- [ ] Create link to `/ecommerce/pages/wishlist.html`
- [ ] Add circular button styling: `w-10 h-10 rounded-full border`
- [ ] Add heart SVG icon (24x24 viewBox)
- [ ] Add wishlist count badge (hidden by default)
- [ ] Add id: `navbar-wishlist-link`
- [ ] Add aria-label: "Wishlist"

#### Step 3.3: Add Cart Icon
- [ ] Create link to `/ecommerce/pages/cart.html`
- [ ] Add circular button styling: `w-10 h-10 rounded-full border`
- [ ] Add shopping bag SVG icon (24x24 viewBox)
- [ ] Add cart count badge (hidden by default)
- [ ] Add aria-label: "Shopping cart"

#### Step 3.4: Add Book Now CTA (Desktop Only)
- [ ] Create link to `/pages/booking.html`
- [ ] Add class: `hidden lg:inline-flex` (hidden on mobile)
- [ ] Add gold gradient background: `bg-gradient-to-r from-gold to-[#d4b87a]`
- [ ] Add styling: `rounded-full px-7 py-2.5 text-[12px] uppercase tracking-[0.18em]`
- [ ] Add hover effects: shadow and translate
- [ ] Text: "Book Now"

#### Step 3.5: Add Mobile Menu Button
- [ ] Create button element with id: `mobile-menu-btn`
- [ ] Add class: `lg:hidden` (only visible on mobile)
- [ ] Add circular styling: `w-10 h-10 rounded-full border`
- [ ] Add aria-label: "Open navigation menu"

#### Step 3.6: Create Hamburger Icon (3 Bars)
- [ ] Add container div with id: `hamburger-icon`
- [ ] Add 3 span elements for bars
- [ ] Bar 1: id `bar-1`, full width (20px)
- [ ] Bar 2: id `bar-2`, shorter width (14px), aligned right
- [ ] Bar 3: id `bar-3`, full width (20px)
- [ ] Each bar: `h-[1.5px] bg-current transition-all duration-300`

#### Step 3.7: Test Right Side Actions
- [ ] Verify wishlist icon appears
- [ ] Verify cart icon appears
- [ ] Verify Book Now button shows on desktop only
- [ ] Verify hamburger menu shows on mobile only
- [ ] Test icon hover effects

**Phase 3 Deliverables:**
- ✅ Wishlist icon with badge placeholder
- ✅ Cart icon with badge placeholder
- ✅ Book Now CTA (desktop only)
- ✅ Hamburger menu button (mobile only)

---

### **Phase 4: Mobile Menu Overlay** (1 hour)
*Building the full-screen mobile navigation*

#### Step 4.1: Create Mobile Menu Container
- [ ] Add div with id: `mobile-menu` after closing `</header>`
- [ ] Add classes: `fixed inset-0 z-[45]`
- [ ] Add initial state: `pointer-events-none opacity-0`
- [ ] Add transition: `transition-opacity duration-500`

#### Step 4.2: Add Backdrop
- [ ] Add div inside mobile-menu
- [ ] Add classes: `absolute inset-0`
- [ ] Add background: `bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-xl`

#### Step 4.3: Create Scrollable Content Wrapper
- [ ] Add div with classes: `relative h-full w-full overflow-y-auto overflow-x-hidden`
- [ ] Add inner div: `min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-24`

#### Step 4.4: Add Decorative Top Line
- [ ] Add div: `w-8 h-[1px] bg-gold/50 mb-2`

#### Step 4.5: Add Mobile Nav Links (One by One)
Add each link with this structure:
```html
<a href="/path.html" class="mobile-nav-link text-2xl font-fraunces text-plum dark:text-cream hover:text-gold transition-colors duration-300 translate-y-4 opacity-0">
  Link Text
</a>
```

- [ ] Add Home link
- [ ] Add Services link
- [ ] Add About link
- [ ] Add Gallery link
- [ ] Add Shop link
- [ ] Add Branches link
- [ ] Add Blog link

#### Step 4.6: Add Decorative Bottom Line
- [ ] Add div: `w-8 h-[1px] bg-gold/50 my-2`

#### Step 4.7: Add Mobile Book CTA
- [ ] Create link to `/pages/booking.html`
- [ ] Add class: `mobile-nav-link`
- [ ] Add gold gradient background
- [ ] Add styling: `rounded-full px-10 py-3.5 text-[13px] uppercase`
- [ ] Add initial state: `translate-y-4 opacity-0`
- [ ] Text: "Book Appointment"

#### Step 4.8: Add Navbar Spacer
- [ ] Add div with id: `navbar-spacer` after mobile menu
- [ ] Add class: `h-[73px]`
- [ ] This prevents content from hiding under fixed navbar

#### Step 4.9: Test Mobile Menu Structure
- [ ] Verify mobile menu is hidden by default
- [ ] Verify all 7 links are in mobile menu
- [ ] Verify Book Appointment button is in mobile menu
- [ ] Verify proper spacing between links

**Phase 4 Deliverables:**
- ✅ Mobile menu overlay structure complete
- ✅ All 7 nav links in mobile menu
- ✅ Book CTA in mobile menu
- ✅ Navbar spacer added

---

### **Phase 5: JavaScript Functionality** (1.5 hours)
*Making everything interactive*

#### Step 5.1: Set Up Navbar Loading in main.js
- [ ] Open `js/main.js`
- [ ] Find the `DOMContentLoaded` event listener
- [ ] Add navbar placeholder constant: `const navbarPlaceholder = document.getElementById("navbar-placeholder");`
- [ ] Add navbar loading code:
```javascript
if (navbarPlaceholder && !isLockedPage) {
  fetch("/components/navbar.html")
    .then((r) => r.text())
    .then((html) => {
      navbarPlaceholder.innerHTML = html;
      initMobileMenu();
      initNavbarScroll();
      setActiveNavLink();
    })
    .catch((err) => console.error("Error loading navbar:", err));
}
```

#### Step 5.2: Create Mobile Menu Toggle Function
Add this function to `js/main.js`:

```javascript
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const bar1 = document.getElementById("bar-1");
  const bar2 = document.getElementById("bar-2");
  const bar3 = document.getElementById("bar-3");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!btn || !menu) return;

  let isOpen = false;

  btn.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      // Open menu
      menu.classList.remove("pointer-events-none", "opacity-0");
      menu.classList.add("pointer-events-auto", "opacity-100");
      document.body.classList.add("overflow-hidden");

      // Animate hamburger to X
      if (bar1) {
        bar1.style.transform = "rotate(45deg) translate(2px, 2px)";
        bar1.style.width = "20px";
      }
      if (bar2) {
        bar2.style.opacity = "0";
        bar2.style.transform = "translateX(10px)";
      }
      if (bar3) {
        bar3.style.transform = "rotate(-45deg) translate(2px, -2px)";
        bar3.style.width = "20px";
      }

      // Stagger animate links
      mobileLinks.forEach((link, i) => {
        setTimeout(() => {
          link.style.opacity = "1";
          link.style.transform = "translateY(0)";
          link.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        }, 80 + i * 60);
      });
    } else {
      closeMenu();
    }
  });

  // Close on link click
  mobileLinks.forEach((link) => {
    if (link.tagName === "A") {
      link.addEventListener("click", () => {
        isOpen = false;
        closeMenu();
      });
    }
  });

  function closeMenu() {
    // Reset links
    mobileLinks.forEach((link) => {
      link.style.opacity = "0";
      link.style.transform = "translateY(16px)";
      link.style.transition = "all 0.2s ease";
    });

    // Reset hamburger
    if (bar1) {
      bar1.style.transform = "none";
      bar1.style.width = "20px";
    }
    if (bar2) {
      bar2.style.opacity = "1";
      bar2.style.transform = "none";
    }
    if (bar3) {
      bar3.style.transform = "none";
      bar3.style.width = "20px";
    }

    setTimeout(() => {
      menu.classList.add("pointer-events-none", "opacity-0");
      menu.classList.remove("pointer-events-auto", "opacity-100");
      document.body.classList.remove("overflow-hidden");
    }, 200);
  }
}
```

- [ ] Copy and paste the function above into `js/main.js`
- [ ] Save the file

#### Step 5.3: Test Mobile Menu Toggle
- [ ] Open site on mobile or resize browser to mobile width
- [ ] Click hamburger icon
- [ ] Verify menu opens with smooth animation
- [ ] Verify hamburger transforms to X
- [ ] Verify all links animate in with stagger effect
- [ ] Click a link
- [ ] Verify menu closes
- [ ] Verify hamburger returns to bars

#### Step 5.4: Create Navbar Scroll Effect Function
Add this function to `js/main.js`:

```javascript
function initNavbarScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > scrollThreshold) {
      // Scrolled — add frosted glass effect
      header.classList.add(
        "backdrop-blur-xl",
        "bg-cream/85",
        "dark:bg-dark-bg/85",
        "shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
      );
    } else {
      // At top — transparent
      header.classList.remove(
        "backdrop-blur-xl",
        "bg-cream/85",
        "dark:bg-dark-bg/85",
        "shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
      );
    }
  });
}
```

- [ ] Copy and paste the function above into `js/main.js`
- [ ] Save the file

#### Step 5.5: Test Scroll Effect
- [ ] Open homepage
- [ ] Scroll down the page
- [ ] Verify navbar gets frosted glass background after 50px
- [ ] Verify navbar gets subtle shadow
- [ ] Scroll back to top
- [ ] Verify navbar returns to transparent

#### Step 5.6: Create Active Link Highlight Function
Add this function to `js/main.js`:

```javascript
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && currentPath.endsWith(href.replace(/^\//, ""))) {
      // Add gold underline to active link
      const underline = link.querySelector("span");
      if (underline) {
        underline.classList.remove("w-0");
        underline.classList.add("w-3/4");
      }
      link.classList.remove("text-ink/70", "dark:text-cream/70");
      link.classList.add("text-plum", "dark:text-gold");
    }
  });
}
```

- [ ] Copy and paste the function above into `js/main.js`
- [ ] Save the file

#### Step 5.7: Test Active Link Highlighting
- [ ] Open homepage
- [ ] Verify "Home" link has gold underline
- [ ] Navigate to Services page
- [ ] Verify "Services" link has gold underline
- [ ] Test on 2-3 other pages

#### Step 5.8: Add Navbar Placeholder to All Pages
For each HTML page that needs navbar:

- [ ] Open the HTML file
- [ ] Find the `<body>` tag
- [ ] Add this line right after `<body>`:
```html
<div id="navbar-placeholder"></div>
```
- [ ] Save the file

Pages to update:
- [ ] `index.html`
- [ ] `pages/about.html`
- [ ] `pages/services.html`
- [ ] `pages/gallery.html`
- [ ] `pages/team.html`
- [ ] `pages/blog.html`
- [ ] `pages/blog-post.html`
- [ ] `pages/branches.html`
- [ ] `pages/contact.html`
- [ ] `pages/careers.html`
- [ ] `pages/booking.html`
- [ ] `pages/404.html`
- [ ] `ecommerce/pages/shop.html`
- [ ] `ecommerce/pages/product.html`
- [ ] `ecommerce/pages/cart.html`
- [ ] `ecommerce/pages/wishlist.html`
- [ ] `ecommerce/pages/checkout.html`
- [ ] `ecommerce/pages/order-success.html`

#### Step 5.9: Adjust Hero Section Padding (index.html only)
- [ ] Open `index.html`
- [ ] Find the hero section: `<section class="relative min-h-screen flex flex-col lg:flex-row">`
- [ ] Add padding class: `pt-[73px] lg:pt-0`
- [ ] Final class should be: `<section class="relative min-h-screen flex flex-col lg:flex-row pt-[73px] lg:pt-0">`
- [ ] Save the file

**Phase 5 Deliverables:**
- ✅ Navbar loads on all pages
- ✅ Mobile menu opens/closes with animation
- ✅ Hamburger transforms to X
- ✅ Scroll effect works (transparent → frosted glass)
- ✅ Active page highlighted
- ✅ All pages have navbar placeholder

---

## 🎨 Styling & Polish (30 minutes)

### Step 6.1: Add Mobile Nav Link Transition Base
- [ ] Open `css/custom.css`
- [ ] Add this CSS:
```css
/* Mobile menu links transition base */
.mobile-nav-link {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```
- [ ] Save the file

### Step 6.2: Add Navbar Glass Transition
- [ ] In `css/custom.css`, add:
```css
/* Navbar glass transition */
#site-header {
  transition: background-color 0.4s ease,
    backdrop-filter 0.4s ease,
    box-shadow 0.4s ease;
}
```
- [ ] Save the file

### Step 6.3: Add Cart/Wishlist Badge Styles
- [ ] In `css/custom.css`, add:
```css
/* Cart and Wishlist count badges */
.cart-count-badge,
.wishlist-count-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #C9A96E 0%, #d4b87a 100%);
  color: #1a0f17;
  font-size: 10px;
  font-weight: 600;
  border-radius: 9999px;
  padding: 0 5px;
  box-shadow: 0 2px 8px rgba(201, 169, 110, 0.4);
  animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes badgePop {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
```
- [ ] Save the file

### Step 6.4: Test All Styling
- [ ] Open site in browser
- [ ] Verify mobile menu transitions are smooth
- [ ] Verify navbar scroll effect is smooth
- [ ] Verify badge styles look good (when badges are shown)
- [ ] Test on mobile, tablet, and desktop

---

## 🧪 Testing & Quality Assurance (45 minutes)

### Desktop Testing
- [ ] Open site on desktop (1920px width)
- [ ] Verify logo is visible and clickable
- [ ] Verify all 7 nav links are visible
- [ ] Hover over each link, verify gold underline appears
- [ ] Click each link, verify navigation works
- [ ] Verify Book Now button is visible
- [ ] Verify cart and wishlist icons are visible
- [ ] Scroll down, verify frosted glass effect
- [ ] Scroll back up, verify transparent effect
- [ ] Navigate to different pages, verify active link highlights

### Tablet Testing
- [ ] Resize browser to 768px width
- [ ] Verify hamburger menu appears
- [ ] Verify desktop nav links are hidden
- [ ] Verify Book Now button is hidden
- [ ] Click hamburger, verify menu opens
- [ ] Verify all 7 links are visible in mobile menu
- [ ] Verify Book Appointment button is visible
- [ ] Click a link, verify menu closes
- [ ] Verify navigation works

### Mobile Testing
- [ ] Resize browser to 375px width (iPhone size)
- [ ] Verify logo is visible
- [ ] Verify hamburger menu is visible
- [ ] Verify cart and wishlist icons are visible
- [ ] Click hamburger, verify menu opens full screen
- [ ] Verify all 7 links are visible and readable
- [ ] Verify proper spacing between links (gap-6)
- [ ] Verify links are large enough to tap (text-2xl)
- [ ] Scroll in mobile menu, verify all content is accessible
- [ ] Click a link, verify menu closes
- [ ] Verify navigation works

### Cross-Browser Testing
- [ ] Test on Chrome
- [ ] Test on Safari
- [ ] Test on Firefox
- [ ] Test on Edge
- [ ] Fix any browser-specific issues

### Accessibility Testing
- [ ] Tab through navbar with keyboard
- [ ] Verify all links are focusable
- [ ] Verify focus indicators are visible
- [ ] Press Enter on hamburger menu, verify it opens
- [ ] Press Escape in mobile menu, verify it closes (optional enhancement)
- [ ] Verify all aria-labels are present
- [ ] Test with screen reader (optional but recommended)

### Performance Testing
- [ ] Check page load time
- [ ] Verify no layout shift when navbar loads
- [ ] Verify no flicker or flash
- [ ] Check mobile menu animation is smooth (60fps)
- [ ] Verify scroll effect doesn't cause jank

---

## 🐛 Common Issues & Solutions

### Issue 1: Navbar Not Showing
**Symptoms:** Blank space at top of page
**Solutions:**
- [ ] Check if `navbar-placeholder` div exists in HTML
- [ ] Check browser console for fetch errors
- [ ] Verify `components/navbar.html` file exists
- [ ] Check file path is correct (`/components/navbar.html`)
- [ ] Verify `main.js` is loaded with `defer` attribute

### Issue 2: Mobile Menu Not Opening
**Symptoms:** Clicking hamburger does nothing
**Solutions:**
- [ ] Check if `initMobileMenu()` is called after navbar loads
- [ ] Verify `mobile-menu-btn` id exists in HTML
- [ ] Verify `mobile-menu` id exists in HTML
- [ ] Check browser console for JavaScript errors
- [ ] Verify all bar ids exist (bar-1, bar-2, bar-3)

### Issue 3: Only 2 Links Visible on Mobile
**Symptoms:** Mobile menu cuts off after 2 links
**Solutions:**
- [ ] Check gap between links (should be `gap-6` not `gap-3`)
- [ ] Verify padding on container (should be `py-24` not `py-20`)
- [ ] Check if `overflow-y-auto` is on content wrapper
- [ ] Verify `min-h-screen` is on inner container
- [ ] Check if any CSS is limiting height

### Issue 4: Scroll Effect Not Working
**Symptoms:** Navbar stays transparent when scrolling
**Solutions:**
- [ ] Check if `initNavbarScroll()` is called
- [ ] Verify `site-header` id exists
- [ ] Check if scroll event listener is attached
- [ ] Verify Tailwind classes are not being purged
- [ ] Check if `scrollThreshold` value is appropriate

### Issue 5: Active Link Not Highlighting
**Symptoms:** Current page link doesn't show gold underline
**Solutions:**
- [ ] Check if `setActiveNavLink()` is called
- [ ] Verify `.nav-link` class exists on desktop links
- [ ] Check if `href` attributes match current path
- [ ] Verify underline `<span>` exists inside each link
- [ ] Check if path comparison logic is correct

### Issue 6: Layout Shift on Load
**Symptoms:** Content jumps when navbar loads
**Solutions:**
- [ ] Verify `navbar-spacer` div exists (height: 73px)
- [ ] Check if navbar has `fixed` positioning
- [ ] Ensure spacer is outside navbar component
- [ ] Verify hero section has correct padding

### Issue 7: Mobile Menu Doesn't Close on Link Click
**Symptoms:** Menu stays open after clicking link
**Solutions:**
- [ ] Check if click event listener is on `.mobile-nav-link`
- [ ] Verify `closeMenu()` function is called
- [ ] Check if `isOpen` flag is being reset
- [ ] Verify link has `tagName === "A"` check

### Issue 8: Hamburger Doesn't Transform to X
**Symptoms:** Bars don't animate when menu opens
**Solutions:**
- [ ] Verify bar ids exist (bar-1, bar-2, bar-3)
- [ ] Check if transform styles are being applied
- [ ] Verify transition classes exist on bars
- [ ] Check if JavaScript is finding the bar elements

---

## 📝 Implementation Checklist

### Phase 1: Basic HTML Structure
- [ ] Create `components/navbar.html`
- [ ] Add header element with fixed positioning
- [ ] Add top accent bar
- [ ] Create main nav container
- [ ] Build logo section

### Phase 2: Desktop Navigation
- [ ] Create desktop nav links container
- [ ] Add Home link
- [ ] Add Services link
- [ ] Add About link
- [ ] Add Gallery link
- [ ] Add Shop link
- [ ] Add Branches link
- [ ] Add Blog link
- [ ] Test desktop links

### Phase 3: Right Side Actions
- [ ] Create right side container
- [ ] Add wishlist icon with badge
- [ ] Add cart icon with badge
- [ ] Add Book Now CTA (desktop)
- [ ] Add mobile menu button
- [ ] Create hamburger icon (3 bars)
- [ ] Test right side actions

### Phase 4: Mobile Menu Overlay
- [ ] Create mobile menu container
- [ ] Add backdrop
- [ ] Create scrollable content wrapper
- [ ] Add decorative top line
- [ ] Add all 7 mobile nav links
- [ ] Add decorative bottom line
- [ ] Add mobile Book CTA
- [ ] Add navbar spacer
- [ ] Test mobile menu structure

### Phase 5: JavaScript Functionality
- [ ] Set up navbar loading in main.js
- [ ] Create mobile menu toggle function
- [ ] Test mobile menu toggle
- [ ] Create navbar scroll effect function
- [ ] Test scroll effect
- [ ] Create active link highlight function
- [ ] Test active link highlighting
- [ ] Add navbar placeholder to all pages (20 pages)
- [ ] Adjust hero section padding

### Phase 6: Styling & Polish
- [ ] Add mobile nav link transition CSS
- [ ] Add navbar glass transition CSS
- [ ] Add cart/wishlist badge styles
- [ ] Test all styling

### Phase 7: Testing & QA
- [ ] Desktop testing (all features)
- [ ] Tablet testing (responsive)
- [ ] Mobile testing (all features)
- [ ] Cross-browser testing
- [ ] Accessibility testing
- [ ] Performance testing

---

## 🚀 Post-Implementation Enhancements (Optional)

### Enhancement 1: Search Bar
- [ ] Add search icon to navbar
- [ ] Create search overlay
- [ ] Implement search functionality
- [ ] Add search results display

### Enhancement 2: Mega Menu (for Services)
- [ ] Create dropdown mega menu for Services
- [ ] Add service categories
- [ ] Add featured services
- [ ] Add images to mega menu

### Enhancement 3: Sticky Announcement Bar
- [ ] Add announcement bar above navbar
- [ ] Make it dismissible
- [ ] Store dismissed state in localStorage

### Enhancement 4: Language Switcher
- [ ] Add language dropdown
- [ ] Implement i18n
- [ ] Store language preference

### Enhancement 5: Dark Mode Toggle
- [ ] Add sun/moon icon
- [ ] Implement toggle functionality
- [ ] Store preference in localStorage

---

## 📞 Support & Resources

### Design Reference
- **Match existing Velour design system**
- Colors: Plum (#6B3F5E), Gold (#C9A96E), Cream (#F5EFE6)
- Fonts: Fraunces (headings), Outfit (body)
- Spacing: Consistent with existing sections

### Code Reference
- **Existing components**: `components/footer.html`
- **Existing JavaScript**: `js/main.js`
- **Existing CSS**: `css/custom.css`

### Testing Tools
- **Browser DevTools**: Inspect element, console, network tab
- **Responsive Design Mode**: Test different screen sizes
- **Lighthouse**: Performance and accessibility audit
- **WAVE**: Accessibility checker

---

## ✅ Final Verification

Before marking complete, verify:
- [ ] Navbar appears on all 20 pages
- [ ] All 7 desktop links work
- [ ] All 7 mobile links work
- [ ] Mobile menu opens/closes smoothly
- [ ] Hamburger animates to X
- [ ] Scroll effect works (transparent → frosted)
- [ ] Active page is highlighted
- [ ] Cart and wishlist icons present
- [ ] Book Now CTA works
- [ ] No console errors
- [ ] No layout shift
- [ ] Responsive on all devices
- [ ] Accessible (keyboard navigation)
- [ ] Cross-browser compatible

---

**Velour Hair Studio** · Lagos, Nigeria · Est. 2020

*Crafted with precision for premium salon experiences.*
