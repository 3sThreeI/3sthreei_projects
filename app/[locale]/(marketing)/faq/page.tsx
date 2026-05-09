import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import Faq from "../../assets/faq/faq";
interface Props {
    locale: string
}
export async function generateMetadata(params: Promise<Props>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "common" })
    return {
        title: t('faq.title'),
        description: t("faq.description"),
        keywords: t.raw("faq.keywords").join(', '),
        openGraph: {
            title: t('faq.title'),
            description: t("faq.description"),
            siteName: t('sitename'),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/faq`
        },
        alternates: {
            canonical: `/${locale}/faq`
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