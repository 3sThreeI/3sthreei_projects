import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import React from "react"

type Props ={
params: Promise<{locale:string}>
}

export default async function BlogLayout({ params}: Props) {
    return (
        <>
             {/* {children}  */}
        </>
    )
}