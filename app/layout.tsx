import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { siteConfig } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} ${siteConfig.brand.subName} · 바이브코딩 웹 앱 컬렉션`,
  description: siteConfig.hero.subtitle,
  keywords: [
    "바이브코딩",
    "PWA",
    "Simple Reader",
    "Word Smart",
    "Simple Schedule",
    "My Drive Finder",
    "Lens Dictionary",
    "Subway Tracker",
    "구글 OAuth",
    "개인정보처리방침",
  ],
  authors: [{ name: siteConfig.brand.developer, url: siteConfig.brand.githubUrl }],
  icons: {
    icon: [
      { url: "/icons/logo.svg", type: "image/svg+xml" },
      { url: "/icons/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/logo.png",
  },
  openGraph: {
    title: `${siteConfig.brand.name} ${siteConfig.brand.subName}`,
    description: siteConfig.hero.subtitle,
    type: "website",
    locale: "ko_KR",
  },
  verification: {
    google: "WdxZQ1sGoma51XTaHhrfapOp64txalt2SBACCB7GOCY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-[#0b1326] text-[#dae2fd] antialiased selection:bg-indigo-500 selection:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
