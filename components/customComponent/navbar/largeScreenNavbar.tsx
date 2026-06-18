"use client"
import { useTranslations } from "next-intl"
import style from "./navbar.module.css"
import { TiArrowSortedDown } from "react-icons/ti";
import { FaCode, FaMobileAlt, FaGamepad, FaPalette } from "react-icons/fa";
import Link from "next/link"
import { NavbarProps } from "./Navbar";
import { useState } from "react";
export default function LargeScreenNavbar({ home, keyService, servicesValue, project, about, faq, blog, signin }: NavbarProps) {
    const [openServices, setOpenServices] = useState(false)
    const serviceFn = () => {
        setOpenServices(true)
    }
    return (
        <>
            <ul className={style.navlink}>
                <li> <Link href='/'>{home}</Link></li>
                <div className={style.li} onMouseEnter={serviceFn} onMouseLeave={()=>setOpenServices(false)}>
                    {/* <Link href='/service' > */}
                    {keyService} <TiArrowSortedDown className={`${style.icon} ${openServices ? style.open : ''}`} />
                    {
                        openServices && (
                            <div className={`${style.ServiceDropdown} ${openServices ? style.open : ''}`}>
                                {
                                    servicesValue.map((service, index) => {
                                        const icons = [<FaCode />, <FaMobileAlt />, <FaGamepad />, <FaPalette />];
                                        return (
                                            <li key={index} className={style.serviceItem}>
                                                <Link href={service.url} className={style.serviceLink}>
                                                    {icons[index]} {service.name}
                                                </Link>
                                            </li>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                    {/* </Link> */}
                </div>
                <li> <Link href='/projects'>{project}</Link></li>
                <li> <Link href='/about'>{about}</Link></li>
                <li> <Link href='/faq'>{faq}</Link></li>
                {/* <li> <Link href='/blog'>{blog}</Link></li> */}
                <li> <Link href='/blog'>{signin}</Link></li>
            </ul>
        </>
    )
}