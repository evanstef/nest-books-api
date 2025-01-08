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
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor(logger) {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'info',
                },
                {
                    emit: 'event',
                    level: 'warn',
                },
                {
                    emit: 'event',
                    level: 'error',
                },
                {
                    emit: 'event',
                    level: 'query',
                },
            ],
        });
        this.logger = logger;
    }
    async onModuleInit() {
        this.$on('info', (event) => {
            this.logger.info(event);
        });
        this.$on('warn', (event) => {
            this.logger.warn(event);
        });
        this.$on('error', (event) => {
            this.logger.error(event);
        });
        this.$on('query', (event) => {
            this.logger.info(event);
        });
        this.$use(async (params, next) => {
            if (params.model === 'Books' && params.action === 'create') {
                let randomId;
                let isDuplicate = true;
                while (isDuplicate) {
                    randomId = Math.floor(10000 + Math.random() * 90000);
                    const existingBook = await this.books.findUnique({ where: { id: randomId } });
                    if (!existingBook) {
                        isDuplicate = false;
                    }
                }
                params.args.data.id = randomId;
            }
            return next(params);
        });
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [winston_1.Logger])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map