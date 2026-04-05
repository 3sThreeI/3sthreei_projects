// file imported for next-intl
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
// ---------------end of next-intl
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"
import React from "react";
import Navbar from "@/components/customComponent/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || ' http://localhost:3000'),
  title: {
    default: "3SThreeI | Build. Design. Learn.",
    template: "%s | 3SThreeI",
  },

  description:
    "3SThreeA is a SaaS platform where we build apps, games, web applications, design solutions, and provide professional tech courses.",
  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "3SThreeI | Build. Design. Learn.",
    description:
      "Apps, games, web solutions, creative design, and tech education — all in one SaaS ecosystem.",
    siteName: "3SThreeI",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "3SThreeI SaaS Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "3SThreeI | SaaS for Apps, Games & Learning",
    description:
      "Apps, games, web solutions, creative design, and tech education — powered by 3SThreeI.",
    images: [`${siteUrl}/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
  },
};
//  function added with next-intl
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
type Props = {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}

export default async function RootLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale)
  const messages = await getMessages({ locale })
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Navbar />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
