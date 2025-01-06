import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on('info', (event) => {
      this.logger.info(event);
    });
    this.$on('warn', (event) => {
      this.logger.warn(event);
    });
    this.$on('error', (event) => {
      this.logger.error(event);
    });
    this.$on('query', (event) => {
      this.logger.info(event);
    });

    // Tambahkan middleware Prisma
    this.$use(async (params, next) => {
      if (params.model === 'Books' && params.action === 'create') {
        let randomId;
        let isDuplicate = true;

        while (isDuplicate) {
          randomId = Math.floor(10000 + Math.random() * 90000); // Generate angka random 5 digit
          const existingBook = await this.books.findUnique({ where: { id: randomId } });
          if (!existingBook) {
            isDuplicate = false; // Tidak ada duplikasi
          }
        }

        // Set ID pada data yang akan disimpan
        params.args.data.id = randomId;
      }
      return next(params);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
  
}