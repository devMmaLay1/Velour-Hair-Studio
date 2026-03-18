# Generate Brand Assets Guide

## 📁 Folder Structure Created
```
assets/images/brand/
├── og-image.jpeg ✅ (Already exists - 1200x630px social preview)
```

## 🎨 Source Files
- **Logo SVGs**: `assets/icons/logo.svg`, `logo-dark.svg`, `logo-white.svg`
- **OG Image**: `assets/images/brand/og-image.jpeg` ✅ Already created!

---

## Step 1: Generate Favicons (Only Remaining Task)

### Option A: Using RealFaviconGenerator (Recommended)

1. **Go to**: https://realfavicongenerator.net/

2. **Upload**: Choose either `assets/icons/logo.svg` or `assets/icons/logo-white.svg`
   - The white version works well on dark browser tabs
   - SVG format ensures crisp rendering at all sizes

3. **Configure Settings**:
   - **iOS**: Select "Add a solid, plain background" → Choose `#6B3F5E` (plum) or `#0D0A0E` (dark)
   - **Android Chrome**: Select "Use a solid color" → Choose `#6B3F5E`
   - **Windows Metro**: Select "Use a solid color" → Choose `#6B3F5E`
   - **macOS Safari**: Keep default

4. **Generate**: Click "Generate your Favicons and HTML code"

5. **Download**: Download the favicon package (ZIP file)

6. **Extract files** to `assets/images/brand/`:
   - `favicon.ico`
   - `favicon-16x16.png` → rename to `favicon-16.png`
   - `favicon-32x32.png` → rename to `favicon-32.png`
   - `apple-touch-icon.png`
   - `android-chrome-192x192.png` (optional)
   - `android-chrome-512x512.png` (optional)

### Option B: Using Online Tools

**Favicon.io** (https://favicon.io/):
1. Upload one of your SVG logos from `assets/icons/`
2. Download the generated package
3. Extract to `assets/images/brand/`

**Note**: SVG logos provide the best quality for favicon generation since they scale perfectly to any size.

---

## ~~Step 2: Create OG Image (Social Media Preview)~~

✅ **ALREADY DONE!** 

Your OG image already exists at: `assets/images/brand/og-image.jpeg`

This image is already configured in your meta tags and will appear when sharing your site on:
- Facebook
- WhatsApp
- LinkedIn
- Twitter
- Slack
- Any other social platform

---

## Step 2: Verify Files

After generation, your `assets/images/brand/` folder should contain:

```
assets/images/brand/
├── favicon.ico
├── favicon-16.png
├── favicon-32.png
├── apple-touch-icon.png
└── og-image.jpeg ✅
```

---

## Step 3: Test Your Implementation

### Test Favicons:
1. Open your site in a browser
2. Check the browser tab for the favicon
3. Bookmark the page and check the bookmark icon
4. On mobile, add to home screen and check the icon

### Test OG Image:
1. **Facebook Sharing Debugger**: 
   - Go to: https://developers.facebook.com/tools/debug/
   - Enter your URL
   - Click "Scrape Again" if needed
   - Verify image appears

2. **Twitter Card Validator**:
   - Go to: https://cards-dev.twitter.com/validator
   - Enter your URL
   - Verify card preview

3. **LinkedIn Post Inspector**:
   - Go to: https://www.linkedin.com/post-inspector/
   - Enter your URL
   - Verify preview

4. **WhatsApp**:
   - Send your URL in a WhatsApp chat
   - Verify preview appears with image

---

## 🎨 Brand Colors Reference

Use these colors when creating assets:

```css
/* Primary */
--plum: #6B3F5E;
--cream: #F5EFE6;
--gold: #C9A96E;

/* Dark Mode */
--dark-bg: #0D0A0E;
--dark-surface: #1A1220;

/* Accents */
--rose: #D4A5A5;
--ink: #1a0f17;
```

---

## ✅ Quick Checklist

- [x] OG image exists (og-image.jpeg) ✅
- [x] OG image configured in meta tags ✅
- [x] All 17 pages have complete SEO meta tags ✅
- [x] site.webmanifest created ✅
- [ ] Generate favicons from logo SVG files
- [ ] Place favicons in `assets/images/brand/`
- [ ] Test favicons in browser
- [ ] Test OG image with Facebook Debugger
- [ ] Test OG image with Twitter Card Validator
- [ ] Test sharing on WhatsApp
- [ ] Verify favicon appears in browser tabs

---

## 🚀 After Deployment

Once deployed to Vercel:

1. Update all OG image URLs in meta tags from:
   ```html
   content="https://velour-hair-studio.vercel.app/assets/images/brand/og-image.jpeg"
   ```
   To your actual domain:
   ```html
   content="https://yourdomain.com/assets/images/brand/og-image.jpeg"
   ```

2. Update canonical URLs to match your domain

3. Re-test all social sharing tools with your live URL

---

## 📱 Mobile App Icon (Optional)

If you want a PWA (Progressive Web App) experience:

1. Generate additional sizes:
   - 192x192px
   - 512x512px

2. Add to `site.webmanifest`:
   ```json
   {
     "src": "/assets/images/brand/icon-192.png",
     "sizes": "192x192",
     "type": "image/png"
   },
   {
     "src": "/assets/images/brand/icon-512.png",
     "sizes": "512x512",
     "type": "image/png"
   }
   ```

---

## 🆘 Need Help?

- **Favicon Generator**: https://realfavicongenerator.net/
- **Canva**: https://www.canva.com/
- **Image Resizer**: https://www.iloveimg.com/resize-image
- **OG Image Checker**: https://www.opengraph.xyz/
