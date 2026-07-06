import { callBackend } from "@/lib/api/backend";
import { auditSchema } from "@/lib/validation/audit";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const rawData = await request.json()
        const validated = auditSchema.safeParse(rawData)

        if (!validated.success) {
            return NextResponse.json({
                errors: "Validate Audit form failed",
                details: validated.error.flatten().fieldErrors
            }, { status: 400 })
        }
        //  if no error then send to proxy 
        const BackendResp = await callBackend('/api/service/audit/add', validated.data)
        const data = await BackendResp.json()
        const cookies = BackendResp.headers.getSetCookie();
        const response =  NextResponse.json({ success: true, data: data,  })
        cookies.forEach((cookie) => {
            response.headers.append("Set-Cookie", cookie);
        });
        return response
    } catch (error) {
        // console.log("Internal server Error")
        return NextResponse.json(
            {
                error: "Internal server error"
            },
            {
                status: 500
            }
        )

    }
}