/* ═══════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Product Data
   Single source of truth for all e-commerce products
   ═══════════════════════════════════════════════════════════════ */

const PRODUCT_CATEGORIES = [
  { slug: 'hair-care',    label: 'Hair Care',       icon: '💆' },
  { slug: 'oils-serums',  label: 'Oils & Serums',   icon: '✨' },
  { slug: 'treatments',   label: 'Treatments',      icon: '🧴' },
  { slug: 'styling-tools',label: 'Styling Tools',   icon: '💇' },
  { slug: 'accessories',  label: 'Accessories',     icon: '🎀' },
  { slug: 'merch',        label: 'Merch & Gifts',   icon: '🎁' },
];

const PRODUCTS = [
  // ─── HAIR CARE (4 products) ───────────────────────────────
  {
    id: 'velour-hydra-shampoo',
    slug: 'velour-hydra-shampoo',
    name: 'Velour Hydra Shampoo',
    category: 'hair-care',
    price: 8500,
    oldPrice: null,
    badge: 'Best Seller',
    description: 'Sulfate-free hydrating shampoo infused with argan oil and shea butter for deep moisture without stripping.',
    longDescription: 'Our signature sulfate-free shampoo is specially formulated for textured and treated hair. Enriched with cold-pressed argan oil and raw shea butter, it gently cleanses while locking in moisture. The luxurious lather removes build-up without stripping natural oils, leaving hair soft, manageable, and beautifully hydrated. Perfect for relaxed, natural, and colour-treated hair.',
    image: '/assets/images/shop/products/shampoo-hydra.webp',
    gallery: [
      '/assets/images/shop/products/shampoo-hydra.webp',
      '/assets/images/shop/products/shampoo-hydra-2.webp',
    ],
    stock: 24,
    featured: true,
    variants: [
      { label: '250ml', price: 8500 },
      { label: '500ml', price: 14500 },
    ],
    benefits: ['Sulfate-free formula', 'Deep hydration', 'Safe for colour-treated hair', 'Argan oil enriched'],
  },
  {
    id: 'velour-silk-conditioner',
    slug: 'velour-silk-conditioner',
    name: 'Velour Silk Conditioner',
    category: 'hair-care',
    price: 9000,
    oldPrice: 11000,
    badge: 'Sale',
    description: 'Lightweight detangling conditioner that delivers salon-level softness and shine after every wash.',
    longDescription: 'This lightweight yet deeply nourishing conditioner provides instant detangling and lasting softness. Infused with silk proteins and vitamin E, it smooths the hair cuticle, reduces frizz, and adds a luminous shine. The creamy formula rinses clean without weighing hair down, making it ideal for all hair types and textures.',
    image: '/assets/images/shop/products/conditioner-silk.webp',
    gallery: [
      '/assets/images/shop/products/conditioner-silk.webp',
      '/assets/images/shop/products/conditioner-silk-2.webp',
    ],
    stock: 18,
    featured: true,
    variants: [
      { label: '250ml', price: 9000 },
      { label: '500ml', price: 15000 },
    ],
    benefits: ['Instant detangling', 'Silk protein enriched', 'Frizz control', 'Adds luminous shine'],
  },
  {
    id: 'velour-cleansing-co-wash',
    slug: 'velour-cleansing-co-wash',
    name: 'Velour Cleansing Co-Wash',
    category: 'hair-care',
    price: 7500,
    oldPrice: null,
    badge: null,
    description: 'Gentle cleansing conditioner for curl refresh between wash days. No foam, no fuss — just clean, defined curls.',
    longDescription: 'Skip the shampoo on your off days with our cleansing co-wash. This low-suds, conditioning cleanser removes light build-up while keeping moisture intact. Formulated with coconut milk and aloe vera, it refreshes curls, coils, and waves without disrupting your natural moisture balance. A must-have for protective style maintenance.',
    image: '/assets/images/shop/products/co-wash.webp',
    gallery: [
      '/assets/images/shop/products/co-wash.webp',
    ],
    stock: 30,
    featured: false,
    variants: null,
    benefits: ['Low-suds formula', 'Coconut milk & aloe vera', 'Curl refresh', 'Maintains moisture balance'],
  },
  {
    id: 'velour-leave-in-cream',
    slug: 'velour-leave-in-cream',
    name: 'Velour Leave-In Cream',
    category: 'hair-care',
    price: 6500,
    oldPrice: null,
    badge: 'New',
    description: 'Rich leave-in moisturizer that softens, defines, and protects throughout the day.',
    longDescription: 'Our everyday leave-in cream delivers long-lasting softness, definition, and protection. A whipped blend of mango butter, marshmallow root, and green tea extract that absorbs quickly without residue. Provides lightweight hold for twist-outs and braid-outs while shielding hair from environmental stressors.',
    image: '/assets/images/shop/products/leave-in-cream.webp',
    gallery: [
      '/assets/images/shop/products/leave-in-cream.webp',
    ],
    stock: 42,
    featured: false,
    variants: null,
    benefits: ['All-day moisture', 'Lightweight hold', 'No residue', 'Environmental protection'],
  },

  // ─── OILS & SERUMS (4 products) ───────────────────────────
  {
    id: 'velour-gold-elixir-oil',
    slug: 'velour-gold-elixir-oil',
    name: 'Velour Gold Elixir Oil',
    category: 'oils-serums',
    price: 12000,
    oldPrice: null,
    badge: 'Best Seller',
    description: 'Luxurious multi-purpose hair & scalp oil blended from 7 cold-pressed botanicals for shine, growth, and strength.',
    longDescription: 'The crown jewel of our product line. This amber-hued elixir combines seven cold-pressed oils — argan, jojoba, sweet almond, castor, rosemary, peppermint, and lavender — in a lightweight formula that absorbs instantly. Use as a scalp treatment, pre-poo oil, or finishing shine serum. The elegant dropper ensures precise application every time.',
    image: '/assets/images/shop/products/gold-elixir-oil.webp',
    gallery: [
      '/assets/images/shop/products/gold-elixir-oil.webp',
      '/assets/images/shop/products/gold-elixir-oil-2.webp',
    ],
    stock: 15,
    featured: true,
    variants: [
      { label: '30ml', price: 12000 },
      { label: '60ml', price: 20000 },
    ],
    benefits: ['7 cold-pressed oils', 'Promotes growth', 'Scalp treatment', 'Instant shine'],
  },
  {
    id: 'velour-castor-growth-serum',
    slug: 'velour-castor-growth-serum',
    name: 'Velour Castor Growth Serum',
    category: 'oils-serums',
    price: 9500,
    oldPrice: null,
    badge: null,
    description: 'Concentrated Jamaican black castor oil serum targeting edges, bald spots, and thinning areas.',
    longDescription: 'A potent, concentrated serum built around authentic Jamaican black castor oil — the gold standard for hair growth. Enhanced with rosemary essential oil and biotin complex, it nourishes dormant follicles and strengthens fragile strands. The precision applicator tip makes it easy to target edges, temples, and thinning areas directly.',
    image: '/assets/images/shop/products/castor-growth-serum.webp',
    gallery: [
      '/assets/images/shop/products/castor-growth-serum.webp',
    ],
    stock: 20,
    featured: false,
    variants: null,
    benefits: ['JBCO formula', 'Targets edges & thinning', 'Biotin enriched', 'Precision applicator'],
  },
  {
    id: 'velour-anti-frizz-serum',
    slug: 'velour-anti-frizz-serum',
    name: 'Velour Anti-Frizz Serum',
    category: 'oils-serums',
    price: 7000,
    oldPrice: 9000,
    badge: 'Sale',
    description: 'Lightweight smoothing serum that tames flyaways and adds a glass-like finish to straight and pressed styles.',
    longDescription: 'Say goodbye to frizz with this ultralight, silicone-free smoothing serum. Powered by argan oil and fermented rice water, it coats each strand in a protective micro-layer that blocks humidity while allowing hair to move freely. Perfect as a finishing touch after a silk press, blow-dry, or flat-iron session.',
    image: '/assets/images/shop/products/anti-frizz-serum.webp',
    gallery: [
      '/assets/images/shop/products/anti-frizz-serum.webp',
    ],
    stock: 28,
    featured: false,
    variants: null,
    benefits: ['Silicone-free', 'Humidity shield', 'Glass-like finish', 'Lightweight formula'],
  },
  {
    id: 'velour-scalp-detox-oil',
    slug: 'velour-scalp-detox-oil',
    name: 'Velour Scalp Detox Oil',
    category: 'oils-serums',
    price: 8000,
    oldPrice: null,
    badge: null,
    description: 'Cooling, tingling scalp oil with tea tree and peppermint to cleanse follicles and soothe irritation.',
    longDescription: 'Give your scalp the reset it deserves. This refreshing, antimicrobial scalp oil combines tea tree, peppermint, and eucalyptus oils with witch hazel to dissolve build-up, soothe itchiness, and stimulate blood flow. The cooling sensation provides instant relief for tight braids, weave installations, and protective styles.',
    image: '/assets/images/shop/products/scalp-detox-oil.webp',
    gallery: [
      '/assets/images/shop/products/scalp-detox-oil.webp',
    ],
    stock: 22,
    featured: false,
    variants: null,
    benefits: ['Cooling sensation', 'Antimicrobial', 'Soothes irritation', 'Stimulates blood flow'],
  },

  // ─── TREATMENTS (4 products) ──────────────────────────────
  {
    id: 'velour-deep-repair-mask',
    slug: 'velour-deep-repair-mask',
    name: 'Velour Deep Repair Mask',
    category: 'treatments',
    price: 11000,
    oldPrice: null,
    badge: 'Best Seller',
    description: 'Salon-grade reconstructive hair mask that reverses heat damage, chemical stress, and breakage in one session.',
    longDescription: 'Transform damaged, brittle hair in a single 30-minute session. This ultra-rich reconstructive mask combines keratin protein, amino acids, and hyaluronic acid to rebuild broken bonds and fill in gaps in the hair cuticle. The result is visibly stronger, shinier, and more elastic hair from the very first use. A professional-grade formula made accessible for home use.',
    image: '/assets/images/shop/products/deep-repair-mask.webp',
    gallery: [
      '/assets/images/shop/products/deep-repair-mask.webp',
      '/assets/images/shop/products/deep-repair-mask-2.webp',
    ],
    stock: 16,
    featured: true,
    variants: [
      { label: '250g', price: 11000 },
      { label: '500g', price: 18500 },
    ],
    benefits: ['Keratin protein', 'Reverses heat damage', 'Rebuilds bonds', 'Professional grade'],
  },
  {
    id: 'velour-protein-treatment',
    slug: 'velour-protein-treatment',
    name: 'Velour Protein Treatment',
    category: 'treatments',
    price: 8500,
    oldPrice: null,
    badge: null,
    description: 'Bi-weekly protein boost for over-processed and colour-treated hair. Strengthens from cortex to cuticle.',
    longDescription: 'A strategic protein treatment designed for bi-weekly use. The formula delivers hydrolyzed wheat and silk proteins down to the cortex level, reinforcing hair structure from the inside out. Ideal for hair that has been repeatedly relaxed, coloured, or heat-styled. Maintains the perfect moisture-protein balance to prevent both breakage and brittleness.',
    image: '/assets/images/shop/products/protein-treatment.webp',
    gallery: [
      '/assets/images/shop/products/protein-treatment.webp',
    ],
    stock: 25,
    featured: false,
    variants: null,
    benefits: ['Cortex-level repair', 'Bi-weekly use', 'Protein-moisture balance', 'Prevents breakage'],
  },
  {
    id: 'velour-bond-repair-system',
    slug: 'velour-bond-repair-system',
    name: 'Velour Bond Repair System',
    category: 'treatments',
    price: 22000,
    oldPrice: 28000,
    badge: 'Sale',
    description: 'Professional 3-step bond repair kit: primer, bonder, and sealer. Salon results at home.',
    longDescription: 'Our most advanced treatment system — a professional-grade 3-step kit that repairs broken disulfide bonds caused by chemical and thermal processing. Step 1: the Primer prepares hair by opening the cuticle. Step 2: the Bonder rebuilds internal bonds with bis-aminopropyl diglycol dimaleate. Step 3: the Sealer locks in the repair and adds surface shine. One kit provides 4-6 full treatments.',
    image: '/assets/images/shop/products/bond-repair-kit.webp',
    gallery: [
      '/assets/images/shop/products/bond-repair-kit.webp',
      '/assets/images/shop/products/bond-repair-kit-2.webp',
    ],
    stock: 8,
    featured: true,
    variants: null,
    benefits: ['3-step professional system', 'Rebuilds disulfide bonds', '4-6 treatments per kit', 'Salon-grade formula'],
  },
  {
    id: 'velour-hot-oil-capsules',
    slug: 'velour-hot-oil-capsules',
    name: 'Velour Hot Oil Capsules',
    category: 'treatments',
    price: 5500,
    oldPrice: null,
    badge: 'New',
    description: 'Single-use capsules filled with heated oil blend for a quick, mess-free deep treatment in 15 minutes.',
    longDescription: 'Salon-quality hot oil treatments without the mess. Each capsule contains a pre-measured dose of our proprietary warm oil blend (olive, avocado, and vitamin E). Simply warm the capsule under hot water, snip, apply, and wrap for 15 minutes. The single-use format ensures fresh, potent oil every time — no preservatives needed.',
    image: '/assets/images/shop/products/hot-oil-capsules.webp',
    gallery: [
      '/assets/images/shop/products/hot-oil-capsules.webp',
    ],
    stock: 50,
    featured: false,
    variants: [
      { label: '6 Capsules', price: 5500 },
      { label: '12 Capsules', price: 9500 },
    ],
    benefits: ['Single-use capsules', '15-minute treatment', 'No-mess application', 'Preservative-free'],
  },

  // ─── STYLING TOOLS (3 products) ───────────────────────────
  {
    id: 'velour-heat-shield-spray',
    slug: 'velour-heat-shield-spray',
    name: 'Velour Heat Shield Spray',
    category: 'styling-tools',
    price: 7500,
    oldPrice: null,
    badge: null,
    description: 'Professional heat protectant spray that shields hair up to 230°C while adding lightweight hold and shine.',
    longDescription: 'A must-have for any heat styling routine. This fine-mist spray creates an invisible thermal barrier that protects hair up to 230°C (450°F). Infused with ceramides and panthenol, it not only shields from heat damage but also adds a lightweight hold and polished finish. Quick-drying and non-sticky — never leaves hair crunchy or stiff.',
    image: '/assets/images/shop/products/heat-shield-spray.webp',
    gallery: [
      '/assets/images/shop/products/heat-shield-spray.webp',
    ],
    stock: 35,
    featured: false,
    variants: null,
    benefits: ['230°C protection', 'Quick-drying', 'Non-sticky formula', 'Ceramide enriched'],
  },
  {
    id: 'velour-edge-perfector',
    slug: 'velour-edge-perfector',
    name: 'Velour Edge Perfector',
    category: 'styling-tools',
    price: 4500,
    oldPrice: null,
    badge: 'Best Seller',
    description: 'Strong-hold, flake-free edge control with a satin finish. Lasts all day, washes out easily.',
    longDescription: 'Get glass-smooth, laid edges that last from morning to night. Our Edge Perfector delivers extra-strong hold without the white flakes, crunchiness, or build-up. The satin-finish formula adds a subtle sheen that photographs beautifully. Formulated with beeswax, castor oil, and biotin to nourish edges while laying them flat.',
    image: '/assets/images/shop/products/edge-perfector.webp',
    gallery: [
      '/assets/images/shop/products/edge-perfector.webp',
    ],
    stock: 40,
    featured: true,
    variants: null,
    benefits: ['Extra-strong hold', 'Flake-free', 'Satin finish', 'Nourishes edges'],
  },
  {
    id: 'velour-curl-defining-mousse',
    slug: 'velour-curl-defining-mousse',
    name: 'Velour Curl Defining Mousse',
    category: 'styling-tools',
    price: 6000,
    oldPrice: null,
    badge: null,
    description: 'Alcohol-free volumizing mousse that defines curls with flexible hold and zero crunch.',
    longDescription: 'Amplify your natural texture with this airy, alcohol-free mousse. It lifts roots for volume, defines individual curls, and sets styles with a flexible, touchable hold. Enhanced with rice protein for strengthening and glycerin for moisture, it works beautifully on wash-and-go styles, roller sets, and diffused looks.',
    image: '/assets/images/shop/products/curl-mousse.webp',
    gallery: [
      '/assets/images/shop/products/curl-mousse.webp',
    ],
    stock: 32,
    featured: false,
    variants: null,
    benefits: ['Alcohol-free', 'Flexible hold', 'Zero crunch', 'Root volume'],
  },

  // ─── ACCESSORIES (3 products) ─────────────────────────────
  {
    id: 'velour-silk-bonnet',
    slug: 'velour-silk-bonnet',
    name: 'Velour Silk Sleep Bonnet',
    category: 'accessories',
    price: 5000,
    oldPrice: null,
    badge: null,
    description: 'Pure mulberry silk bonnet with adjustable elastic band. Protects styles overnight while preventing breakage.',
    longDescription: 'Sleep your way to healthier hair. Our 100% Grade 6A mulberry silk bonnet reduces friction by up to 43% compared to cotton, protecting your style and preventing moisture loss overnight. The adjustable elastic band fits all head sizes comfortably. Available in our signature plum and gold colourway.',
    image: '/assets/images/shop/products/silk-bonnet.webp',
    gallery: [
      '/assets/images/shop/products/silk-bonnet.webp',
    ],
    stock: 45,
    featured: false,
    variants: [
      { label: 'Standard', price: 5000 },
      { label: 'Jumbo', price: 6500 },
    ],
    benefits: ['100% mulberry silk', '43% less friction', 'Adjustable fit', 'Preserves styles'],
  },
  {
    id: 'velour-wide-tooth-comb',
    slug: 'velour-wide-tooth-comb',
    name: 'Velour Wide-Tooth Comb',
    category: 'accessories',
    price: 3500,
    oldPrice: null,
    badge: null,
    description: 'Handcrafted sandalwood wide-tooth comb for gentle detangling with zero static and a natural scent.',
    longDescription: 'A detangling tool as luxurious as your hair products. Hand-carved from sustainably sourced sandalwood, this wide-tooth comb glides through wet and dry hair without snagging or creating static. The natural oils in the wood reduce friction, and the subtle sandalwood scent adds a spa-like element to your routine. Comes in a Velour-branded linen pouch.',
    image: '/assets/images/shop/products/wide-tooth-comb.webp',
    gallery: [
      '/assets/images/shop/products/wide-tooth-comb.webp',
    ],
    stock: 55,
    featured: false,
    variants: null,
    benefits: ['Sandalwood crafted', 'Anti-static', 'Gentle detangling', 'Includes linen pouch'],
  },
  {
    id: 'velour-satin-scrunchie-set',
    slug: 'velour-satin-scrunchie-set',
    name: 'Velour Satin Scrunchie Set',
    category: 'accessories',
    price: 4000,
    oldPrice: null,
    badge: 'New',
    description: 'Set of 4 premium satin scrunchies in Velour signature colours. Snag-free, gentle on all hair types.',
    longDescription: 'Upgrade your ponytail game with these premium satin scrunchies. Each set includes 4 scrunchies in our signature palette — plum, gold, cream, and rose. The satin fabric eliminates friction-based breakage, while the soft elastic holds securely without leaving dents. Beautiful enough to wear on your wrist as a bracelet between hair duties.',
    image: '/assets/images/shop/products/satin-scrunchies.webp',
    gallery: [
      '/assets/images/shop/products/satin-scrunchies.webp',
    ],
    stock: 60,
    featured: false,
    variants: null,
    benefits: ['Set of 4', 'Signature colours', 'Snag-free satin', 'No-dent elastic'],
  },

  // ─── MERCH & GIFTS (2 products) ──────────────────────────
  {
    id: 'velour-starter-bundle',
    slug: 'velour-starter-bundle',
    name: 'Velour Starter Bundle',
    category: 'merch',
    price: 25000,
    oldPrice: 35000,
    badge: 'Value Pack',
    description: 'Everything you need to start your Velour journey: Shampoo, Conditioner, Gold Elixir Oil, and Silk Bonnet.',
    longDescription: 'The perfect introduction to the Velour line — and an even more perfect gift. This curated bundle includes our Hydra Shampoo (250ml), Silk Conditioner (250ml), Gold Elixir Oil (30ml), and Silk Sleep Bonnet. Packaged in a beautiful Velour gift box with a personalizable card. Save over ₦10,000 compared to buying separately.',
    image: '/assets/images/shop/products/starter-bundle.webp',
    gallery: [
      '/assets/images/shop/products/starter-bundle.webp',
      '/assets/images/shop/products/starter-bundle-2.webp',
    ],
    stock: 12,
    featured: true,
    variants: null,
    benefits: ['4 products included', 'Gift-ready packaging', 'Save ₦10,000+', 'Personalizable card'],
  },
  {
    id: 'velour-gift-card',
    slug: 'velour-gift-card',
    name: 'Velour Gift Card',
    category: 'merch',
    price: 10000,
    oldPrice: null,
    badge: null,
    description: 'Digital gift card redeemable for any Velour products or salon services. The gift of beautiful hair.',
    longDescription: 'Give the gift of Velour. Our digital gift cards are delivered instantly via email and can be redeemed for any product in our online store or any service at our salon branches. Available in multiple denominations. Each card comes with a beautiful digital envelope design and a space for a personal message.',
    image: '/assets/images/shop/products/gift-card.webp',
    gallery: [
      '/assets/images/shop/products/gift-card.webp',
    ],
    stock: 999,
    featured: false,
    variants: [
      { label: '₦10,000', price: 10000 },
      { label: '₦20,000', price: 20000 },
      { label: '₦50,000', price: 50000 },
      { label: '₦100,000', price: 100000 },
    ],
    benefits: ['Instant delivery', 'Redeemable in-store & online', 'Multiple denominations', 'Personal message'],
  },
];

