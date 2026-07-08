"use client"
import style from "./process.module.css"
import { useTranslations } from "next-intl"
import { animate, motion, MotionValue, useMotionValue, useMotionValueEvent, useScroll } from "motion/react"
import { FaLightbulb, FaCode, FaRocket, FaHandshake, FaPencilRuler, FaClipboardList, FaVial } from "react-icons/fa";
import ArrowDownFn from "./ArrowDownBtn";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"

// -------------
type Props = {
    cards: {
        title: string,
        content: string
    }[]
}
const iconMap = [
    FaLightbulb,
    FaClipboardList,
    FaPencilRuler,
    FaCode,
    FaVial,
    FaRocket,
    FaHandshake,
]
function PhoneProgress({ cards }: Props) {
    // const t = useTranslations()
    // const cards = t.raw('process') as CardProps[]
    // const carouselRef = useRef(null)
    // const { scrollXProgress } = useScroll({ container: carouselRef })
    // useMotionValueEvent(scrollXProgress, "change", (v) => {
    //     console.log(v)
    // })
    // const Cards = cards as CardProps[]
    return (
        <Carousel className={style.carousel}>
            <CarouselContent>
                {
                    cards.map((item, index) => {
                        const Icon = iconMap[index]
                        return (
                            <CarouselItem key={index} className={`${style.Phonecard} ${style[`card${index}`]}`}>
                                <motion.div
                                    className={style.cardContainer}
                                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1, // 👈 nice stagger effect
                                    }}
                                    viewport={{ once: false }}
                                >
                                    <div className={style.icons}>
                                        {/* {index === 0 && <FaLightbulb className={style.icon} />}
                                    {index === 1 && <FaClipboardList className={style.icon} />}
                                    {index === 2 && <FaPencilRuler className={style.icon} />}
                                    {index === 3 && <FaCode className={style.icon} />}
                                    {index === 4 && <FaVial className={style.icon} />}
                                    {index === 5 && <FaRocket className={style.icon} />}
                                    {index === 6 && <FaHandshake className={style.icon} />} */}
                                        {Icon && <Icon className={style.icon} />}
                                    </div>
                                    <h2 className={style.title}>
                                        <span className="text-[1.1rem] text-(--nav-text-color) hover:animate-bounce">{index + 1}</span>
                                       {" "} {item.title}</h2>
                                    <div className={`${style.content} ${style.phone}`} id={`scroll-container${index}`}>
                                        {/* <div id={`back-section${index}`}></div> */}
                                        <div>
                                            <p>{item.content}</p>
                                            <ArrowDownFn show={`show-section${index}`} contain={`scroll-container${index}`} />
                                        </div>
                                        <div id={`show-section${index}`}></div>
                                    </div>
                                </motion.div>
                            </CarouselItem>
                        )
                    })
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
export default PhoneProgress
