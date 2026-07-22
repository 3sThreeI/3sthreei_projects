import Link from "next/link";
import { getTranslations } from "next-intl/server";
import style from "./aboutUS.module.css"
import CustomImageLoad from "@/components/ui/imageLoad/imageload";
type cardsProps = {
    imgUrl: string,
    imgAlt: string,
    name: string,
    description: string
}
type featureProps = {
    title: string,
    description: string
}
export default async function AboutUs({ message }: { message: any }) {
    const t = await message.about
    const cardsItems = Array.isArray(t.founderCard) ? t.founderCard as cardsProps[] : []
    const standForItems = Array.isArray(t.standForItems) ? t.standForItems as featureProps[] : []

    return (
        <div className={style.container}>
            <div className={style.heroBlock}>
                <div className={style.textBlock}>
                    <p className={style.overline}>{t.subtitle}</p>
                    <h1 className={style.title}>{t.title}</h1>
                    <p className={style.intro}>{t.introduction}</p>
                    <p className={style.desc}>{t.description}</p>
                    <p className={style.linkLine}>
                        Visit our <Link className={style.link} href="/services/web">services</Link>, explore our <Link className={style.link} href="/portfolio">portfolio</Link>, or reach out through our <Link className={style.link} href="/contact-form">contact page</Link>.
                    </p>
                </div>
                <div className={style.visualBlock}>
                    <div className={style.visualCard}>
                        <span className={style.visualLabel}>{t.missionTitle}</span>
                        <p className={style.visualText}>{t.missionText}</p>
                    </div>
                </div>
            </div>

            <div className={style.sectionBlock}>
                <div className={style.sectionHeader}>
                    <h2>{t.standForTitle}</h2>
                    <p>{t.standForText}</p>
                </div>
                <div className={style.featuresGrid}>
                    {standForItems.map((item, index) => (
                        <div className={style.featureCard} key={index}>
                            <span className={style.featureIndex}>0{index + 1}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.splitSection}>
                <article className={style.splitCard}>
                    <h2>{t.howWeWorkTitle}</h2>
                    <p>{t.howWeWorkText}</p>
                </article>
                <article className={style.splitCard}>
                    <h2>{t.whyChooseTitle}</h2>
                    <p>{t.whyChooseText}</p>
                </article>
            </div>

            <div className={style.ctaSection}>
                <p className={style.ctaText}>{t.ctaText}</p>
                <Link href="/contact-form" className={style.ctaButton}>{t.ctaButton}</Link>
            </div>
        </div>
    )
}