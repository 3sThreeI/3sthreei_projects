import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import style from "./ranking.module.css"
import Image from "next/image"
import { FaFacebookF, FaLinkedin } from "react-icons/fa"

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
                "fr": `${process.env.NEXT_PUBLIC_SITE_URL}/fr/blog/${path}`,
                "en": `${process.env.NEXT_PUBLIC_SITE_URL}/en/blog/${path}`,
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
        <main className={style.container}>
            <div className={style.section}>
            <section className={style.hero}>
                <div className="">
                    <h1 className={style.title}>{t.title}</h1>
                    <div className="">
                        <p>Published by Abzar Camara <time dateTime="2026-08-04">—August 7, 2026</time></p>
                    </div>
                    <p className={style.description}>{t.description}</p>
                </div>
                <div className="">
                     <figure>
                        <Image decoding="async" src={t.HeroImageUrl} alt={t.HeroImageAlt} height={100} width={100} loading="lazy" />
                    </figure>
                </div>
            </section>
            <section className={style.body}>
                <div className={style.header}>
                    <p>{t.body.header}</p>
                </div>
                <div className={style.bodyGrid}>
                    <div className={style.mainContent}>
                        <div className={style.Metadata}>
                            <h2>{t.body.metadataTitle}</h2>
                            <p>{t.body.metadataDescription}</p>
                            {/* for title */}
                            <div id="meta-title" className={style.titleContainer}>
                                <h3 className={style.metaTitle}>
                                    <label htmlFor="" className={style.metaList}>{t.body.metaTitle.label}</label>
                                    {" "}{t.body.metaTitle.title}
                                    </h3>
                        <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaTitle.code1} <br />
                                {t.body.metaTitle.code2} <br />
                                {t.body.metaTitle.code3} 
                            </code>
                        </pre>
                        <p className={style.metaDescription}>{t.body.metaTitle.description}</p>
                        <p className={style.metaDescription}>{t.body.metaTitle.description1}</p>
                        <p className={style.metaDescription}>{t.body.metaTitle.description2}</p>
                        <div className={style.metaImg_box}>
                            <figure>
                                <Image decoding="async" src={t.body.metaTitle.imgUrl} alt={t.body.metaTitle.imgAlt} width={500} height={350} loading="lazy"/>
                            </figure> 
                        </div>
                        <div className={style.reasoning}>
                            <p>{t.body.metaTitle.reasoning}</p>
                            <p>{t.body.metaTitle.reasoning1}</p>
                            <p>{t.body.metaTitle.reasoning2}</p>
                            <div className={style.reasoningImg_box}>
                               <figure>
                                <Image decoding="async" src={t.body.metaTitle.reasoningImgUrl} alt={t.body.metaTitle.reasoningImgAlt} width={300} height={250} loading="lazy"/>
                                </figure> 
                            </div>
                        </div>
                    </div>
                     {/* for description  */}
                    <div id="meta-description" className={style.metaDescriptionContainer}>
                        <h3 className={style.metaDescriptionTitle}>
                            <label htmlFor="" className={style.metaList}>{t.body.metaDescription.label}</label>
                            {" "}{t.body.metaDescription.title}
                        </h3>
                        <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaDescription.code1} <br />
                                {t.body.metaDescription.code2} <br />
                                {t.body.metaDescription.code3} 
                            </code>
                        </pre>
                        <p className={style.metaDescription}>{t.body.metaDescription.description}</p>
                        <p className={style.metaDescription}>{t.body.metaDescription.description1}</p>
                        <p className={style.metaDescription}>{t.body.metaDescription.description2}</p>
                        <div className={style.metaImg_box}>
                             <figure> 
                                <Image decoding="async" src={t.body.metaDescription.imgUrl} alt={t.body.metaDescription.imgAlt} width={500} height={350} loading="lazy"/>
                            </figure>
                        </div>
                    </div>
                     {/* for alternante  */}
                    <div id="meta-alternate" className={style.metaAlternanteContainer}>
                        <h3 className={style.metaDescriptionTitle}>
                            <label htmlFor="" className={style.metaList}>{t.body.metaAlternante.label}</label>
                            {" "}{t.body.metaAlternante.title}
                        </h3>
                        <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaAlternante.code1} <br />
                                {t.body.metaAlternante.code2} <br />
                                {t.body.metaAlternante.code3} <br />
                                {t.body.metaAlternante.code4} 
                            </code>
                        </pre>
                        <p className={style.metaDescription}>{t.body.metaAlternante.description}</p>
                        <p className={style.metaDescription}>{t.body.metaAlternante.description1}</p>
                        <p className={style.metaDescription}>{t.body.metaAlternante.description2}</p>
                    </div>
                     {/* for canonical */}
                    <div id="meta-canonical" className={style.metaCanonical}>
                         <h3 className={style.metaDescriptionTitle}>
                            <label htmlFor="" className={style.metaList}>{t.body.metaCanonical.label}</label>
                            {" "}{t.body.metaCanonical.title}
                        </h3>
                        
                        <p className={style.metaDescription}>{t.body.metaCanonical.description}</p>
                        <p className={style.metaDescription}>{t.body.metaCanonical.description1}</p>
                        <p className={style.metaDescription}>{t.body.metaCanonical.description2}</p>
                        <p className={style.metaDescription}>{t.body.metaCanonical.description3}</p>
                        <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaCanonical.code1} <br />
                                {t.body.metaCanonical.code2} <br />
                                {t.body.metaCanonical.code3} <br />
                                {t.body.metaCanonical.code4} 
                            </code>
                        </pre>
                    </div>
                     {/* for open Graph  */}
                    <div id="open-graph" className={style.metaGraph}>
                         <h3 className={style.metaDescriptionTitle}>
                            <label htmlFor="" className={style.metaList}>{t.body.metaGraph.label}</label>
                            {" "}{t.body.metaGraph.title}
                        </h3>
                        <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaGraph.code1} <br />
                                {t.body.metaGraph.code2} <br />
                                {t.body.metaGraph.code3} <br />
                                {t.body.metaGraph.code4} <br />
                                {t.body.metaGraph.code5} <br />
                                {t.body.metaGraph.code6} <br />
                                {t.body.metaGraph.code7} <br />
                                {t.body.metaGraph.code8} <br />
                                {t.body.metaGraph.code9} <br />
                                {t.body.metaGraph.code10} 
                            </code>
                        </pre>
                        <p className={style.metaDescription}>{t.body.metaGraph.description}</p>
                        <p className={style.metaDescription}>{t.body.metaGraph.description1}</p>
                        <p className={style.metaDescription}>{t.body.metaGraph.description2}</p>
                        <div className={style.metaImg_box}>
                            <figure>
                            <Image decoding="async"  src={t.body.metaGraph.imgUrl} alt={t.body.metaGraph.imgAlt} width={500} height={450} loading="lazy"/>
                            </figure>
                        </div>
                        <p className={style.metaDescription}>{t.body.metaGraph.description3}</p>

                    </div>
                     {/* for twitter graph  */}
                    <div id="twitter" className={style.metaCanonical}>
                         <h3 className={style.metaDescriptionTitle}>
                            <label htmlFor="" className={style.metaList}>{t.body.metaTwitter.label}</label>
                            {" "}{t.body.metaTwitter.title}
                        </h3>
                        
                        <p className={style.metaDescription}>{t.body.metaTwitter.description}</p>
                        <p className={style.metaDescription}>{t.body.metaTwitter.description1}</p>
                        <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaTwitter.code1} <br />
                                {t.body.metaTwitter.code2} <br />
                                {t.body.metaTwitter.code3} <br />
                                {t.body.metaTwitter.code4} <br />
                                {t.body.metaTwitter.code5} <br />
                                {t.body.metaTwitter.code6} 
                            </code>
                        </pre>
                    </div>
                    {/* for meta AUthor and Publisher */}
                     <div id="robots" className={style.metaCanonical}>
                         <h3 className={style.metaDescriptionTitle}>
                            <label htmlFor="" className={style.metaList}>{t.body.metaRobots.label}</label>
                            {" "}{t.body.metaRobots.title}
                        </h3>
                        <p className={style.metaDescription}>{t.body.metaRobots.description}</p>
                        <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaRobots.code1} <br />
                                {t.body.metaRobots.code2} <br />
                                {t.body.metaRobots.code3}
                            </code>
                        </pre>
                    </div>
                    <div id="authors" className={style.metaCanonical}>
                         <h3 className={style.metaDescriptionTitle}>
                            <label htmlFor="" className={style.metaList}>{t.body.metaAuthors.label}</label>
                            {" "}{t.body.metaAuthors.title}
                        </h3>
                        <p className={style.metaDescription}>{t.body.metaAuthors.description}</p>
                         <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaAuthors.code1} <br />
                                {t.body.metaAuthors.code2} <br />
                                {t.body.metaAuthors.code3}
                            </code>
                        </pre>
                    </div>
                    <div id="keywords" className={style.metaCanonical}>
                         <h3 className={style.metaDescriptionTitle}>
                            <label htmlFor="" className={style.metaList}>{t.body.metaKeywords.label}</label>
                            {" "}{t.body.metaKeywords.title}
                        </h3>
                        <p className={style.metaDescription}>{t.body.metaKeywords.description}</p>
                        <pre className={style.codeBlock}>
                            <code>
                                {t.body.metaKeywords.code1} <br />
                                {t.body.metaKeywords.code2} <br />
                                {t.body.metaKeywords.code3}
                            </code>
                        </pre>
                    </div>
                </div>
                    </div>
                    <aside className={style.toc}>
                        <div className={style.tocBox}>
                            <div className={style.tocSocial}>
                                <a href="https://www.facebook.com/profile.php?id=61591687297760" target="_blank" rel="noopener noreferrer" title="Facebook">
                                    <FaFacebookF />
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                    <FaLinkedin />
                                </a>
                            </div>
                            <p className={style.tocTitle}>Table of Contents</p>
                            <nav>
                                <ol className={style.tocList}>
                                    <li><a href="#meta-title">Title</a></li>
                                    <li><a href="#meta-description">Description</a></li>
                                    <li><a href="#meta-alternate">Alternate</a></li>
                                    <li><a href="#meta-canonical">Canonical</a></li>
                                    <li><a href="#open-graph">Open Graph</a></li>
                                    <li><a href="#twitter">Twitter</a></li>
                                    <li><a href="#robots">Robots</a></li>
                                    <li><a href="#authors">Authors</a></li>
                                    <li><a href="#keywords">Keywords</a></li>
                                </ol>
                            </nav>
                            <div className={style.tocSection}>
                                <p className={style.tocSectionTitle}>Important pages</p>
                                <ul className={style.tocList}>
                                    <li><Link href={`/${locale}/services/web`}>Services</Link></li>
                                    <li><Link href={`/${locale}/blog/why-website-not-ranking-on-google`}>Why website not ranking</Link></li>
                                    <li><Link href={`/${locale}/contact-form`}>Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
            </div>
        </main>
    )
}