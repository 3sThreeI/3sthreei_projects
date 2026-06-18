import style from "./portfolio.module.css"
import { getTranslations } from "next-intl/server"
import Link from "next/link";
import { FaEye } from "react-icons/fa";

type PortfolioSchema = {
    img: string,
    alt: string,
    bgText: string,
    projectUrl:string
}
export default async function Portfolio() {
    const t = await getTranslations()
    const items = t.raw('portfolio') as PortfolioSchema[]
    return (
        <>
            <div className={style.container}>
                <h1 className={style.title}>Some Works</h1>
                <div className={style.cards}>
                    {
                        items.map((item, index) => (
                            <div key={index} className={style.card}>
                                <div className={style.background}>
                                    <Link href={item.projectUrl}>
                                        <FaEye className={style.icon} />
                                        <p className={style.bgText}>{item.bgText}</p>
                                    </Link>
                                </div>
                                {
                                    item.img ?
                                        <img className={style.img} src={item.img} alt={item.alt} height={200} width={350} loading="lazy" />
                                        :
                                        <div className={style.skeleton}>
                                        </div>
                                }
                            </div>

                        ))
                    }
                </div>
            </div>
        </>
    )
}