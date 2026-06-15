import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Marbella Twin Towers | Luxury 5 BHK Residences in New Chandigarh",
    template: "%s | Marbella Twin Towers",
  },
  description:
    "Marbella Twin Towers - Premium luxury 5 BHK apartments on Airport Road, New Chandigarh. Experience opulent living with world-class amenities. RERA registered: PBRERA-SAS80-PR0616",
  keywords: [
    "Marbella Twin Towers",
    "Marbella Twin Towers Mohali",
    "Luxury apartments Chandigarh",
    "5 BHK New Chandigarh",
    "Premium residences Airport Road",
    "Luxury highrise Mohali",
  ],
  authors: [{ name: "Tangent Promoters" }],
  creator: "Tangent Promoters",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://marbellatwintowers.tangentpromoters.com",
    siteName: "Marbella Twin Towers",
    title: "Marbella Twin Towers | Luxury 5 BHK Residences",
    description: "Premium luxury apartments in New Chandigarh",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marbella Twin Towers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marbella Twin Towers | Luxury 5 BHK Residences",
    description: "Premium luxury apartments in New Chandigarh",
    images: ["/images/og-image.jpg"],
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
  alternates: {
    canonical: "https://marbellatwintowers.tangentpromoters.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0f172a",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#6366f1",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
