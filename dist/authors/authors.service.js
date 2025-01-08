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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
let AuthorsService = class AuthorsService {
    constructor(prismaService, validationService) {
        this.prismaService = prismaService;
        this.validationService = validationService;
    }
    async getAllAuthors() {
        const authors = await this.prismaService.author.findMany({
            take: 20,
            include: {
                _count: {
                    select: {
                        books: true,
                    },
                },
            }
        });
        authors.sort((a, b) => b._count.books - a._count.books);
        return authors.map((item) => {
            return {
                id: item.id,
                name: item.name,
                slug: item.slug,
                avatar: item.avatar ? item.avatar : null,
                total_books: item._count.books,
            };
        });
    }
    async getAuthorBySlug(slug) {
        const author = await this.prismaService.author.findUnique({
            where: {
                slug: slug
            },
            include: {
                _count: {
                    select: {
                        books: true
                    }
                },
                books: {
                    orderBy: {
                        book: {
                            score: 'desc'
                        }
                    },
                    include: {
                        book: {
                            include: {
                                genre: {
                                    include: {
                                        genre: true
                                    }
                                },
                                type: {
                                    include: {
                                        type: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!author) {
            throw new common_1.HttpException('Author not found', 404);
        }
        return {
            id: author.id,
            name: author.name,
            slug: author.slug,
            avatar: author.avatar ? author.avatar : null,
            total_books: author._count.books,
            books: author.books.map((item) => {
                return {
                    id: item.book.id,
                    title: item.book.title,
                    slug: item.book.slug,
                    cover_path: item.book.cover_path ? item.book.cover_path : null,
                    summary: item.book.summary ? item.book.summary : null,
                    score: item.book.score,
                    type: item.book.type[0]?.type.name,
                    release_date: item.book.release_date.toISOString().substring(0, 10),
                    genres: item.book.genre.map((genre) => genre.genre.name),
                };
            })
        };
    }
};
exports.AuthorsService = AuthorsService;
exports.AuthorsService = AuthorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, validation_service_1.ValidationService])
], AuthorsService);
//# sourceMappingURL=authors.service.js.map