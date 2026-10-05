import { useState } from 'react';
import { subscribe } from '../services/integrations';
import { Button } from './ui';
export default function Newsletter({ dark = false }) {
  const [email, setEmail] = useState(''); const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setMsg('');
    try { await subscribe(email); setMsg('You are in.'); setEmail(''); } catch (err) { setMsg(err.message); }
  };
  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <label htmlFor={`nl-${dark}`} className="sr-only">Email address</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input id={`nl-${dark}`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
          className={`flex-1 min-h-12 px-4 bg-transparent border ${dark ? 'border-off/40 placeholder:text-off/50' : 'border-ink/30 placeholder:text-ink/50'}`} />
        <Button type="submit" variant={dark ? 'light' : 'solid'}>JOIN SLOTH</Button>
      </div>
      <p role="status" className="mt-2 text-xs opacity-70 min-h-4">{msg}</p>
    </form>
  );
}
