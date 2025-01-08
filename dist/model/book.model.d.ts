export declare class BookResponse {
    id?: number;
    title: string;
    slug: string;
    author?: string;
    cover_path?: string;
    summary?: string;
    score: number;
    type?: string;
    release_date: string;
    genres: Array<string>;
}
export declare class BookDetailResponse extends BookResponse {
    publisher: string;
    year: number;
    total_pages: number;
    from_country: string;
}
export declare class AddNewBookRequest {
    title: string;
    slug: string;
    author: string;
    author_image: string;
    publisher: string;
    cover_path: string;
    year: number;
    total_pages: number;
    score: number;
    from_country: string;
    type: string;
    summary: string;
    release_date: string;
    genres: Array<string>;
}
export declare class GetPopularBooks {
    limit?: string;
}