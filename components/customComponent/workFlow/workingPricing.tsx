import { getTranslations } from "next-intl/server"
import style from "./workingPricing.module.css"
import WorkingFlowCard from "./workingPricingCard"
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
                < WorkingFlowCard />
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