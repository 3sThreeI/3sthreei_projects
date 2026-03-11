import { getTranslations } from "next-intl/server"
import style from "./workingFlow.module.css"
import { thead } from "framer-motion/client"
import { FaCircleCheck } from "react-icons/fa6"
type workingProps = {
    header: string,
    content: string
}
export default async function WorkingFlow() {
    const t = await getTranslations()
    const items = t.raw('workFlow') as workingProps[]
    const data = t.raw("workFlow");
    return (
        <>
            <div className={style.container}>
                <div className={style.cardContainer}>
                    <div className={style.card_header}>
                        <div className={`${style.headText} ${style.active}`}>
                            <h1>{t('workFlow2.launch.headText')}</h1>
                        </div>
                        <div className={style.headText}>
                            <h1>{t('workFlow2.business.headText')}</h1>
                        </div>
                        <div className={style.headText}>
                            <h1>{t('workFlow2.interactive.headText')}</h1>
                        </div>
                        <div className={style.headText}>
                            <h1>{t('workFlow2.launch.headText')}</h1>
                        </div>
                    </div>
                    <div className={style.cards}>
                        {/* ------------------------Launch-------------- */}
                        <div className={`${style.card} `}>
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
                                    t.raw('workFlow2.launch.content').map((item: any, index: number) => (
                                        <li key={index} className={style.content_text}><FaCircleCheck className={style.icon} />  {item}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        {/* ------------------------business-------------- */}
                        <div className={`${style.card} `}>
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
                        <div className={`${style.card} `}>
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
                        <div className={`${style.card} `}>
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
                <div className={`${style.tableContent}`}>
                    <table className={style.table}>
                        <thead className={style.thead}>
                            <tr className={style.head_row}>
                                {
                                    t.raw('workFlow').map((item: any, index: number) => (
                                        <th className={`${style.header} `} key={index}>{item.header}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody className={style.table_body}>
                                {data[0].content.map((_: any, rowIndex: number) => (
                                    <tr className={style.body_row} key={rowIndex}>
                                        {data.map((item: any, colIndex: number) => (
                                            <td className={`${style.body_col}`} key={colIndex}>{item.content[rowIndex]}</td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}