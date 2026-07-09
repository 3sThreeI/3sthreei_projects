import style from "./portfolio.module.css"
import { getTranslations } from "next-intl/server"
import Link from "next/link";
import { FaEye } from "react-icons/fa";

type PortfolioSchema = {
    name: string,
    url: string,
    image: {
        url: string,
        publicId: string
    },
    description: string,
    type: string
}
async function fetchProject(type?: string | null) {
    const params = new URLSearchParams({
        limit: "15",
        page: "1",
        type: type || ""
    })
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/getAll?${params}`, {
            headers: { "Content-Type": "application/json" },
            method: "GET"
        })
        const data = await resp.json()
        if (!resp.ok) {
            console.log("Project Failed", data.Error)
            return []
        }
        console.log("Project Fetch successfully")
        return data.response
    } catch (error: any) {
        console.log("Project failed ", error.message)
        return []
    }
}
export default async function Portfolio({ type }: { type?: string }) {
    const t = await getTranslations()
    const Type = type
    // console.log("******type", Type)
    const Project = await fetchProject(type)
    const hasProjects = Array.isArray(Project) && Project.length > 0
    const items: PortfolioSchema[] = hasProjects ? Project : []
    return (
        <>
            <div className={style.container}>
                <h1 className={style.title}>{t("porfolio.title")}</h1>
                <p className={style.subtitle}>{t("porfolio.subtitle")}</p>
                <div className={style.cards}>
                    {
                        hasProjects ?
                            items.map((item, index) => (
                                <div key={index} className={style.card}>
                                    <div className={style.background}>
                                        <Link href={item.url}>
                                            <FaEye className={style.icon} />
                                            <p className={style.bgText}>{item.description}</p>
                                        </Link>
                                    </div>
                                    {
                                        item?.image ?
                                            <img className={style.img} src={item.image.url} alt={item.image.url} height={200} width={350} loading="lazy" />
                                            :
                                            <div className={style.skeleton}>
                                            </div>
                                    }
                                </div>

                            ))
                            :
                            <div className="flex min-h-[260px] w-full items-center justify-center rounded-[24px] border border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10 text-center shadow-[0_10px_40px_rgba(2,6,23,0.35)]">
                                <div className="max-w-md space-y-4 pl-1">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-white">No projects available yet</h3>
                                        <p className="text-sm leading-6 text-slate-300">The backend has not returned any portfolio items at the moment. New work will appear here soon.</p>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}