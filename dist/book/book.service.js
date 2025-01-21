"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const book_validation_1 = require("./book.validation");
let BookService = class BookService {
    constructor(prismaService, validationService, logger) {
        this.prismaService = prismaService;
        this.validationService = validationService;
        this.logger = logger;
    }
    async addNewBook(request) {
        this.logger.info(`Add new book with title ${request.title} ${request.year} ${request.total_pages}`);
        const addBookRequest = await this.validationService.validate(book_validation_1.BookValidation.CREATE, request);
        addBookRequest.slug = addBookRequest.title.toLowerCase().replace(/ /g, '-');
        const bookExists = await this.prismaService.books.findFirst({
            where: {
                slug: addBookRequest.slug
            }
        });
        if (bookExists) {
            throw new common_1.HttpException('Book already exists', 400);
        }
        const releaseDate = new Date(addBookRequest.first_release_date);
        const newBook = await this.prismaService.books.create({
            data: {
                title: addBookRequest.title,
                slug: addBookRequest.slug,
                publisher: addBookRequest.publisher,
                cover_path: addBookRequest.cover_path,
                year: addBookRequest.year,
                total_pages: addBookRequest.total_pages,
                score: addBookRequest.score,
                from_country: addBookRequest.from_country,
                summary: addBookRequest.summary,
                rating: addBookRequest.rating,
                first_release_date: releaseDate,
            }
        });
        let author;
        if (addBookRequest?.author !== '') {
            author = await this.prismaService.author.findFirst({
                where: {
                    OR: [
                        { name: addBookRequest.author },
                        { slug: addBookRequest.author.toLowerCase().replace(/ /g, '-') }
                    ]
                }
            });
            if (!author) {
                author = await this.prismaService.author.create({
                    data: {
                        name: addBookRequest.author,
                        slug: addBookRequest.author.toLowerCase().replace(/ /g, '-'),
                        avatar: addBookRequest.author_image === '' || !addBookRequest.author_image ? null : addBookRequest.author_image
                    },
                });
            }
            await this.prismaService.authorsOnBooks.create({
                data: {
                    bookId: newBook.id,
                    authorId: author.id,
                }
            });
        }
        let type;
        if (addBookRequest?.type !== '') {
            type = await this.prismaService.type.findFirst({
                where: {
                    name: addBookRequest.type
                },
            });
            if (!type) {
                type = await this.prismaService.type.create({
                    data: {
                        name: addBookRequest.type,
                        slug: addBookRequest.type.toLowerCase().replace(/ /g, '-')
                    },
                });
            }
            await this.prismaService.typeOnBooks.create({
                data: {
                    bookId: newBook.id,
                    typeId: type.id,
                },
            });
        }
        const genreNames = addBookRequest.genres;
        for (const genreName of genreNames) {
            const slugGenre = genreName.toLowerCase().replace(/ /g, '-');
            let genre = await this.prismaService.genre.findFirst({
                where: {
                    slug: slugGenre
                }
            });
            if (!genre) {
                genre = await this.prismaService.genre.create({
                    data: {
                        name: genreName,
                        slug: slugGenre
                    },
                });
            }
            await this.prismaService.genresOnBooks.create({
                data: {
                    bookId: newBook.id,
                    genreId: genre.id,
                },
            });
        }
        const formattedReleaseDate = newBook.first_release_date.toISOString().substring(0, 10);
        return {
            id: newBook.id,
            title: newBook.title,
            slug: newBook.slug,
            author: addBookRequest.author === '' ? 'Unknown' : author.name,
            cover_path: newBook.cover_path,
            summary: newBook.summary,
            score: newBook.score,
            rating: newBook.rating,
            type: addBookRequest.type === '' ? 'Unknown' : type.name,
            first_release_date: formattedReleaseDate,
            genres: genreNames,
        };
    }
    async getAllBooks() {
        const books = await this.prismaService.books.findMany({
            orderBy: {
                first_release_date: 'desc'
            },
            take: 20,
            include: {
                author: {
                    include: {
                        author: true,
                    },
                },
                genre: {
                    include: {
                        genre: true,
                    },
                },
                type: {
                    include: {
                        type: true,
                    },
                },
            },
        });
        return books.map((book) => {
            return {
                id: book.id,
                title: book.title,
                slug: book.slug,
                author: book.author[0]?.author.name || 'Unknown',
                cover_path: book.cover_path,
                summary: book.summary,
                score: book.score,
                rating: book.rating,
                type: book.type[0]?.type.name || 'Unknown',
                first_release_date: book.first_release_date.toISOString().substring(0, 10),
                genres: book.genre.map((item) => item.genre.name),
            };
        });
    }
    async getBookById(id) {
        const book = await this.prismaService.books.findUnique({
            where: { id: id },
            include: {
                author: {
                    include: {
                        author: true,
                    },
                },
                genre: {
                    include: {
                        genre: true,
                    },
                },
                type: {
                    include: {
                        type: true,
                    },
                },
            },
        });
        if (!book) {
            throw new common_1.HttpException('Book not found', 404);
        }
        const formattedReleaseDate = book.first_release_date.toISOString().substring(0, 10);
        return {
            title: book.title,
            slug: book.slug,
            author: book.author[0]?.author.name || 'Unknown',
            publisher: book.publisher || 'Unknown',
            cover_path: book.cover_path,
            year: book.year,
            summary: book.summary,
            score: book.score,
            rating: book.rating,
            total_pages: book.total_pages,
            from_country: book.from_country,
            type: book.type[0]?.type.name || 'Unknown',
            first_release_date: formattedReleaseDate,
            genres: book.genre.map((item) => item.genre.name),
        };
    }
    async getBookByGenre(genre) {
        const genreExists = await this.prismaService.genre.findFirst({
            where: {
                OR: [{ slug: genre }, { name: genre }],
            },
        });
        if (!genreExists) {
            throw new common_1.HttpException('Genre not found', 404);
        }
        const books = await this.prismaService.genresOnBooks.findMany({
            where: { genreId: genreExists.id },
            take: 20,
            include: {
                book: {
                    include: {
                        author: {
                            include: {
                                author: true,
                            },
                        },
                        genre: {
                            include: {
                                genre: true,
                            },
                        },
                        type: {
                            include: {
                                type: true,
                            },
                        },
                    },
                },
            },
        });
        return books.map((item) => {
            const { book } = item;
            return {
                id: book.id,
                title: book.title,
                slug: book.slug,
                author: book.author[0]?.author?.name || 'Unknown',
                cover_path: book.cover_path,
                summary: book.summary,
                score: book.score,
                rating: book.rating,
                type: book.type[0]?.type.name || 'Unknown',
                first_release_date: book.first_release_date.toISOString().substring(0, 10),
                genres: book.genre.map((g) => g.genre.name),
            };
        });
    }
    async getBookByType(type) {
        const typeExists = await this.prismaService.type.findFirst({
            where: {
                OR: [
                    {
                        slug: type
                    },
                    {
                        name: type
                    }
                ]
            }
        });
        if (!typeExists) {
            throw new common_1.HttpException('Type not found', 404);
        }
        const books = await this.prismaService.typeOnBooks.findMany({
            where: {
                typeId: typeExists.id
            },
            take: 20,
            orderBy: {
                book: {
                    first_release_date: 'desc'
                }
            },
            include: {
                book: {
                    include: {
                        author: {
                            include: {
                                author: true,
                            }
                        },
                        genre: {
                            include: {
                                genre: true,
                            }
                        },
                        type: {
                            include: {
                                type: true,
                            }
                        }
                    }
                }
            }
        });
        return books.map((item) => {
            const { book } = item;
            return {
                id: book.id,
                title: book.title,
                slug: book.slug,
                author: book.author[0]?.author.name || 'Unknown',
                cover_path: book.cover_path,
                summary: book.summary,
                score: book.score,
                rating: book.rating,
                type: book.type[0]?.type.name || 'Unknown',
                first_release_date: book.first_release_date.toISOString().substring(0, 10),
                genres: book.genre.map((g) => g.genre.name),
            };
        });
    }
    async getPopularBooks() {
        const books = await this.prismaService.books.findMany({
            orderBy: {
                score: 'desc'
            },
            take: 20,
            include: {
                author: {
                    include: {
                        author: true,
                    },
                },
                genre: {
                    include: {
                        genre: true,
                    },
                },
                type: {
                    include: {
                        type: true,
                    },
                },
            },
        });
        return books.map((item) => {
            return {
                id: item.id,
                title: item.title,
                slug: item.slug,
                author: item.author[0]?.author.name || 'Unknown',
                cover_path: item.cover_path,
                summary: item.summary,
                score: item.score,
                rating: item.rating,
                type: item.type[0]?.type.name || 'Unknown',
                first_release_date: item.first_release_date.toISOString().substring(0, 10),
                genres: item.genre.map((g) => g.genre.name),
            };
        });
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, validation_service_1.ValidationService, winston_1.Logger])
], BookService);
//# sourceMappingURL=book.service.js.map