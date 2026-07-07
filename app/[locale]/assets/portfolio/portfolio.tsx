import style from "./portfolio.module.css"
import { getTranslations } from "next-intl/server"
import Link from "next/link";
import { FaEye } from "react-icons/fa";

type PortfolioSchema = {
    name: string,
    url: string,
    image: {
        url: string,
        publicId:string
    },
    description:string,
    type:string
}
async function fetchProject(type?:string|null){
    const params = new URLSearchParams({
        limit: "15",
        page: "1",
        type: type || ""
    })
    try {
        const resp = await fetch(`http://localhost:8440/api/projects/getAll?${params}`, {
            headers: {"Content-Type": "application/json"},
            method: "GET"
        })
        const data = await resp.json()
        if(!resp.ok){
            console.log("Project Failed", data.Error)
            return []
        }
        console.log("Project Fetch successfully", data)
        return data.response
    } catch (error:any) {
        console.log("Project failed ", error.message)
        return []
    }
}
export default async function Portfolio({type}:{type?:string}) {
    const t = await getTranslations()
    const Type =  type
    console.log("******type", Type)
    const Project = await fetchProject(type)
    const items:PortfolioSchema[] = Project ? Project : null
    return (
        <>
            <div className={style.container}>
                <h1 className={style.title}>{t("porfolio.title")}</h1>
                <p className={style.subtitle}>{t("porfolio.subtitle")}</p>
                <div className={style.cards}>
                    {
                        Project &&
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
                    }
                </div>
            </div>
        </>
    )
}