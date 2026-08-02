// file imported for next-intl
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Script from "next/script";
// ---------------end of next-intl
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"
import React from "react";
import Navbar from "@/components/customComponent/navbar/Navbar";
import Footer from "@/components/customComponent/footer/Footer";
import PreNavBar from "../../components/customComponent/preNavBar/preNavBar";
import {BetaProvider} from "./context/betaContext";
import BetaNavbar from "@/components/customComponent/navbar/PreNav";

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
  metadataBase: new URL(siteUrl || `${process.env.NEXT_PUBLIC_SITE_URL}`),
  title: {
    default: "3SThreeI | Build. Design. Learn.",
    template: "%s | 3sthreeI",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
    languages: {
      fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/`,
      en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/`
    }
  },
  description:
    "3SThreeA is a SaaS platform where we build apps, games, web applications, design solutions, and provide professional tech courses.",
  icons: {
    icon: [
      { url: '/3si_favicon_whiteB.png', sizes: '16x16', type: 'image/png' },
      { url: '/3si_faviconBlack.png', sizes: '32x32', type: 'image/png' },
    ],
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
// function to call BetaVersion Date
const GetBetaVersionInfo =  async ()=>{
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/beta/test-3si`, {
    method: "GET",
    cache: "no-store"
  },)
  const data = await resp.json()
  if(!resp.ok){
    return false
  }
  return data
  
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
  const t = (await import(`@/messages/${locale}/jsonLD/homeJ.json`)).default
  // console.log("titel tttt", t)
  const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3sthreei.com"
  const OrgjsonLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": t.name,
    "@id": `${BaseUrl}#organization`,
    "url": BaseUrl,
    "image": `${BaseUrl}/icons/3sthreei_icon_Black.png`,
    "logo": {
      "@type": "ImageObject",
      "url": `${BaseUrl}/icons/3sthreei_icon_White.png`,
      "caption": "3sthreei Company Logo"
    },
    "alternateName": ["3s Threei", "3si", "3sthreei", "3s threei", "3SI", "threeSthreeI", "ThreeS3I"],
    "description": t.description,
    "telephone": locale === "fr" ? "+22391716839" : "+233592233681",
    "email": "abzarcamara3@gmail.com",
    "legalName": "3sthreei",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locale === "fr" ? "Bamako" : "Accra",
      "addressRegion": locale === "fr" ? "Bamako" : "Greater Accra",
      "addressCountry": locale === "fr" ? "ML" : "GH"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61591687297760",
    ],
    "founder": {
      "@type": "Person",
      "name": "Abzar Camara",
      "email": "abzarcamara3@gmail.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === "fr" ? "Nos Services" : "Our Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": t.services.webDesign,
          "description": t.services.webDesignDesc
        },
        {
          "@type": "Service",
          "name": t.services.gaming,
          "description": t.services.gamingDesc
        },
        {
          "@type": "Service",
          "name": t.services.desktop,
          "description": t.services.desktopDesc
        },
        {
          "@type": "Service",
          "name": t.services.website,
          "description": t.services.websiteDesc
        },
        {
          "@type": "Service",
          "name": t.services.webApp,
          "description": t.services.webAppDesc
        }
      ]
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+233592233681",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "French"],
        "description": "Available on WhatsApp"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+233592233681",
        "contactType": "Customer Service",
        "description": "Available on WhatsApp",
        "availableLanguage": ["English", "French"]
      },
      {
        "@type": "ContactPoint",
        "email": "abzarcamara3@gmail.com",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "French"]
      }
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Ghana"
      },
      {
        "@type": "Country",
        "name": "Mali"
      },
      {
        "@type": "Country",
        "name": "Global"
      }
    ],
    "foundingDate": "2026-04-12",
  }
  const websiteJSONLD = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BaseUrl}#website`,
    "url": BaseUrl,
    "name": t.name,
    "description": t.description,
    "publisher": {
      "@id": `${BaseUrl}#organization`
    },
    "inLanguage": locale === "fr" ? "fr" : "en",
  };
  const beta = await GetBetaVersionInfo()
  // console.log("beta-------", beta)
  return (
    <html lang={locale}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8GGKE9NHJ4" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8GGKE9NHJ4');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(OrgjsonLD).replace(/</g, '\\u003c'), }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJSONLD).replace(/</g, '\\u003c'), }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <PreNavBar/> */}
        <BetaProvider values={beta}>
        <NextIntlClientProvider messages={messages}>
          <BetaNavbar/>
        <Navbar/>
          {children}
        </NextIntlClientProvider>
        <Footer />
        </BetaProvider>
      </body>
    </html>
  );
}
