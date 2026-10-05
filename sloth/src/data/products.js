// ===== PRODUCT DATA: replace with real products or load from services/quikink.js =====
// Swap `images` for real URLs (e.g. '/products/core-tee-1.jpg' inside /public, or a CDN).
import { ph } from '../lib';
export const COLORS = {
  black: { name: 'Black', hex: '#111111' }, off: { name: 'Off White', hex: '#ecebe5' },
  char: { name: 'Charcoal', hex: '#3b3b3b' }, ash: { name: 'Ash Grey', hex: '#9d9d99' },
};
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const mk = (id, name, price, category, cols, d, o = {}) => ({
  id, name, price, category,
  // Replace this placeholder with the exact SKU from Qikink > My Products.
  qikinkSku: o.qikinkSku || '',
  // Optional exact variant map: qikinkSkus[colorName][size] = Qikink SKU.
  qikinkSkus: o.qikinkSkus || {}, description: d, sizes: SIZES, colors: cols.map((c) => COLORS[c]),
  stock: 25, featured: !!o.featured, newArrival: !!o.n, bestseller: !!o.b,
  images: [ph(id.toUpperCase().replaceAll('-', ' '), '#dcdbd6'), ph('SLOTH', '#c9c8c3', '#7c7b76')],
});
export const products = [
  mk('core-oversized-tee', 'SLOTH CORE OVERSIZED TEE', 799, 'tshirts', ['black', 'off', 'ash'], 'Your daily uniform. A relaxed, oversized tee cut to drop off the shoulder.', { featured: 1, n: 1, b: 1 }),
  mk('heavyweight-oversized-tee', 'SLOTH HEAVYWEIGHT OVERSIZED TEE', 999, 'tshirts', ['black', 'off', 'char'], 'A boxier, heavier take on the essential tee. Built for everyday.', { featured: 1, n: 1, b: 1 }),
  mk('signature-hoodie', 'SLOTH SIGNATURE HOODIE', 1699, 'hoodies', ['black', 'char', 'off'], 'The one you reach for first. Oversized fit, clean front, no noise.', { featured: 1, n: 1, b: 1 }),
  mk('everyday-sweatshirt', 'SLOTH EVERYDAY SWEATSHIRT', 1299, 'sweatshirts', ['char', 'off', 'ash'], 'Comfort without compromise. A relaxed crew for slow mornings and late nights.', { featured: 1, n: 1, b: 1 }),
  mk('relaxed-cargo', 'SLOTH RELAXED CARGO', 1499, 'bottoms', ['black', 'char'], 'Relaxed through the leg with room to move. Made for city walks.', { b: 1 }),
  mk('washed-boxy-tee', 'SLOTH WASHED BOXY TEE', 899, 'tshirts', ['ash', 'char'], 'A boxy fit with a lived-in look from day one.', { b: 1 }),
  mk('relaxed-jogger', 'SLOTH RELAXED JOGGER', 1199, 'bottoms', ['black', 'ash'], 'Loose, easy and tapered at the ankle. Your daily bottom.', { b: 1 }),
  mk('zip-hoodie', 'SLOTH ZIP HOODIE', 1799, 'hoodies', ['black', 'off'], 'Full-zip, oversized, layer-ready. Less noise, more you.', { n: 1, b: 1 }),
];
export const byId = (id) => products.find((p) => p.id === id);
