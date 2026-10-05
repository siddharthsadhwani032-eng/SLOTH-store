import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '../store';
import { inr } from '../lib';
export default function ProductCard({ p }) {
  const { add, wish, toggleWish } = useStore();
  const [quick, setQuick] = useState(false);
  const liked = wish.includes(p.id);
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <Link to={`/product/${p.id}`} aria-label={p.name}>
          <img src={p.images[0]} alt={p.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
          <img src={p.images[1] || p.images[0]} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-0 transition duration-700 group-hover:opacity-100 group-hover:scale-105" />
        </Link>
        {p.newArrival && <span className="absolute top-3 left-3 bg-ink text-off text-[10px] font-bold tracking-[.2em] px-2 py-1">NEW</span>}
        <button onClick={() => toggleWish(p.id)} aria-pressed={liked} aria-label={liked ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`} className="absolute top-1 right-1 size-11 grid place-items-center">
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-2">
          {quick ? (
            <div className="bg-off p-2 fade-up" onMouseLeave={() => setQuick(false)}>
              <p className="text-[10px] font-bold tracking-[.2em] mb-2">SELECT SIZE</p>
              <div className="flex flex-wrap gap-1">{p.sizes.map((s) => <button key={s} onClick={() => { add(p.id, s, p.colors[0].name); setQuick(false); }} className="min-w-10 min-h-10 border border-ink/25 text-xs font-bold hover:bg-ink hover:text-off">{s}</button>)}</div>
            </div>
          ) : (
            <button onClick={() => setQuick(true)} className="w-full min-h-11 bg-off/95 text-[11px] font-bold tracking-[.2em] md:translate-y-14 md:group-hover:translate-y-0 transition-transform duration-300 hover:bg-ink hover:text-off">QUICK ADD</button>
          )}
        </div>
      </div>
      <div className="pt-3 flex justify-between gap-3 items-start">
        <div>
          <h3 className="text-[13px] font-bold tracking-wide leading-snug"><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
          <div className="flex gap-1.5 mt-2" aria-label="Available colours">{p.colors.map((c) => <span key={c.name} title={c.name} className="size-3 border border-ink/30" style={{ background: c.hex }} />)}</div>
        </div>
        <p className="text-sm font-bold whitespace-nowrap">{inr(p.price)}</p>
      </div>
    </article>
  );
}
export const ProductGrid = ({ list, cols = 'lg:grid-cols-4' }) => (
  <div className={`grid grid-cols-2 ${cols} gap-x-3 gap-y-9 md:gap-x-5`}>{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
);
