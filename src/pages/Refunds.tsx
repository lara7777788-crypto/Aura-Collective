import { LegalLayout } from "./Legal";

const Refunds = () => (
  <LegalLayout title="Refund Policy" updated="April 28, 2026">
    <p>
      We want you to love Aura Collective. If you are not satisfied with a paid membership,
      you can request a refund under the terms below.
    </p>

    <h2>30-Day Money-Back Guarantee (Card Payments)</h2>
    <p>
      For card-based subscriptions, you may request a full refund within{" "}
      <strong>30 days</strong> of your original purchase date. Refunds are processed by our
      payment provider, <strong>Paddle</strong>, which is the Merchant of Record for all card
      orders.
    </p>

    <h3>How to request a refund</h3>
    <ol>
      <li>
        Visit{" "}
        <a href="https://paddle.net" target="_blank" rel="noopener noreferrer">paddle.net</a>{" "}
        and look up your order using the email you used at checkout, or
      </li>
      <li>
        Email <a href="mailto:lara@loveconcursall.com">lara@loveconcursall.com</a> with your
        order number and reason. We will assist with the request through Paddle.
      </li>
    </ol>
    <p>
      Refunds are typically processed within 5–10 business days back to your original payment
      method.
    </p>

    <h2>Subscription Cancellations</h2>
    <p>
      You can cancel your subscription at any time from the Billing page. Cancellation stops
      the next renewal; you keep access until the end of the current paid period.
    </p>

    <h2>Crypto Payments (USDC)</h2>
    <p>
      Crypto payments are settled directly on-chain and are non-reversible by their nature.
      Once a USDC transaction is confirmed, it cannot be refunded automatically. If you
      experience a technical issue (e.g., wrong duration credited, double payment, failed
      activation), email{" "}
      <a href="mailto:lara@loveconcursall.com">lara@loveconcursall.com</a> within 30 days and
      we will work with you to resolve it — typically by extending your membership, issuing
      credit, or sending USDC back to the originating wallet.
    </p>

    <h2>Contact</h2>
    <p>
      Refund questions: <a href="mailto:lara@loveconcursall.com">lara@loveconcursall.com</a>
    </p>
  </LegalLayout>
);

export default Refunds;
