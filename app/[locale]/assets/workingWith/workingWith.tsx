import { getTranslations } from "next-intl/server"
import style from "./workingWith.module.css"
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link"

export default async function WorkingWith() {
    const t = await getTranslations('workingWith')
    return (
        <>
            <div className={style.container}>
                <h2 className={style.title}>We Work with</h2>
                <div className={style.cards}>
                    {/* website */}
                    <div className={`${style.card} `}>
                        <h3 className={style.card_title}>{t('individual.title')}</h3>
                        {/* <h2 className={style.card_subtitle}>{t('website.subtitle')}</h2> */}
                        <ul className={style.content}>
                            {t.raw('individual.contents').map((item: string, index: number) => (
                                <li key={index} className={style.content_text}>
                                  <MdVerifiedUser className={style.secureIcon} />  {item}
                                </li>
                            ))}
                        </ul>
                        <div className={style.btn}>
                            <Link href={{ pathname:`/services/audit-web-site`, query:{type:"audit"}}} className={style.Link} >{t('individual.button')}</Link>
                        </div>
                    </div>
                    {/* mobile app */}
                    <div className={`${style.card}`}>
                        <h4 className={style.card_title}>{t('entreprise.title')}</h4>
                        {/* <h2 className={style.card_subtitle}>{t('mobile.subtitle')} </h2> */}
                        <ul className={style.content}>
                            {t.raw('entreprise.contents').map((item: string, index: number) => (
                                <li key={index} className={style.content_text}>
                                   <MdVerifiedUser className={style.secureIcon}/>  {item}
                                </li>
                            ))}
                        </ul>
                        <div className={style.btn}>
                            <Link href={{pathname: "/services/audit-web-site", query:{type: "audit & fix"} }} className={style.Link} >{t('entreprise.button')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}