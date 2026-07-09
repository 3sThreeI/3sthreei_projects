import { Metadata } from "next";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import AbouHero from "../../assets/about/aboutHero/aboutHero";
import AboutUs from "../../assets/about/aboutUs/aboutUs";
import { NextIntlClientProvider } from "next-intl";

export interface ParamProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ type?: string }>
}
export async function generateMetadata(params: Promise<{ locale: any }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "about" })
    return {
        title: t("title"),
        description: t('description'),
        keywords: t.raw('keywords').join(', '),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/about`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/about`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/about`
            }
        },
        openGraph: {
            title: t("title"),
            description: t('description'),
            siteName: t('sitename'),
            url: locale === "fr" ? `${process.env.NEXT_PUBLIC_SITE_URL}/fr/about` : `${process.env.NEXT_PUBLIC_SITE_URL}/en/about`,
            type: "website",
            locale: locale === "fr" ? 'fr_FR' : 'en_US',
            images: [
                {
                    url: t("ogImage"),
                    width: 1200,
                    height: 630,
                    alt: t("ogImageAlt"),
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t('description'),
            images: [t("ogImage")]
        },
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "3sthreei" }],
        category: "3sthreei",
        publisher: "3sthreei",
    }
}
export default async function AboutUS({ params }: ParamProps) {
    const { locale } = await params
    const message = (await import(`@/messages/${locale}/about.json`)).default;
    console.log("**********about page is has been rendere************")
    return (
        <NextIntlClientProvider messages={message}>
            {/* -------------------about hero section */}
            <section>
                <AbouHero message={message} />
            </section>
            <section>
                <AboutUs message={message} />
            </section>
        </NextIntlClientProvider>
    )
}