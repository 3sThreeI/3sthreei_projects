import { callBackend } from "@/lib/api/backend";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const pathname = new URL(request.url).pathname
        // console.log("abzar pathname", pathname)
        const rawData =  await request.json()
        // console.log("Raw data: ", rawData)
        const data = await callBackend(pathname, rawData, "POST")
        return NextResponse.json({ success: true, data: data })
    } catch (error:any) {
        return NextResponse.json(
            {
                success: false,
                errors: error.message || "failed to submit" 
            },
            { status: 500 }
        )
    }
}