
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import SwitchButtonLang from "../../ui/customButton/switchLang";
import PhoneNavbar from "./PhonNavbar";
import style from "./navbar.module.css"
import LargeScreenNavbar from "./largeScreenNavbar";
import { cookies } from "next/headers";

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
    user: {
        firstname:string,
        lastname:string,
        email:string,
        role:string,
        admin:boolean
    }
}
async function fetchUser() {
  const cookieStore = await cookies()
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-me`, {
      headers: {
        Cookie: cookieStore.toString()
      },
      method: "POST",
      credentials: "include",
      cache: "no-store"
    })
    if (!resp.ok) {
      console.log("refresh token failed")
      return []
    }
    const data = await resp.json()
    // console.log("User", data)
    return data
  } catch (error:any) {
      console.log("refresh token failed", error.message)
    return [];
  }
}
export default async function Navbar() {
    const t = await getTranslations('navbar')
    const locale = await getLocale()
    const data = await fetchUser()
    const user = data?.user
    // creating the navbar data for sharing with different components
    const navData: NavbarProps = {
    home: t('home'),
    keyService: t('keyservice'),
    servicesValue: t.raw('servicesValue') as any,
    project: t('project'),
    about: t('about'),
    faq: t('faq'),
    blog: t('blog'),
    signin: t('signin'),
    user: user
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
            </div>
        </nav>
    );
}