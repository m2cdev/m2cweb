import { Sora, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const sora = Sora({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"]
});

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["300", "400", "500", "600"]
});

export const metadata = {
  metadataBase: new URL("https://map2close.com"),
  title: "Map2Close | Professional Sales Execution & Strategy",
  description: "Specialized consultancy for elite sales organizations. We map the complexity of high-stakes deals to close faster with repeatable precision.",
  keywords: ["Sales Enablement", "Deal Mapping", "Sales Strategy", "Sales Consultancy"],
  openGraph: {
    title: "Map2Close | High-Performance Sales Enablement Strategy",
    description: "Map complexity. Close with precision.",
    type: "website",
    locale: "en_US",
    url: "https://map2close.com",
    siteName: "Map2Close",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Map2Close | Precision-Led Sales Enablement",
    description: "Map complexity. Close with precision.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} ${outfit.variable} font-body bg-black text-white antialiased`}>
        <Navbar />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <FloatingCTA />
        
        <Footer />
      </body>
    </html>
  );
}
