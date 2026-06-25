import { z } from "zod";

export const contactSchema = z.object({
    fullname: z.string()
    .min(5, 'Name must be at least 5 characters')
    .regex(/^[A-Z][a-z]+\s+[A-Z][a-z]+$/, "please type a validate Name, no space at the end" ),
    email: z.string().email("Invalid Email"),
    phone_number: z.string()
        .min(7, "Phone number is too short")
        .trim()
        .max(20, "Phone number is too long")
        .regex(/^\+\d{1,4}\d{7,15}$/, "Please enter a valid phone number. (e.g., +233000000)"),  // ✅ More 
    description: z
        .string()
        .min(80, "Message must be at least 80 characters")
        .max(250, "Message must be less than 250 characters"),
    price: z.string().optional(),
    project_type: z.string()
})
export type ContactForm = z.infer<typeof contactSchema>