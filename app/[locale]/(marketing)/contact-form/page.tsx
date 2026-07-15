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
        "about": {
            "@type": "Organization",
            "@id": `${BaseUrl}#organization`,
        },
        "inLanguage": {
            "@type": "Language",
            "name": locale === 'fr' ? "French" : "English",
            "alternateName": locale
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": `${BaseUrl}/icons/3sthreei_icon_Black.png`,
        },
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