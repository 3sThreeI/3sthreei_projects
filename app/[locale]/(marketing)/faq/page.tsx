import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import Faq from "../../assets/faq/faq";
type Props = {
    params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    const JsonT = (await import(`@/messages/${locale}/jsonLD/faqJ.json`)).default
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://3sthreei.com"
    const FaqJSONLD = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${BaseUrl}/${locale}/faq#faq-page`,
        "url": `${BaseUrl}/${locale}/faq`,
        "name": JsonT.name,
        "description": JsonT.description,
        "isPartOf": {
            "@id": `${BaseUrl}#website`,
        },
        "about": {
            "@type": "Organization",
            "@id": `${BaseUrl}#organization`,
        },
        "image": [
            {
                "@type": "ImageObject",
                "url": `${BaseUrl}/icons/3sthreei_icon_Black.png`,
                "caption": "3sthreei Company Logo"
            }
        ],
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": `${BaseUrl}/icons/3sthreei_icon_Black.png`,
        },
        "inLanguage": [
            { "@type": "Language", "name": locale === "fr" ? "French" : "English", "alternateName": locale }
        ],
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What services do you offer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer web design, development, e-commerce, gaming apps, and more."
                }
            }
        ]
    }
    const FaqBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": locale === "fr"? "Accueil" : "Home",
                "item": `${BaseUrl}/${locale}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name":  locale === "fr"? "FaQ" :"FaQ",
                "item": `${BaseUrl}/${locale}/faq`
            },
        ]
    }
    // console.log("***************FAQ rendered **************")
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(FaqJSONLD).replace(/</g, '\\u003c'), }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(FaqBreadcrumb).replace(/</g, '\\u003c'), }}
            />
            <NextIntlClientProvider messages={message}>
                <main>
                    {/* faq questions */}
                    <section>
                        <Faq messages={message} />
                    </section>
                </main>
            </NextIntlClientProvider>
        </>

    )
}