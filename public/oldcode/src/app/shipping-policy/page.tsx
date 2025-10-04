export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Policy</h1>
        <div className="prose max-w-none text-gray-600">
          <p className="text-lg mb-6">
            At HappyDeel, we strive to provide fast, reliable shipping services to all our customers. Here&#39;s everything you need to know about our shipping policy.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Free Shipping</h2>
          <ul className="list-disc pl-6 mt-4 mb-6">
            <li>FREE shipping on all orders to US and Canada</li>
            <li>No minimum purchase required</li>
            <li>USPS or FedEx for domestic shipments</li>
            <li>FedEx for international shipments</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping Times</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-medium text-gray-900 mb-4">Estimated Delivery Timeline:</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Processing Time:</span>
                <span>1 business day</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Domestic Shipping (US):</span>
                <span>5-8 business days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Canada Shipping:</span>
                <span>7-10 business days</span>
              </div>
              <div className="border-t pt-4">
                <span className="font-medium">Total Expected Time:</span>
                <ul className="list-disc pl-6 mt-2">
                  <li>US Orders: 6-9 business days</li>
                  <li>Canadian Orders: 8-11 business days</li>
                </ul>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Order Tracking</h2>
          <p className="mb-6">
            Once your order ships, you&#39;ll receive:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Shipping confirmation email</li>
            <li>Tracking number</li>
            <li>Estimated delivery date</li>
            <li>Link to track your package</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping Restrictions</h2>
          <p className="mb-6">
            Please note the following shipping restrictions:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>We currently only ship to the United States and Canada</li>
            <li>Some items may have additional shipping requirements</li>
            <li>PO boxes are accepted for most items</li>
            <li>APO/FPO addresses are supported</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Package Protection</h2>
          <p className="mb-6">
            All shipments include:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Full insurance coverage</li>
            <li>Signature confirmation for orders over $500</li>
            <li>Weather-resistant packaging</li>
            <li>Protective materials for fragile items</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
          <p>
            For shipping-related questions or concerns, please contact us:
          </p>
          <ul className="list-none mt-4">
            <li>Phone: +17176484487</li>
            <li>Email: support@happydeel.com</li>
            <li>Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</li>
          </ul>
          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Important Note</h3>
            <p className="text-sm">
              Shipping times may be affected by customs, weather conditions, or other unforeseen circumstances. We&#39;ll keep you updated on any delays affecting your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 