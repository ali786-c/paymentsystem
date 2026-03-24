import React from 'react';
import PolicyLayout from '../components/landing/PolicyLayout';

const RefundPolicy: React.FC = () => {
  return (
    <PolicyLayout title="Refund Policy" lastUpdated="March 24, 2026">
      <section>
        <h2>1. B2B SaaS Subscriptions</h2>
        <p>LinkPayPro operates on a subscription-based SaaS model. Monthly and annual licenses grant immediate digital access to our orchestration tools.</p>
      </section>
      <section>
        <h2>2. Refund Eligibility</h2>
        <p>Due to the nature of digital access, we typically do not offer refunds once a subscription period has commenced. However, you may cancel your next renewal at any time.</p>
      </section>
      <section>
        <h2>3. Cancellation</h2>
        <p>You can cancel your subscription directly through the dashboard. Access will continue until the end of the current paid billing cycle.</p>
      </section>
      <section>
        <h2>4. Chargeback Mitigation</h2>
        <p>In accordance with our B2B focus, we work closely with merchants to resolve disputes. Unauthorized chargebacks may result in immediate suspension of platform access.</p>
      </section>
    </PolicyLayout>
  );
};

export default RefundPolicy;
