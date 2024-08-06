import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [CsvService, PrismaService],
  exports: [CsvService],
})
export class CsvModule {}
