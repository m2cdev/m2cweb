import { Outfit, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"]
});

export const metadata = {
  metadataBase: new URL("https://map2close.com"),
  title: "Map2Close | B2B Sales Execution & Revenue Systems",
  description: "Standardize your high-stakes sales execution. We build the revenue systems B2B leaders need to map key accounts and close deals at scale.",
  keywords: ["B2B Sales Execution", "Revenue Operating Systems", "Deal Mapping", "Sales Strategy", "Pipeline Management"],
  openGraph: {
    title: "Map2Close | B2B Sales Execution & Revenue Operating Systems",
    description: "Map complexity. Close with precision. Standardized sales systems for elite teams.",
    type: "website",
    locale: "en_US",
    url: "https://map2close.com",
    siteName: "Map2Close",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Map2Close | Precision-Led Sales Execution",
    description: "Map complexity. Close with precision.",
    images: ["/og-image.jpg"],
  },
};

import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://map2close.com/#organization",
      "name": "Map2Close",
      "url": "https://map2close.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://map2close.com/images/logo.png"
      },
      "description": "Map2Close builds revenue systems for B2B sales teams - embedding inside organizations to standardize execution and close deals at scale.",
      "sameAs": [
        "https://www.linkedin.com/company/map2close"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://map2close.com/#website",
      "url": "https://map2close.com",
      "name": "Map2Close",
      "publisher": { "@id": "https://map2close.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://map2close.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${sora.variable} ${jetbrainsMono.variable} font-body bg-[#050505] text-white antialiased`}>
        <Navbar />
        <SmoothScrollProvider>
          <main className="relative z-10 min-h-screen">
            {children}
            <Footer className="relative z-50" />
          </main>
        </SmoothScrollProvider>
        <FloatingCTA />
      </body>
    </html>
  );
}
