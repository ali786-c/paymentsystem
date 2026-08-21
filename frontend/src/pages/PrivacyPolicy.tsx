import React from 'react';
import PolicyLayout from '../components/landing/PolicyLayout';

const PrivacyPolicy: React.FC = () => {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="March 24, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>At LinkPayPro, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal and business data when you use our payment orchestration platform.</p>
      </section>
      <section>
        <h2>2. Data Collection</h2>
        <p>We collect information necessary to provide our services, including business identity details (KYB), contact information, and transaction metadata required for payment routing.</p>
      </section>
      <section>
        <h2>3. Use of Information</h2>
        <p>Your data is used solely to facilitate payment processing, ensure compliance with financial regulations, and improve our platform's routing efficiency. We never sell your data to third parties.</p>
      </section>
      <section>
        <h2>4. Data Security</h2>
        <p>LinkPayPro implements enterprise-grade security measures, including end-to-end encryption (AES-256) and PCI DSS compliant infrastructure, to protect your sensitive data.</p>
      </section>
      <section>
        <h2>5. Compliance & Disclosures</h2>
        <p>We may disclose information when legally required by financial regulators or law enforcement agencies in the jurisdictions where your business operates.</p>
      </section>
      <section>
        <h2>6. Cookies & Tracking</h2>
        <p>We use technical cookies to maintain your dashboard session and provide analytics on routing performance. These do not track you across other websites.</p>
      </section>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
