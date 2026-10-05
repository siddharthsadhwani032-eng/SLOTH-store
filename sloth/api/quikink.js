// Vercel serverless function for the Qikink Open API.
// IMPORTANT: QIKINK_AUTH_TOKEN is server-only. Never put it in VITE_ variables.

const QIKINK_CREATE_ORDER_URL =
  process.env.QIKINK_API_BASE || 'https://qikink.com/erp2/index.php/api/createOrder';

function json(res, status, body) {
  return res.status(status).json(body);
}

function clean(value, max = 200) {
  return String(value ?? '').trim().slice(0, max);
}

function splitName(name) {
  const parts = clean(name, 40).split(/\s+/).filter(Boolean);
  return {
    first_name: parts.shift() || 'Customer',
    last_name: parts.join(' ').slice(0, 20) || 'Customer',
  };
}

function makeOrderNumber(input) {
  const raw = clean(input, 15).replace(/[^a-zA-Z0-9]/g, '');
  if (raw) return raw.slice(0, 15);
  return `SL${Date.now().toString(36).toUpperCase()}`.slice(0, 15);
}

function buildQikinkPayload(order) {
  const customer = order?.customer || {};
  const name = splitName(customer.name);
  const items = Array.isArray(order?.items) ? order.items : [];

  if (!items.length) throw new Error('Cart is empty.');

  const line_items = items.map((item) => {
    if (!item.sku) throw new Error(`Missing Qikink SKU for product ${item.id || 'unknown'}.`);

    const line = {
      // Set to true when the SKU is from Qikink > My Products.
      search_from_my_products: item.search_from_my_products !== false,
      price: Number(item.price),
      quantity: Number(item.qty),
      sku: clean(item.sku, 80),
    };

    // Designs are optional when the design is already saved against the Qikink SKU.
    if (item.design) {
      line.designs = [{
        design_code: clean(item.design.design_code, 15),
        width_inches: Number(item.design.width_inches),
        height_inches: Number(item.design.height_inches),
        placement_sku: clean(item.design.placement_sku, 2),
        ...(item.design.design_link ? { design_link: clean(item.design.design_link, 500) } : {}),
        ...(item.design.mockup_link ? { mockup_link: clean(item.design.mockup_link, 500) } : {}),
      }];
    }

    return line;
  });

  const shippingAddress = {
    first_name: name.first_name,
    last_name: name.last_name,
    address1: clean(customer.address, 80),
    address2: clean(customer.address2, 80),
    phone: clean(customer.phone, 15),
    email: clean(customer.email, 40),
    city: clean(customer.city, 40),
    zip: clean(customer.pin, 6),
    province: clean(customer.state, 40),
    country: 'India',
    name: clean(customer.name, 40),
    country_code: 'IN',
  };

  return {
    auth_token: process.env.QIKINK_AUTH_TOKEN,
    order_number: makeOrderNumber(order.orderNumber),
    // Qikink handles delivery/shipping for the customer order.
    qikink_shipping: 1,
    gateway: order.method === 'cod' ? 'cash_on_delivery' : 'online',
    total_order_value: Number(order.total),
    line_items,
    shipping_address: shippingAddress,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'POST only' });

  const token = process.env.QIKINK_AUTH_TOKEN;
  if (!token) return json(res, 501, { error: 'QIKINK_AUTH_TOKEN is not configured on the server.' });

  const { action, payload } = req.body || {};
  if (action !== 'createOrder') return json(res, 400, { error: 'Only createOrder is implemented in this Qikink-ready build.' });

  try {
    const qikinkPayload = buildQikinkPayload(payload?.order);

    const response = await fetch(QIKINK_CREATE_ORDER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(qikinkPayload),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!response.ok) {
      return json(res, 502, { error: 'Qikink API request failed.', details: data });
    }

    // Qikink documents code:1 as successful order creation.
    if (data?.code !== 1) {
      return json(res, 400, { error: data?.msg || 'Qikink did not create the order.', details: data });
    }

    return json(res, 200, {
      ok: true,
      orderId: data.order_id,
      orderNumber: qikinkPayload.order_number,
      qikink: data,
    });
  } catch (error) {
    return json(res, 500, { error: error?.message || 'Unable to create Qikink order.' });
  }
}
