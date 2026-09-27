"use client"
import { useTranslations } from "next-intl"
import style from "./navbar.module.css"
import { TiArrowSortedDown } from "react-icons/ti";
import { FaCode, FaMobileAlt, FaGamepad, FaPalette } from "react-icons/fa";
import Link from "next/link"
import { NavbarProps } from "./Navbar";
import { useEffect, useState } from "react";
import { fetchUser } from "@/app/[locale]/(auth)/auth/fetchUser";
interface currentUserProps {
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    admin: boolean
}
export default function LargeScreenNavbar({ home, keyService, servicesValue, project, about, faq, blog, signin }: NavbarProps) {
    const [openServices, setOpenServices] = useState(false)
    const [user, setUser] = useState<currentUserProps | null>(null)
    useEffect(() => {
        const loadUser = async () => {
            const user = await fetchUser()
            setUser(user)
        }
        loadUser()
    }, [])
    const serviceFn = () => {
        setOpenServices(true)
    }
    return (
        <>
            <ul className={style.navlink}>
                <li> <Link href='/'>{home}</Link></li>
                <li className={style.li} onMouseEnter={serviceFn} onMouseLeave={() => setOpenServices(false)}>
                    {/* <Link href='/service' > */}
                    {keyService} <TiArrowSortedDown className={`${style.icon} ${openServices ? style.open : ''}`} />
                    {
                        openServices && (
                            <div className={`${style.ServiceDropdown} ${openServices ? style.open : ''}`}>
                                {
                                    servicesValue.map((service, index) => {
                                        const icons = [<FaCode />, <FaMobileAlt />, <FaGamepad />, <FaPalette />];
                                        return (
                                            <div key={index} className={style.serviceItem}>
                                                <Link href={service.url} className={style.serviceLink}>
                                                    {icons[index]} {service.name}
                                                </Link>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                    {/* </Link> */}
                </li>
                <li> <Link href='/projects'>{project}</Link></li>
                <li> <Link href='/about'>{about}</Link></li>
                <li> <Link href='/faq'>{faq}</Link></li>
                {/* <li> <Link href='/blog'>{blog}</Link></li> */}
                {
                    !user ?
                        <li> <Link href='/auth/sign-in'>{signin}</Link></li>
                        :
                        <li>{user.lastname}</li>
                }
            </ul>
        </>
    )
}