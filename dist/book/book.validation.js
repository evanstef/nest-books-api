"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const z = require("zod");
class BookValidation {
}
exports.BookValidation = BookValidation;
BookValidation.CREATE = z.object({
    title: z.string(),
    author: z.string().optional(),
    author_image: z.string().optional(),
    publisher: z.string().min(3).optional(),
    cover_path: z.string().optional(),
    year: z.number().min(1900).max(2023),
    total_pages: z.number().min(0),
    score: z.number().min(1),
    rating: z.number().min(1).max(5).optional(),
    from_country: z.string().min(3),
    type: z.string().optional(),
    summary: z.string().optional(),
    first_release_date: z.string().min(3),
    genres: z.array(z.string()).min(1)
});
//# sourceMappingURL=book.validation.js.map