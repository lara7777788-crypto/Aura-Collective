import { LegalLayout } from "./Legal";

const Privacy = () => (
  <LegalLayout title="Privacy Notice" updated="April 28, 2026">
    <p>
      This Privacy Notice explains how <strong>Lara Stuart Mueller, Founder, Aura Collective</strong>
      ("we", "us") collects and uses personal data when you use AuraCollective.io ("Service").
      We act as the data controller for the personal data we process about you.
    </p>

    <h2>1. Data We Collect</h2>
    <ul>
      <li><strong>Account data:</strong> name, email, username, password (hashed), profile bio, avatar.</li>
      <li><strong>Content:</strong> projects, READMEs, tags, comments, stars you create.</li>
      <li><strong>Usage data:</strong> pages viewed, features used, device and browser info, IP address, approximate location.</li>
      <li><strong>Support messages:</strong> messages sent to Starlit support or to us by email.</li>
      <li><strong>Payment metadata:</strong> subscription status, plan, billing period. <em>Card details are handled exclusively by Paddle and never reach our servers.</em></li>
      <li><strong>Crypto payments (optional):</strong> public wallet address, transaction hash, chain, amount.</li>
    </ul>

    <h2>2. How We Use It</h2>
    <ul>
      <li>To create and operate your account (contract performance);</li>
      <li>To provide and improve the Service, including AI features (legitimate interests);</li>
      <li>To process payments and verify subscription status (contract / legal obligation);</li>
      <li>To prevent fraud and secure the Service (legitimate interests);</li>
      <li>To send transactional emails (welcome, account, billing, support replies) (contract);</li>
      <li>To comply with legal obligations (e.g., tax, accounting).</li>
    </ul>

    <h2>3. Legal Bases (GDPR)</h2>
    <p>
      We rely on: contract performance, legitimate interests, consent (where required, e.g.,
      non-essential cookies), and legal obligation.
    </p>

    <h2>4. Sharing</h2>
    <p>We share personal data with:</p>
    <ul>
      <li><strong>Service providers / subprocessors:</strong> hosting, database, analytics, email delivery, AI inference providers.</li>
      <li><strong>Paddle</strong> (Merchant of Record) for card payments, subscription management, tax compliance, and invoicing.</li>
      <li><strong>Mailchimp</strong> if you opt in to receive newsletters or product updates.</li>
      <li><strong>Professional advisers</strong> (legal, accounting) where necessary.</li>
      <li><strong>Authorities</strong> where required by law.</li>
    </ul>
    <p>We do not sell your personal data.</p>

    <h2>5. International Transfers</h2>
    <p>
      Some providers are located outside the EEA / UK / Switzerland. Where data is transferred
      out of these regions, we use appropriate safeguards (e.g., Standard Contractual Clauses
      or adequacy decisions).
    </p>

    <h2>6. Retention</h2>
    <p>
      We keep account data for as long as your account is active and for a reasonable period
      after closure for legal, accounting, and dispute-resolution purposes. You can delete
      your account at any time; public project content may remain in cached/archived form
      for a limited period.
    </p>

    <h2>7. Your Rights</h2>
    <p>Depending on your jurisdiction, you have the right to:</p>
    <ul>
      <li>Access your personal data;</li>
      <li>Correct inaccurate data;</li>
      <li>Request deletion ("right to be forgotten");</li>
      <li>Restrict or object to processing;</li>
      <li>Data portability;</li>
      <li>Withdraw consent at any time;</li>
      <li>Lodge a complaint with your local supervisory authority.</li>
    </ul>
    <p>
      To exercise any of these rights, email{" "}
      <a href="mailto:lara@loveconcursall.com">lara@loveconcursall.com</a>. We respond within
      one month.
    </p>

    <h2>8. Security</h2>
    <p>
      We use appropriate technical and organisational measures (encryption in transit,
      access controls, hashed passwords, audit logs) to protect personal data. No method
      is perfectly secure, but we work to minimise risk.
    </p>

    <h2>9. Cookies</h2>
    <p>
      We use essential cookies for authentication and security. We may also use limited
      analytics cookies to understand usage. You can manage cookie preferences in your
      browser.
    </p>

    <h2>10. Changes</h2>
    <p>
      We may update this Notice. Material changes will be communicated by email or in-app
      notice.
    </p>

    <h2>Contact</h2>
    <p>
      Questions or requests: <a href="mailto:lara@loveconcursall.com">lara@loveconcursall.com</a>
    </p>
  </LegalLayout>
);

export default Privacy;
