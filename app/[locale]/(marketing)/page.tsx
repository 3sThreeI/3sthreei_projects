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

export async function generateMetadata(params: Promise<{ locale: any }>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common' })
  return {
    title: t('home.title'),
    description: t('home.description'),
    keywords: t.raw('home.keywords').join(', '),
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      siteName: t('sitename'),
      url: `${process.env.NEXT_PUBLIC_API_URL}/${locale}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-en.png`,
          width: 1200,
          height: 630,
          alt: t('sitename')
        }
      ]
    },
    alternates: {
    canonical: `/${locale}`,
  },
  }
}

export default async function MarketingPage() {
  const t = await getTranslations('common')
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
       {/*---------------------------- why choose us Section ---------------------------- */}
       <section >
        {/* <WhyChooseUs /> */}
       </section>
       {/*---------------------------- Process Section ---------------------------- */}
       <section>
        <WorkingProcess />
       </section>
       {/*---------------------------- WorkFlow Section ---------------------------- */}
       <section>
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
        <Testimonial />
       </section>
    </main>
  );
}