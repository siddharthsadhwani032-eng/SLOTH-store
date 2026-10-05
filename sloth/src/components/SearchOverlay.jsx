import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products } from '../data/products';
import { inr } from '../lib';
export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  useEffect(() => { if (open) setQ(''); }, [open]);
  if (!open) return null;
  const res = q.trim() ? products.filter((p) => (p.name + ' ' + p.category).toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : [];
  return (
    <div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[60] bg-off overflow-auto fade-up" onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <div className="max-w-3xl mx-auto px-5 pt-6">
        <div className="flex items-center gap-3 border-b-2 border-ink">
          <Search /><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search SLOTH" aria-label="Search products" className="flex-1 py-4 bg-transparent text-2xl font-bold outline-none" />
          <button aria-label="Close search" onClick={onClose} className="size-11 grid place-items-center"><X /></button>
        </div>
        <ul className="mt-4">
          {res.map((p) => <li key={p.id}><Link onClick={onClose} to={`/product/${p.id}`} className="flex items-center gap-4 py-3 border-b border-ink/10"><img src={p.images[0]} alt="" className="w-14 aspect-[4/5] object-cover" /><span className="flex-1 text-sm font-bold">{p.name}</span><span className="text-sm">{inr(p.price)}</span></Link></li>)}
        </ul>
        {q.trim() && !res.length && <p className="py-8 text-sm text-ink/60">No results for “{q}”. Try “hoodie” or “tee”.</p>}
        {q.trim() && <Link onClick={onClose} to={`/shop?q=${encodeURIComponent(q.trim())}`} className="inline-block mt-6 text-xs font-bold tracking-[.2em] underline underline-offset-4">SEE ALL RESULTS</Link>}
      </div>
    </div>
  );
}
