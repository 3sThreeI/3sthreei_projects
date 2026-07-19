import ServicesHero from "@/components/customComponent/servicesHero/ServicesHero";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WorkingFlow from "@/app/[locale]/assets/workFlow/workingPricing";
import ProblemSolving from "@/app/[locale]/assets/servicesComp/web/ProblemSolving";
import WebServiceMarketing from "@/app/[locale]/assets/servicesComp/web/WebServiceMarketing";
type Props = {
    params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "services" })
    return {
        "title": t("web.title"),
        "description": t("web.description"),
        "keywords": t.raw("web.keywords"),
        "alternates": {
            "canonical": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/web`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/services/web`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/services/web`,
            },
        },
        "openGraph": {
            "title": t("web.title"),
            "description": t("web.description"),
            siteName: t('sitename'),
            type: "website",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/services/web`,
            images: [
                {
                    url: t('ogImage'),
                    width: 1200,
                    height: 630,
                    alt: t('ogImageAlt'),
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: t("web.title"),
            description: t("web.description"),
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
export interface ParamsPropsServices {
    params: { locale: string }
}
export default async function Web({ params }: ParamsPropsServices) {
    const { locale } = await params
    const messages = (await import(`@/messages/${locale}/services/web.json`)).default
    const JsonT = (await import(`@/messages/${locale}/jsonLD/services/webJ.json`)).default
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://3sthreei.com"
    // console.log("**********project page is has been rendere************", BaseUrl)
    const webJSONLD = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": `${BaseUrl}/${locale}/services/web#web-page`,
                "url": `${BaseUrl}/${locale}/services/web`,
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
                                "name": JsonT.frontend.name,
                                "description": JsonT.frontend.description,
                                "serviceType": JsonT.frontend.type,
                                "offers": {
                                    "@type": "Offer",
                                    "category": JsonT.frontend.category,
                                    "priceCurrency": JsonT.frontend.curency
                                }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "item": {
                                "@type": "Service",
                                "name": JsonT.backend.name,
                                "description": JsonT.backend.description,
                                "serviceType": JsonT.backend.type,
                                "offers": {
                                    "@type": "Offer",
                                    "category": JsonT.backend.category,
                                    "priceCurrency": JsonT.backend.curency
                                }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "item": {
                                "@type": "Service",
                                "name": JsonT.fullstack.name,
                                "description": JsonT.fullstack.description,
                                "serviceType": JsonT.fullstack.type,
                                "offers": {
                                    "@type": "Offer",
                                    "category": JsonT.fullstack.category,
                                    "priceCurrency": JsonT.fullstack.curency
                                }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "item": {
                                "@type": "Service",
                                "name": JsonT.Ecommerce.name,
                                "description": JsonT.Ecommerce.description,
                                "serviceType": JsonT.Ecommerce.type,
                                "offers": {
                                    "@type": "Offer",
                                    "category": JsonT.Ecommerce.category,
                                    "priceCurrency": JsonT.Ecommerce.curency
                                }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "item": {
                                "@type": "Service",
                                "name": JsonT.api.name,
                                "description": JsonT.api.description,
                                "serviceType": JsonT.api.type,
                                "offers": {
                                    "@type": "Offer",
                                    "category": JsonT.api.category,
                                    "priceCurrency": JsonT.api.curency
                                }
                            }
                        },
                        {
                            "@type": "ListItem",
                            "position": 6,
                            "item": {
                                "@type": "Service",
                                "name": JsonT.website.name,
                                "description": JsonT.website.description,
                                "serviceType": JsonT.website.type,
                                "offers": {
                                    "@type": "Offer",
                                    "category": JsonT.website.category,
                                    "priceCurrency": JsonT.website.curency
                                }
                            }
                        }
                    ]
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
                ]
            },
            {
                "@type": "WebPage",
                "@id": `${BaseUrl}/${locale}/services/web#page`,
                "url": `${BaseUrl}/${locale}/services/web`,
                "name":  JsonT.name,
                "description": JsonT.description,
                "isPartOf": {
                    "@id": `${BaseUrl}#website`,
                },
                "about": {
                    "@type": "Organization",
                    "@id": `${BaseUrl}#organization`,
                },
                
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
        ]
    }
    const webBreadcrumb = {
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
                "name": locale === "fr" ? "Service" : "Services",
                "item": `${BaseUrl}/${locale}/services`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": locale === "fr" ? "Web" : "Web",
                "item": `${BaseUrl}/${locale}/services/web`
            },
        ]
    }
    return (
        <>
            <NextIntlClientProvider messages={messages}>
                {/* h1 in servicesHero */}
                <script type="application/json+ld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webJSONLD).replace(/</g, '\\u003c') }}
                />
                <script type="application/json+ld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webBreadcrumb).replace(/</g, '\\u003c') }}
                />
                <section>
                    <ServicesHero messages={messages} />
                </section>
                {/* problem solving */}
                {/* h3 h3 in problem solving  */}
                <section>
                    <ProblemSolving messages={messages} type="web" />
                </section>
                <section>
                    <WebServiceMarketing messages={messages} />
                </section>
                <section>
                    <WorkingFlow messages={messages} />
                </section>
            </NextIntlClientProvider>
        </>
    )
}