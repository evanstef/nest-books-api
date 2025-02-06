import { Controller, Get } from "@nestjs/common";


@Controller()
export class AppController {
    @Get()
    getHello() : any {
        return {
            authors : 'Evan Stefanus Candra',
            API_documentation : 'https://github.com/evanstef/nest-books-api',
            enpoint : {
                books : {
                    recently : '/api/book',
                    popular : '/api/book/popular',
                    genre : '/api/book?genres={slug:genre}',
                    type : '/api/book/type/:type',
                    detail_book : '/api/book/:id'
                },
                authors : {
                    popular_authors : '/api/authors',
                    detail_author : '/api/authors/:slug'
                }
            }
        }
    }
}