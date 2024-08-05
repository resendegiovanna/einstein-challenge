import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.prismaService.$connect();
  }

  async onModuleDestroy() {
    await this.prismaService.$disconnect();
  }

  async enableShutDownHooks(app: INestApplication) {
    app.enableShutdownHooks();
  }
}
