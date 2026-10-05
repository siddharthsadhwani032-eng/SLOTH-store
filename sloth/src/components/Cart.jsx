import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useStore } from '../store';
import { FREE_SHIPPING_THRESHOLD } from '../config';
import { inr } from '../lib';
import { Button } from './ui';
export function CartItem({ i }) {
  const { setQty, remove } = useStore();
  const b = 'size-10 grid place-items-center border border-ink/25';
  return (
    <li className="flex gap-4 py-5 border-b border-ink/10">
      <Link to={`/product/${i.p.id}`}><img src={i.p.images[0]} alt={i.p.name} className="w-20 aspect-[4/5] object-cover bg-mist" /></Link>
      <div className="flex-1 text-sm">
        <div className="flex justify-between gap-2"><p className="font-bold leading-snug">{i.p.name}</p><button aria-label={`Remove ${i.p.name}`} onClick={() => remove(i.k)} className="size-8 grid place-items-center -mt-1 -mr-2"><X size={16} /></button></div>
        <p className="text-ink/60 mt-1">Size {i.size} · {i.color}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center"><button className={b} aria-label="Decrease quantity" onClick={() => setQty(i.k, i.qty - 1)}><Minus size={14} /></button><span className="w-10 text-center font-bold" aria-live="polite">{i.qty}</span><button className={b} aria-label="Increase quantity" onClick={() => setQty(i.k, i.qty + 1)}><Plus size={14} /></button></div>
          <p className="font-bold">{inr(i.p.price * i.qty)}</p>
        </div>
      </div>
    </li>
  );
}
export function Summary({ cta = true, onNavigate }) {
  const { subtotal, shipping, total, items } = useStore();
  const nav = useNavigate();
  const left = FREE_SHIPPING_THRESHOLD - subtotal;
  return (
    <div className="text-sm">
      <p className="text-xs font-bold tracking-[.2em] mb-4">{left > 0 ? `ADD ${inr(left)} MORE FOR FREE SHIPPING` : 'FREE SHIPPING UNLOCKED'}</p>
      <dl className="space-y-2">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
        <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping ? inr(shipping) : 'Free'}</dd></div>
        <div className="flex justify-between text-base font-black pt-3 border-t border-ink/15"><dt>Total</dt><dd>{inr(total)}</dd></div>
      </dl>
      <p className="text-xs text-ink/60 mt-3">FREE SHIPPING ABOVE {inr(FREE_SHIPPING_THRESHOLD)}</p>
      {cta && <Button disabled={!items.length} onClick={() => { onNavigate?.(); nav('/checkout'); }} className="w-full mt-5">PROCEED TO CHECKOUT</Button>}
    </div>
  );
}
export function CartDrawer() {
  const { drawer, setDrawer, items } = useStore();
  if (!drawer) return null;
  return (
    <div className="fixed inset-0 z-50" onKeyDown={(e) => e.key === 'Escape' && setDrawer(false)}>
      <div className="absolute inset-0 bg-ink/50" onClick={() => setDrawer(false)} />
      <aside role="dialog" aria-modal="true" aria-label="Cart" className="drawer absolute right-0 top-0 h-full w-full max-w-md bg-off flex flex-col">
        <div className="flex justify-between items-center px-5 h-16 border-b border-ink/10"><h2 className="text-xs font-bold tracking-[.2em]">YOUR CART</h2><button autoFocus aria-label="Close cart" onClick={() => setDrawer(false)} className="size-11 grid place-items-center -mr-3"><X /></button></div>
        <div className="flex-1 overflow-auto px-5">
          {items.length ? <ul>{items.map((i) => <CartItem key={i.k} i={i} />)}</ul> : (
            <div className="py-20 text-center"><p className="display text-5xl">EMPTY</p><p className="text-sm mt-4 text-ink/60">Nothing here yet.</p><Button as={Link} to="/shop" onClick={() => setDrawer(false)} className="mt-6">SHOP NOW</Button></div>
          )}
        </div>
        {items.length > 0 && <div className="p-5 border-t border-ink/10"><Summary onNavigate={() => setDrawer(false)} /><Link to="/cart" onClick={() => setDrawer(false)} className="block text-center text-xs font-bold tracking-[.2em] mt-4 underline underline-offset-4">VIEW FULL CART</Link></div>}
      </aside>
    </div>
  );
}
