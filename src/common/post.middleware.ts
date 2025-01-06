import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { log } from "console";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class PostMiddleware implements NestMiddleware {
    use(req : Request, res : Response, next : () => void) {
        
        // pengecekan bile method POST jalankan middleware
        if (req.method === 'POST') { 
            const passwordHeaders = req.headers['password']
            const envPassword = process.env.PASSWORD_POST;

            // pengecekan password
            if (!passwordHeaders || passwordHeaders !== envPassword) {
                throw new HttpException('Dilarang Post Selain Admin', 400);
            }
        }

        // jalankan middleware selanjutnya
        next();
    }
}