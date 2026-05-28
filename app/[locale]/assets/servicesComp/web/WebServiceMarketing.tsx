import style from "../../../(marketing)/services/web/webService.module.css"

export default async function WebServiceMarketing({ messages }: { messages: any }) {
    const t = await messages?.marketing
    return (
        <div className={style.marketing_container}>
            <div className={style.contentText}>
                <h4 className={style.Subtitle}>{t.title}</h4>
                <p className={style.Text}>{t.text}</p>
            </div>
            <div className={style.video}>

            </div>
        </div>
    )
}