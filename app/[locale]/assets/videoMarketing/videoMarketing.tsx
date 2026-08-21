import { getTranslations } from "next-intl/server"
import style from "./videoMarketing.module.css"
import CustomVideoPlayer from "@/components/ui/video/customVideoPlayer"
import Link from "next/link"

export default async function VideoMarketing(){
    const t = await getTranslations('mediaMarketing')
    return (
        <section className={style.container}>
            <div className={style.wrapper}>
                <div className={style.row}>
                    <div className={style.content}>
                        <h2 className={style.title}>How We Work</h2>
                        <div className={style.divider}></div>
                        <p className={style.description}>
                            {t('contentText')}
                        </p>
                        <Link href="/contact-form" className={style.cta}>{t('cta')}</Link>
                    </div>
                    <div className={style.videoWrapper}>
                        <div className={style.videoContainer}>
                            <CustomVideoPlayer Url="https://res.cloudinary.com/gibpyguc/video/upload/v1787285786/3SthreeI_English_version_jbpfna.mp4"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}