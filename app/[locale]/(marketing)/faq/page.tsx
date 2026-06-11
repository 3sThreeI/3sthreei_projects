import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import Faq from "../../assets/faq/faq";
interface Props {
    locale: string
}
export async function generateMetadata(params: Promise<Props>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "faq" })
    const sitename = await getTranslations("sitename") as any
    return {
        title: t('title'),
        description: t("description"),
        keywords: t.raw("keywords").join(', '),
        openGraph: {
            title: t('title'),
            description: t("description"),
            siteName: sitename,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/faq`
        },
        alternates: {
            canonical: `/${locale}/faq`,
            languages:{
                "fr": `${process.env.NEXT_PUBLIC_SITE_URL}/fr`,
                "en": `${process.env.NEXT_PUBLIC_SITE_URL}/en`
            }
        }
    }
}
export default async function OurFAQ({ params }: { params: any }) {
    const { locale } = await params
    const message = (await import(`@/messages/${locale}/faq.json`)).default
    console.log("***************FAQ rendered **************")
    return (
        <NextIntlClientProvider messages ={message}>
            {/* faq questions */}
            <section>
                <Faq messages={message}/>
            </section>
        </NextIntlClientProvider>
    )
}