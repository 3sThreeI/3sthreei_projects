import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import style from "./docs.module.css"
import Image from "next/image"
import { MdLabelImportant } from "react-icons/md";
import { SiOrigin } from "react-icons/si";
import { VscError } from "react-icons/vsc";
import FeatureCarousel from "@/app/[locale]/assets/docs/e-commerceCarousel";
import { FaServer, FaDatabase, FaCreditCard, FaBolt } from "react-icons/fa";
import Link from "next/link";
// import { useState } from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, documentation: string[] }> }): Promise<Metadata> {
    const { locale, documentation } = await params
    const file = documentation?.at(-1) || documentation?.[documentation.length - 1] || 'e-commerce'
    const message = await getTranslations(`documentation.${file}`)
    const t = message
    console.log("documentation locale", locale)
    return {
        title: t("title"),
        description: t("description"),
        keywords: t.raw("keywords").join(", "),
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${documentation.join("/")}`,
            languages: {
                fr: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/${documentation.join("/")}`,
                en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/${documentation.join("/")}`,
            }
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            siteName: t('sitename'),
            type: "article",
            locale: locale === "fr" ? "fr_FR" : "en_US",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${documentation.join("/")}`,
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
type ListExpProps = {
    contentSubT: string,
    ExpList: string[]
}
export default async function Documentation({ params }: { params: any }) {
    const TechIcons = [
        FaServer,
        FaDatabase,
        FaCreditCard,
        FaBolt
    ]
    const { locale, documentation } = await params
    const file = documentation?.at(-1) || "1"
    const message = (await import(`@/messages/${locale}/documentation/${file}.json`))
    const t = await message
    const ListExpt = t?.ProblemStat?.WhoExp?.Exp as ListExpProps[]
    const jsonT = (await import(`@/messages/${locale}/jsonLD/documentation/${file}.json`))
    const BaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3sthreei.com"
    console.log(`documents ${file} page rendered`)
    const ProjectJsonLD = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "TechArticle",
                "@id": `${BaseUrl}/${locale}/${file}/${file}#article`,
                "url": `${BaseUrl}/${locale}/${documentation}`,
                "headline": jsonT.headline,
                "name": jsonT.name,
                "description": jsonT.description,
                "articleSection": jsonT.articleSection,
                "keywords": jsonT.keywords,
                "author": {
                    "@id": `${BaseUrl}/#organization`
                },
                "publisher": {
                    "@id": `${BaseUrl}/#organization`
                },
                "isPartOf": {
                    "@id": `${BaseUrl}/#website`
                },
                "about": {
                    "@id": `${BaseUrl}/projects/${file}`
                },
                "mainEntity": {
                    "@id": `${BaseUrl}/projects/${file}#software`
                },
                "inLanguage": [
                    { "@type": "Language", "name": locale === "fr" ? "French" : "English", "alternateName": locale }
                ],
            },
            {
                "@type": "SoftwareSourceCode",
                "@id": `${BaseUrl}/projects/${file}#software`,
                "name": "React Node.js E-commerce",
                "description": "A production-ready full-stack e-commerce platform built with React, Node.js, Express, and MySQL.",
                "programmingLanguage": [
                    "JavaScript",
                    "TypeScript"
                ],
                "runtimePlatform": [
                    "Node.js",
                    "Web Browser"
                ],
                "codeRepository": "https://github.com/yourusername/ecommerce",
                "applicationCategory": "E-commerce",
                "codeSampleType": "full solution",
                "creator": {
                    "@id": "https://example.com/#organization"
                },
                "license": "https://opensource.org/licenses/MIT"
            },
            {
                "@type": "SoftwareApplication",
                "@id": "https://example.com/projects/ecommerce-react-node#application",
                "name": "React Node.js E-commerce",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Any",
                "applicationSubCategory": "E-commerce Platform",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "featureList": [
                    "Authentication",
                    "Role-based Access",
                    "Product Catalog",
                    "Shopping Cart",
                    "Wishlist",
                    "Orders",
                    "Payments",
                    "Admin Dashboard",
                    "Analytics",
                    "Inventory Management"
                ]
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://example.com/projects/ecommerce-react-node#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://example.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Projects",
                        "item": "https://example.com/projects"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "E-commerce Project",
                        "item": "https://example.com/projects/ecommerce-react-node"
                    }
                ]
            }
        ]
    }

    return (
        <main className={style.container}>
            <section className={style.hero}>
                <div className={style.card}>
                    <h1 className={style.title}>{t.title}</h1>
                </div>
                <figure>
                    <Image src={t.projImgUrl} alt={t.projImgAlt} width={900} height={400} loading="eager" className={style.image} />
                </figure>
                <div className={style.heroText}>
                    <h2 className={style.subtitle}>{t.subtitle}</h2>
                    <p className={style.desc}>{t.desc}</p>
                </div>
            </section>
            <article>
                {/* Problem statement  */}
                <section className={style.ProblemContainer}>
                    <div className={style.ProblemStat}>
                        <h2 className={style.subtitle}>{t.ProblemStat.title}</h2>
                        <p className={style.contentText}> {t.ProblemStat.text1}</p>
                        <p className={style.contentText2}>
                            <label className={style.label}>{t.ProblemStat.text2Special}</label>{t.ProblemStat.text2}
                        </p>
                    </div>
                    <div>
                        <h3 className={style.label}>
                            <MdLabelImportant className={style.contentIcon} /> {t.ProblemStat.WhoExp.title}
                        </h3>
                        <div className={style.block}>
                            {
                                ListExpt?.map((L, I) => (
                                    <div key={I}>
                                        {L?.contentSubT && <h4 className={style.contentSubT}>{L.contentSubT}</h4>}
                                        <ul className={style.ul}>
                                            {
                                                L?.ExpList?.map((l: string, i: number) => (
                                                    <li key={i} className={style.li}>
                                                        <SiOrigin className={style.subContentIcons} />
                                                        {l}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    {/* why this matters */}
                    <div>
                        <h5 className={style.label}>
                            <MdLabelImportant className={style.contentIcon} /> {t.ProblemStat.whyMatter.title}
                        </h5>
                        <div >
                            {
                                t.ProblemStat?.whyMatter?.solving?.map((l: string, i: number) => (
                                    <ul className={style.ul} key={i}>
                                        <li className={style.li}>
                                            <VscError className={style.danger_icons} /> {l}
                                        </li>
                                    </ul>
                                ))
                            }
                        </div>
                    </div>
                </section>
                {/* feature secture and carouselle*/}
                <section className={style.featureContainer}>
                    {/* carousel */}
                    <FeatureCarousel message={t.features} />
                </section>
                <section className={style.tech_use}>
                    <div className={style.tech_inner}>
                        <div className={style.tech_header}>
                            <span className={style.techEyebrow}>Tech stack</span>
                            <h2 className={style.subtitle}>{t.tech.title}</h2>
                        </div>
                        <div className={style.tecList_box}>
                            {
                                t.tech.list.map((L: any, I: number) => (
                                    <article className={style.techCard} key={I}>
                                        <div className={style.techCardHeader}>
                                            <span className={style.techCategoryDot}></span>
                                            <h3 className={style.techCategory}>{L.key}</h3>
                                        </div>
                                        <ul className={style.techItems}>
                                            {
                                                L.value.map((l: any, i: number) => (
                                                    <li className={style.techItem} key={i}>
                                                        <span className={style.techItemKey}>{l.key}</span>
                                                        <p className={style.techItemValue}>{l.value}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </article>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </article>
            {/* call to action */}
            <section className={style.btn}>
                <Link href="/contact-form" className={style.cta}>{t.cta}</Link>
            </section>
        </main>
    )
}