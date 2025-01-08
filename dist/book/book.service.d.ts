import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { Logger } from "winston";
import { AddNewBookRequest, BookDetailResponse, BookResponse } from "src/model/book.model";
export declare class BookService {
    private prismaService;
    private validationService;
    private readonly logger;
    constructor(prismaService: PrismaService, validationService: ValidationService, logger: Logger);
    addNewBook(request: AddNewBookRequest): Promise<BookResponse>;
    getAllBooks(): Promise<BookResponse[]>;
    getBookById(id: number): Promise<BookDetailResponse>;
    getBookByGenre(genre: string): Promise<BookResponse[]>;
    getBookByType(type: string): Promise<BookResponse[]>;
    getPopularBooks(): Promise<BookResponse[]>;
}