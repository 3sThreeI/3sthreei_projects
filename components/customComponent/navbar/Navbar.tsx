import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import SwitchButtonTheme from "../../ui/customButton/switchLang";
import PhoneNavbar from "./PhonNavbar";
import style from "./navbar.module.css"
export default async function Navbar() {
    const t = await getTranslations('navbar')
    const locale = await getLocale()
    return (
        <nav className={style.nav}>
            <div className="py-2">
                <h1>3SThreeI</h1>
            </div>
            {/* -------------------------- huge screee */}
            <ul className={style.navlink}>
                <li> <Link href='/'>{t('home')}</Link></li>
                <li> <Link href='/courses'>{t('course')}</Link></li>
                <li> <Link href='/projects'>{t('project')}</Link></li>
                <li> <Link href='/about'>{t('about')}</Link></li>
                <li> <Link href='/faq'>{t('faq')}</Link></li>
                <li> <Link href='/blog'>{t('blog')}</Link></li>
                <li> <Link href='/blog'>{t('signin')}</Link></li>
            </ul>
            {/* -------------------------- small screen */}
            <div className={style.button}>
                {/* button for theme */}
                <SwitchButtonTheme locale={locale} />
                {/* button to switch language  */}
                {/* <div className="border h-5 w-14">
                </div> */}
                <PhoneNavbar home={t('home')} course={t('course')} project={t('project')} about={t('about')} faq={t('faq')} blog={t('blog')} signin={t('signin')} />
            </div>
        </nav>
    );
}