import HeroSVG from "@/components/ui/herodesign/heroSvg";
import style from "./hero.module.css"
import { getTranslations } from "next-intl/server"
import Link from "next/link";


export default async function Hero() {
    const t = await getTranslations('hero')
    return (
        <>
            <div className={style.container}>
                <div className={style.heroCard}>
                    <div className={style.cardText}>
                        <div className="">
                            <h1 className={style.headline}>{t('headline')}</h1>
                            <p className={style.subheadline}>{t('subheadline')}</p>
                        </div>
                        <div className={style.buttons}>
                        {/* start project button */}
                            <Link href={t('herobtn1Url')} className={style.primaryBtn}>
                                {t('herobtn1')}
                            </Link>
                        {/* courses button */}
                            <Link href="/unavailable" className={style.secondaryBtn}>
                                {t('herobtn2')}
                            </Link>
                        </div>
                    </div>
                    <div className="h-full w-full z-0">
                        <HeroSVG />
                    </div>
                </div>
            </div >
        </>
    )
}