import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from "@nestjs/common";
import { ZodError } from "zod";

@Catch(ZodError, HttpException)
export class ErrorFilter<T> implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        // pengecekan bila type error
        if (exception instanceof ZodError) {
          response.status(400).json({
            data : {
              errors : exception.errors.map((error) => error.message)
            },
          });
        } else if (exception instanceof HttpException) {
          response.status(exception.getStatus()).json({
            data : {
                status : exception.getStatus(),
                message : exception.message
            },
          });
        } else {
          response.status(500).json({
            errors: exception.message,
          });
        }
    }
}