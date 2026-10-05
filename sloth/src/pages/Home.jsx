import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { products } from '../data/products';
import { ProductGrid } from '../components/ProductCard';
import CollectionCard from '../components/CollectionCard';
import Newsletter from '../components/Newsletter';
import { Button, Reveal } from '../components/ui';
import { BRAND } from '../config';
import { ph, useTitle } from '../lib';
// Replace with real hero image/video and Instagram photos
const HERO_IMAGE = ph('HERO IMAGE', '#1a1a1a', '#3a3a3a');
const INSTA = ['#d4d3ce', '#bdbcb7', '#e4e3de', '#a9a8a3', '#cfcec9', '#b5b4af'].map((c, i) => ph(`POST ${i + 1}`, c));
export default function Home() {
  useTitle('');
  const drop = products.filter((p) => p.featured).slice(0, 4);
  const best = products.filter((p) => p.bestseller).slice(0, 8);
  return (
    <>
      <section className="relative bg-ink text-off min-h-[calc(100svh-5rem)] flex items-end overflow-hidden">
        <img src={HERO_IMAGE} alt="SLOTH campaign placeholder" className="absolute inset-0 size-full object-cover opacity-60" />
        <div className="relative px-5 md:px-10 pb-10 md:pb-16 w-full">
          <h1 className="display text-[22vw] md:text-[13vw] fade-up">WEAR LESS.<br />LIVE MORE.</h1>
          <p className="mt-6 max-w-sm text-base md:text-lg fade-up" style={{ animationDelay: '.15s' }}>Premium everyday streetwear for people who move differently.</p>
          <div className="mt-8 flex flex-wrap gap-3 fade-up" style={{ animationDelay: '.3s' }}>
            <Button as={Link} to="/shop" variant="light">SHOP MEN</Button>
            <Button as={Link} to="/shop" variant="light">SHOP WOMEN</Button>
            <Button as={Link} to="/shop?cat=new" variant="outline">EXPLORE DROP</Button>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 pt-20 md:pt-28">
        <Reveal>
          <div className="flex items-end justify-between mb-8"><h2 className="display text-5xl md:text-8xl">THE LATEST DROP</h2></div>
          <ProductGrid list={drop} />
          <div className="mt-10 text-center"><Button as={Link} to="/shop" variant="outline">VIEW ALL PRODUCTS</Button></div>
        </Reveal>
      </section>

      <section className="mt-24 md:mt-32 bg-ink text-off px-5 md:px-10 py-24 md:py-40">
        <Reveal className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-end">
          <h2 className="display text-[18vw] md:text-[10vw]">NO NOISE.<br />NO EXCESS.<br />JUST SLOTH.</h2>
          <div className="max-w-md space-y-4 text-off/75 leading-relaxed">
            <p>SLOTH is built for slow mornings, late nights, city walks and everything in between.</p>
            <p>We create comfortable everyday pieces with a streetwear mindset — designed to look effortless and feel even better.</p>
          </div>
        </Reveal>
      </section>

      <section className="px-5 md:px-10 pt-24">
        <Reveal>
          <h2 className="display text-5xl md:text-8xl mb-8">COLLECTIONS</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <CollectionCard label="OVERSIZED TEES" cat="tshirts" className="col-span-2 md:col-span-3 aspect-[4/3] md:aspect-[5/4]" />
            <CollectionCard label="HOODIES" cat="hoodies" className="col-span-2 md:col-span-3 aspect-[4/3] md:aspect-[5/4]" />
            <CollectionCard label="SWEATSHIRTS" cat="sweatshirts" className="md:col-span-2 aspect-[4/5]" />
            <CollectionCard label="BOTTOMS" cat="bottoms" className="md:col-span-2 aspect-[4/5]" />
            <CollectionCard label="NEW ARRIVALS" cat="new" className="col-span-2 md:col-span-2 aspect-[16/9] md:aspect-[4/5]" />
          </div>
        </Reveal>
      </section>

      <section className="px-5 md:px-10 pt-24">
        <Reveal>
          <h2 className="display text-5xl md:text-8xl mb-8">BESTSELLERS</h2>
          {/* Ratings intentionally omitted. Render real ones here once connected to a reviews source. */}
          <ProductGrid list={best} />
        </Reveal>
      </section>

      <section className="px-5 md:px-10 pt-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div><h2 className="display text-5xl md:text-8xl">FOLLOW THE SLOTH</h2><p className="mt-3">Streetwear, everyday.</p></div>
            <Button as="a" href={BRAND.instagram} target="_blank" rel="noreferrer" variant="outline"><Instagram size={16} />{BRAND.instagramHandle}</Button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {INSTA.map((s, i) => <a key={i} href={BRAND.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram post ${i + 1}`} className="block aspect-square overflow-hidden"><img src={s} alt={`SLOTH Instagram post ${i + 1}`} loading="lazy" className="size-full object-cover hover:scale-105 transition-transform duration-500" /></a>)}
          </div>
        </Reveal>
      </section>

      <section className="px-5 md:px-10 pt-28">
        <Reveal className="border-t border-ink pt-10 grid md:grid-cols-2 gap-8">
          <div><h2 className="display text-5xl md:text-7xl">STAY IN THE LOOP.</h2><p className="mt-4 max-w-sm">Get first access to new drops, limited pieces and SLOTH updates.</p></div>
          <div className="md:self-end"><Newsletter /></div>
        </Reveal>
      </section>
    </>
  );
}
