import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { ParamsPropsServices } from "../web/page";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProblemSolving from "@/app/[locale]/assets/servicesComp/web/ProblemSolving";
import WorkingFlow from "@/app/[locale]/assets/workFlow/workingPricing";
import { NextIntlClientProvider } from "next-intl";
type Props = {
    params: Promise<{locale:string}>;
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale: locale, namespace: "services" })
    return {
        title: t("application.title"),
        description: t("application.description"),
        keywords: t.raw("application.keywords").join(", "),
        "alternates": {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/application`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/services/application`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/services/application`
            }

        },
        openGraph: {
            title: t("application.title"),
            description: t("application.description"),
            siteName: t('sitename'),
            type: "website",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/application`,
            locale: locale === "fr" ? "fr_FR" : "en_US",
            images: [
                {
                    url: t("ogImage"),
                    width: 1200,
                    height: 630,
                    alt: t("ogImageAlt"),
                },
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: t("application.title"),
            description: t("application.description"),
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

export default async function Application({ params }: ParamsPropsServices) {
    const { locale } = await params
    const messages = (await import(`@/messages/${locale}/services/application.json`)).default
    const JsonT = (await import(`@/messages/${locale}/jsonLD/services/appJ.json`)).default
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3sthreei.com"
     const appJSONLD = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${BaseUrl}/${locale}/services/app#app-page`,
        "url": `${BaseUrl}/${locale}/services/app`,
        "name": JsonT.name,
        "description": JsonT.description,
        "serviceType": JsonT.type,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": JsonT.catalogName,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.android.name,
                        "description": JsonT.android.description,
                        "serviceType": JsonT.android.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.android.category,
                            "priceCurrency": JsonT.android.curency
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.ios.name,
                        "description": JsonT.ios.description,
                        "serviceType": JsonT.ios.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.ios.category
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.crossPlatform.name,
                        "description": JsonT.crossPlatform.description,
                        "serviceType": JsonT.crossPlatform.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.crossPlatform.category
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.uiux.name,
                        "description": JsonT.uiux.description,
                        "serviceType": JsonT.uiux.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.uiux.category
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.maintenance.name,
                        "description": JsonT.maintenance.description,
                        "serviceType": JsonT.maintenance.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.maintenance.category
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 6,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.publishing.name,
                        "description": JsonT.publishing.description,
                        "serviceType": JsonT.publishing.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.publishing.category
                        }
                    }
                }
            ]
        },
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
    const appBreadcrumb = {
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
                "name": locale === "fr" ? "Services" : "Services",
                "item": `${BaseUrl}/${locale}/services`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": locale === "fr" ? "Application" : "Application",
                "item": `${BaseUrl}/${locale}/services/application`
            },
        ]
    }
    return (
        <>
            <NextIntlClientProvider locale={locale} messages={messages}>
                 <script type="application/json+ld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(appJSONLD).replace(/</g, '\\u003c') }}
                />
                <script type="application/json+ld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(appBreadcrumb).replace(/</g, '\\u003c') }}
                />
                <section>
                    <ServicesHero messages={messages} />
                </section>
                <section>
                    <ProblemSolving messages={messages} type="app" />
                </section>
                <section>
                    <WorkingFlow messages={messages} />
                </section>
            </NextIntlClientProvider>
        </>
    )
}