import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WorkingFlow from "@/app/[locale]/assets/workFlow/workingPricing";
import ProblemSolving from "@/app/[locale]/assets/servicesComp/web/ProblemSolving";
import WebServiceMarketing from "@/app/[locale]/assets/servicesComp/web/WebServiceMarketing";
type Props = {
    params: Promise<{locale:string}>;
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "services" })
    return {
        "title": t("web.title"),
        "description": t("web.description"),
        "keywords": t.raw("web.keywords"),
        "alternates": {
            "canonical": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/web`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/services/web`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/services/web`,
            },
        },
        "openGraph": {
            "title": t("web.title"),
            "description": t("web.description"),
            siteName: t('sitename'),
            type: "website",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/web`,
            images: [
                {
                    url: t('ogImage'),
                    width: 1200,
                    height: 630,
                    alt: t('ogImageAlt'),
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: t("web.title"),
            description: t("web.description"),
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
export interface ParamsPropsServices {
    params: { locale: string }
}
export default async function Web({ params }: ParamsPropsServices) {
    const { locale } = await params
    const messages = (await import(`@/messages/${locale}/services/web.json`)).default
    return (
        <>
            <NextIntlClientProvider messages={messages}>
                {/* h1 in servicesHero */}
                <section>
                    <ServicesHero messages={messages} />
                </section>
                {/* problem solving */}
                {/* h3 h3 in problem solving  */}
                <section>
                    <ProblemSolving messages={messages} type="web" />
                </section>
                <section>
                    <WebServiceMarketing messages={messages} />
                </section>
                <section>
                    <WorkingFlow messages={messages} />
                </section>
            </NextIntlClientProvider>
        </>
    )
}