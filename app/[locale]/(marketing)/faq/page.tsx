import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import Faq from "../../assets/faq/faq";
type Props = {
   params: Promise<{locale:string}>;
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "faq" })
    return {
        title: t('title'),
        description: t("description"),
        keywords: t.raw("keywords").join(', '),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/faq`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/faq`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/faq`
            }
        },
        openGraph: {
            title: t('title'),
            description: t("description"),
            siteName: t('sitename'),
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/faq`,
            locale: locale === "fr" ? "fr_FR" : "fr_US",
            images: [
                {
                    url: t("ogImage"),
                    width: 1200,
                    height: 630,
                    alt: t("ogImageAlt"),
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t('description'),
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
export default async function OurFAQ({ params }: { params: any }) {
    const { locale } = await params
    const message = (await import(`@/messages/${locale}/faq.json`)).default
    console.log("***************FAQ rendered **************")
    return (
        <NextIntlClientProvider messages={message}>
            {/* faq questions */}
            <section>
                <Faq messages={message} />
            </section>
        </NextIntlClientProvider>
    )
}