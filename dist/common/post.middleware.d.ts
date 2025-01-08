import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
export declare class PostMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): void;
}
