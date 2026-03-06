import { getTranslations } from "next-intl/server"
import style from "./serviceStyle.module.css"
import Link from "next/link"

export default async function OurService() {
    const t = await getTranslations('serviceSection')
    return (
        <>
            <div className={style.container}>
                <h1 className={style.title}>Ours Services</h1>
                <div className={style.cards}>
                    {/* website */}
                    <div className={`${style.card} `}>
                        <h1 className={style.card_title}>{t('website.title')}</h1>
                        <h2 className={style.card_subtitle}>{t('website.subtitle')}</h2>
                        <ul className={style.content}>
                            {t.raw('website.contents').map((item: string, index: number) => (
                                <li key={index} className={style.content_text}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className={style.btn}>
                            <Link href='#' className={style.Link} >{t('website.button')}</Link>
                        </div>
                    </div>
                    {/* mobile app */}
                    <div className={`${style.card}`}>
                        <h1 className={style.card_title}>{t('mobile.title')}</h1>
                        <h2 className={style.card_subtitle}>{t('mobile.subtitle')} </h2>
                        <ul className={style.content}>
                            {t.raw('mobile.contents').map((item: string, index: number) => (
                                <li key={index} className={style.content_text}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className={style.btn}>
                            <Link href='#' className={style.Link} >{t('mobile.button')}</Link>
                        </div>
                    </div>
                    {/* gaming */}
                    <div className={`${style.card}`}>
                        <h1 className={style.card_title}>{t('game.title')}</h1>
                        <h2 className={style.card_subtitle}>{t('game.subtitle')}</h2>
                        <ul className={style.content}>
                            {t.raw('game.contents').map((item: string, index: number) => (
                                <li key={index} className={style.content_text}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className={style.btn}>
                            <Link href='#' className={style.Link} >{t('game.button')}</Link>
                        </div>
                    </div>
                    {/* ui/ux */}
                    <div className={`${style.card}`}>
                        <h1 className={style.card_title}>{t('design.title')}</h1>
                        <h2 className={style.card_subtitle}>{t('design.subtitle')}</h2>
                        <ul className={style.content}>
                            {t.raw('design.contents').map((item: string, index: number) => (
                                <li key={index} className={style.content_text}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className={style.btn}>
                            <Link href='#' className={style.Link} >{t('design.button')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}