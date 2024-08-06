import { Body, Controller, Get, Header, Post, Put, Query, Res } from '@nestjs/common';
import { FormService } from './form.service';
import { ListQuestionsDto } from './dto/list-questions.dto';
import { CreateFormDto } from './dto/create-form.dto';
import { ItemDto } from './dto/answer-form-item.dto';
import { Response } from 'express';

@Controller("form")
export class FormController {

  constructor(private readonly formService: FormService){}

  @Get("questions")
  async search(@Query() query: ListQuestionsDto) {
    return this.formService.list(query.group_id);
  }

  @Post()
  async create(@Body() data: CreateFormDto) {
    return this.formService.create(data);
  }

  @Post("answers")
  async saveAnswers(@Body() data: ItemDto[]){
    return this.formService.saveAnswers(data);
  }

  @Put("answers")
  async UpdateAnswers(@Body() data: ItemDto[]){
    return this.formService.UpdateAnswers(data);
  }

  @Get("answers")
  async GetAnswers(@Query() data: ListQuestionsDto){
    return this.formService.GetAnswers(data.group_id);
  }

  @Get("export")
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="data.csv"')
  async getCsv(@Res() res: Response) {
    const csvData = await this.formService.getCsv();
    res.send(csvData);
  }

}
