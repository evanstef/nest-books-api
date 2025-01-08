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
exports.GetPopularBooks = exports.AddNewBookRequest = exports.BookDetailResponse = exports.BookResponse = void 0;
const class_validator_1 = require("class-validator");
class BookResponse {
}
exports.BookResponse = BookResponse;
class BookDetailResponse extends BookResponse {
}
exports.BookDetailResponse = BookDetailResponse;
class AddNewBookRequest {
}
exports.AddNewBookRequest = AddNewBookRequest;
class GetPopularBooks {
}
exports.GetPopularBooks = GetPopularBooks;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], GetPopularBooks.prototype, "limit", void 0);
//# sourceMappingURL=book.model.js.map