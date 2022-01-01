import { Metadata } from "next";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import AbouHero from "../../assets/about/aboutHero/aboutHero";
import AboutUs from "../../assets/about/aboutUs/aboutUs";
import { NextIntlClientProvider } from "next-intl";

export interface ParamProps {
    params: Promise<{ locale: string }>;
}
export async function generateMetadata(params: Promise<{ locale: any }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "about" })
    const sitename = await getTranslations("sitename") as any
    return {
        title: t("title"),
        description: t('description'),
        keywords: t.raw('keywords').join(', '),
        openGraph: {
            title: t("title"),
            description: t('description'),
            siteName: sitename,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/about`
        },
        alternates: {
            canonical: `/${locale}/about`,
        },
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
                <AbouHero message={message}/>
            </section>
            <section>
                <AboutUs message={message}/>
            </section>
        </NextIntlClientProvider>
    )
}