import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartDrawer } from './components/Cart';
import SearchOverlay from './components/SearchOverlay';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import { Collections, About, Contact, FAQ, Shipping, Privacy, Terms } from './pages/Info';
import { Button } from './components/ui';
import { useTitle } from './lib';
function NotFound() {
  useTitle('Not found');
  return <div className="px-5 py-32 text-center"><p className="display text-7xl md:text-9xl">404</p><p className="mt-4">This page does not exist.</p><Button as={Link} to="/shop" className="mt-6">BACK TO SHOP</Button></div>;
}
export default function App() {
  const { pathname, hash } = useLocation();
  const [search, setSearch] = useState(false);
  useEffect(() => { if (!hash) scrollTo(0, 0); else setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 50); }, [pathname, hash]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[80] focus:bg-ink focus:text-off focus:p-3">Skip to content</a>
      <Navbar onSearch={() => setSearch(true)} />
      <main id="main" key={pathname} className="fade-up">
        <Routes>
          <Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} /><Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<Checkout />} />
          <Route path="/faq" element={<FAQ />} /><Route path="/shipping-returns" element={<Shipping />} />
          <Route path="/privacy" element={<Privacy />} /><Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
