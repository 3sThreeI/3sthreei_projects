import { callBackend } from "@/lib/api/backend";
import { projectsSchema } from "@/lib/validation/project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formdata = await request.formData()
        const rawData = {
            name: formdata.get("name"),
            url: formdata.get("url"),
            description: formdata.get("description"),
            img_url: formdata.get("img_url") as File | null,
            type: formdata.get("type"),
        }
        // console.log("raw data", rawData)
        const resp = await callBackend(`/api/projects/create`, formdata, false, "POST")
        const data = await resp.json()
        if (!resp.ok) {
            console.log("not should be here")
            return NextResponse.json(
                { errors: data.message || "failed to submit" },
                { status: 500 }
            )
        }
        return NextResponse.json({
            data: data,
            success: true
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { errors: error.message || "failed to submit" },
            { status: 500 }
        )
    }
}
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = Object.fromEntries(searchParams.entries())
        const BackendResp = await callBackend(`/api/projects/getAll?${query}`, "GET")
        return NextResponse.json({
            data: BackendResp.json(),
            success: true
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { errors: error.message || "failed to fetch" },
            { status: 500 }
        )
    }
}