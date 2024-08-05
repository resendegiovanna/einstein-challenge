import { Body, Controller, Get, ParseArrayPipe, Post, Put, Query } from '@nestjs/common';
import { FormService } from './form.service';
import { ListQuestionsDto } from './dto/list-questions.dto';
import { CreateFormDto } from './dto/create-form.dto';
import { ItemDto } from './dto/answer-form-item.dto';

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
}
