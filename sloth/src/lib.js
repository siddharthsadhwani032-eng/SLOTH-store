import { useEffect } from 'react';
export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
// Placeholder image generator. Replace with real image URLs in data/products.js
export const ph = (label, bg = '#d9d8d3', fg = '#8a8984') =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'><rect width='800' height='1000' fill='${bg}'/><text x='400' y='510' fill='${fg}' font-family='sans-serif' font-weight='700' font-size='34' text-anchor='middle' letter-spacing='10'>${label}</text></svg>`);
export function useTitle(t) {
  useEffect(() => { document.title = t ? `${t} — SLOTH` : 'SLOTH — Premium Streetwear & Oversized Clothing'; }, [t]);
}
