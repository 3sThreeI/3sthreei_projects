import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AbouHero from "../../assets/about/aboutHero/aboutHero";
import AboutUs from "../../assets/about/aboutUs/aboutUs";

type Props = {
    params: { locale: string };
}
export async function generateMetadata(params: Promise<{ locale: any }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "common" })
    return {
        title: t("about.title"),
        description: t('about.description'),
        keywords: t.raw('about.keywords').join(', '),
        openGraph: {
            title: t("about.title"),
            description: t('about.description'),
            siteName: t('sitename'),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/about`
        },
        alternates: {
            canonical: `/${locale}/about`
        }
    }
}
export default function AboutUS() {
    return (
        <>
        {/* -------------------about hero section */}
        <section>
            <AbouHero />
        </section>
        <section>
            <AboutUs />
        </section>
        </>
    )
}