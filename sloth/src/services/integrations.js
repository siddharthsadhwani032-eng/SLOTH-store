import { createOrder as createQikinkOrder } from './quikink';

export class NotConnected extends Error {}

// Qikink order creation. COD can be sent directly to Qikink after checkout.
// Prepaid still requires a real payment gateway before the Qikink order should be created.
export async function startPayment({ order, method }) {
  if (method !== 'cod') {
    throw new NotConnected(
      'Online payment is not connected yet. Configure a payment gateway before accepting prepaid orders.'
    );
  }

  const result = await createQikinkOrder({
    ...order,
    method: 'cod',
    orderNumber: `SL${Date.now().toString(36).toUpperCase()}`,
  });

  return result;
}

export async function subscribe() {
  throw new NotConnected('Newsletter signup is not connected yet.');
}

export function track() { /* Optional analytics hook. */ }
