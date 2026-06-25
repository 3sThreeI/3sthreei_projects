import { z } from "zod";

export const auditSchema = z.object({
    company_name: z.string()
        .min(5, 'company name must be at least 3 characters'),
    // .regex(/^[A-Z][a-z]+\s+[A-Z][a-z]+\d+$/, "please type a validate company name, no space at the end" ),
    email: z.string().email("Invalid Email"),
    website_url: z
        .string()
        .trim()
        .url("Please enter a valid website URL"),
    service_type: z.string(),

})
export type AuditSchema = z.infer<typeof auditSchema>