import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { byId, products } from '../data/products';
import { useStore } from '../store';
import { SIZE_GUIDE, MAX_QTY } from '../config';
import { inr, useTitle } from '../lib';
import { Accordion, Button, ColorSelector, Modal, SizeSelector } from '../components/ui';
import { ProductGrid } from '../components/ProductCard';
export default function Product() {
  const { id } = useParams();
  const p = byId(id);
  const { add, seen, recent, wish, toggleWish } = useStore();
  const nav = useNavigate();
  const [img, setImg] = useState(0), [size, setSize] = useState(''), [color, setColor] = useState(p?.colors[0].name), [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false), [err, setErr] = useState('');
  useTitle(p?.name);
  useEffect(() => { setImg(0); setSize(''); setQty(1); setErr(''); setColor(byId(id)?.colors[0].name); if (byId(id)) seen(id); }, [id, seen]);
  if (!p) return <div className="px-5 py-32 text-center"><p className="display text-6xl">NOT FOUND</p><Button as={Link} to="/shop" className="mt-6">BACK TO SHOP</Button></div>;
  const need = () => { if (!size) { setErr('Select a size first.'); return false; } return true; };
  const addCart = () => need() && add(p.id, size, color, qty);
  const buyNow = () => { if (need()) { add(p.id, size, color, qty, false); nav('/checkout'); } };
  const liked = wish.includes(p.id);
  const also = products.filter((x) => x.id !== p.id && x.category === p.category).concat(products.filter((x) => x.id !== p.id && x.category !== p.category)).slice(0, 4);
  const rec = recent.filter((r) => r !== p.id).map(byId).filter(Boolean).slice(0, 4);
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.description, image: p.images, offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price, availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } }; // placeholder: update when real data connected
  return (
    <div className="pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-14 px-0 md:px-10 pt-0 md:pt-8">
        <div className="md:grid md:grid-cols-[72px_1fr] gap-3">
          <div className="hidden md:flex flex-col gap-2">{p.images.map((s, i) => <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} aria-current={img === i} className={`aspect-[4/5] border ${img === i ? 'border-ink' : 'border-transparent'}`}><img src={s} alt="" className="size-full object-cover" /></button>)}</div>
          <div><div className="aspect-[4/5] bg-mist overflow-hidden"><img src={p.images[img]} alt={`${p.name}, view ${img + 1}`} className="size-full object-cover" /></div>
            <div className="flex md:hidden gap-2 p-3">{p.images.map((s, i) => <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={`w-16 aspect-[4/5] border ${img === i ? 'border-ink' : 'border-transparent'}`}><img src={s} alt="" className="size-full object-cover" /></button>)}</div></div>
        </div>
        <div className="px-5 md:px-0 md:sticky md:top-24 md:self-start">
          <p className="text-xs text-ink/60"><Link to="/shop" className="underline">Shop</Link> / {p.category}</p>
          <h1 className="display text-5xl md:text-6xl mt-3">{p.name}</h1>
          <p className="mt-4 text-2xl font-bold">{inr(p.price)}</p>
          <p className="text-xs text-ink/60">Inclusive of taxes where applicable. Confirm before launch.</p>
          <p className="mt-5 max-w-md">{p.description}</p>
          <div className="mt-7"><p className="text-xs font-bold tracking-[.2em] mb-2">COLOUR: {color}</p><ColorSelector colors={p.colors} value={color} onChange={setColor} /></div>
          <div className="mt-6"><div className="flex justify-between mb-2"><p className="text-xs font-bold tracking-[.2em]">SIZE</p><button onClick={() => setGuide(true)} className="text-xs underline underline-offset-4">Size guide</button></div>
            <SizeSelector sizes={p.sizes} value={size} onChange={(s) => { setSize(s); setErr(''); }} /><p role="alert" className="text-sm text-red-700 mt-2 min-h-5">{err}</p></div>
          <div className="mt-4 flex items-center gap-3"><span className="text-xs font-bold tracking-[.2em]">QTY</span>
            <div className="flex items-center"><button aria-label="Decrease quantity" className="size-11 border border-ink/25" onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span className="w-12 text-center font-bold" aria-live="polite">{qty}</span><button aria-label="Increase quantity" className="size-11 border border-ink/25" onClick={() => setQty(Math.min(MAX_QTY, qty + 1))}>+</button></div></div>
          <div className="hidden md:grid gap-3 mt-6"><Button onClick={addCart} disabled={p.stock < 1}>{p.stock < 1 ? 'SOLD OUT' : 'ADD TO CART'}</Button><Button variant="outline" onClick={buyNow} disabled={p.stock < 1}>BUY NOW</Button></div>
          <button onClick={() => toggleWish(p.id)} aria-pressed={liked} className="mt-4 flex items-center gap-2 text-sm min-h-11"><Heart size={18} fill={liked ? 'currentColor' : 'none'} />{liked ? 'Saved to wishlist' : 'Add to wishlist'}</button>
          <div className="mt-8"><Accordion items={[
            { title: 'DESCRIPTION', body: `${p.description} Oversized fit.` },
            { title: 'MATERIAL & CARE', body: 'Fabric composition and care instructions will be listed here once confirmed with your supplier. Edit in pages/Product.jsx or per product in data/products.js.' },
            { title: 'SHIPPING', body: 'Delivery timelines and charges are shown at checkout. See Shipping & Returns for details.' },
            { title: 'RETURNS', body: 'Return and exchange terms are on the Shipping & Returns page.' }]} /></div>
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-off border-t border-ink/10 p-3 grid grid-cols-2 gap-2"><Button onClick={addCart} disabled={p.stock < 1}>ADD TO CART</Button><Button variant="outline" onClick={buyNow} disabled={p.stock < 1}>BUY NOW</Button></div>
      <section className="px-5 md:px-10 mt-20"><h2 className="display text-4xl md:text-6xl mb-6">YOU MAY ALSO LIKE</h2><ProductGrid list={also} /></section>
      {rec.length > 0 && <section className="px-5 md:px-10 mt-16"><h2 className="display text-3xl md:text-4xl mb-6">RECENTLY VIEWED</h2><ProductGrid list={rec} /></section>}
      <Modal open={guide} onClose={() => setGuide(false)} title="Size guide">
        <p className="text-xs text-ink/60 mb-4">{SIZE_GUIDE.note}</p>
        <table className="w-full text-sm"><thead><tr>{SIZE_GUIDE.cols.map((c) => <th key={c} className="text-left py-2 border-b border-ink">{c}</th>)}</tr></thead><tbody>{SIZE_GUIDE.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className="py-2 border-b border-ink/10">{c}</td>)}</tr>)}</tbody></table>
      </Modal>
    </div>
  );
}
