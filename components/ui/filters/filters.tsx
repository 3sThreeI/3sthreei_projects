"use client"

import { useState } from "react"
import style from "./filters.module.css"
import { FaEye } from "react-icons/fa"
type PortfolioSchema = {
    img: string,
    alt: string,
    bgText: string
}
export default function CustomFilters({ childreen, displayType, items }: any) {
    const portfolio = items as PortfolioSchema[]
    const [filters, setFilters] = useState(childreen) 
    const [currentFilter, setCurrentFilter] = useState(filters[0])
    const SwitchCard = (value: string) => {
        const val = value.toLowerCase()
        setCurrentFilter(val)
    }
    return (
        <>
        <div className={style.filterContainer}>
            <div className={style.filters}>
            {
                filters.map((item:any, index:any)=> (
                    <div key={index} onClick={() => SwitchCard(item)} className={`${style.filter} ${currentFilter === item.toLowerCase() && style.active}`}>
                        <h1>{item}</h1>
                    </div>
                ))
            }
            </div>
            {
                ( displayType === "portfolio" && portfolio && portfolio.length>0 ) && 
                <div className={style.cards}>
                    <div className={style.cards}>
                    {
                        portfolio.map((item:any, index:number) => (
                            <div key={index} className={style.card}>
                                <div className={style.background}>
                                    <FaEye className={style.icon}/>
                                    <p className={style.bgText}>{item.bgText}</p>
                                </div>
                                {
                                    item.img ?
                                        <img className={style.img} src={item.img} alt={item.alt} height={200} width={350} loading="lazy" />
                                        :
                                        <div className={style.skeleton}>
                                        </div>
                                }
                            </div>

                        ))
                    }
                </div>
                </div>
            }
        </div>
        </>
    )
}
