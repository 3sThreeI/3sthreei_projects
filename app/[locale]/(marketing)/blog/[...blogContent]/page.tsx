import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

type Props = {
    params: Promise<{locale:string, documentation:string[]}>
}
export async function generateMetadata({params}: Props):Promise<Metadata>{
    const {locale, documentation} = await params
    const file =  documentation?.at(-1) || documentation?.[documentation.length - 1] || 'e-commerce'
    const t = await getTranslations({locale, namespace:`blog.${file}`})

    return {
        title: t("title"),
        description: t("description"),
        keywords: t.raw("keywords").join(", "),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${documentation.join("/")}`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/${documentation.join("/")}`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/${documentation.join("/")}`,
            }
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: t('sitename'),
            type: "article",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${documentation.join("/")}`,
            images: [
                {
                    url: t('ogImage'),
                    width: 1200,
                    height: 630,
                    alt: t('ogImageAlt'),
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

export default async function BlogContent({params}: Props){
    const {locale, documentation } = await params
    const file = documentation.at(-1) || documentation[documentation.length -1] || "blog"
    const message = (await import(`@/messages/${locale}/blog/${file}.json`)).default
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3sthreei.com"
    return (
        <>
        
        </>
    )
}