import { Body, Controller, Get, HttpCode, Logger, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";
import { AddNewBookRequest, BookDetailResponse, BookResponse, GetPopularBooks } from "src/model/book.model";
import { WebModelResponse } from "src/model/web.model";
import { BookService } from "./book.service";

@Controller('/api/book')
export class BookController {
    constructor(private bookService : BookService) {}
    

    // mendaftarkan buku baru ke database
    @Post()
    @HttpCode(200)
    async addNewBook(@Body() request : AddNewBookRequest) : Promise<WebModelResponse<BookResponse>> {
        const result = await this.bookService.addNewBook(request);

        return {
            data : result
        }
    }


    // mendapatkan semua buku berdasarkan relase_date nya
    @Get()
    @HttpCode(200)
    async getAllBooksOrByGenre(@Query('genres') genre : string) : Promise<WebModelResponse<BookResponse[]>> {
        // jika user menginginkan pencarian buku berdasarkan genre
        if (genre) {
            const resultByGenre = await this.bookService.getBookByGenre(genre);
    
            return {
                size : resultByGenre.length,
                data : resultByGenre
            }
        } 

        // jika user ingin mengambil semua buku yang ada didatabase sebanyak 20 buku
        const resultAllBooks = await this.bookService.getAllBooks();
    
        return {
            size : resultAllBooks.length,
            data : resultAllBooks
        }
    }

    // mendapatkan data buku berdasarkan total sales yang tertinggi popular
    @Get('/popular')
    @HttpCode(200)
    async getPopularBooks() : Promise<WebModelResponse<BookResponse[]>> {

        const result = await this.bookService.getPopularBooks();

        return {
            size : result.length,
            data : result
        }
    }

    // mendapatkan detail dari buku berdasarkan id nya
    @Get('/:id')
    @HttpCode(200)
    async getBookById(@Param('id', ParseIntPipe) id : number) : Promise<WebModelResponse<BookDetailResponse>> {
        const result = await this.bookService.getBookById(id);

        return {
            data : result
        }
    }

    // mendapatkan data buku by type
    @Get('/type/:type')
    @HttpCode(200)
    async getBookByType(@Param('type') type : string) : Promise<WebModelResponse<BookResponse[]>> {
        const result = await this.bookService.getBookByType(type);

        return {
            size : result.length,
            data : result
        }
    }




}