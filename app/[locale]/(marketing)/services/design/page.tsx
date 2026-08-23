import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { ParamsPropsServices } from "../web/page";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
type Props = {
    params: Promise<{locale:string}>;
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale: locale, namespace: "services" })
    return {
        title: t("design.title"),
        description: t("design.description"),
        keywords: t.raw("design.keywords").join(", "),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/design`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/services/design`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/services/design`,
            },
        },
        openGraph: {
            title: t("design.title"),
            description: t("design.description"),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/design`,
            siteName: t('sitename'),
            type: "website",
            locale: locale === "fr" ? "fr_US" : "en_US",
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
           title: t("design.title"),
            description: t("design.description"),
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
export default async function Design({ params }: ParamsPropsServices) {
    const { locale } = await params;
    const messages = (await import(`@/messages/${locale}/services/design.json`))
    return (
        <>
            <section>
                {/* <ServicesHero messages={messages} /> */}
            </section>
        </>
    )
}