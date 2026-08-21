import { getTranslations } from "next-intl/server"
import Link from "next/link"
import styles from "./footer.module.css"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"

export default async function Footer() {
    const t = await getTranslations('footer')
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Section */}
                <div className={styles.topSection}>
                    <div className={styles.grid}>
                        {/* Brand Section */}
                        <div className={styles.brandSection}>
                            <div className={styles.logo}>
                                <h3 className={styles.brandName}>3SThreeI</h3>
                                <p className={styles.brandTagline}>{t('tagline')}</p>
                            </div>
                            <p className={styles.description}>{t('description')}</p>
                        </div>

                        {/* Services */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>{t('services_title')}</h4>
                            <ul className={styles.links}>
                                <li><Link href="/services/web">{t('service_web')}</Link></li>
                                <li><Link href="/services/application">{t('service_mobile')}</Link></li>
                                <li><Link href="/unavailable">{t('service_game')}</Link></li>
                                <li><Link href="/unavailable">{t('service_design')}</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>{t('company_title')}</h4>
                            <ul className={styles.links}>
                                <li><Link href="/about">{t('about')}</Link></li>
                                <li><Link href="/projects">{t('project')}</Link></li>
                                <li><Link href="/faq">{t('faq')}</Link></li>
                                <li><Link href="/">{t('home')}</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>{t('contact_title')}</h4>
                            <ul className={styles.contactLinks}>
                                <li>
                                    <a href="mailto:contacts@3sthreei.com" className={styles.contactLink}>
                                        <FaEnvelope className={styles.icon} />
                                        {t('email')}
                                    </a>
                                </li>
                                <li className={styles.phone}>
                                    <span>{t('phone')}</span>
                                </li>
                                <li className={styles.location}>
                                    <span>{t('location')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Bottom Section */}
                <div className={styles.bottomSection}>
                    <div className={styles.bottomContent}>
                        <p className={styles.copyright}>
                            &copy; {currentYear} 3SThreeI. {t('rights_reserved')}
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
                                <FaGithub className={styles.socialIcon} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                <FaLinkedin className={styles.socialIcon} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                                <FaTwitter className={styles.socialIcon} />
                            </a>
                        </div>
                    </div>
                    <div className={styles.legalLinks}>
                        <Link href="/privacy">{t('privacy')}</Link>
                        <Link href="/terms">{t('terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
