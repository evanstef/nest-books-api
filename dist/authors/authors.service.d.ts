import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { AuthorResponse } from "src/model/authors.model";
export declare class AuthorsService {
    private prismaService;
    private validationService;
    constructor(prismaService: PrismaService, validationService: ValidationService);
    getAllAuthors(): Promise<AuthorResponse[]>;
    getAuthorBySlug(slug: string): Promise<AuthorResponse>;
}
