import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class ErrorFilter<T> implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
