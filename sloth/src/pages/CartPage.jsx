import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { CartItem, Summary } from '../components/Cart';
import { Button } from '../components/ui';
import { useTitle } from '../lib';
export default function CartPage() {
  useTitle('Cart');
  const { items } = useStore();
  return (
    <div className="px-5 md:px-10 pt-10">
      <h1 className="display text-6xl md:text-[9vw]">YOUR CART</h1>
      {items.length ? (
        <div className="grid md:grid-cols-[1.6fr_1fr] gap-12 mt-8">
          <ul className="border-t border-ink/10">{items.map((i) => <CartItem key={i.k} i={i} />)}</ul>
          <div className="md:sticky md:top-24 md:self-start bg-mist p-6"><Summary /></div>
        </div>
      ) : <div className="py-24"><p className="mb-6">Your cart is empty.</p><Button as={Link} to="/shop">SHOP NOW</Button></div>}
    </div>
  );
}
