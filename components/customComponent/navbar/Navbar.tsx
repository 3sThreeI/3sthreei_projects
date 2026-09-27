
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import SwitchButtonLang from "../../ui/customButton/switchLang";
import PhoneNavbar from "./PhonNavbar";
import style from "./navbar.module.css"
import LargeScreenNavbar from "./largeScreenNavbar";

export interface NavbarProps {
    home: string;
    keyService: string;
    servicesValue: [
        web:{name:string, url:string},
        modbile:{name:string, url:string},
        gaming:{name:string, url:string},
        design:{name:string, url:string}
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
            <div className="py-2 overflow-hidden">
              <div className={style.Icon_large_screen}>
                <Image src="/icons/3sthreei_icon_White.png" title="3sthreei" alt="3Sthreei logo Icons" width={40} height={30} loading="lazy" className={style.logoIcon}/>
              </div>
              <div className={style.Icon_small_screen}>
                <Image src="/icons/3sthreei_icon_White.png" title="3sthreei" alt="3Sthreei logo Icons" width={30} height={20} loading="lazy" className={style.logoIcon} />
              </div>
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
            </div>
        </nav>
    );
}