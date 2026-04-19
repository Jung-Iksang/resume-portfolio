import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Iksang Jung | Portfolio",
  description: "Interactive portfolio of Iksang Jung (정익상).",
  keywords: "정익상, Iksang Jung, Computer Science, Developer, Portfolio",
  authors: [{ name: "정익상" }],
  creator: "정익상",
  publisher: "정익상",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Iksang Jung - Portfolio",
    description: "Interactive portfolio of Iksang Jung (정익상).",
    url: "https://github.com/Jung-Iksang",
    siteName: "Iksang Jung's Portfolio",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iksang Jung - Portfolio",
    description: "Interactive portfolio of Iksang Jung (정익상).",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
