import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [PrismaModule, CsvModule],
  controllers: [FormController],
  providers: [FormService],
  
})
export class FormModule {}
