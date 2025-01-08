import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PostMiddleware } from '../common/post.middleware';

@Module({
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(PostMiddleware)
            .forRoutes({ 
                path : 'api/book', 
                method : RequestMethod.POST
            });
    }
}
