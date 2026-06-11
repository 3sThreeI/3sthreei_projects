import { title } from "process"
import style from "./audit.module.css"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ParamProps } from "../../about/page"
import FormAudit from "@/components/customComponent/formContact/formAudit"
export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "contactForm" })
    const sitename = await getTranslations('sitenames') as any
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            "siteName": sitename,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/contact-form`
        },
        alternates:{
            canonical: `/${locale}/contact-form`
        }
    }
}
// ParamProps is importing from about page.tsx
export default async function ProjectContactForm({params}:ParamProps) {
    const {locale} = await params
    const message = (await import(`@/messages/${locale}/forms.json`)).default
    return (
        <div className={style.container}>
            <FormAudit message={message} />
        </div>
    )
}