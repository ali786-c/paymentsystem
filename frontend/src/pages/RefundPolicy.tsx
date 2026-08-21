import React from 'react';
import PolicyLayout from '../components/landing/PolicyLayout';

const RefundPolicy: React.FC = () => {
  return (
    <PolicyLayout title="Refund Policy" lastUpdated="March 24, 2026">
      <section>
        <h2>1. B2B SaaS Subscriptions</h2>
        <p>LinkPayPro operates on a subscription-based SaaS model. Monthly and annual licenses grant immediate digital access to our orchestration tools and global routing engine.</p>
      </section>
      <section>
        <h2>2. Refund Eligibility</h2>
        <p>Due to the nature of digital access and the technical overhead of onboarding, we typically do not offer refunds once a subscription period has commenced. Enterprise custom setups are strictly non-refundable.</p>
      </section>
      <section>
        <h2>3. Cancellation</h2>
        <p>You can cancel your subscription directly through the dashboard at any time. Your access will remain active until the end of the current paid billing cycle.</p>
      </section>
      <section>
        <h2>4. Chargeback Mitigation</h2>
        <p>We take fraudulent chargebacks seriously. Any forced reversal of payment without prior contact with our support team will result in permanent account termination.</p>
      </section>
      <section>
        <h2>5. Service Credit Policy</h2>
        <p>In cases of significant verified platform downtime (below 99.9% monthly), we may offer service credits at our discretion as a goodwill gesture.</p>
      </section>
    </PolicyLayout>
  );
};

export default RefundPolicy;
