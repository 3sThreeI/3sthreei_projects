import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { callBackend } from "@/lib/api/backend";

export async function POST(request: NextRequest){
    try {
        const rawData = await request.json()
        const validated = contactSchema.safeParse(rawData)

        if(!validated.success){
            return NextResponse.json(
                {
                    errors: 'Validation Contact form failed',
                    details: validated.error.flatten().fieldErrors
                },
               {status: 400}
            )
        }
        //  calling external Backend
        const data = await callBackend('/api/contact-form/submit', validated.data)
        return NextResponse.json({success: true, data: data})
    } catch (error:any) {
        return NextResponse.json(
            {errors: error.message || "failed to submit"},
            {status: 500}
        )
    }
}
export async function Get(request: NextRequest){
    try {
        const resp = await callBackend('/api/contact-form/', null, "GET")
        return NextResponse.json({
            success:true,
            data:resp
        })
    } catch (error:any) {
        return NextResponse.json(
            {errors: error.message || "Error to fectch"},
            {status: 500}
        )
    }
}