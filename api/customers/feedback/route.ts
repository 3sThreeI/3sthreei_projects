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
        const data = await callBackend("/api/customers/feedback/add", formData, "POST")
        return NextResponse.json(
            {
                success: true,
                data
            }
        )
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
        const resp = await callBackend("/api/customers/feedback/", null, "GET")
        return NextResponse.json(
            {
                success: true,
                data: resp
            }
        )
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