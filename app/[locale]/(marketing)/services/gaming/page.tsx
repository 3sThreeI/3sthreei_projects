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
        openGraph: {
            title: t("game.title"),
            description: t("game.description"),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/game`
        },
        alternates: {
            canonical: `/${locale}/services/game`
        },
        robots: {
            index: true,
            follow: true,
        }
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