import { getTranslations } from "next-intl/server"
import style from "./workingPricing.module.css"
import WorkingFlowCard from "./workingPricingCard"
type workingProps = {
    header: string,
    content: []
}
export default async function WorkingFlow(messages: any) {
    // in home page the message this component is rendered there too but is not sanding the data through props
    // so w will get it in translations in home.json 
    const messageItems = await messages.messages
    const t = messageItems ?? await getTranslations()
    console.log("workingPricing rendered")
    // if the messages exist then the contain is an function otherwise is an object 
    // the workflow is the table and worklow2 is the card 
    const data: workingProps[] = !messageItems ? t.raw("workFlow") : t.workFlow
    console.log("data", typeof (messageItems))
    return (
        <>
            <div className={style.container}>
                < WorkingFlowCard />
                {/* this the table part for the features */}
                <div className={`${style.tableContent}`}>
                    <table className={style.table}>
                        <thead className={style.thead}>
                            <tr className={style.head_row}>
                                {
                                    !messageItems ?
                                        t?.raw('workFlow').map((item: any, index: number) => (
                                            <th className={`${style.header} `} key={index}>{item.header}</th>
                                        ))
                                        :
                                        data?.map((item: any, index: number) => (
                                            <th className={`${style.header} `} key={index}>{item.header}</th>
                                        ))
                                }
                            </tr>
                        </thead>
                        <tbody className={style.table_body}>
                            {data?.[0]?.content?.map((_: any, rowIndex: number) => (
                                <tr className={style.body_row} key={rowIndex}>
                                    {data?.map((item: any, colIndex: number) => (
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