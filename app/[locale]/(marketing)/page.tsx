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

export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
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
      url: locale === "fr" ? `${process.env.NEXT_PUBLIC_SITE_URL}/fr` :  `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
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
export default async function MarketingPage() {
  console.log("BACKEND:", process.env.NEXT_PUBLIC_BACKEND_URL);
  const feedback = await fetchTestimonials()

  return (
    <main>
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