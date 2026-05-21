import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { ParamsPropsServices } from "../web/page";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale: locale, namespace: "services" })
    return {
        title: t("design.title"),
        description: t("design.description"),
        keywords: t.raw("design.keywords").join(", "),
        openGraph: {
            title: t("design.title"),
            description: t("design.description"),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/design`
        },
        alternates: {
            canonical: `/${locale}/services/design`
        },
        robots: {
            index: true,
            follow: true,
        }
    }
}
export default async function Design({ params }: ParamsPropsServices) {
    const { locale } = await params;
    const messages = (await import(`@/messages/${locale}/services/design.json`))
    return (
        <>
            <section>
                <ServicesHero messages={messages} />
            </section>
        </>
    )
}