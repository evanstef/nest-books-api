import { Controller, Get } from "@nestjs/common";


@Controller()
export class AppController {
    @Get()
    getHello() : any {
        return {
            authors : 'Evan Stefanus Candra',
            enpoint : {
                books : {
                    recently : '/api/book',
                    popular : '/api/book/popular',
                    genre : '/api/book/?genre={genre}',
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