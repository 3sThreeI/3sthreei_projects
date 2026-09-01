"use client"
import style from "./dashNavBar.module.css"
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
                <div >
                    {
                        extendValue ?
                        <VscLayoutSidebarRightDock className={style.bar_icon} onClick={onExtend} />
                        : 
                        <VscLayoutSidebarLeftDock className={style.bar_icon} onClick={onExtend} />
                    }
                </div>
                <div className={style.searchContainer}>
                    <input type="text" className={style.searchInput} placeholder="Search...." name="search" id="search" />
                </div>
                <div className={style.leftContainer}>

                </div>
            </div>
        </nav>
    )
}