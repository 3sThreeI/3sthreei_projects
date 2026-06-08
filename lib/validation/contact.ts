import { z } from "zod";

export const contactSchema = z.object({
    fullname: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email("Invalid Email"),
    phoneNumber: z.string()
        .min(7, "Phone number is too short")
        .trim()
        .max(20, "Phone number is too long")
        .regex(/^\+\d{1,4}\d{7,15}$/, "Please enter a valid phone number. (e.g., +233000000)"),  // ✅ More 
    message: z
        .string()
        .min(30, "Message must be at least 30 characters")
        .max(1000, "Message must be less than 1000 characters"),
})
export type ContactForm = z.infer<typeof contactSchema>