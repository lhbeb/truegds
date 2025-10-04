import React from 'react';

const PrivacyPolicyPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose max-w-none text-gray-600">
        <p className="text-lg mb-6">
          At HappyDeel, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
        <p>We collect information that you provide directly to us when you:</p>
        <ul className="list-disc pl-6 mt-4 mb-6">
          <li>Create an account</li>
          <li>Make a purchase</li>
          <li>Sign up for our newsletter</li>
          <li>Contact our customer service</li>
          <li>Participate in surveys or promotions</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
        <p>We may use the information we collect to:</p>
        <ul className="list-disc pl-6 mt-4 mb-6">
          <li>Process and fulfill your orders</li>
          <li>Send you order confirmations and updates</li>
          <li>Respond to your comments and questions</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except to trusted third parties who assist us in operating our website, conducting our business, or servicing you.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
        <p>
          For questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-none mt-4">
          <li>Phone: +17176484487</li>
          <li>Email: support@happydeel.com</li>
          <li>Address: 315 Lancaster Avenue, Haverford, PA 19041, USA</li>
        </ul>
      </div>
    </div>
  </div>
);

export default PrivacyPolicyPage; 