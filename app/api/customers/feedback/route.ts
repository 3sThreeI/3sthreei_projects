import { callBackend } from "@/lib/api/backend";
import { testimonialSchema } from "@/lib/validation/testimonial";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        console.log("rawData: ", formData)
        const rawData  = {
            fullname: formData.get("fullname"),
            feedback: formData.get("feedback"),
            Img_url: formData.get("Img_url") as File | null
        }
        // const validated = testimonialSchema.safeParse(rawData)
        // if (!validated.success) {
        //     return NextResponse.json({
        //         success: false,
        //         errors: "Please Check the required field",
        //         details: validated.error.flatten().fieldErrors
        //     },
        //         { status: 400 }
        //     )
        // }
        const BackendResp = await callBackend("/api/customers/feedback/add", formData, false, "POST")
        const data = await BackendResp.json()
        const cookies = BackendResp.headers.getSetCookie();
        const response = NextResponse.json({ success: true, data: data, })
        cookies.forEach((cookie) => {
            response.headers.append("Set-Cookie", cookie);
        });
        return response
    } catch (error: any) {
       return NextResponse.json(
            {
                success: false,
                errors: error.message || "Error !!!"
            },
            { status: 500 }
        )
    }
}
export async function GET() {
    try {
        const BackendResp = await callBackend("/api/customers/feedback/", null, false, "GET")
        const data = await BackendResp.json()
        const cookies = BackendResp.headers.getSetCookie();
        const response = NextResponse.json({ success: true, data: data, })
        cookies.forEach((cookie) => {
            response.headers.append("Set-Cookie", cookie);
        });
        return response
    } catch (error: any) {
       return NextResponse.json(
            {
                success: false,
                errors: error.message || "Error !!!"
            },
            { status: 500 }
        )
    }

}