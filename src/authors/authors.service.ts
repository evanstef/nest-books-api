import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { AuthorResponse } from "../model/authors.model";

@Injectable() 
export class AuthorsService {
    constructor(private prismaService : PrismaService, private validationService: ValidationService) {}

    // mendapatkan data semua author 
    async getAllAuthors(): Promise<AuthorResponse[]> { 
        // mengambil semua author yang di data base namun diurutkan dari total buku terbanyak
        const authors = await this.prismaService.author.findMany({
            take : 20,
            include: {
                _count: {
                    select: {
                        books: true,
                    },
                },
            }
        })

        // urutkan dari jumlah buku yang terbanyak
        authors.sort((a, b) => b._count.books - a._count.books);
        
        return authors.map((item) => {
            return {
                id : item.id,
                name : item.name,
                slug : item.slug,
                avatar : !item.avatar || item.avatar === "NULL" ? null : item.avatar,
                total_books : item._count.books,
            }
        })
    }

    // mendapatkan buku berdasarkan author yang sesuai dengan slug
    async getAuthorBySlug(slug : string) : Promise<AuthorResponse> {
        // mencari author berdasarkan id yang dapatkan dari params 
        const author = await this.prismaService.author.findUnique({
            where : {
                slug : slug
            },
            include : {
                _count : {
                    select : {
                        books : true
                    }
                },
                books : {
                    orderBy : {
                        book : {
                            score : 'desc' // diurutkan dari score tertinggi
                        }
                    },
                    include : {
                        book : { // Menyertakan detail buku
                            include : {
                                genre : {
                                    include : {
                                        genre : true // Menyertakan nama genre
                                    }
                                },
                                type : {
                                    include : {
                                        type : true // Menyertakan nama type
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        // pengecekan bila author tidak ditemukan
        if (!author) { 
            throw new HttpException('Author not found', 404);
        }



        return {
            id : author.id,
            name : author.name,
            slug : author.slug,
            avatar : !author.avatar || author.avatar === "NULL" ? null : author.avatar,
            total_books : author._count.books,
            books : author.books.map((item) => {
                return {
                    id : item.book.id,
                    title : item.book.title,
                    slug : item.book.slug,
                    cover_path : item.book.cover_path ? item.book.cover_path : null,
                    summary : item.book.summary ? item.book.summary : null,
                    score : item.book.score,
                    rating : item.book.rating,
                    type : item.book.type[0]?.type.name,
                    first_release_date : item.book.first_release_date.toISOString().substring(0, 10),
                    genres : item.book.genre.map((genre) => genre.genre.name),
                    
                }
            })
        }

     }
}