import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { AuthorResponse } from "../model/authors.model";
export declare class AuthorsService {
    private prismaService;
    private validationService;
    constructor(prismaService: PrismaService, validationService: ValidationService);
    getAllAuthors(): Promise<AuthorResponse[]>;
    getAuthorBySlug(slug: string): Promise<AuthorResponse>;
}
