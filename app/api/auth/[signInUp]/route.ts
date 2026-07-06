import { callBackend } from "@/lib/api/backend";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const pathname = new URL(request.url).pathname
        // console.log("abzar pathname", pathname)
        const rawData = await request.json()
        // console.log("Raw data: ", rawData)
        const BackendResp = await callBackend(pathname, rawData, true, "POST")
        const data = await BackendResp.json()
        const response = NextResponse.json({ success: true, data: data })
        // console.log(BackendResp.headers.getSetCookie());
        // console.log(BackendResp.headers.get("set-cookie"));
        const cookies = BackendResp.headers.getSetCookie();
        cookies.forEach((cookie) => {
            response.headers.append("Set-Cookie", cookie);
        });
        console.log("response", response)
        return response
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                errors: error.message || "failed to submit"
            },
            { status: 500 }
        )
    }
}