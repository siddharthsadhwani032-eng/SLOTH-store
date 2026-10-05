# SLOTH + Qikink setup

This build uses Qikink's Open API from the server side. The browser never receives the Qikink auth token.

## 1. Create/save your products in Qikink

Create the products/designs you actually want to sell in Qikink. For a custom storefront, Qikink says custom websites can use its Open API, and products can be added manually to the custom storefront. Before launch, place a sample order to verify the print and product quality.

## 2. Map every variant SKU

Qikink SKUs can identify the actual product variant. In `src/data/products.js`, each product supports either:

- `qikinkSku: '...'` for a single SKU, or
- `qikinkSkus: { colorKey: { SIZE: '...' } }` for exact size/color variants.

Recommended format:

    qikinkSkus: {
      black: { S: 'SKU-FOR-BLACK-S', M: 'SKU-FOR-BLACK-M' },
      off:   { S: 'SKU-FOR-OFF-S',   M: 'SKU-FOR-OFF-M' }
    }

The color keys in SLOTH are `black`, `off`, `char`, and `ash`.

If a variant mapping exists, SLOTH uses it first; otherwise it falls back to `qikinkSku`.

## 3. Set Vercel environment variables

Set these as server environment variables:

    QIKINK_AUTH_TOKEN=your_qikink_auth_token
    QIKINK_API_BASE=https://qikink.com/erp2/index.php/api/createOrder

Keep `QIKINK_AUTH_TOKEN` server-only. Do NOT use the `VITE_` prefix.

The frontend variable can remain:

    VITE_QUIKINK_API_URL=/api/quikink

## 4. What currently works

- Checkout collects customer details.
- COD checkout sends an order to `/api/quikink`.
- The server builds Qikink's documented `createOrder` payload.
- The Qikink auth token stays on the server.
- The Qikink order ID is returned to the storefront.

## 5. Prepaid payment is intentionally not enabled

The current build does not pretend that online payment is working. Prepaid checkout needs a real payment gateway and should create the Qikink `online` order only after successful payment.

## 6. Deploy

Build locally with:

    npm install
    npm run build

Then deploy the project to Vercel and add the environment variables above. Redeploy after changing environment variables.
