
import { getTranslations } from "next-intl/server"
import style from "./servicesHero.module.css"
import Link from "next/link"
import Image from "next/image"

export interface ServicesHeroProps {
    title: string,
    Planguage: string
}
type mylistProps = {
    number: string,
    text: string
}
export default async function ServicesHero({ messages }: { messages: any }) {
    const t = await messages
    const mylist = t.servicesHero?.listBox as mylistProps[]
    return (
        <div className={style.Hero_Container}>
            <div className={style.heroText} aria-label="Services hero">

                <h1 className={style.title}>
                    {t.servicesHero.title}
                    </h1>
                <div className={style.TextBox}>
                    <p className={style.subtitle}>
                        {t.servicesHero.headtitle}
                    </p>
                    <ul className={style.listBox}>
                        {
                            mylist?.map((v, i)=>(
                                <li key={i} className={style.list}><strong className={style.strong}>{v.number}</strong>{v.text}</li>
                            ))
                        }
                        {/* <li className={style.list}><strong className={style.strong}></strong></li>
                        <li className={style.list}><strong className={style.strong}></strong></li> */}
                    </ul>
                </div>
                <div className={style.cta}>
                    <Link href={{ pathname: "/contact-form" }} className={style.btn}>{t.servicesHero.cta}</Link>
                </div>
            </div>
            <div className={style.heroImage}>
                <Image loading="eager" className={style.img} src={t.servicesHero.image.url} alt={t.servicesHero.image.alt} title={t.servicesHero.image.title} objectFit="cover" width={500} height={100} />
            </div>
        </div>
    )
}