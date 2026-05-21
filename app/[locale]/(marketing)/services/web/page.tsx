import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WorkingFlow from "@/app/[locale]/assets/workFlow/workingPricing";

export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "services" })
    const sitename = await getTranslations('sitenames') as any
    return {
        "title": t("web.title"),
        "description": t("web.description"),
        "keywords": t.raw("web.keywords"),
        "openGraph": {
            "title": t("web.title"),
            "description": t("web.description"),
            "siteName": sitename,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/web`,
        },
        "alternates": {
            "canonical": `/${locale}/services/web`
        }
    }
}
export interface ParamsPropsServices {
    params: {locale:string}
}
export default async function Web({params}:ParamsPropsServices) {
    const {locale} = await params
    const messages = (await import(`@/messages/${locale}/services/web.json`)).default
    return (
        <>
        <NextIntlClientProvider messages={messages}>
            <section>
                <ServicesHero messages={messages}/>
            </section>
            <section>
                <WorkingFlow messages={messages}/>
            </section>
        </NextIntlClientProvider>
        </>
    )
}