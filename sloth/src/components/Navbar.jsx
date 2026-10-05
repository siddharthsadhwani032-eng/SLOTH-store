import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../store';
const LINKS = [['SHOP', '/shop'], ['NEW DROP', '/shop?cat=new'], ['COLLECTIONS', '/collections'], ['ABOUT', '/about']];
export default function Navbar({ onSearch }) {
  const { count, setDrawer } = useStore();
  const [small, setSmall] = useState(false); const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { const f = () => setSmall(scrollY > 40); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f); }, []);
  useEffect(() => setMenu(false), [pathname]);
  const ic = 'size-11 grid place-items-center';
  return (
    <header className={`sticky top-0 z-40 bg-off/90 backdrop-blur border-b border-ink/10 transition-[height] duration-300 ${small ? 'h-14' : 'h-20'}`}>
      <div className="h-full px-4 md:px-10 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center gap-1">
          <button className={`${ic} md:hidden -ml-2`} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={22} /> : <Menu size={22} />}</button>
          <Link to="/" className="display text-3xl md:text-4xl" aria-label="SLOTH home">SLOTH</Link>
        </div>
        <nav aria-label="Main" className="hidden md:flex gap-9">
          {LINKS.map(([l, to]) => <NavLink key={l} to={to} className="text-xs font-bold tracking-[.2em] py-2 border-b border-transparent hover:border-ink transition-colors">{l}</NavLink>)}
        </nav>
        <div className="flex justify-end -mr-2">
          <button className={ic} aria-label="Search" onClick={onSearch}><Search size={20} /></button>
          <Link className={`${ic} hidden sm:grid`} to="/contact" aria-label="Account and support"><User size={20} /></Link>
          <button className={`${ic} relative`} aria-label={`Cart, ${count} items`} onClick={() => setDrawer(true)}>
            <ShoppingBag size={20} />
            {count > 0 && <span className="absolute top-1 right-0.5 min-w-5 h-5 px-1 grid place-items-center bg-ink text-off text-[11px] font-bold">{count}</span>}
          </button>
        </div>
      </div>
      {menu && (
        <nav aria-label="Mobile" className="md:hidden absolute inset-x-0 top-full bg-off border-b border-ink/10 px-5 py-4 fade-up">
          {[...LINKS, ['CONTACT', '/contact'], ['FAQ', '/faq']].map(([l, to]) => <Link key={l} to={to} className="display text-4xl block py-3">{l}</Link>)}
        </nav>
      )}
    </header>
  );
}
