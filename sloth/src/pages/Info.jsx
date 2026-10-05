import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Button } from '../components/ui';
import CollectionCard from '../components/CollectionCard';
import { BRAND, FREE_SHIPPING_THRESHOLD, SIZE_GUIDE } from '../config';
import { inr, useTitle } from '../lib';
const Page = ({ title, children }) => { useTitle(title); return (<div className="px-5 md:px-10 pt-10 max-w-5xl"><h1 className="display text-6xl md:text-[8vw]">{title}</h1><div className="mt-10 space-y-5 leading-relaxed max-w-2xl">{children}</div></div>); };
const H = ({ children }) => <h2 className="text-xs font-bold tracking-[.2em] pt-4">{children}</h2>;
const Draft = () => <p className="text-xs border border-ink/30 p-3">DRAFT: have a lawyer review this before launch and fill in your registered business details.</p>;
export function Collections() {
  useTitle('Collections');
  const c = [['OVERSIZED TEES', 'tshirts'], ['HOODIES', 'hoodies'], ['SWEATSHIRTS', 'sweatshirts'], ['BOTTOMS', 'bottoms'], ['NEW ARRIVALS', 'new']];
  return <div className="px-5 md:px-10 pt-10"><h1 className="display text-6xl md:text-[9vw]">COLLECTIONS</h1><div className="grid md:grid-cols-2 gap-3 mt-8">{c.map(([l, k]) => <CollectionCard key={k} label={l} cat={k} className="aspect-[4/3]" />)}</div></div>;
}
export const About = () => (<Page title="ABOUT"><p className="text-2xl font-bold leading-snug">SLOTH is modern streetwear built around comfort. Oversized fits, minimal design, everyday wear.</p><p>We make pieces for slow mornings, late nights and city walks. Stay slow. Move different.</p><Button as={Link} to="/shop">SHOP SLOTH</Button></Page>);
export function Contact() {
  const [sent, setSent] = useState(false);
  return (<Page title="CONTACT"><p>Questions about an order, sizing or a drop? Write to <a className="underline" href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or use the form.</p>
    {/* TODO: POST this form to a serverless route or form service (Formspree, Resend, etc). */}
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
      {[['name', 'Name', 'text'], ['email', 'Email', 'email']].map(([n, l, t]) => <div key={n}><label htmlFor={`c-${n}`} className="block text-xs font-bold tracking-[.18em] mb-1.5">{l.toUpperCase()}</label><input id={`c-${n}`} type={t} required className="w-full min-h-12 px-3 bg-transparent border border-ink/30" /></div>)}
      <div><label htmlFor="c-msg" className="block text-xs font-bold tracking-[.18em] mb-1.5">MESSAGE</label><textarea id="c-msg" rows={5} required className="w-full px-3 py-2 bg-transparent border border-ink/30" /></div>
      <Button type="submit">SEND</Button>{sent && <p role="status" className="text-sm">Form is not connected to a backend yet. Please email us directly.</p>}
    </form></Page>);
}
export const FAQ = () => (<Page title="FAQ"><Accordion items={[
  { title: 'HOW DO I FIND MY SIZE?', body: <>Use the size guide on every product page. SLOTH fits are oversized, so size down if you prefer a closer fit.</> },
  { title: 'WHEN WILL MY ORDER ARRIVE?', body: 'Delivery timelines are shown at checkout. See Shipping & Returns.' },
  { title: 'CAN I PAY ON DELIVERY?', body: 'Payment options are shown at checkout.' },
  { title: 'HOW DO I TRACK MY ORDER?', body: `Contact us at ${BRAND.email} with your order number.` }]} /></Page>);
export const Shipping = () => (<Page title="SHIPPING & RETURNS"><Draft /><H>SHIPPING</H><p>Free shipping on orders above {inr(FREE_SHIPPING_THRESHOLD)}. Delivery times and charges for other orders are shown at checkout. [Add your confirmed timelines.]</p><H>RETURNS & EXCHANGES</H><p>[Add your return window, conditions and process here.]</p>
  <H>SIZE GUIDE</H><div id="size-guide"><p className="text-xs text-ink/60 mb-3">{SIZE_GUIDE.note}</p><table className="w-full text-sm"><thead><tr>{SIZE_GUIDE.cols.map((c) => <th key={c} className="text-left py-2 border-b border-ink">{c}</th>)}</tr></thead><tbody>{SIZE_GUIDE.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className="py-2 border-b border-ink/10">{c}</td>)}</tr>)}</tbody></table></div></Page>);
export const Privacy = () => (<Page title="PRIVACY POLICY"><Draft /><H>WHAT WE COLLECT</H><p>Details you give us at checkout or by email: name, email, phone number and delivery address.</p><H>HOW WE USE IT</H><p>To process and deliver orders, answer questions and, if you opt in, send updates.</p><H>THIRD PARTIES</H><p>List your payment, fulfilment and analytics providers here once connected.</p><H>CONTACT</H><p>{BRAND.email}</p></Page>);
export const Terms = () => (<Page title="TERMS & CONDITIONS"><Draft /><H>ORDERS</H><p>All orders are subject to availability and acceptance.</p><H>PRICING</H><p>Prices are in Indian Rupees (₹).</p><H>SHIPPING & RETURNS</H><p>See the Shipping & Returns page.</p><H>CONTACT</H><p>{BRAND.email}</p></Page>);
