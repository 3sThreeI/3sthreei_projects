import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import style from "./blog1.module.css"

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const path = "why-website-not-ranking-on-google"
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

export default async function Blog1({ params }: Props) {
    const { locale } = await params
    const file = "why-website-not-ranking-on-google"
    const t = (await import(`@/messages/${locale}/blog/${file}.json`)).default

    const sections = Array.isArray(t.sections) ? t.sections : []
    const highlights = Array.isArray(t.highlights) ? t.highlights : []

    return (
        <div className={style.page}>
            <section className={style.hero}>
                <div className={style.heroContent}>
                    <div>
                        <p className={style.eyebrow}>{t.heroTag}</p>
                        <h1 className={style.title}>{t.title}</h1>
                        <p className={style.subtitle}>{t.subtitle}</p>
                        <div className={style.heroActions}>
                            <a className={style.primaryButton} href={`/${locale}/services/audit-web-site?type=audit`}>
                                {t.primaryButtonText}
                            </a>
                            <a className={style.secondaryButton} href={`/${locale}/services/web`}>
                                {t.secondaryButtonText}
                            </a>
                        </div>
                    </div>

                    <div className={style.heroCard}>
                        <p className={style.heroCardLabel}>{t.heroCardLabel}</p>
                        <h2 className={style.heroCardTitle}>{t.heroCardTitle}</h2>
                        <ul className={style.heroCardList}>
                            {highlights.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <main className={style.main}>
                <article className={style.article}>
                    <p className={style.intro}>{t.intro}</p>

                    <div className={style.contentWrap}>
                        {sections.map((section: { title: string; body: string[]; bullets?: string[] }) => (
                            <section key={section.title} className={style.section}>
                                <h2 className={style.sectionTitle}>{section.title}</h2>
                                {section.body.map((paragraph: string) => (
                                    <p key={paragraph} className={style.paragraph}>
                                        {paragraph}
                                    </p>
                                ))}
                                {section.bullets ? (
                                    <ul className={style.list}>
                                        {section.bullets.map((item: string) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </section>
                        ))}
                    </div>

                    <section className={style.cta}>
                        <div>
                            <p className={style.ctaEyebrow}>{t.ctaEyebrow}</p>
                            <h2 className={style.ctaTitle}>{t.ctaTitle}</h2>
                            <p className={style.ctaText}>{t.ctaText}</p>
                        </div>
                        <a className={style.primaryButton} href={`/${locale}/services/audit-web-site?type=audit`}>
                            {t.ctaButtonText}
                        </a>
                    </section>
                </article>
            </main>
        </div>
    )
}