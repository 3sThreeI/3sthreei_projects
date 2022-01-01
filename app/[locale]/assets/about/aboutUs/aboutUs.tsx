import { getTranslations } from "next-intl/server";
import style from "./aboutUS.module.css"
import CustomImageLoad from "@/components/ui/imageLoad/imageload";
type cardsProps = {
    imgUrl:string,
    imgAlt: string,
    name: string,
    description:string
}
export default async function AboutUs({message}: {message:any}) {
    const t = await message.about
    const cardsItems = t.founderCard as cardsProps[]
    return (
        <div className={style.container}>
            <div className="">
                <h2 className={style.title}>{t.title}</h2>
                <p className={style.desc}>{t.description}</p>
            </div>
            <div className={style.cards}>
                {
                    cardsItems.map((item, index) => (

                        <div className={style.card} key={index}>
                            <div className={style.img}>
                                <CustomImageLoad imgUrl={item.imgUrl} imgAlt={item.imgAlt} />
                            </div>
                            <div className={style.cardText}>
                                <p className={style.Name}>{item.name}</p>
                                <p className={style.founder}>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}