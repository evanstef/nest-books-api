import { AddNewBookRequest, BookDetailResponse, BookResponse } from "src/model/book.model";
import { WebModelResponse } from "src/model/web.model";
import { BookService } from "./book.service";
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    addNewBook(request: AddNewBookRequest): Promise<WebModelResponse<BookResponse>>;
    getAllBooksOrByGenre(genre: string): Promise<WebModelResponse<BookResponse[]>>;
    getPopularBooks(): Promise<WebModelResponse<BookResponse[]>>;
    getBookById(id: number): Promise<WebModelResponse<BookDetailResponse>>;
    getBookByType(type: string): Promise<WebModelResponse<BookResponse[]>>;
}
