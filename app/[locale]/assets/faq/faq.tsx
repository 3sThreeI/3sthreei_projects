
import style from "./faq.module.css"
interface questionProps {
    question: string,
    answer: string
}
export default async function Faq({ messages }: { messages: any }) {
    const t = await messages.faq
    const questions = messages.faq.questions as questionProps[]
    return (
        <section className={style.section}>
            <div className={style.wrapper}>
                <header className={style.header}>
                    <p className={style.tag}>FAQ</p>
                    <h1 className={style.title}>{t.headText}</h1>
                    {t.description ? <p className={style.description}>{t.description}</p> : null}
                </header>

                <div className={style.questionCards}>
                    {questions.map((q, i) => (
                        <article className={style.faq_item} key={i}>
                            <div className={style.quest}>{q.question}</div>
                            <div className={style.answer}>{q.answer}</div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}