import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ParamProps } from "../../(marketing)/about/page";
import { FaTools } from "react-icons/fa";
import style from "./unavailable.module.css"
import Link from "next/link";
type Props = {
    params: Promise<{locale:string}>;
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "unavailable" })
    return {
        title: t('title'),
        description: t('description'),
        keywords: t.raw('keywords').join(', '),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/unavailable`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/unavailable`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/unavailable`,
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/unavailable`,
            type: "website",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            siteName: t('sitename'),
            images: [
                {
                    url: t("ogImage"),
                    width:1200,
                    height: 630,
                    alt: t("ogImageAlt"),
                },
            ],
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
// Param props is importing from about page.tsx
export default async function Unavailable({ params }: ParamProps) {
    const { locale } = await params
    const t = (await import(`@/messages/${locale}/unavailable.json`)).default
    return (
        <div className={style.container}>
            <div className={style.logo}>
                {/* <img className={style.img} src="/favicon.png" alt="3sthree logo" height={70} width={70}/> */}
                <h1 className={style.TextLogo}>3<span className={style.span}>S</span>Three<span className={style.span}>I</span></h1>
            </div>
            <div className={style.content}>
                <FaTools className={style.icon} />
                <p className={style.text}>{t.text1}</p>
                <p>{t.text2}</p>
            </div>
            <div className={style.btnBox}>
                <Link href="auth/login" className={style.btn}>Sign In</Link>
            </div>
        </div>
    )
}