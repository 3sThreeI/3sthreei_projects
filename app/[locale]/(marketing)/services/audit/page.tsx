import { title } from "process"
import style from "./audit.module.css"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ParamProps } from "../../about/page"
import FormAudit from "@/components/customComponent/formContact/formAudit"
export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "contactForm" })
    return {
        title: t('title'),
        description: t('description'),
        keywords: t.raw("keywords").join(", "),
        alternates: {
            canonical: `/${locale}/contact-form`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/contact-form`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/contact-form`
            }
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: t('sitename'),
            type: "website",
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
export default async function ProjectContactForm({ params }: ParamProps) {
    const { locale } = await params
    const message = (await import(`@/messages/${locale}/forms.json`)).default
    return (
        <div className={style.container}>
            <FormAudit message={message} searchParams="" />
        </div>
    )
}