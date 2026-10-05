import { Link } from 'react-router-dom';
import { ph } from '../lib';
export default function CollectionCard({ label, cat, image, className = '' }) {
  return (
    <Link to={`/shop?cat=${cat}`} className={`group relative block overflow-hidden bg-mist ${className}`}>
      <img src={image || ph(label, '#cfcec9')} alt={`${label} collection`} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-ink/20 md:bg-ink/0 md:group-hover:bg-ink/55 transition-colors duration-500" />
      <span className="absolute bottom-5 left-5 right-5 display text-4xl md:text-5xl text-off md:text-transparent md:group-hover:text-off transition-colors duration-500">{label}</span>
    </Link>
  );
}
