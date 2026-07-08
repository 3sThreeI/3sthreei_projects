import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { getLocale, getTranslations } from "next-intl/server";
import { ParamsPropsServices } from "../web/page";
import { Metadata } from "next";

export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale: locale, namespace: "services" })
    return {
        title: t("game.title"),
        description: t("game.description"),
        keywords: t.raw("game.keywords").join(", "),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/game`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/services/game`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/services/game`,
            },
        },
        openGraph: {
            title: t("game.title"),
            description: t("game.description"),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/game`,
            type: "website",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            siteName: t('sitename'),
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
            title: t("game.title"),
            description: t("game.description"),
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
export default async function Game({ params }: ParamsPropsServices) {
    const { locale } = await params
    const messages = (await import(`@/messages/${locale}/services/game.json`))
    console.log("this is the message", messages)
    return (
        <>
            <section>
                <ServicesHero messages={messages} />
            </section>
        </>
    )
}