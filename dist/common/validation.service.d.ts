import { ZodType } from "zod";
export declare class ValidationService {
    validate<T>(zodType: ZodType<T>, data: any): T;
}
