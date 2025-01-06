import { ZodType } from "zod";
import * as z from "zod";

export class BookValidation {
    static readonly CREATE : ZodType = z.object({
        title: z.string(),
        author: z.string().optional(),
        author_image: z.string().optional(),
        publisher: z.string().min(3).optional(),
        cover_path: z.string().optional(),
        year: z.number().min(1900).max(2023),
        total_pages: z.number().min(1),
        score: z.number().min(1),
        from_country: z.string().min(3),
        type: z.string().optional(),
        summary: z.string().optional(),
        release_date: z.string().min(3),
        genres: z.array(z.string()).min(1)
    })
}