// ===== BRAND & BUSINESS SETTINGS: edit here =====
export const BRAND = {
  name: 'SLOTH',
  tagline: 'STAY SLOW. MOVE DIFFERENT.',
  email: 'hello@yourdomain.com',          // TODO: your support email
  instagram: 'https://instagram.com/',    // TODO: your profile URLs
  instagramHandle: '@SLOTH',
  youtube: 'https://youtube.com/',
  facebook: 'https://facebook.com/',
};
export const FREE_SHIPPING_THRESHOLD = Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD) || 999;
export const SHIPPING_FEE = 79; // TODO: set your real flat rate or use quikink.calculateShipping()
export const MAX_QTY = 10;
export const CATEGORIES = [
  { key: 'all', label: 'ALL' }, { key: 'tshirts', label: 'T-SHIRTS' }, { key: 'hoodies', label: 'HOODIES' },
  { key: 'sweatshirts', label: 'SWEATSHIRTS' }, { key: 'bottoms', label: 'BOTTOMS' }, { key: 'new', label: 'NEW ARRIVALS' },
];
export const SIZE_GUIDE = { note: 'SAMPLE VALUES. Replace with your real measurements before launch.', cols: ['Size', 'Chest (in)'], rows: [['XS', '—'], ['S', '—'], ['M', '—'], ['L', '—'], ['XL', '—'], ['XXL', '—']] };
export const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'];
