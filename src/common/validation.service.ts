import { Injectable } from "@nestjs/common";
import { ZodType } from "zod";

@Injectable()
export class ValidationService {
    validate<T>(zodType : ZodType<T>, data : any) {
        return zodType.parse(data);
    }
}