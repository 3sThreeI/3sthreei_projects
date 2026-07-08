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
export async function generateMetadata(params: Promise<{ locale: any }>): Promise<Metadata> {
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
export default async function OurProjects({params}:ParamProps) {
    const { locale } = await params 
    const message = (await import(`@/messages/${locale}/projects.json`)).default
    console.log("***********__project page rendered")
    return (
        <NextIntlClientProvider>
            <section>
                <ProjectHero message={message}/>
            </section>
            <section>
                {/* <Projects searchParams={searchParams} message={message} /> */}
            </section>
        </NextIntlClientProvider>
    )
}