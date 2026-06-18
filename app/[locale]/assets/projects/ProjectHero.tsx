import { getTranslations } from "next-intl/server"
import style from "./project.module.css"
import Link from "next/link"
export default async function ProjectHero({message}:{message:any}) {
  const t = await message.ProjectHero
  return (
    <section className={style.section}>
      {/* Glow blobs */}
      <div className={style.bg1} />
      <div className={style.bg2} />
      <div className={style.bg3} />

      {/* Gradient layer */}
      <div className={style.heroCard}>
        <div className={style.card}>
          <h1 className={style.headText}>
            {t.headText}
          </h1>

          <p className={style.subText}>
            {t.subText}
          </p>

          <div className={style.card_btn}>
            <Link href="/contact-form" className={style.btn}>
              {t.CallToAction}
            </Link >
          </div>
        </div>
      </div>
    </section>
  )
}