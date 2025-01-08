import { BookResponse } from "./book.model";
export declare class AuthorResponse {
    id: number;
    name: string;
    slug: string;
    avatar?: string;
    total_books?: number;
    books?: Array<BookResponse>;
}
