import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { WebModelResponse } from "src/model/web.model";
import { AuthorResponse } from "src/model/authors.model";

@Controller('/api/authors')
export class AuthorsController {
    constructor(private authorsService : AuthorsService) {}

    // mendapatkan data semua author
    @Get()
    @HttpCode(200)
    async getAllAuthors() : Promise<WebModelResponse<AuthorResponse[]>> {
        const result = await this.authorsService.getAllAuthors();
        
        return {
            size : result.length,
            data : result
        }
    }

    // mendapatkan buku berdasarkan author yang sesuai dengan slug
    @Get('/:slug')
    @HttpCode(200)
    async getAuthorBySlug(@Param('slug') slug : string) : Promise<WebModelResponse<AuthorResponse>> {
        const result = await this.authorsService.getAuthorBySlug(slug);
        
        return {
            data : result
        }
    }
}