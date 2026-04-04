import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
//  -----------Our import 
import Hero from '../assets/hero/hero';
import OurService from '@/components/customComponent/servicesSection/services';
import WorkingWith from '@/components/customComponent/workingWith/workingWith';
import WhyChooseUs from '@/components/customComponent/whyChoose/chooseUs';
import WorkingFlow from '@/components/customComponent/workFlow/workingPricing';
import Portfolio from '@/components/customComponent/portfolio/portfolio';
import WorkingProcess from '@/components/customComponent/process/process';
type Props = {
  params: { locale: string };
};

export async function generateMetadata(params: Promise<{ locale: any }>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common' })
  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords').join(', '),
    openGraph: {
      title: t('title'),
      description: t('description'),
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
    }
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
       {/*---------------------------- Portfolio Section ---------------------------- */}
       <section>
        <Portfolio />
       </section>
    </main>
  );
}