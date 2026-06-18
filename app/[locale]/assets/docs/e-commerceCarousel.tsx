"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { MdLabelImportant } from "react-icons/md";
import style from "@/app/[locale]/(marketing)/projects/[...documentation]/docs.module.css"
import { useState } from "react"
import { SiOrigin } from "react-icons/si";
interface listProps {
    key: string,
    value: string[]
}
export default function FeatureCarousel(message: any) {
    const [open, setOpen] = useState(null)
 
    if (!message) return null
    const t = message.message
    const featureList = t.featureList as listProps[]
    const PassValue = (e: any | null) => {
        if (open === e) {
            return setOpen(null)
        }
        setOpen(e)
    }
    return (
        <>
            <div className={style.carouselWrapper}>
                <Carousel className={style.carousel} opts={{
                    align: "start",
                    loop: true,
                }}>
                    <CarouselContent className={style.cards}>
                        <CarouselItem className={style.carouselItem}>
                            {/* // if the image available we will display */}
                            <div className={style.imgContainer}>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className={style.carouselBtn} />
                    <CarouselNext className={style.carouselBtn} />
                </Carousel>
            </div>
            <div className={style.feature}>
                <h2 className={style.subtitle}>{t.title}</h2>
                <ul className={style.feat_card}>
                    {
                        featureList?.map((L, i) => (
                            <li key={i} onClick={() => PassValue(L.key)} className={style.feat_li}>
                                <MdLabelImportant className={style.contentIcon} /> {L.key}
                                {open === L.key && (
                                    <div className={style.feat_Box}>
                                        {
                                            L?.value?.map((l, i) => (
                                                <p key={i} className={style.feat_Content}>
                                                    <SiOrigin className={style.subContentIcons} /> {l}
                                                </p>
                                            ))
                                        }
                                    </div>
                                )}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}