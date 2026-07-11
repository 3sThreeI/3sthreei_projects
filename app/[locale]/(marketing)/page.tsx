import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
//  -----------Our import 
import Hero from '../assets/hero/hero';
import OurService from '@/app/[locale]/assets/servicesSection/services';
import WorkingWith from '@/app/[locale]/assets/workingWith/workingWith';
import WhyChooseUs from '@/app/[locale]/assets/whyChoose/chooseUs';
import WorkingFlow from '@/app/[locale]/assets/workFlow/workingPricing';
import Portfolio from '@/app/[locale]/assets/portfolio/portfolio';
import WorkingProcess from '@/app/[locale]/assets/process/process';
import Testimonial from '../assets/testimonial/testimonial';
import VideoMarketing from '../assets/videoMarketing/videoMarketing';
type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale: locale, namespace: 'home' })
  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords').join(', '),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      languages: {
        fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`
      }
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: t('sitename'),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      type: "website",
      locale: locale === "fr" ? 'fr_FR' : 'en_US',
      images: [
        {
          url: t('ogImage'),
          width: 1200,
          height: 630,
          alt: t('ogImageAlt')
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: [t("ogImage")],
    },
    robots: {
      index: true,
      follow: true
    },
    authors: [{ name: "3sthreei" }],
    creator: "3sthreei",
    publisher: "3sthreei",
  }
}
async function fetchTestimonials() {
  console.log("Publick backend url", process.env.NEXT_PUBLIC_BACKEND_URL)
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/feedback/`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!resp.ok) {
      // console.log("getting tetimonial failed: ")
      return [];
    }

    const data = await resp.json();
    // console.log("getting tetimonial successfully: ", data)
    return data.response ?? [];
  } catch (error) {
    // console.error("Failed to fetch testimonials:", error);
    return [];
  }
}
export default async function MarketingPage({ params }: Props) {
  const { locale } = await params
  const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL

  console.log("BACKEND:", process.env.NEXT_PUBLIC_BACKEND_URL);
  const feedback = await fetchTestimonials()
  const t = (await import(`@/messages/${locale}/jsonLD/homeJ.json`))
  console.log("home JSONT", t.description)
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": t.name,
    "@id": `${BaseUrl}#organization`,
    "url": `${BaseUrl}/${locale}`,
    "logo": [
      {
        "@type": "ImageObject",
        "url": "https://3sthreei.com/icons/3sthreei_icon_White.png",
        "caption": "3sthreei Company Logo"
      },
      {
        "@type": "ImageObject",
        "url": "https://3sthreei.com/icons/3sthreei_icon_Black.png",
        "caption": "3sthreei Company Logo"
      }],
    "alternateName": ["3s Threei", "3si", "3sthreei", "3s threei", "3SI", "threeSthreeI", "ThreeS3I"],
    "description": t.description,
    "telephone": locale === "fr" ? "+22391716839" : "+233592233681",
    "email": "abzarcamara3@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Accra",
      "addressRegion": "Greater Accra",
      "addressCountry": "GH"
    },
    "sameAs": [

    ],
    "founder": {
      "@type": "company",
      "name": "3sthreei",
      "email": "abzarcamara3@gmail.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === "fr" ? "Nos Services" : "Our Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": t.services.webDesignDesc,
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
        "telephone": "+22391716839",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "French"],
        "contactOption": "WhatsApp"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+233592233681",
        "contactType": "Customer Service",
        "contactOption": "WhatsApp",
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
    "inLanguage": [
      { "@type": "Language", "name": "English", "alternateName": "en" },
      { "@type": "Language", "name": "French", "alternateName": "fr" }
    ]
  }
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLD).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      {/*---------------------------- Services Section ---------------------------- */}
      <section>
        <OurService />
      </section>
      {/*---------------------------- We work with us Section ---------------------------- */}
      <section>
        <WorkingWith />
      </section>
      {/*---------------------------- why choose us Section <WhyChooseUs /> ---------------------------- */}
      {/*---------------------------- Process Section ---------------------------- */}
      <section>
        <WorkingProcess />
      </section>
      {/*---------------------------- WorkFlow Section ---------------------------- */}
      <section>
        {/* working flow is the table and the card of price of website and features */}
        <WorkingFlow />
      </section>
      {/*---------------------------- video Section ---------------------------- */}
      <section>
        <VideoMarketing />
      </section>
      {/*---------------------------- Portfolio Section ---------------------------- */}
      <section>
        <Portfolio />
      </section>
      {/*---------------------------- Testimonial Section ---------------------------- */}
      <section>
        <Testimonial feedback={feedback} />
      </section>
    </main>
  );
}