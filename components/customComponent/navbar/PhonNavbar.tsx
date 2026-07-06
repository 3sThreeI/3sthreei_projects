"use client"
import style from "../navbar/navbar.module.css"
import Link from "next/link"
import { FaBars, FaCode, FaGamepad, FaMobileAlt, FaPalette } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState, useRef, useEffect } from "react"
import { NavbarProps } from "./Navbar";
export default function PhoneNavbar({ home, keyService, servicesValue, project, about, faq, blog, signin }: NavbarProps) {
    const ControleExpand = useRef<HTMLUListElement | null>(null)
    const [is_active, setIs_active] = useState(false)
    const [openServices, setOpenServices] = useState(false)
    const serviceFn = () => {
        setOpenServices(!openServices)
    }
    const expand = () => {
        setIs_active((prev) => !prev)
    }
    useEffect(() => {
        const HandleExpand = (e: MouseEvent) => {
            const target = e.target as Node | null
            if (
                ControleExpand.current && target && !ControleExpand.current.contains(target)
            ) {
                setIs_active(false)
            }
        }
        document.addEventListener("mousedown", HandleExpand);
        return () => {
            document.removeEventListener("mousedown", HandleExpand)
        }
    }, [])
    return (
        <div className={style.PhoneNav} >
            <button className={style.btnMenu} onClick={expand}> <FaBars /> </button>
            {
                <div className={`${style.PhonenavCard} ${is_active && style.active}`}>
                    <ul className={`${style.PhoneNavlink}`} ref={ControleExpand}>
                        <li > <Link href='/'>{home}</Link></li>
                        <div className={style.li} onClick={serviceFn}>
                            {/* <Link href='/service' > */}
                            {keyService} <TiArrowSortedDown className={`${style.icon} ${openServices ? style.open : ''}`} />
                            {
                                // openServices && (
                                <div className={`${style.PhoneServiceDropdown} ${openServices ? style.open : ''}`}>
                                    {
                                        servicesValue.map((service, index) => {
                                            const icons = [<FaCode />, <FaMobileAlt />, <FaGamepad />, <FaPalette />];
                                            return (
                                                <li key={index} className={style.PhoneserviceItem}>
                                                        {icons[index]}
                                                    <Link href={service.url} className={style.PhoneServiceLink}>
                                                         {service.name}
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    }
                                </div>
                                // )
                            }
                            {/* </Link> */}
                        </div>
                        <li> <Link href='/projects'>{project}</Link></li>
                        <li> <Link href='/about'>{about}</Link></li>
                        <li> <Link href='/faq'>{faq}</Link></li>
                        {/* <li> <Link href='/blog'>{blog}</Link></li> */}
                        <li> <Link href='/auth/sign-in'>{signin}</Link></li>
                    </ul>
                </div>

            }
        </div>
    )
}