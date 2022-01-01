import { z } from "zod";

export const auditSchema = z.object({
    company_name: z.string()
    .min(5, 'company name must be at least 3 characters'),
    // .regex(/^[A-Z][a-z]+\s+[A-Z][a-z]+\d+$/, "please type a validate company name, no space at the end" ),
    email: z.string().email("Invalid Email"),
    url: z
        .string()
        .min(6, "url must be at least 6 characters")
        .max(50, "Message must be less than 1000 characters"),
})
export type ContactForm = z.infer<typeof contactSchema>