import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Logger } from 'winston';
export declare class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, string> implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    constructor(logger: Logger);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
