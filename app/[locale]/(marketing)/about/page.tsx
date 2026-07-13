import { Metadata } from "next";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import AbouHero from "../../assets/about/aboutHero/aboutHero";
import AboutUs from "../../assets/about/aboutUs/aboutUs";
import { NextIntlClientProvider } from "next-intl";

export interface ParamProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ type?: string }>
}
export async function generateMetadata({ params }: ParamProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "about" })
    return {
        title: t("title"),
        description: t('description'),
        keywords: t.raw('keywords').join(', '),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/about`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/about`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/about`
            }
        },
        openGraph: {
            title: t("title"),
            description: t('description'),
            siteName: t('sitename'),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/about`,
            type: "website",
            locale: locale === "fr" ? 'fr_FR' : 'en_US',
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
export default async function AboutUS({ params }: ParamProps) {
    const { locale } = await params
    const message = (await import(`@/messages/${locale}/about.json`)).default;
    const JsonT = (await import(`@/messages/${locale}/jsonLD/aboutJ.json`)).default
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://3sthreei.com"
    // console.log("**********about page is has been rendere************", JsonT)
    const aboutJSONLD = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${BaseUrl}/${locale}/about#about-page`,
        "url": `${BaseUrl}/${locale}/about`,
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
            },
            {
                "@type": "ImageObject",
                "url": `${BaseUrl}/icons/3sthreei_icon_White.png`,
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
        "mainEntity": {
            "@type": "Organization",
            "@id": `${BaseUrl}#organization`
        }
    }
    const aboutBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": locale === "fr" ? "Accueil" : "Home",
                "item": `${BaseUrl}/${locale}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": locale === "fr" ? "À propos" : "About",
                "item": `${BaseUrl}/${locale}/about`
            },
        ]
    }
    return (
        <>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJSONLD).replace(/</g, '\\u003c'), }}
            />
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumb).replace(/</g, '\\u003c'), }}
            />
            <NextIntlClientProvider messages={message}>
                {/* -------------------about hero section */}
                <section>
                    <AbouHero message={message} />
                </section>
                <section>
                    <AboutUs message={message} />
                </section>
            </NextIntlClientProvider>
        </>
    )
}