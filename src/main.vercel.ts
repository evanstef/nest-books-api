import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export default async function handler(req: any, res: any): Promise<void> {
  // Buat instance aplikasi NestJS
  const app = await NestFactory.create(AppModule);

  // Inisialisasi aplikasi (tanpa global prefix)
  await app.init();

  // Tangkap request dan response untuk serverless environment di Vercel
  const server = app.getHttpAdapter().getInstance();
  server(req, res);
}