/* ─── Helper functions for product data access ─────────────── */

/**
 * Get all products
 */
function getAllProducts() {
  return PRODUCTS;
}

/**
 * Get a single product by its slug
 */
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

/**
 * Get a single product by its id
 */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

/**
 * Get all products in a given category
 */
function getProductsByCategory(categorySlug) {
  return PRODUCTS.filter(p => p.category === categorySlug);
}

/**
 * Get only featured products
 */
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

/**
 * Get all unique categories present in the current product list
 */
function getActiveCategories() {
  const activeSlugs = [...new Set(PRODUCTS.map(p => p.category))];
  return PRODUCT_CATEGORIES.filter(c => activeSlugs.includes(c.slug));
}

/**
 * Search products by name (case-insensitive)
 */
function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}

/**
 * Sort products by a given key
 * @param {Array} products
 * @param {'newest'|'price-asc'|'price-desc'|'featured'} sortKey
 */
function sortProducts(products, sortKey) {
  const sorted = [...products];
  switch (sortKey) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'featured':
      sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
    case 'newest':
    default:
      // Products are in newest-first order by default in the array
      break;
  }
  return sorted;
}

/**
 * Format a price in Naira (₦)
 * @param {number} amount - Price in Naira (not kobo)
 */
function formatPrice(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

/**
 * Get related products (same category, excluding current)
 * @param {string} productId
 * @param {number} limit
 */
function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}
