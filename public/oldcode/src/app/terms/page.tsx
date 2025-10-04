import React from 'react';

const TermsPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <div className="prose max-w-none text-gray-600">
        <p className="text-lg mb-6">
          Welcome to HappyDeel. By accessing or using our website, you agree to be bound by these Terms of Service.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Account Terms</h2>
        <ul className="list-disc pl-6 mt-4 mb-6">
          <li>You must be 18 years or older to use this service</li>
          <li>You must provide accurate and complete information when creating an account</li>
          <li>You are responsible for maintaining the security of your account</li>
          <li>You must notify us immediately of any unauthorized access</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping Policy</h2>
        <p>
          For all orders within the USA:
        </p>
        <ul className="list-disc pl-6 mt-4 mb-6">
          <li>Standard shipping takes 3-5 business days</li>
          <li>Free shipping on all orders currently</li>
          <li>Orders are processed within 1 business day</li>
          <li>Tracking information is provided via email</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Product Terms</h2>
        <ul className="list-disc pl-6 mt-4 mb-6">
          <li>All product descriptions are accurate to the best of our knowledge</li>
          <li>We reserve the right to modify or discontinue products</li>
          <li>Prices are subject to change without notice</li>
          <li>We do not guarantee product availability</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Payment Terms</h2>
        <p>
          We accept the following payment methods:
        </p>
        <ul className="list-disc pl-6 mt-4 mb-6">
          <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
          <li>PayPal</li>
          <li>Shop Pay</li>
          <li>Apple Pay</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
        <p>
          HappyDeel shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
        <p>
          For questions about these Terms of Service, please contact us:
        </p>
        <ul className="list-none mt-4">
          <li>Phone: +17176484487</li>
          <li>Email: support@happydeel.com</li>
          <li>Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</li>
        </ul>
      </div>
    </div>
  </div>
);

export default TermsPage; 