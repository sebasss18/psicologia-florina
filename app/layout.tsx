import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tudominio.com";
const SITE_NAME = "Psicóloga Florina";
const DESCRIPTION =
  "Terapia psicológica en un espacio tranquilo y seguro. Te escucho y te acompaño en tu proceso: ansiedad, depresión, duelo, pareja y más.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Terapia psicológica en Hermosillo`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Florina" }],
  creator: "Florina",
  keywords: [
    "psicóloga",
    "terapia psicológica",
    "psicoterapia",
    "ansiedad",
    "depresión",
    "terapia online",
    "Hermosillo",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Terapia psicológica`,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Un espacio tranquilo para escucharte`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Terapia psicológica`,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Psychologist",
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: "+52-000-000-0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hermosillo",
    addressRegion: "Sonora",
    addressCountry: "MX",
  },
  areaServed: "Hermosillo",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Saltar al contenido
        </a>

        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingSocial />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
