"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function handler(req, res) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.init();
    const server = app.getHttpAdapter().getInstance();
    server(req, res);
}
//# sourceMappingURL=main.vercel.js.map