
import { getTranslations } from "next-intl/server"
import style from "./servicesHero.module.css"
import Link from "next/link"

export interface ServicesHeroProps {
    title: string,
    Planguage: string
}
export default async function ServicesHero({ messages }: { messages: any }) {
    const t = await messages
    console.log("servicesHerro rendered")
    return (
        <div className={style.Hero_Container}>
            <h1 className={style.title}>
                {t.servicesHero.title}<br />
                <small className={style.small}>Ghana • Mali • Global Clients</small>
            </h1>
            <p className={style.subtitle}>
                {t.servicesHero.headtitle}
            </p>
            <div className={style.cta}>
                <Link href="#" className={style.btn}>Start for Free</Link>
            </div>
        </div>
    )
}