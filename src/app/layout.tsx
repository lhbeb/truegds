import type { Metadata } from "next";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramSection from "@/components/InstagramSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";
import { Suspense } from "react";
import VisitNotifier from "@/components/VisitNotifier";

export const metadata: Metadata = {
  title: "Truegds - Your Trusted Marketplace for Everything.",
  description: "Shop millions of products at Truegds: electronics, fashion, home, collectibles, toys, beauty, gadgets, and more. Discover unbeatable deals, fast shipping, and a secure shopping experience—just like eBay, but happier!",
  keywords: "Truegds, online marketplace, general store, electronics, fashion, home, collectibles, toys, beauty, gadgets, deals, shopping, eBay alternative, secure checkout, fast shipping",
  authors: [{ name: "Truegds" }],
  creator: "Truegds",
  publisher: "Truegds",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://truegds.com"),
  openGraph: {
    title: "Truegds - Your Trusted Marketplace for Everything.",
    description: "Shop millions of products at Truegds: electronics, fashion, home, collectibles, toys, beauty, gadgets, and more. Discover unbeatable deals, fast shipping, and a secure shopping experience—just like eBay, but happier!",
    url: "https://truegds.com",
    siteName: "Truegds",
    images: [
      {
        url: "/g7x.webp",
        width: 1200,
        height: 630,
        alt: "Truegds - Online Marketplace for Everything",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Truegds - Your Trusted Marketplace for Everything.",
    description: "Shop millions of products at Truegds: electronics, fashion, home, collectibles, toys, beauty, gadgets, and more. Discover unbeatable deals, fast shipping, and a secure shopping experience—just like eBay, but happier!",
    images: ["/g7x.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preload" href="/logosvg.svg" as="image" type="image/svg+xml" />
      </head>
      <body>
        <VisitNotifier />
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Truegds",
              "url": "https://truegds.com",
              "logo": "https://truegds.com/logosvg.svg",
              "description": "Truegds - Where Savings Make You Smile. Discover premium cameras and photography equipment at unbeatable prices.",
              "sameAs": [
                "https://twitter.com/truegds",
                "https://facebook.com/truegds",
                "https://instagram.com/truegds"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@truegds.com"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            })
          }}
        />
        
        {/* WebSite Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Truegds",
              "url": "https://truegds.com",
              "description": "Truegds - Where Savings Make You Smile. Discover premium cameras and photography equipment at unbeatable prices.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://truegds.com/api/products/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={null}>
              <ClientHeader />
            </Suspense>
            <main className="flex-grow">
              {children}
            </main>
            <InstagramSection />
            <NewsletterSection />
            <Footer />
          </div>
          <CookieConsent />
        </ErrorBoundary>
        
        {/* Tidio Live Chat Widget */}
        <Script
          src="//code.tidio.co/f2nijehl3bgqointq49w7bofzavxnxmm.js"
          async
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-820YBJWJCY"
          strategy="afterInteractive"
          async
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-820YBJWJCY');
            `,
          }}
        />
      </body>
    </html>
  );
}
