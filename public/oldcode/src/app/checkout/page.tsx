"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, MapPin, Phone, Trash, ChevronDown, Mail } from 'lucide-react';
import { getCartItem, clearCart } from '@/utils/cart';
import { preventScrollOnClick } from '@/utils/scrollUtils';
import type { CartItem } from '@/utils/cart';
import Image from 'next/image';
import type { Product } from '@/types/product';

interface ShippingData {
  streetAddress: string;
  city: string;
  zipCode: string;
  state: string;
  email: string;
  phoneNumber: string;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [currentStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingData, setShippingData] = useState({
    streetAddress: '',
    city: '',
    zipCode: '',
    state: '',
    email: '',
    phoneNumber: ''
  });
  const [stateSuggestions, setStateSuggestions] = useState<string[]>([]);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Expanded country codes with country names (deduplicated)
  const countryCodes = [
    { code: '+1', country: 'United States' },
    { code: '+1', country: 'Canada' },
    { code: '+52', country: 'Mexico' },
    { code: '+55', country: 'Brazil' },
    { code: '+64', country: 'New Zealand' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+31', country: 'Netherlands' },
    { code: '+46', country: 'Sweden' },
    { code: '+47', country: 'Norway' },
    { code: '+45', country: 'Denmark' },
    { code: '+358', country: 'Finland' },
    { code: '+41', country: 'Switzerland' },
    { code: '+43', country: 'Austria' },
    { code: '+32', country: 'Belgium' },
    { code: '+420', country: 'Czech Republic' },
    { code: '+353', country: 'Ireland' },
    { code: '+36', country: 'Hungary' },
    { code: '+48', country: 'Poland' },
    { code: '+351', country: 'Portugal' },
    { code: '+40', country: 'Romania' },
    { code: '+421', country: 'Slovakia' },
    { code: '+386', country: 'Slovenia' },
    { code: '+380', country: 'Ukraine' },
    { code: '+7', country: 'Russia' },
    { code: '+30', country: 'Greece' },
    { code: '+372', country: 'Estonia' },
    { code: '+298', country: 'Faroe Islands' },
    { code: '+350', country: 'Gibraltar' },
    { code: '+354', country: 'Iceland' },
    { code: '+371', country: 'Latvia' },
    { code: '+370', country: 'Lithuania' },
    { code: '+352', country: 'Luxembourg' },
    { code: '+356', country: 'Malta' },
    { code: '+381', country: 'Serbia' },
    { code: '+90', country: 'Turkey' },
    // ... add more as needed ...
  ];
  const selectedCountry = countryCodes.find(c => c.code === selectedCountryCode) || countryCodes[0];

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const canadianProvinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
    'Quebec', 'Saskatchewan', 'Yukon'
  ];

  const ukRegions = [
    'England', 'Scotland', 'Wales', 'Northern Ireland',
    'Bedfordshire', 'Berkshire', 'Bristol', 'Buckinghamshire', 'Cambridgeshire', 'Cheshire',
    'Cornwall', 'Cumbria', 'Derbyshire', 'Devon', 'Dorset', 'Durham', 'East Sussex', 'Essex',
    'Gloucestershire', 'Greater London', 'Greater Manchester', 'Hampshire', 'Herefordshire',
    'Hertfordshire', 'Isle of Wight', 'Kent', 'Lancashire', 'Leicestershire', 'Lincolnshire',
    'London', 'Merseyside', 'Norfolk', 'Northamptonshire', 'Northumberland', 'Nottinghamshire',
    'Oxfordshire', 'Rutland', 'Shropshire', 'Somerset', 'South Yorkshire', 'Staffordshire',
    'Suffolk', 'Surrey', 'Tyne and Wear', 'Warwickshire', 'West Midlands', 'West Sussex',
    'West Yorkshire', 'Wiltshire', 'Worcestershire'
  ];

  const australianStates = [
    'Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland',
    'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
  ];

  const netherlandsProvinces = [
    'Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg',
    'North Brabant', 'North Holland', 'Overijssel', 'South Holland', 'Utrecht', 'Zeeland'
  ];

  const allRegions = [...usStates, ...canadianProvinces, ...ukRegions, ...australianStates, ...netherlandsProvinces];

  useEffect(() => {
    // Wrap cart access in ClientOnly logic
    if (typeof window !== 'undefined') {
      const item = getCartItem();
      if (!item) {
        router.push('/');
        return;
      }
      setCartItem(item);
    }
  }, [router]);

