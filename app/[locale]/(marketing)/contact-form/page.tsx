import { title } from "process"
import style from "./projectContactFom.module.css"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import FormContactCompt from "@/components/customComponent/formContact/formContact"
import { ParamProps } from "../about/page"
export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
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
    return (
        <div className={style.container}>
            <FormContactCompt message={message} searchParams={param} />
        </div>
    )
}