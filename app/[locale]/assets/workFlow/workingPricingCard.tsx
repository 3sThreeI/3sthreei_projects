'use client'
import { getLocale } from "next-intl/server"
import style from "./workingPricing.module.css"
import { FaCircleCheck } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
export default function WorkingFlowCard() {
    const t = useTranslations()
    const [cardActive, SetCardActive] = useState('interactive')
    const SwitchCard = (value: string) => {
        SetCardActive(value)
    }
    return (
        <>
            <div className={style.cardContainer}>
                <div className={style.card_header}>
                    <div onClick={() => SwitchCard('launch')} className={`${style.headText} ${cardActive === 'lauch' && style.active}`}>
                        <h1>{t('workFlow2.launch.headText')}</h1>
                    </div>
                    <div onClick={() => SwitchCard('business')} className={`${style.headText} ${cardActive === 'business' && style.active}`}>
                        <h1>{t('workFlow2.business.headText')}</h1>
                    </div>
                    <div onClick={() => SwitchCard('interactive')} className={`${style.headText} ${cardActive === 'interactive' && style.active}`}>
                        <h1>{t('workFlow2.interactive.headText')}</h1>
                    </div>
                    <div onClick={() => SwitchCard('custom')} className={`${style.headText} ${cardActive === 'custom' && style.active}`}>
                        <h1>{t('workFlow2.custom.headText')}</h1>
                    </div>
                </div>
                <div className={style.cards}>
                    {/* ------------------------Launch-------------- */}
                    <div className={`${style.card} ${cardActive === 'launch' && style.cardActive}`}>
                        <h1 className={style.cardHeader} > {t('workFlow2.launch.headText')} </h1>
                        <div className={style.headContent}>
                            <h1>{t('workFlow2.launch.title')}</h1>
                            <p className={style.cardPrice}>{t('workFlow2.launch.price')}</p>
                            <div className={style.headButton}>
                                <button type="button" className={style.btn}>{t('workFlow2.launch.btn')}</button>
                            </div>
                        </div>
                        <ul className={style.content}>
                            {
                                t .raw('workFlow2.launch.content').map((item: any, index: number) => (
                                    <li key={index} className={style.content_text}><FaCircleCheck className={style.icon} />  {item}</li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* ------------------------business-------------- */}
                    <div className={`${style.card} ${cardActive === 'business' && style.cardActive}`}>
                        <h1 className={style.cardHeader} > {t('workFlow2.business.headText')} </h1>
                        <div className={style.headContent}>
                            <h2>{t('workFlow2.business.title')}</h2>
                            <p className={style.cardPrice}>{t('workFlow2.business.price')}</p>
                            <div className={style.headButton}>
                                <button type="button" className={style.btn}>{t('workFlow2.business.btn')}</button>
                            </div>
                        </div>
                        <ul className={style.content}>
                            {
                                t.raw('workFlow2.business.content').map((item: any, index: number) => (
                                    <li key={index} className={style.content_text}> <FaCircleCheck className={style.icon} /> {item}</li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* ------------------------Interactive-------------- */}
                    <div className={`${style.card} ${cardActive === 'interactive' && style.cardActive}`}>
                        <div className={style.recommended}>Recommended</div>
                        <h1 className={style.cardHeader} > {t('workFlow2.interactive.headText')} </h1>
                        <div className={style.headContent}>
                            <h2>{t('workFlow2.interactive.title')}</h2>
                            < p className={style.cardPrice}>{t('workFlow2.interactive.price')}</p>
                            <div className={style.headButton}>
                                <button type="button" className={style.btn}>{t('workFlow2.interactive.btn')}</button>
                            </div>
                        </div>
                        <ul className={style.content}>
                            {
                                t.raw('workFlow2.interactive.content').map((item: any, index: number) => (
                                    <li key={index} className={style.content_text}> <FaCircleCheck className={style.icon} /> {item}</li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* ------------------------Custom-------------- */}
                    <div className={`${style.card} ${cardActive === 'custom' && style.cardActive}`}>
                        <h1 className={style.cardHeader} > {t('workFlow2.custom.headText')} </h1>
                        <div className={style.headContent}>
                            <h2>{t('workFlow2.custom.title')}</h2>
                            <p className={style.cardPrice}>{t('workFlow2.custom.price')}</p>
                            <div className={style.headButton}>
                                <button type="button" className={style.btn}>{t('workFlow2.custom.btn')}</button>
                            </div>
                        </div>
                        <ul className={style.content}>
                            {
                                t.raw('workFlow2.custom.content').map((item: any, index: number) => (
                                    <li key={index} className={style.content_text}> <FaCircleCheck className={style.icon} /> {item}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}