import React from 'react';
import PolicyLayout from '../components/landing/PolicyLayout';

const TermsConditions: React.FC = () => {
  return (
    <PolicyLayout title="Terms of Service" lastUpdated="March 24, 2026">
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using LinkPayPro, you agree to be bound by these Terms of Service. This is a legally binding agreement between your business entity and LinkPayPro.</p>
      </section>
      <section>
        <h2>2. SaaS Subscription</h2>
        <p>LinkPayPro provides access to its orchestration engine via a subscription-based model. Continued access is contingent upon active subscription and compliance with usage limits.</p>
      </section>
      <section>
        <h2>3. Prohibited Activities</h2>
        <p>Users may not use the platform for fraudulent transactions, illegal gambling, or any activities that violate financial compliance regulations in their respective jurisdictions.</p>
      </section>
      <section>
        <h2>4. Intellectual Property</h2>
        <p>The LinkPayPro engine, algorithms, and dashboard UI are the exclusive property of LinkPayPro. Unauthorized reverse engineering is strictly prohibited.</p>
      </section>
      <section>
        <h2>5. Platform Availability</h2>
        <p>While we strive for 99.9% uptime, LinkPayPro is not liable for indirect losses caused by secondary gateway failures or network interruptions beyond our control.</p>
      </section>
      <section>
        <h2>6. Termination</h2>
        <p>We reserve the right to suspend accounts that violate our security protocols or fail to maintain valid KYB status.</p>
      </section>
    </PolicyLayout>
  );
};

export default TermsConditions;
