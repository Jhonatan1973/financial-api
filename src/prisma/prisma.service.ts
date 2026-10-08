import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService is responsible for managing the database connection.
 * It extends PrismaClient and implements NestJS lifecycle hooks to connect
 * and disconnect from the database gracefully.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      // You can add log configurations here if needed, e.g., log: ['query']
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
