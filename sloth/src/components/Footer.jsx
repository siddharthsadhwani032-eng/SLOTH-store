import { Link } from 'react-router-dom';
import { BRAND } from '../config';
import Newsletter from './Newsletter';
const col = (title, links) => (
  <div>
    <h3 className="text-xs font-bold tracking-[.2em] mb-4 text-off/50">{title}</h3>
    <ul className="space-y-2.5 text-sm">{links.map(([l, to]) => <li key={l}>{to.startsWith('http') ? <a href={to} target="_blank" rel="noreferrer" className="hover:underline">{l}</a> : <Link to={to} className="hover:underline">{l}</Link>}</li>)}</ul>
  </div>
);
export default function Footer() {
  return (
    <footer className="bg-ink text-off mt-24">
      <div className="px-5 md:px-10 pt-16 pb-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div><p className="display text-[26vw] lg:text-[11rem]">SLOTH</p><p className="mt-4 text-sm font-bold tracking-[.2em]">{BRAND.tagline}</p></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {col('NAVIGATE', [['Shop', '/shop'], ['New Drop', '/shop?cat=new'], ['Collections', '/collections'], ['About', '/about'], ['Contact', '/contact'], ['FAQ', '/faq']])}
            {col('CUSTOMER CARE', [['Shipping', '/shipping-returns'], ['Returns', '/shipping-returns'], ['Size Guide', '/shipping-returns#size-guide'], ['Track Order', '/contact']])}
            {col('LEGAL', [['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']])}
            {col('SOCIAL', [['Instagram', BRAND.instagram], ['YouTube', BRAND.youtube], ['Facebook', BRAND.facebook]])}
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-off/15 flex flex-col md:flex-row md:justify-between gap-6">
          <Newsletter dark />
          <p className="text-xs text-off/60 md:self-end">© 2026 SLOTH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
