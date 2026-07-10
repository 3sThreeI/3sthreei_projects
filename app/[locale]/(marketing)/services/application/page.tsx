import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { ParamsPropsServices } from "../web/page";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProblemSolving from "@/app/[locale]/assets/servicesComp/web/ProblemSolving";
import WorkingFlow from "@/app/[locale]/assets/workFlow/workingPricing";
import { NextIntlClientProvider } from "next-intl";
type Props = {
    params: Promise<{locale:string}>;
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale: locale, namespace: "services" })
    return {
        title: t("application.title"),
        description: t("application.description"),
        keywords: t.raw("application.keywords").join(", "),
        "alternates": {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/application`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/services/application`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/services/application`
            }

        },
        openGraph: {
            title: t("application.title"),
            description: t("application.description"),
            siteName: t('sitename'),
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/application`,
            locale: locale === "fr" ? "fr_FR" : "en_US",
            images: [
                {
                    url: t("ogImage"),
                    width: 1200,
                    height: 630,
                    alt: t("ogImageAlt"),
                },
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: t("application.title"),
            description: t("application.description"),
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

export default async function Application({ params }: ParamsPropsServices) {
    const { locale } = await params
    const messages = (await import(`@/messages/${locale}/services/application.json`)).default
    return (
        <>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <section>
                    <ServicesHero messages={messages} />
                </section>
                <section>
                    <ProblemSolving messages={messages} type="app" />
                </section>
                <section>
                    <WorkingFlow messages={messages} />
                </section>
            </NextIntlClientProvider>
        </>
    )
}