"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMiddleware = void 0;
const common_1 = require("@nestjs/common");
let PostMiddleware = class PostMiddleware {
    use(req, res, next) {
        if (req.method === 'POST') {
            const passwordHeaders = req.headers['password'];
            const envPassword = process.env.PASSWORD_POST;
            if (!passwordHeaders || passwordHeaders !== envPassword) {
                throw new common_1.HttpException('Dilarang Post Selain Admin', 400);
            }
        }
        next();
    }
};
exports.PostMiddleware = PostMiddleware;
exports.PostMiddleware = PostMiddleware = __decorate([
    (0, common_1.Injectable)()
], PostMiddleware);
//# sourceMappingURL=post.middleware.js.map