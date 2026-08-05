import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import style from "./ranking.module.css"
import Image from "next/image"

type Props = {
    params: Promise<{ locale: string }>
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const path = "ranking-your-website"
    const t = await getTranslations({ locale, namespace: `blog.${path}` })

    return {
        title: t("title"),
        description: t("description"),
        keywords: t.raw("keywords").join(", "),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${path}`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/blog/${path}`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/blog/${path}`,
            },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            siteName: t("sitename"),
            type: "article",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${path}`,
            images: [
                {
                    url: t("ogImage"),
                    width: 1200,
                    height: 630,
                    alt: t("ogImageAlt"),
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: [t("ogImage")],
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

export default async function RankingWebSite({ params }: Props) {
    const { locale } = await params
    const t = (await import(`@/messages/${locale}/blog/ranking-your-website.json`)).default

    return (
        <main>
            <section className={style.hero}>
                <div className="">
                    <h1 className={style.title}>{t.title}</h1>
                    <div className="">
                        <p>Published by Abzar Camara <time dateTime="2026-08-04">—August 4, 2026</time></p>
                    </div>
                    <p className={style.description}>{t.description}</p>
                </div>
                <div className="">
                    <Image src={t.HeroImageUrl} alt={t.HeroImageAlt} height={100} width={100} loading="lazy" />
                </div>
            </section>
        </main>
    )
}