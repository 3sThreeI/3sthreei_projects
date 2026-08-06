'use client'
import { getLocale } from "next-intl/server"
import style from "./workingPricing.module.css"
import { FaCircleCheck } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useBetaContext } from "../../context/betaContext"
import { AnyAaaaRecord } from "dns"
export default function WorkingFlowCard() {
    const t = useTranslations()
    const BetaData:any = useBetaContext()
    const [cardActive, SetCardActive] = useState(t('workFlow2.interactive.headText'))
    const SwitchCard = (value: string) => {
        SetCardActive(value)
    }
    const isBetaActive = BetaData.beta
    return (
        <>
            <div className={style.cardContainer}>
                <div className={style.card_header}>
                    <div onClick={() => SwitchCard(t('workFlow2.launch.headText'))} className={`${style.headText} ${cardActive === t('workFlow2.launch.headText') && style.active}`}>
                        <h2>{t('workFlow2.launch.headText')}</h2>
                    </div>
                    <div onClick={() => SwitchCard(t('workFlow2.business.headText'))} className={`${style.headText} ${cardActive === t('workFlow2.business.headText') && style.active}`}>
                        <h2>{t('workFlow2.business.headText')}</h2>
                    </div>
                    <div onClick={() => SwitchCard(t('workFlow2.interactive.headText'))} className={`${style.headText} ${cardActive === t('workFlow2.interactive.headText') && style.active}`}>
                        <h2>{t('workFlow2.interactive.headText')}</h2>
                    </div>
                    <div onClick={() => SwitchCard(t('workFlow2.custom.headText'))} className={`${style.headText} ${cardActive === t('workFlow2.custom.headText') && style.active}`}>
                        <h2>{t('workFlow2.custom.headText')}</h2>
                    </div>
                </div>
                <div className={style.cards}>
                    {/* ------------------------Launch-------------- */}
                    <div className={`${style.card} ${cardActive === t('workFlow2.launch.headText') && style.cardActive}`}>
                        <h3 className={style.cardHeader} > {t('workFlow2.launch.headText')} </h3>
                        <div className={style.headContent}>
                            <h4>{t('workFlow2.launch.title')}</h4>
                            <p className={`${style.cardPrice} ${isBetaActive ? "line-through opacity-50" : "" }`}>{t('workFlow2.launch.price')}</p>
                            {isBetaActive && <p className={`${style.cardPrice} `}>{t('workFlow2.launch.Betaprice')}</p>}
                           { isBetaActive?.beta && <p className="text-center text-red-400 font-bold">{t('workFlow2.launch.badge')}</p> }
                            <div className={style.headButton}>
                                {/* the type is getting by json (workingFlow2.type) file each component will send is type like for web the type=web and for 
                                application the type=app
                                 */}
                                 {/* the price is getting by json file to depend of the component each component has is json file  */}
                                <Link href={{pathname: "/contact-form", query:{price:t('workFlow2.launch.priceKey'), type:t('workFlow2.type')}}} className={style.btn}>{t('workFlow2.launch.btn')}</Link>
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
                    <div className={`${style.card} ${cardActive === t('workFlow2.business.headText') && style.cardActive}`}>
                        <h3 className={style.cardHeader} > {t('workFlow2.business.headText')} </h3>
                        <div className={style.headContent}>
                            <h4>{t('workFlow2.business.title')}</h4>
                            <p className={`${style.cardPrice} ${isBetaActive ? "line-through opacity-50" : "" }`}>{t('workFlow2.business.price')}</p>
                            {isBetaActive && <p className={style.cardPrice}>{t('workFlow2.business.Betaprice')}</p>}
                            { isBetaActive?.beta &&<p className="text-center text-red-400 font-bold">{t('workFlow2.business.badge')}</p> }
                            <div className={style.headButton}>
                                {/* the type is getting by json (workingFlow2.type) file each component will send is type like for web the type=web and for 
                                application the type=app
                                 */}
                                 {/* the price is getting by json file to depend of the component each component has is json file  */}
                                <Link href={{pathname: "/contact-form", query:{price:t('workFlow2.business.priceKey'), type:t('workFlow2.type')}}} className={style.btn}>{t('workFlow2.business.btn')}</Link>
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
                    <div className={`${style.card} ${cardActive === t('workFlow2.interactive.headText') && style.cardActive}`}>
                        <div className={style.recommended}>Recommended</div>
                        <h3 className={style.cardHeader} > {t('workFlow2.interactive.headText')} </h3>
                        <div className={style.headContent}>
                            <h4>{t('workFlow2.interactive.title')}</h4>
                            < p className={`${style.cardPrice} ${isBetaActive ? "line-through opacity-50" : "" }`}>{t('workFlow2.interactive.price')}</p>
                            {isBetaActive && <p className={style.cardPrice}>{t('workFlow2.interactive.Betaprice')}</p>}
                           { isBetaActive?.beta && <p className="text-center text-red-400 font-bold">{t('workFlow2.interactive.badge')}</p> }
                            <div className={style.headButton}>
                              {/* the type is getting by json (workingFlow2.type) file each component will send is type like for web the type=web and for 
                                application the type=app
                                 */}
                                 {/* the price is getting by json file to depend of the component each component has is json file  */}
                                <Link href={{pathname: "/contact-form", query:{price:t('workFlow2.interactive.priceKey').trim(), type:t('workFlow2.type')}}} className={style.btn}>{t('workFlow2.interactive.btn')}</Link>
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
                    <div className={`${style.card} ${cardActive === t('workFlow2.custom.headText') && style.cardActive}`}>
                        <h3 className={style.cardHeader} > {t('workFlow2.custom.headText')} </h3>
                        <div className={style.headContent}>
                            <h4>{t('workFlow2.custom.title')}</h4>
                            <p className={`${style.cardPrice} ${isBetaActive ? "line-through opacity-50" : "" }`}>{t('workFlow2.custom.price')}</p>
                             { isBetaActive && <p className={style.cardPrice}>{t('workFlow2.custom.Betaprice')}</p> }
                            { isBetaActive &&<p className="text-center text-red-400 font-bold">{t('workFlow2.custom.badge')}</p> }
                            <div className={style.headButton}>
                                {/* the type is getting by json (workingFlow2.type) file each component will send is type like for web the type=web and for 
                                application the type=app
                                 */}
                                 {/* the price is getting by json file to depend of the component each component has is json file  */}
                                <Link href={{pathname: "/contact-form", query:{price:t('workFlow2.custom.priceKey'), type:t('workFlow2.type')}}} className={style.btn}>{t('workFlow2.custom.btn')}</Link>
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