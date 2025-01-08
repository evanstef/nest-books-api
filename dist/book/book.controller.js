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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_model_1 = require("../model/book.model");
const book_service_1 = require("./book.service");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async addNewBook(request) {
        const result = await this.bookService.addNewBook(request);
        return {
            data: result
        };
    }
    async getAllBooksOrByGenre(genre) {
        if (genre) {
            const resultByGenre = await this.bookService.getBookByGenre(genre);
            return {
                size: resultByGenre.length,
                data: resultByGenre
            };
        }
        const resultAllBooks = await this.bookService.getAllBooks();
        return {
            size: resultAllBooks.length,
            data: resultAllBooks
        };
    }
    async getPopularBooks() {
        const result = await this.bookService.getPopularBooks();
        return {
            size: result.length,
            data: result
        };
    }
    async getBookById(id) {
        const result = await this.bookService.getBookById(id);
        return {
            data: result
        };
    }
    async getBookByType(type) {
        const result = await this.bookService.getBookByType(type);
        return {
            size: result.length,
            data: result
        };
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_model_1.AddNewBookRequest]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addNewBook", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('genres')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooksOrByGenre", null);
__decorate([
    (0, common_1.Get)('/popular'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getPopularBooks", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBookById", null);
__decorate([
    (0, common_1.Get)('/type/:type'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBookByType", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('/api/book'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map