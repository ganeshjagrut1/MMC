import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/theme.scss"; // one-time theme tokens (emits --c-* CSS vars)
import "./globals.css";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    // Lead with the exact brand query so "Mauli Medical College" ranks the
    // homepage; the rest of the phrase carries supporting keywords.
    default: `${SITE.shortName} | MBBS Admission, Hospital & Research Center, Buldhana`,
    template: `%s | ${SITE.shortName}`,
  },
  description: `${SITE.name} (${SITE.established}) — NMC-approved MBBS college offering quality medical education, a multi-speciality teaching hospital and research in ${SITE.address}. Apply for NEET-based MBBS admission.`,
  keywords: [
    "Mauli Medical College",
    "Mauli Medical College Buldhana",
    "Mauli Medical College Anjani Khurd",
    "MBBS admission Maharashtra",
    "medical college Maharashtra",
    "Buldhana medical college",
    "Anjani Khurd Lonar",
    "NEET MBBS admission",
    "hospital and research centre",
  ],
  applicationName: SITE.shortName,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "education",
  alternates: { canonical: "/" },
  // Paste the token from Google Search Console → Settings → Ownership
  // verification → HTML tag (the `content` value) to confirm ownership.
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: `${SITE.tagline}. Located at ${SITE.address}.`,
    images: [{ url: "/brand/logo.png", width: 486, height: 513, alt: SITE.name }],
  },
  twitter: {
    card: "summary",
    title: SITE.name,
    description: SITE.tagline,
    images: ["/brand/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-D83WWR7NTX"
        strategy="afterInteractive"
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GT-NB9B5XVB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-D83WWR7NTX');
          gtag('config', 'GT-NB9B5XVB');
        `}
      </Script>
    </html>
  );
}
