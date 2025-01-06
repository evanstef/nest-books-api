import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { BookModule } from './book/book.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [CommonModule, BookModule, AuthorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
