import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { STATES } from '../config';
import { inr, useTitle } from '../lib';
import { startPayment } from '../services/integrations';
import { Button } from '../components/ui';
const F = ({ label, name, ...p }) => (<div><label htmlFor={name} className="block text-xs font-bold tracking-[.18em] mb-1.5">{label}</label><input id={name} name={name} required className="w-full min-h-12 px-3 bg-transparent border border-ink/30" {...p} /></div>);
export default function Checkout() {
  useTitle('Checkout');
  const { items, subtotal, shipping, total } = useStore();
  const [method, setMethod] = useState('prepaid'), [msg, setMsg] = useState(''), [busy, setBusy] = useState(false);
  if (!items.length) return <div className="px-5 py-32"><p className="mb-6">Your cart is empty.</p><Button as={Link} to="/shop">SHOP NOW</Button></div>;
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setMsg('');
    const customer = Object.fromEntries(new FormData(e.target));
    const order = { customer, items: items.map((i) => {
      const colorKey = Object.entries(i.p.colors || {}).find(([, c]) => c?.name === i.color)?.[0] || i.color;
      const sku = i.p.qikinkSkus?.[colorKey]?.[i.size] || i.p.qikinkSku;
      return { id: i.id, size: i.size, color: i.color, qty: i.qty, price: i.p.price, sku };
    }), subtotal, shipping, total };
    try {
      const result = await startPayment({ order, method });
      setMsg(`Order placed successfully. Qikink order ID: ${result.orderId ?? 'created'}`);
    } catch (err) {
      setMsg(err.message);
    } finally { setBusy(false); }
  };
  return (
    <div className="px-5 md:px-10 pt-10">
      <h1 className="display text-6xl md:text-[9vw]">CHECKOUT</h1>
      <form onSubmit={submit} className="grid md:grid-cols-[1.4fr_1fr] gap-12 mt-8">
        <div className="space-y-5">
          <fieldset className="grid sm:grid-cols-2 gap-4"><legend className="text-xs font-bold tracking-[.2em] mb-4">CONTACT & DELIVERY</legend>
            <F label="FULL NAME" name="name" autoComplete="name" />
            <F label="EMAIL" name="email" type="email" autoComplete="email" />
            <F label="PHONE (+91)" name="phone" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} title="10-digit Indian mobile number" autoComplete="tel-national" />
            <F label="PIN CODE" name="pin" inputMode="numeric" pattern="[1-9][0-9]{5}" maxLength={6} title="6-digit PIN code" autoComplete="postal-code" />
            <div className="sm:col-span-2"><F label="ADDRESS" name="address" autoComplete="street-address" /></div>
            <F label="CITY" name="city" autoComplete="address-level2" />
            <div><label htmlFor="state" className="block text-xs font-bold tracking-[.18em] mb-1.5">STATE</label><select id="state" name="state" required defaultValue="" className="w-full min-h-12 px-3 bg-transparent border border-ink/30"><option value="" disabled>Select state</option>{STATES.map((s) => <option key={s}>{s}</option>)}</select></div>
          </fieldset>
          <fieldset><legend className="text-xs font-bold tracking-[.2em] mb-4">PAYMENT</legend>
            {[['prepaid', 'Pay online (UPI, cards, netbanking)'], ['cod', 'Cash on delivery']].map(([v, l]) => <label key={v} className={`flex items-center gap-3 p-4 border mb-2 cursor-pointer ${method === v ? 'border-ink' : 'border-ink/25'}`}><input type="radio" name="method" checked={method === v} onChange={() => setMethod(v)} />{l}</label>)}
            {/* PAYMENT GATEWAY MOUNT POINT: render Razorpay/Stripe element or trigger it from startPayment() */}
            <p className="text-xs text-ink/60">COD is connected to Qikink. Online payment needs a payment gateway before launch.</p>
          </fieldset>
        </div>
        <aside className="bg-mist p-6 md:self-start" aria-label="Order summary">
          <h2 className="text-xs font-bold tracking-[.2em] mb-4">ORDER SUMMARY</h2>
          <ul className="space-y-3 text-sm">{items.map((i) => <li key={i.k} className="flex gap-3"><img src={i.p.images[0]} alt="" className="w-14 aspect-[4/5] object-cover" /><div className="flex-1"><p className="font-bold">{i.p.name}</p><p className="text-ink/60">{i.size} · {i.color} · ×{i.qty}</p></div><p>{inr(i.p.price * i.qty)}</p></li>)}</ul>
          <dl className="mt-5 pt-4 border-t border-ink/15 space-y-2 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div><div className="flex justify-between"><dt>Shipping</dt><dd>{shipping ? inr(shipping) : 'Free'}</dd></div><div className="flex justify-between font-black text-base"><dt>Total</dt><dd>{inr(total)}</dd></div></dl>
          <Button type="submit" disabled={busy} className="w-full mt-5">{method === 'cod' ? 'PLACE ORDER' : 'PAY NOW'}</Button>
          <p role="alert" className="text-sm text-red-700 mt-3">{msg}</p>
        </aside>
      </form>
    </div>
  );
}
