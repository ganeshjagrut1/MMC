import type { Metadata } from "next";
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
  metadataBase: new URL("https://maulimedicalcollege.com"),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.shortName}`,
  },
  description: `${SITE.name} — ${SITE.tagline}. Located at ${SITE.address}.`,
  keywords: [
    "Mauli Medical College",
    "MBBS admission",
    "medical college Maharashtra",
    "Buldhana medical college",
    "Anjani Khurd",
    "NEET MBBS",
    "hospital and research centre",
  ],
  applicationName: SITE.shortName,
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
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
  robots: { index: true, follow: true },
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
    </html>
  );
}
