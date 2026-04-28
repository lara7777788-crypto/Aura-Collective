import { LegalLayout } from "./Legal";

const Terms = () => (
  <LegalLayout title="Terms & Conditions" updated="April 28, 2026">
    <p>
      These Terms & Conditions ("Terms") govern your use of the AuraCollective.io
      platform ("Service"), operated by <strong>Lara Stuart Mueller, Founder, Aura Collective</strong>
      ("we", "us", "our"). By creating an account or using the Service, you agree to these Terms.
    </p>

    <h2>1. The Service</h2>
    <p>
      Aura Collective is an open developer platform for sharing, discovering, and discussing
      Web4 projects, including code, models, datasets, and creative work. We provide hosting,
      discovery, AI-assisted tooling ("Starlit"), and paid membership tiers.
    </p>

    <h2>2. Acceptance & Authority</h2>
    <p>
      You must be of legal age in your jurisdiction to use the Service. If you use the Service
      on behalf of an organization, you confirm you have authority to bind that organization.
    </p>

    <h2>3. Account & Credentials</h2>
    <p>
      You are responsible for keeping your login credentials confidential and for all activity
      under your account. Provide accurate information and keep it up to date.
    </p>

    <h2>4. Acceptable Use</h2>
    <p>You must not misuse the Service. You agree not to:</p>
    <ul>
      <li>Use the Service for any unlawful, fraudulent, or harmful purpose;</li>
      <li>Send spam or unsolicited communications;</li>
      <li>Infringe intellectual property or privacy rights of others;</li>
      <li>Upload malware, conduct security probes, or scrape the Service;</li>
      <li>Circumvent technical limitations, rate limits, or access controls.</li>
    </ul>

    <h2>5. User Content</h2>
    <p>
      You retain ownership of content you upload (projects, code, READMEs, profile content).
      You grant us a limited, non-exclusive license to host, display, and process your content
      solely to operate the Service. You are responsible for having the rights to anything
      you upload.
    </p>

    <h2>6. AI Features ("Starlit")</h2>
    <p>
      Starlit provides AI-assisted features (summarization, search help, README polishing,
      tag suggestions, support FAQs). You agree:
    </p>
    <ul>
      <li>You will not use Starlit to generate illegal content, deepfakes, hate speech, malware, or to attempt jailbreaks.</li>
      <li>You are responsible for your prompts and how you use the outputs, including verifying accuracy.</li>
      <li>You must have rights to any input content you provide.</li>
      <li>AI outputs may be inaccurate or incomplete and are not a substitute for professional advice.</li>
      <li>We may filter, refuse, or moderate outputs, and may suspend accounts that repeatedly violate this section.</li>
    </ul>

    <h2>7. Intellectual Property</h2>
    <p>
      We retain all rights in the Service itself, including software, design, branding, and
      documentation. Nothing in these Terms transfers our IP to you. We grant you a limited,
      non-exclusive, non-transferable right to use the Service within your selected plan.
    </p>

    <h2>8. Payments & Subscriptions</h2>
    <p>
      Paid memberships (Starter, Glow, Constellation) are billed via our reseller, Paddle.
      Card payments, billing, taxes, renewals, and cancellations are governed by{" "}
      <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noopener noreferrer">
        Paddle's Buyer Terms
      </a>. Subscriptions renew monthly until cancelled. You may cancel any time from your
      billing page; access continues to the end of the paid period.
    </p>
    <p>
      For optional crypto payments (USDC), you pay directly on-chain to our receiver address.
      Crypto payments are non-renewing and final once confirmed on-chain (see Refund Policy).
    </p>

    <h2>9. Merchant of Record Disclosure</h2>
    <p>
      Our order process for card payments is conducted by our online reseller{" "}
      <strong>Paddle.com</strong>. Paddle.com is the Merchant of Record for all card orders.
      Paddle provides all customer service inquiries for billing and handles returns.
    </p>

    <h2>10. Service Level</h2>
    <p>
      We work hard to keep the Service available, but we do not guarantee uninterrupted or
      error-free performance. The Service is provided "as is" and we disclaim all implied
      warranties (merchantability, fitness for a particular purpose) to the fullest extent
      permitted by law.
    </p>

    <h2>11. Suspension & Termination</h2>
    <p>
      We may suspend or terminate access for: material breach of these Terms, non-payment,
      security or fraud risk, or repeated/serious policy violations. Upon termination, you
      may export public project content for a reasonable window before deletion.
    </p>

    <h2>12. Liability</h2>
    <p>
      To the fullest extent permitted by law, our aggregate liability is capped at the fees
      you paid us in the 12 months before the claim. We exclude liability for indirect,
      consequential, or special damages (loss of profits, data, or goodwill). Nothing in
      these Terms limits liability for fraud, death, or personal injury where prohibited by law.
    </p>

    <h2>13. Indemnity</h2>
    <p>
      You agree to indemnify us for claims arising from your content, your unlawful use of
      the Service, or your violation of these Terms.
    </p>

    <h2>14. Changes</h2>
    <p>
      We may update these Terms. Material changes will be communicated by email or in-app
      notice. Continued use after changes means you accept the updated Terms.
    </p>

    <h2>15. Governing Law</h2>
    <p>
      These Terms are governed by the laws of Switzerland, without regard to conflict-of-law
      rules. Disputes will be resolved in the competent courts of Switzerland, except where
      mandatory consumer-law venues apply.
    </p>

    <h2>Contact</h2>
    <p>
      Questions: <a href="mailto:lara@loveconcursall.com">lara@loveconcursall.com</a>
    </p>
  </LegalLayout>
);

export default Terms;
