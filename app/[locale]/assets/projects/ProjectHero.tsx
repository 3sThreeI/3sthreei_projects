import { getTranslations } from "next-intl/server"
import style from "./project.module.css"
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
            <button className={style.btn}>
              {t.CallToAction}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}