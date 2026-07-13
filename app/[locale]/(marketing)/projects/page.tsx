import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ProjectHero from "../../assets/projects/ProjectHero";
import { NextIntlClientProvider } from "next-intl";
import Projects from "../../assets/projects/projects";
import { ParamProps } from "../about/page";

type Props = {
    params:Promise<{ locale: string }>;
    searchParams: Promise<{type?:string}>
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "project" })
    return {
        title: t('title'),
        description: t('description'),
        keywords: t.raw('keywords').join(', '),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/projects`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/projects`
            }
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: t('sitename'),
            type: "website",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects`,
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
export default async function OurProjects({params, searchParams}:ParamProps) {
    const { locale } = await params 
    const message = (await import(`@/messages/${locale}/projects.json`)).default
     const JsonT = (await import(`@/messages/${locale}/jsonLD/projectJ.json`)).default
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://3sthreei.com"
    console.log("**********project page is has been rendere************", BaseUrl)
    const projectJSONLD = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${BaseUrl}/${locale}/project#project-page`,
        "url": `${BaseUrl}/${locale}/project`,
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
    const projectBreadcrumb = {
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
                "name": locale === "fr" ? "Projet" : "Project",
                "item": `${BaseUrl}/${locale}/Project`
            },
        ]
    }
    // console.log("***********__project page rendered")
    return (
        <NextIntlClientProvider>
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(projectJSONLD).replace(/</g, '\\u003c')}}
            />
             <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(projectBreadcrumb).replace(/</g, '\\u003c')}}
            />
            <section>
                <ProjectHero message={message}/>
            </section>
            <section>
                <Projects searchParams={searchParams} message={message} />
            </section>
        </NextIntlClientProvider>
    )
}