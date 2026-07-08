import { getTranslations } from "next-intl/server"
import { FaLightbulb, FaCode, FaRocket, FaHandshake, FaPencilRuler, FaClipboardList, FaVial } from "react-icons/fa";
import style from "./process.module.css"
import PhoneProgress from "./PhoneProgress";
import ArrowDownFn from "./ArrowDownBtn";

const iconMap = [
    FaLightbulb,
    FaClipboardList,
    FaPencilRuler,
    FaCode,
    FaVial,
    FaRocket,
    FaHandshake,
]

type CardProps = {
    // icon: string,
    title: string,
    content: string
}

async function WorkingProcess() {
    const t = await getTranslations()
    const cards = t.raw("process") as CardProps[]


    return (
        <div className={style.container}>
            <h1 className={style.title}>Our Process</h1>
            {/* --------------------------tablet and laptop--------------------  */}
            <div className={style.cards}>
                {
                    cards.map((item, index) => {
                        const Icon = iconMap[index]
                        return (
                            <div key={index} className={`${style.card} ${style[`card${index}`]}`}>
                                <div className={style.cardContainer}>
                                    <div className={style.icons}>
                                        {Icon && <Icon className={style.icon} />}
                                    </div>
                                    <h2 className={style.title}>
                                        <span className="text-[1.1rem] text-(--nav-text-color) hover:animate-bounce">{index + 1}</span>
                                        {" "}{item.title}</h2>
                                    <div className={style.content} id={`scroll-container${index}`}>
                                        <div className="" >
                                            <p>{item.content}</p>
                                            {/* arrow down function is the custom component */}
                                            <ArrowDownFn show={`show-section${index}`} contain={`scroll-container${index}`} />
                                        </div>
                                        <div id={`show-section${index}`}></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* --------------------------Phone-------------------------- */}
            <div className={style.Phonecards}>
                <PhoneProgress cards={cards} />
            </div>
        </div>
    )
}
export default WorkingProcess