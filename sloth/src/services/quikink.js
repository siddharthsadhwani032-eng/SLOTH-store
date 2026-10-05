// Browser-side wrapper. The browser talks only to our Vercel function.
// The Qikink auth token NEVER belongs in frontend code.
const BASE = import.meta.env.VITE_QUIKINK_API_URL || '/api/quikink';

async function call(action, payload = {}) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, payload }),
  });

  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error(data.error || `Qikink request failed (${res.status}).`);
  return data;
}

export const createOrder = (order) => call('createOrder', { order });
