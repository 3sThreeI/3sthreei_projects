import { title } from "process"
import style from "./projectContactFom.module.css"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
export async function generateMetadata(params: Promise<{ locale: string }>): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "contactForm" })
    const sitename = await getTranslations('sitenames') as any
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            "siteName": sitename,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/contact-form`
        },
        alternates:{
            canonical: `/${locale}/contact-form`
        }
    }
}
export default function ProjectContactForm() {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.card}>
                    {/* Header Section */}
                    <div className={style.header}>
                        <h1 className={style.title}>Let's Build Something Amazing</h1>
                        <p className={style.subtitle}>Tell us about your project and we'll get back to you within 24 hours</p>
                    </div>

                    <form action="" aria-label="contact-form-for-building-project" className={style.form}>
                        {/* Full Name */}
                        <div className={style.formGroup}>
                            <label htmlFor="fullname" className={style.label}>Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                placeholder="e.g.ex:full name"
                                title="type your first Name and Last Name"
                                className={style.input}
                                required
                            />
                        </div>

                        {/* Email and Phone */}
                        <div className={style.grid}>
                            <div className={style.formGroup}>
                                <label htmlFor="email" className={style.label}>Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    title="type your email"
                                    className={style.input}
                                    required
                                />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="phoneNumber" className={style.label}>Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    placeholder="+1 (555) 000-0000"
                                    title="type your phone number"
                                    className={style.input}
                                    required
                                />
                            </div>
                        </div>

                        {/* Website URL */}
                        <div className={style.formGroup}>
                            <label htmlFor="website" className={style.label}>Website <span className={style.optional}>(Optional)</span></label>
                            <input
                                type="url"
                                id="website"
                                placeholder="https://yourwebsite.com"
                                title="please type your website url"
                                className={style.input}
                            />
                        </div>

                        {/* Project Type */}
                        <div className={style.formGroup}>
                            <label htmlFor="projectType" className={style.label}>Project Type</label>
                            <select
                                id="projectType"
                                className={style.select}
                                required
                                title="your project type"
                            >
                                <option value="">Select a project type...</option>
                                <option value="web">Web Site</option>
                                <option value="application">Application (Mobile, Desktop)</option>
                                <option value="design">Design</option>
                                <option value="gaming">Gaming</option>
                                <option value="audit">Audit your site</option>
                                <option value="marketing">Marketing</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div className={style.formGroup}>
                            <label htmlFor="message" className={style.label}>Project Details</label>
                            <textarea
                                id="message"
                                placeholder="Tell us more about your project..."
                                title="describe your project"
                                className={style.textarea}
                                rows={5}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className={style.submitBtn} aria-label="submit contact form">
                            <span className={style.btnText}>Send Message</span>
                            <span className={style.btnIcon}>→</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}