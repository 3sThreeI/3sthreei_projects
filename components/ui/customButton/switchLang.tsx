"use client"
// import { getLocale } from "next-intl/server"
import { useRouter } from "next/navigation";
import "./switchLang.css"
import { useEffect, useState } from "react";

interface HeroProps {
    locale: string
}
function SwitchButtonTheme({ locale }: HeroProps) {
    const [active, setActive] = useState(locale)
    const router = useRouter()
    const Switchlanguage = () => {
        const newLocale = active === "fr" ? "en" : "fr"

        setActive(newLocale)
        setTimeout(() => {
            if (locale === 'fr') {
                router.push('/en')
            } else {
                router.push('/fr')
            }
        }, 300);

    }
    return (
        <>
            <div className="themeBtn" onClick={Switchlanguage}>
                <div className={` btn ${active == 'fr' ? 'active ' : "disactive"}`}
                >
                    <span className="themeText">{locale === 'fr' ? 'En' : 'Fr'}</span>
                </div>
            </div>
        </>
    )
}
export default SwitchButtonTheme;