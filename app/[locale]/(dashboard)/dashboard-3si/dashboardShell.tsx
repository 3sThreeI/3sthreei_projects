"use client"
import { useState } from "react"
import Dash_Navbar from "../../assets/dashboard/navbar/dashnavb"
import style from "./dasboard.module.css"
interface Props {
    children: React.ReactNode
}
export default function DashboardShell({ children }: Props) {
    const [dashboardExtend, setDashboardExtend] = useState(true)

    const onExtendClick = () => {
        setDashboardExtend(prev => !prev)
    }
    return (
        <div className={style.globalContainer}>
            <div className={style.body}>
                <aside className={`${style.aside} ${dashboardExtend ? style.extend : ""}`}>
                </aside>
                <main className={style.main}>
                    <Dash_Navbar onExtend={onExtendClick} extendValue={dashboardExtend} />
                    {children}
                </main>
                <footer>
                </footer>
            </div>
        </div>
    )
}