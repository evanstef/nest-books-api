import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { BookModule } from './book/book.module';
import { AuthorsModule } from './authors/authors.module';
import { AppController } from './app.controller';

@Module({
  imports: [CommonModule, BookModule, AuthorsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
