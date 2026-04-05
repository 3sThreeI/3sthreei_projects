import HeroSVG from "@/components/ui/herodesign/heroSvg";
import style from "./hero.module.css"
import { getTranslations } from "next-intl/server"


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
                            <button className={style.primaryBtn}>
                                {t('herobtn1')}
                            </button>
                            <button className={style.secondaryBtn}>
                                {t('herobtn2')}
                            </button>
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