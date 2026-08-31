"use client"
import style from "@/app/[locale]/(dashboard)/dashboard-3si/dasboard.module.css"
import { VscLayoutSidebarLeftDock, VscLayoutSidebarRightDock } from "react-icons/vsc";
interface props{
    onExtend:React.ReactEventHandler,
    extendValue: boolean
}
export default function Dash_Navbar({onExtend, extendValue}:props){
    return (
        <nav className={style.NavbarContainer}>
            <div className={style.logo}>
                
            </div>
            <div className={style.Nav_Content}>
                <div className="">
                    {
                        extendValue ?
                        <VscLayoutSidebarLeftDock onClick={onExtend} />
                        : 
                        <VscLayoutSidebarRightDock onClick={onExtend} />
                    }
                </div>
            </div>
        </nav>
    )
}