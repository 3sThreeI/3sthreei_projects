import z from "zod";

export const testimonialSchema = z.object({
    fullname: z.string()
        .min(5, 'Name must be at least 5 characters')
        .regex(/^[A-Z][a-z]+\s+[A-Z][a-z]+$/, "please type a validate Name, no space at the end"),
    feedback: z
        .string()
        .min(15, "Message must be at least 15 characters")
        .max(80, "Message must be less than 80 characters"),
    // file: z.file("please upload an image")
})
export type TestimonialSchema = z.infer<typeof testimonialSchema>