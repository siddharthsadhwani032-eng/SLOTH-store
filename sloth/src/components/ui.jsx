import { useEffect, useRef, useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
export function Button({ as: T = 'button', variant = 'solid', className = '', ...p }) {
  const v = { solid: 'bg-ink text-off hover:bg-char', light: 'bg-off text-ink hover:bg-white', outline: 'border border-current hover:bg-ink hover:text-off' }[variant];
  return <T className={`inline-flex items-center justify-center gap-2 px-7 min-h-12 text-xs font-bold tracking-[.2em] uppercase transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none ${v} ${className}`} {...p} />;
}
export function Reveal({ children, className = '' }) {
  const r = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(r.current); return () => o.disconnect();
  }, []);
  return <div ref={r} className={`reveal ${on ? 'in' : ''} ${className}`}>{children}</div>;
}
export function Accordion({ items }) {
  const [o, setO] = useState(0);
  return (
    <div className="border-t border-ink/15">
      {items.map((it, i) => (
        <div key={it.title} className="border-b border-ink/15">
          <button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="w-full flex justify-between items-center py-5 text-left text-xs font-bold tracking-[.18em] uppercase">
            {it.title}{o === i ? <Minus size={16} /> : <Plus size={16} />}
          </button>
          {o === i && <div className="pb-6 text-sm leading-relaxed text-ink/70 max-w-prose fade-up">{it.body}</div>}
        </div>
      ))}
    </div>
  );
}
export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const f = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', f); return () => removeEventListener('keydown', f);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4 bg-ink/60" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="bg-off w-full max-w-md p-7 max-h-[85vh] overflow-auto fade-up">
        <div className="flex justify-between items-start mb-5"><h2 className="text-xl font-black uppercase">{title}</h2><button aria-label="Close" onClick={onClose}><X /></button></div>
        {children}
      </div>
    </div>
  );
}
export function SizeSelector({ sizes, value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Size" className="flex flex-wrap gap-2">
      {sizes.map((s) => (
        <button key={s} role="radio" aria-checked={value === s} onClick={() => onChange(s)}
          className={`min-w-14 min-h-12 px-3 text-sm font-bold border transition-colors ${value === s ? 'bg-ink text-off border-ink' : 'border-ink/25 hover:border-ink'}`}>{s}</button>
      ))}
    </div>
  );
}
export function ColorSelector({ colors, value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Colour" className="flex gap-3">
      {colors.map((c) => (
        <button key={c.name} role="radio" aria-checked={value === c.name} aria-label={c.name} title={c.name} onClick={() => onChange(c.name)}
          className={`size-11 grid place-items-center border ${value === c.name ? 'border-ink' : 'border-transparent'}`}>
          <span className="size-7 border border-ink/20" style={{ background: c.hex }} />
        </button>
      ))}
    </div>
  );
}
