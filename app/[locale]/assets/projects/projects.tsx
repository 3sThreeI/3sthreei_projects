
import style from "./project.module.css"
import CustomFilters from "@/components/ui/filters/filters";
import Portfolio from "../portfolio/portfolio";
type filtersProps = {
    filter: string
}
export default async function Projects({ message, searchParams }: { message: any, searchParams:Promise<{type?:string}> }) {
    const {type} = await searchParams
    const t =  message.filters
    const filters = t as filtersProps[]
    return (
        <div className={style.container}>
            <div>
                {/* the CustomFilters update the url using route.push, to add the filters values either All, mobile, web */}
                <CustomFilters childreen={filters} />
            </div>
            <Portfolio type={type ?? ""}/>
        </div>
    )
}