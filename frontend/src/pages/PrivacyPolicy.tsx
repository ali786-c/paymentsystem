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
        <p>Your data is used solely to facilitate payment processing, ensure compliance with financial regulations, and improve our platform's routing efficiency.</p>
      </section>
      <section>
        <h2>4. Data Security</h2>
        <p>LinkPayPro implements enterprise-grade security measures, including end-to-end encryption and PCI DSS compliant infrastructure, to protect your sensitive data.</p>
      </section>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
