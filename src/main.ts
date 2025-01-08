import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  const prisma = new PrismaClient();

  // menggunakan logger dari winston
  app.useLogger(logger);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// export default async function handler(req: any, res: any): Promise<void> {
//   // Buat instance aplikasi NestJS
//   const app = await NestFactory.create(AppModule);

//   // Inisialisasi aplikasi (tanpa global prefix)
//   await app.init();

//   // Tangkap request dan response untuk serverless environment di Vercel
//   const server = app.getHttpAdapter().getInstance();
//   server(req, res);
// }
