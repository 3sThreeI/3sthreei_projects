import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { ParamsPropsServices } from "../web/page";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProblemSolving from "@/app/[locale]/assets/servicesComp/web/ProblemSolving";
import WorkingFlow from "@/app/[locale]/assets/workFlow/workingPricing";
import { NextIntlClientProvider } from "next-intl";

export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale: locale, namespace: "services" })
    const sitename = await getTranslations('sitenames') as any
    return {
        title: t("application.title"),
        description: t("application.description"),
        keywords: t.raw("application.keywords").join(", "),
        openGraph: {
            title: t("application.title"),
            description: t("application.description"),
            siteName: sitename,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/application`
        },
        "alternates": {
            canonical: `/${locale}/services/application`
        },
        robots: {
            index: true,
            follow: true,
        }
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
                <ProblemSolving messages={messages} type="app"/>
            </section>
            <section>
                <WorkingFlow messages={messages}/>
            </section>
            </NextIntlClientProvider>
        </>
    )
}