  useEffect(() => {
    if (isRedirecting) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isRedirecting]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    }
    if (isCountryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));

    // Clear phone error when user starts typing
    if (name === 'phoneNumber') {
      setPhoneError('');
    }

    // Clear email error when user starts typing
    if (name === 'email') {
      setEmailError('');
    }

    if (name === 'state') {
      if (value.length >= 2) {
        const filtered = allRegions.filter(region => 
          region.toLowerCase().includes(value.toLowerCase())
        );
        setStateSuggestions(filtered.slice(0, 5));
        setShowStateSuggestions(true);
      } else {
        setStateSuggestions([]);
        setShowStateSuggestions(false);
      }
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if it's a valid phone number (7-15 digits)
    if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
      return true;
    }
    
    return false;
  };

  const sendShippingEmail = async (shippingData: ShippingData, product: Product) => {
    try {
      const response = await fetch('/api/send-shipping-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingData,
          product: {
            title: product.title,
            price: product.price,
            slug: product.slug,
            images: product.images
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };

  const handleStateSelect = (state: string) => {
    setShippingData(prev => ({ ...prev, state }));
    setShowStateSuggestions(false);
    setStateSuggestions([]);
  };

  const handleContinueToCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!shippingData.email) {
      setEmailError('Email address is required');
      return;
    }

    // Validate phone number only if provided
    if (shippingData.phoneNumber) {
      const fullPhoneNumber = selectedCountryCode + shippingData.phoneNumber;
      if (!validatePhoneNumber(fullPhoneNumber)) {
        setPhoneError('Please enter a valid phone number');
        return;
      }
    }

    // Check if all required fields are filled
    const requiredFields = ['streetAddress', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !shippingData[field as keyof typeof shippingData]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSendingEmail(true);
    
    try {
      // Send shipping information to email
      const shippingDataWithFullPhone = {
        ...shippingData,
        phoneNumber: shippingData.phoneNumber ? selectedCountryCode + shippingData.phoneNumber : ''
      };
      const emailSent = await sendShippingEmail(shippingDataWithFullPhone, product);
      
      if (!emailSent) {
        alert('Failed to send shipping information. Please try again.');
        setIsSendingEmail(false);
        return;
      }
      setIsSendingEmail(false);
      setIsRedirecting(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        window.location.href = product.checkoutLink;
      }, 4000); // 4 seconds
      
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again.');
      setIsSendingEmail(false);
    }
  };

  const handleClearCart = () => {
    preventScrollOnClick(() => {
      if (typeof window !== 'undefined') {
        clearCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      router.push('/');
    }, true);
  };

  if (!cartItem) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <Link href="/" className="text-[#0046be] hover:text-[#003494]">
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (isRedirecting) {
    return (
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f8fafc] to-[#f0fdfa] px-2 pt-4 min-h-0 sm:pt-16 sm:pb-16">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-100 flex flex-col items-center max-w-md w-full mx-auto transition-all duration-500">
          {/* Blue Verification Icon at Top */}
          <div className="flex flex-col items-center mb-4">
            <span className="inline-flex items-center justify-center bg-blue-100 rounded-full p-2 mb-2">
              <Check className="h-7 w-7 text-[#0046be]" />
            </span>
          </div>
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2 text-center">Address Confirmed</h2>
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-700 mb-4 text-center">Your order will be shipped to the address below:</p>
          {/* Address Card */}
          <div className="w-full max-w-xs bg-blue-50 border border-blue-100 rounded-2xl shadow p-5 mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-5 w-5 text-[#0046be]" />
              <span className="font-semibold text-[#0046be] text-base">Confirmed Shipping Address</span>
            </div>
            <div className="text-gray-800 text-base whitespace-pre-line leading-relaxed">
              {shippingData.streetAddress && <div>{shippingData.streetAddress}</div>}
              {shippingData.city && <div>{shippingData.city}</div>}
              {shippingData.state || shippingData.zipCode ? (
                <div>{shippingData.state}{shippingData.state && shippingData.zipCode ? ', ' : ''}{shippingData.zipCode}</div>
              ) : null}
            </div>
            {shippingData.email && (
              <div className="flex items-center gap-2 mt-2">
                <Mail className="h-5 w-5 text-[#0046be]" />
                <span className="text-[#0046be] text-base">{shippingData.email}</span>
              </div>
            )}
            {selectedCountryCode && shippingData.phoneNumber && (
              <div className="flex items-center gap-2 mt-2">
                <Phone className="h-5 w-5 text-[#0046be]" />
                <a href={`tel:${selectedCountryCode}${shippingData.phoneNumber}`} className="text-[#0046be] underline text-base">
                  {selectedCountryCode} {shippingData.phoneNumber}
                </a>
              </div>
            )}
          </div>
          {/* SSL Notice */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <span className="inline-flex items-center justify-center bg-gray-100 rounded-full p-1">
              <svg className="h-4 w-4 text-[#0046be]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="12" x="3" y="8" rx="2"/><path d="M7 8V6a5 5 0 0 1 10 0v2"/></svg>
            </span>
            <span>Your information is secured with SSL.</span>
          </div>
          {/* Loading Spinner and Message */}
          <div className="flex flex-col items-center gap-2 mt-2 mb-6">
            <div className="w-10 h-10 border-4 border-[#0046be]/30 border-t-[#0046be] rounded-full animate-spin mb-2"></div>
            <span className="text-base text-gray-700 font-medium">Finalizing your checkout. This won’t take long…</span>
          </div>
          {/* Trust Icon Row: Only Secure Checkout */}
          <div className="w-full flex justify-center mt-4 mb-2">
            <Image src="/secure-checkout.png?v=2" alt="Secure Checkout" width={392} height={63} className="h-16 w-auto max-w-full object-contain" />
          </div>
        </div>
      </div>
    );
  }

  const { product } = cartItem;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Link href={`/products/${product.slug}`} className="inline-flex items-center text-[#0046be] hover:text-[#003494] mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Product
          </Link>

          {currentStep === 'shipping' ? (
            /* Shipping Step - Two Column Layout */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary - On top for mobile, right for desktop */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 order-1 lg:order-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <Image 
                    src={product.images[0]} 
                    alt={product.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-xl shadow-sm mb-2 sm:mb-0"
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 text-base mb-1">{product.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span className="bg-white px-2 py-0.5 rounded-full inline-block">{product.condition}</span>
                      <span>Qty: {cartItem.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold text-lg text-[#0046be]">${product.price.toFixed(2)}</span>
                      {/* Trash icon for clear cart (mobile) */}
                      <button
                        onClick={handleClearCart}
                        className="sm:hidden p-2 rounded-full hover:bg-blue-50 text-[#0046be] transition-colors"
                        aria-label="Clear Cart"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold text-[#0046be] bg-blue-50 px-2 py-0.5 rounded-full">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-base font-bold border-t border-gray-200 pt-3">
                    <span>Total:</span>
                    <span className="text-[#0046be]">${product.price.toFixed(2)}</span>
                  </div>
                </div>
                {/* Trash icon+label for desktop */}
                <button
                  onClick={handleClearCart}
                  className="hidden sm:flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 text-[#0046be] border-2 border-[#0046be] rounded-xl hover:bg-blue-50 hover:text-[#0046be] transition-all duration-300 font-medium"
                  aria-label="Clear Cart"
                >
                  <Trash className="h-5 w-5" />
                  <span>Clear Cart</span>
                </button>
              </div>
              {/* Shipping Form - Below on mobile, left for desktop */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 order-2 lg:order-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Shipping Address</h2>
                
                <form onSubmit={handleContinueToCheckout} className="space-y-6">
                    {/* Street Address */}
                    <div>
                      <label htmlFor="streetAddress" className="block text-sm font-semibold text-gray-700 mb-3">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={shippingData.streetAddress}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-[#0046be] transition-all duration-300"
                        placeholder="Enter your street address"
                        autoComplete="street-address"
                      />
                    </div>

                    {/* City and State Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-3">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-[#0046be] transition-all duration-300"
                          placeholder="Enter your city"
                          autoComplete="address-level2"
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-3">
                          State/Province *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={shippingData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-[#0046be] transition-all duration-300"
                            placeholder="Enter your state or province"
                            autoComplete="address-level1"
                          />
                          {showStateSuggestions && stateSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                              {stateSuggestions.map((state) => (
                                <button
                                  key={state}
                                  type="button"
                                  onClick={() => handleStateSelect(state)}
                                  className="w-full text-left p-4 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                                >
                                  <div className="font-medium text-gray-900">{state}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-3">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-[#0046be] transition-all duration-300"
                        placeholder="10001"
                        autoComplete="postal-code"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-[#0046be] transition-all duration-300"
                        placeholder="Enter your email address"
                        autoComplete="email"
                      />
                      {emailError && (
                        <p className="mt-2 text-sm text-red-600">{emailError}</p>
                      )}
                    </div>

                    {/* Phone Number Input - Replace old select/input with custom dropdown and input */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-3">
                        Phone Number (Optional)
                      </label>
                      <div className="flex space-x-2">
                        <div ref={countryDropdownRef} className="relative w-auto min-w-[70px] max-w-[90px]">
                          <button
                            type="button"
                            className={`w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-[#0046be] transition-all duration-200 shadow-sm hover:border-[#003494] ${isCountryDropdownOpen ? 'ring-2 ring-[#0046be] border-[#0046be]' : ''}`}
                            onClick={() => setIsCountryDropdownOpen((open) => !open)}
                            aria-haspopup="listbox"
                            aria-expanded={isCountryDropdownOpen}
                            tabIndex={0}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') setIsCountryDropdownOpen(open => !open);
                              if (e.key === 'Escape') setIsCountryDropdownOpen(false);
                            }}
                          >
                            <span className="font-semibold text-base tracking-wide">{selectedCountry.code}</span>
                            <ChevronDown size={18} className={`ml-1 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isCountryDropdownOpen && (
                            <div className="absolute z-20 top-full left-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                              {countryCodes.map((country) => (
                                <button
                                  key={`${country.code}-${country.country}`}
                                  type="button"
                                  className="w-full text-left p-4 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                                  onClick={() => {
                                    setSelectedCountryCode(country.code);
                                    setIsCountryDropdownOpen(false);
                                  }}
                                >
                                  <div className="font-medium text-gray-900">{country.country}</div>
                                  <div className="text-sm text-gray-500">{country.code}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={shippingData.phoneNumber}
                          onChange={handleInputChange}
                          maxLength={15}
                          className={`flex-1 px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0046be] focus:border-[#0046be] transition-all duration-300 ${
                            phoneError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
                          }`}
                          placeholder="Enter your phone number (optional)"
                          autoComplete="tel"
                        />
                      </div>
                      {phoneError && (
                        <p className="mt-2 text-sm text-red-600">{phoneError}</p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">Optional - for delivery updates and order tracking</p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSendingEmail || isRedirecting}
                      className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                        isSendingEmail || isRedirecting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#0046be] hover:bg-[#003494] text-white'
                      }`}
                    >
                      {isSendingEmail ? 'Confirming Address...' : isRedirecting ? 'Redirecting...' : 'Continue to Payment'}
                    </button>

                    <div className="mt-6 flex flex-col items-center space-y-4">
                      <Image 
                        src="/secure-checkout.png?v=2" 
                        alt="Secure Checkout" 
                        width={392}
                        height={63}
                        className="h-16 w-auto max-w-full object-contain"
                      />
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-[#0046be]">SSL Encrypted</span> Secure Checkout
                      </div>
                      <p className="text-xs text-gray-500 text-center max-w-sm">
                        Your information is protected with bank-level security. We use industry-standard SSL encryption to ensure your data remains private and secure.
                      </p>
                    </div>
                  </form>
              </div>
            </div>
          ) : (
            /* Payment Step - Full Height Layout */
            <div className="max-w-6xl mx-auto">
              {/* Compact Shipping Summary */}
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#0046be] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Shipping to:</h3>
                    <p className="text-gray-600 text-sm">
                      {shippingData.streetAddress}, {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Section with Redirect */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                {isRedirecting ? (
                  <div className="p-12 text-center">
                    <div className="flex flex-col items-center space-y-6">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0046be]"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Address Has Been Confirmed</h3>
                        <p className="text-gray-600">Redirecting you to our secure payment processor...</p>
                      </div>
                      <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-100 max-w-md">
                        <h4 className="font-semibold text-green-900 mb-3">✓ Address Confirmed</h4>
                        <div className="text-sm text-green-800 space-y-1">
                          <p>{shippingData.streetAddress}</p>
                          <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                          {shippingData.phoneNumber && (
                            <p>Phone: {selectedCountryCode + shippingData.phoneNumber}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="flex flex-col items-center space-y-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Shipping Address Confirmed</h3>
                        <p className="text-gray-600">Your shipping information has been captured successfully.</p>
                      </div>
                      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 max-w-md">
                        <h4 className="font-semibold text-gray-900 mb-3">Shipping to:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{shippingData.streetAddress}</p>
                          <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                          {shippingData.phoneNumber && (
                            <p>Phone: {shippingData.phoneNumber}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsRedirecting(true);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setTimeout(() => {
                            window.location.href = product.checkoutLink;
                          }, 1000);
                        }}
                        className="mt-6 bg-[#0046be] hover:bg-[#003494] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage; 