
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import SwitchButtonLang from "../../ui/customButton/switchLang";
import PhoneNavbar from "./PhonNavbar";
import style from "./navbar.module.css"
import LargeScreenNavbar from "./largeScreenNavbar";

export interface NavbarProps {
    home: string;
    keyService: string;
    servicesValue: [
        web:string,
        modbile: string,
        gaming:string,
        design:string
    ] ;
    project: string;
    about: string;
    faq: string;
    blog: string;
    signin: string;
}
export default async function Navbar() {
    const t = await getTranslations('navbar')
    const locale = await getLocale()
    // creating the navbar data for sharing with different components
    const navData: NavbarProps = {
    home: t('home'),
    keyService: t('keyservice'),
    servicesValue: t.raw('servicesValue') as any,
    project: t('project'),
    about: t('about'),
    faq: t('faq'),
    blog: t('blog'),
    signin: t('signin')
  };

    return (
        <nav className={style.nav}>
            <div className="py-2">
                <h1>3SThreeI</h1>
            </div>
            {/* -------------------------- huge screee */}
            <div className="">
                <LargeScreenNavbar {...navData} />
            </div>
            {/* -------------------------- small screen */}
            <div className={style.button}>
                {/* button to switch language  */}
                <SwitchButtonLang locale={locale} />
                <PhoneNavbar {...navData} />
                {/* <div className="border h-5 w-14">
                </div> */}
            </div>
        </nav>
    );
}