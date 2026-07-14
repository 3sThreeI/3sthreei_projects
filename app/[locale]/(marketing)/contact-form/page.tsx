import { title } from "process"
import style from "./projectContactFom.module.css"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import FormContactCompt from "@/components/customComponent/formContact/formContact"
import { ParamProps } from "../about/page"
type Props = {
    params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "contactForm" })
    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/contact-form`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/contact-form`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact-form`,
            }
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: t('sitename'),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/contact-form`,
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
// ParamProps is importing from about page.tsx
interface SearchProps {
    params: Promise<{ locale: string }>,
    searchParams: Promise<{ price?: string, type?: string }>
}
export default async function ProjectContactForm({ params, searchParams }: SearchProps) {
    const { locale } = await params
    const param = await searchParams
    const message = (await import(`@/messages/${locale}/forms.json`)).default
    const JsonT = (await import(`@/messages/${locale}/jsonLD/contact-form.json`)).default
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://3sthreei.com"
    // console.log("********** contact-form page has been rendere************", BaseUrl)
    const contactFormJSONLD = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${BaseUrl}/${locale}/contact-form#contact-page`,
        "url": `${BaseUrl}/${locale}/contact-form`,
        "name": JsonT.name,
        "description": JsonT.description,
        "isPartOf": {
            "@id": `${BaseUrl}#website`,
        },
        "about": {
            "@type": "Organization",
            "@id": `${BaseUrl}#organization`,
            "name": "3sthreei",
            "alternateName": ["3s Threei", "3si", "3SthreeI", "threeSthreeI", "3s3i", "threeS3I"],
            "url": BaseUrl,
            "description": JsonT.about.description,
            "telephone": locale === "fr" ? "+22391716839" : "+233592233681",
            "email": "abzarcamara3@gmail.com",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": locale === "fr" ? "Bamako" : "Accra",
                "addressRegion": locale === "fr" ? "Bamako" : "Greater Accra",
                "addressCountry": locale === "fr" ? "ML" : "GH",
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": JsonT.services,
                "itemListElement": [
                    {
                        "@type": "Service",
                        "name": JsonT.webDesign,
                        "description": JsonT.webDesignDesc
                    },
                    {
                        "@type": "Service",
                        "name": JsonT.webDevelopment,
                        "description": JsonT.webDevelopmentDesc
                    },
                    {
                        "@type": "Service",
                        "name": JsonT.desktopApps,
                        "description": JsonT.desktopAppsDesc
                    },
                    {
                        "@type": "Service",
                        "name": JsonT.gaming,
                        "description": JsonT.gamingDesc
                    },
                    {
                        "@type": "Service",
                        "name": JsonT.webApps,
                        "description": JsonT.webAppsDesc
                    }
                ]
            },
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
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+22391716839",
                "contactType": "Customer Service",
                "availableLanguage": ["English", "French"],
                "contactOption": "WhatsApp",
                "areaServed": {
                    "@type": "Country",
                    "name": "Mali"
                }
            },
            {
                "@type": "ContactPoint",
                "telephone": "+233592233681",
                "contactType": "Customer Service",
                "availableLanguage": ["English", "French"],
                "contactOption": "WhatsApp",
                "areaServed": {
                    "@type": "Country",
                    "name": "Ghana"
                }
            },
            {
                "@type": "ContactPoint",
                "email": "abzarcamara3@gmail.com",
                "contactType": "Customer Service",
                "availableLanguage": ["English", "French"],
                "contactOption": "Email"
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
    const contactFormBreadcrumb = {
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
                "name": locale === "fr" ? "contact-form" : "contact-from",
                "item": `${BaseUrl}/${locale}/contact-form`
            },
        ]
    }
    return (
        <div className={style.container}>
            <script type="application/json+ld"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFormJSONLD).replace(/</g, '\\u003c') }}
            />
            <script type="application/json+ld"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFormBreadcrumb).replace(/</g, '\\u003c') }}
            />
            <FormContactCompt message={message} searchParams={param} />
        </div>
    )
}