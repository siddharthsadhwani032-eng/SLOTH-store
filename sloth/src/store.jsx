import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, MAX_QTY } from './config';
import { byId } from './data/products';
const Ctx = createContext(null);
function useLS(key, init) {
  const [v, set] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; } });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, set];
}
export function StoreProvider({ children }) {
  const [lines, setLines] = useLS('sloth.cart', []);
  const [wish, setWish] = useLS('sloth.wish', []);
  const [recent, setRecent] = useLS('sloth.recent', []);
  const [drawer, setDrawer] = useState(false);
  const add = (id, size, color, qty = 1, open = true) => {
    const k = `${id}|${size}|${color}`;
    setLines((l) => l.find((x) => x.k === k)
      ? l.map((x) => (x.k === k ? { ...x, qty: Math.min(x.qty + qty, MAX_QTY) } : x))
      : [...l, { k, id, size, color, qty }]);
    if (open) setDrawer(true);
  };
  const setQty = (k, q) => setLines((l) => (q < 1 ? l.filter((x) => x.k !== k) : l.map((x) => (x.k === k ? { ...x, qty: Math.min(q, MAX_QTY) } : x))));
  const remove = (k) => setLines((l) => l.filter((x) => x.k !== k));
  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const seen = useCallback((id) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)), [setRecent]);
  const items = useMemo(() => lines.map((l) => ({ ...l, p: byId(l.id) })).filter((l) => l.p), [lines]);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.p.price, 0);
  const shipping = !items.length || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const clear = () => setLines([]);
  return <Ctx.Provider value={{ items, count, subtotal, shipping, total: subtotal + shipping, add, setQty, remove, clear, wish, toggleWish, recent, seen, drawer, setDrawer }}>{children}</Ctx.Provider>;
}
export const useStore = () => useContext(Ctx);
