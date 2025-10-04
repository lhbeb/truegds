import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About HappyDeel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="prose max-w-none text-gray-600">
            <p className="text-lg mb-6">
              Welcome to HappyDeel, your premier destination for quality electronics and photography equipment. Since our establishment, we&#39;ve been dedicated to providing photographers and tech enthusiasts with exceptional products at competitive prices.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              At HappyDeel, we believe that everyone deserves access to high-quality photography equipment. Our mission is to make premium cameras and accessories accessible to both professionals and enthusiasts while providing unmatched customer service.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Sets Us Apart</h2>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li>Curated Selection: Each product is carefully selected for quality and value</li>
              <li>Expert Support: Our team of photography experts is always ready to help</li>
              <li>Competitive Pricing: We offer the best prices without compromising on quality</li>
              <li>Fast &amp; Free Shipping: Enjoy free shipping on all US and Canada orders</li>
              <li>Satisfaction Guaranteed: 30-day hassle-free return policy</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Quality: We never compromise on product quality</li>
              <li>Integrity: Honest and transparent business practices</li>
              <li>Customer Focus: Your satisfaction is our top priority</li>
              <li>Innovation: Staying ahead with the latest technology</li>
            </ul>
          </div>
          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Company Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-[#0046be]">5000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-[#0046be]">1000+</div>
                  <div className="text-gray-600">Products Sold</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-[#0046be]">99%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-[#0046be]">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900">Address:</div>
                  <div className="text-gray-600">315 Lancaster Avenue, Haverford, PA 19041, USA</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Phone:</div>
                  <div className="text-gray-600">+17176484487</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Email:</div>
                  <div className="text-gray-600">support@happydeel.com</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Business Hours:</div>
                  <div className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM EST</div>
                  <div className="text-gray-600">Saturday: 10:00 AM - 3:00 PM EST</div>
                  <div className="text-gray-600">Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 