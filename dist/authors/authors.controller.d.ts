import { AuthorsService } from "./authors.service";
import { WebModelResponse } from "src/model/web.model";
import { AuthorResponse } from "src/model/authors.model";
export declare class AuthorsController {
    private authorsService;
    constructor(authorsService: AuthorsService);
    getAllAuthors(): Promise<WebModelResponse<AuthorResponse[]>>;
    getAuthorBySlug(slug: string): Promise<WebModelResponse<AuthorResponse>>;
}
