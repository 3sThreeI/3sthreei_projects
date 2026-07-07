"use client"

import { useEffect, useState } from "react"
import style from "./filters.module.css"
import { FaEye } from "react-icons/fa"
import Portfolio from "@/app/[locale]/assets/portfolio/portfolio"
import { useRouter, useSearchParams } from "next/navigation"
type PortfolioSchema = {
    img: string,
    alt: string,
    bgText: string
}
export default function CustomFilters({ childreen }: any) {
    const route = useRouter()
    const params = new URLSearchParams(useSearchParams())
    const [filters, setFilters] = useState(childreen)
    const [currentFilter, setCurrentFilter] = useState(filters[0].toLowerCase())
    const SwitchCard = (value: string) => {
        const val = value.toLowerCase()
        setCurrentFilter(val)
    }
    useEffect(()=>{
        params.set("type", currentFilter)
        route.push(`?${params.toString()}`)
    }, [currentFilter])
    return (
        <>
            <div className={style.filterContainer}>
                <div className={style.filters}>
                    {
                        filters.map((item: any, index: any) => (
                            <div key={index} onClick={() => SwitchCard(item)} className={`${style.filter} ${currentFilter.toLowerCase() === item.toLowerCase() && style.active}`}>
                                <h1>{item}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
