import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products } from '../data/products';
import { CATEGORIES } from '../config';
import { ProductGrid } from '../components/ProductCard';
import { useTitle } from '../lib';
const SORTS = { featured: 'Featured', newest: 'Newest', 'price-asc': 'Price: Low to High', 'price-desc': 'Price: High to Low' };
export default function Shop() {
  useTitle('Shop');
  const [sp, setSp] = useSearchParams();
  const cat = sp.get('cat') || 'all', q = sp.get('q') || '', sort = sp.get('sort') || 'featured';
  const set = (k, v) => { const n = new URLSearchParams(sp); if (v && v !== 'all' && v !== 'featured') n.set(k, v); else n.delete(k); setSp(n, { replace: true }); };
  let list = products.filter((p) => (cat === 'all' || (cat === 'new' ? p.newArrival : p.category === cat)) && (!q || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q.toLowerCase())));
  list = [...list].sort({ featured: (a, b) => b.featured - a.featured, newest: (a, b) => b.newArrival - a.newArrival, 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price }[sort] || (() => 0));
  return (
    <div className="px-5 md:px-10 pt-10 pb-4">
      <h1 className="display text-6xl md:text-[9vw]">SHOP SLOTH</h1>
      <div className="mt-8 flex gap-2 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 pb-1" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => <button key={c.key} aria-pressed={cat === c.key} onClick={() => set('cat', c.key)} className={`shrink-0 min-h-11 px-5 text-xs font-bold tracking-[.18em] border transition-colors ${cat === c.key ? 'bg-ink text-off border-ink' : 'border-ink/25 hover:border-ink'}`}>{c.label}</button>)}
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="relative sm:w-80"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" /><input type="search" aria-label="Search products" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search" className="w-full min-h-11 pl-9 pr-3 bg-transparent border border-ink/25" /></div>
        <div className="flex items-center gap-3"><p className="text-sm text-ink/60" aria-live="polite">{list.length} {list.length === 1 ? 'product' : 'products'}</p>
          <select aria-label="Sort" value={sort} onChange={(e) => set('sort', e.target.value)} className="min-h-11 px-3 bg-transparent border border-ink/25 text-sm">{Object.entries(SORTS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
      </div>
      <div className="mt-8">{list.length ? <ProductGrid list={list} /> : <p className="py-24 text-center">Nothing matches. Clear your filters and try again.</p>}</div>
    </div>
  );
}
