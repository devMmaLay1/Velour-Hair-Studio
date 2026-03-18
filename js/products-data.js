/* ═══════════════════════════════════════════════════════════════
   VELOUR — Shared product catalogue
   Imported by shop.js and product.js
   ═══════════════════════════════════════════════════════════════ */

const PRODUCTS = [
  // ── Shampoo ──
  {
    id: 1, category: 'shampoo', name: 'Moisture Surge Shampoo',
    price: 8500, badge: 'Bestseller',
    desc: 'Sulphate-free deep cleanse that restores moisture balance without stripping natural oils.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 2, category: 'shampoo', name: 'Scalp Refresh Shampoo',
    price: 7200, badge: null,
    desc: 'Menthol-infused formula that clears buildup and soothes an irritated scalp.',
    img: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 3, category: 'shampoo', name: 'Protein Repair Shampoo',
    price: 9000, badge: 'New',
    desc: 'Keratin-enriched cleanser that rebuilds strength in chemically treated or heat-damaged hair.',
    img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
    ],
  },
  // ── Conditioner ──
  {
    id: 4, category: 'conditioner', name: 'Silk Detangling Conditioner',
    price: 9500, badge: 'Bestseller',
    desc: 'Slip-rich formula that melts through knots and leaves hair impossibly soft.',
    img: 'https://images.unsplash.com/photo-1631390093888-b5e5e1e5e1e1?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1631390093888-b5e5e1e5e1e1?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 5, category: 'conditioner', name: 'Deep Moisture Masque',
    price: 12000, badge: null,
    desc: 'Intensive weekly treatment packed with shea butter and argan oil for maximum hydration.',
    img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1631390093888-b5e5e1e5e1e1?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 6, category: 'conditioner', name: 'Leave-In Cream',
    price: 7800, badge: 'New',
    desc: 'Lightweight daily leave-in that seals moisture, reduces frizz, and primes for styling.',
    img: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=900',
    ],
  },
  // ── Oils ──
  {
    id: 7, category: 'oils', name: 'Velour Signature Hair Oil',
    price: 15000, badge: 'Bestseller',
    desc: 'Our house blend of baobab, rosehip, and castor oils. Seals, shines, and strengthens.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 8, category: 'oils', name: 'Scalp Nourishing Oil',
    price: 11000, badge: null,
    desc: 'Peppermint and tea tree blend that stimulates the scalp and encourages healthy growth.',
    img: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 9, category: 'oils', name: 'Argan Finishing Serum',
    price: 13500, badge: 'New',
    desc: 'A few drops deliver mirror-like shine and tame flyaways without weighing hair down.',
    img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=900',
    ],
  },
  // ── Tools ──
  {
    id: 10, category: 'tools', name: 'Wide-Tooth Detangling Comb',
    price: 4500, badge: null,
    desc: 'Seamless, anti-static comb designed for wet detangling with zero breakage.',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 11, category: 'tools', name: 'Satin-Lined Bonnet',
    price: 6000, badge: 'Bestseller',
    desc: 'Protect your style overnight. Adjustable band, double-layered satin lining.',
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 12, category: 'tools', name: 'Microfibre Hair Towel',
    price: 5500, badge: null,
    desc: 'Ultra-absorbent, friction-free drying that cuts dry time and prevents frizz.',
    img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 13, category: 'tools', name: 'Boar Bristle Brush',
    price: 8000, badge: null,
    desc: 'Distributes natural oils from root to tip for a smooth, polished finish.',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
    ],
  },
  // ── Merch ──
  {
    id: 14, category: 'merch', name: 'Velour Tote Bag',
    price: 7500, badge: null,
    desc: 'Heavy canvas tote with the Velour wordmark. Carry your essentials in style.',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 15, category: 'merch', name: 'Studio Hoodie',
    price: 25000, badge: 'Limited',
    desc: 'Heavyweight cotton fleece in plum. Embroidered Velour logo on the chest.',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=900',
    ],
  },
  {
    id: 16, category: 'merch', name: 'Velour Gift Card',
    price: 20000, badge: 'Gift',
    desc: 'Give the gift of a great hair day. Redeemable for any service or product.',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600',
    imgs: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&q=80&w=900',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=900',
    ],
  },
];
