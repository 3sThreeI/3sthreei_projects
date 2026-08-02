"use client"
import { useContext, createContext } from "react"
export const BetaContext = createContext(null)


export const BetaProvider = ({children, values}:any) => {
    return (
        <BetaContext.Provider value={values}>
            {children}
        </BetaContext.Provider>
    )
}
export const useBetaContext = () => {
    const data = useContext(BetaContext)
    return data ? data : []
}