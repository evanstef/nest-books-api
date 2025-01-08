import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Aktifkan CORS jika diperlukan
  await app.init();
  
  // Tambahkan kode ini untuk Vercel
  const server = app.getHttpAdapter().getInstance();
  return server;
}

export default bootstrap();
