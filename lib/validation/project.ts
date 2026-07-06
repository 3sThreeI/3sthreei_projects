import z, { minLength } from "zod";

export const projectsSchema = z.object({
    name: z
        .string()
        .min(5, 'Project Name must be at least 3 characters'),
    url: z
        .string()
        .trim()
        .min(2,"Please enter a valid website URL"),
    images: z.instanceof(File),
    description: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(50, "Message must be less than 50 characters"),
    type: z.string().min(2, "Please type is required ").toLowerCase()
})
export type ProjectsSchema = z.infer<typeof projectsSchema>