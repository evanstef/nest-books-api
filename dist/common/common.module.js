"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const prisma_service_1 = require("./prisma.service");
const validation_service_1 = require("./validation.service");
const core_1 = require("@nestjs/core");
const error_filter_1 = require("./error.filter");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            nest_winston_1.WinstonModule.forRoot({
                format: winston.format.json(),
                transports: [new winston.transports.Console()],
            })
        ],
        providers: [
            prisma_service_1.PrismaService,
            validation_service_1.ValidationService,
            {
                provide: core_1.APP_FILTER,
                useClass: error_filter_1.ErrorFilter
            },
        ],
        exports: [prisma_service_1.PrismaService, validation_service_1.ValidationService]
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map