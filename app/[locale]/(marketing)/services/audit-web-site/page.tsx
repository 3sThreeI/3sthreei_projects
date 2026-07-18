import { title } from "process"
import style from "./audit.module.css"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ParamProps } from "../../about/page"
import FormAudit from "@/components/customComponent/formContact/formAudit"
type Props = {
    params: Promise<{locale:string}>;
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "contactForm" })
    return {
        title: t('title'),
        description: t('description'),
        keywords: t.raw("keywords").join(", "),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/contact-form`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/contact-form`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact-form`,
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: t('sitename'),
            type: "website",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/contact-form`,
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
            title: t("title"),
            description: t("description"),
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
// ParamProps is importing from about page.tsx
interface SearchProps {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ type?: string }>
}
export default async function ProjectContactForm({ params, searchParams }: SearchProps) {
    const { locale } = await params
    const param = await searchParams
    const message = (await import(`@/messages/${locale}/forms.json`)).default
    const JsonT = (await import(`@/messages/${locale}/jsonLD/services/auditJ.json`)).default
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3sthreei.com"
         const appJSONLD = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${BaseUrl}/${locale}/services/app#app-page`,
        "url": `${BaseUrl}/${locale}/services/audit-web-site`,
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
                        "name": JsonT.performance.name,
                        "description": JsonT.performance.description,
                        "serviceType": JsonT.performance.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.performance.category,
                            "priceCurrency": JsonT.performance.curency
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.seo.name,
                        "description": JsonT.seo.description,
                        "serviceType": JsonT.seo.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.seo.category
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.accessibility.name,
                        "description": JsonT.accessibility.description,
                        "serviceType": JsonT.accessibility.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.accessibility.category
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.security.name,
                        "description": JsonT.security.description,
                        "serviceType": JsonT.security.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.security.category
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.ux.name,
                        "description": JsonT.ux.description,
                        "serviceType": JsonT.ux.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.ux.category
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 6,
                    "item": {
                        "@type": "Service",
                        "name": JsonT.technical.name,
                        "description": JsonT.technical.description,
                        "serviceType": JsonT.technical.type,
                        "offers": {
                            "@type": "Offer",
                            "category": JsonT.technical.category
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
                "name": locale === "fr" ? "Audit" : "Audit",
                "item": `${BaseUrl}/${locale}/services/audit-web-site`
            },
        ]
    }
    return (
        <div className={style.container}>
            <FormAudit message={message} searchParams={param.type ?? ""} />
        </div>
    )
}