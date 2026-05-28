import { getTranslations } from "next-intl/server"
import style from "../../../(marketing)/services/web/webService.module.css"
import { IoMdTrendingDown } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { MdOutlineMobileOff } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdDevicesOther } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";

type CardProps = {
    title: string,
    text: string
}
export default async function ProblemSolving({ messages, type }: { messages: any, type: any }) {
    const t = await messages.problemSolving
    // the itemsCards is the problemSolving cards 
    const itemsCards = t ? t.problemCards as CardProps[] : null
    console.log("problingSolving loaded")
    let itemICons: any
    if (type.toLowerCase() === "web") {
        itemICons = [
            <CiWarning className={style.icon1} />,
            <IoMdTrendingDown className={style.icon2} />,
            <MdOutlineMobileOff className={style.icon3} />
        ]
    } else if (type.toLowerCase() === "app") {
        itemICons = [
            <BsGear className={style.app1} />,              // Manual & Inefficient Processes
            <HiOutlineUserCircle className={style.app2} />, // Poor User Experience
            <MdDevicesOther className={style.app3} />,           // Limited Accessibility
            <RiDashboardLine className={style.app4} />
        ]
    } else if (type.toLowerCase() === "design") {
        itemICons = [
            <CiWarning className={style.icon1} />,
            <IoMdTrendingDown className={style.icon2} />,
            <MdOutlineMobileOff className={style.icon3} />
        ]
    } else if (type.toLowerCase() === "gaming") {
        itemICons = [
            <CiWarning className={style.icon1} />,
            <IoMdTrendingDown className={style.icon2} />,
            <MdOutlineMobileOff className={style.icon3} />
        ]
    }
    return (
        <>
            <div className={style.ProblemSection}>
                <h3 className={style.Subtitle}>{t.subtitle}</h3>
                <p className={style.Text}>{t.text}</p>
            </div>
            <div className={style.Problemcards}>
                {
                    itemsCards?.map((T, i) => (
                        <div key={i} className={style.card}>
                            <h3 className={style.title}>{T.title}</h3>
                            <div className={style.icons}>
                                {itemICons[i]}
                            </div>
                            <p className={style.text}>{T.text}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}