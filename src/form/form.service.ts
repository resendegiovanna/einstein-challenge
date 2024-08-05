import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { ItemDto } from './dto/answer-form-item.dto';
import { type } from 'os';

@Injectable()
export class FormService {

  constructor(private readonly prisma: PrismaService){}

  async list(groupId?: number | any){
    const whereClause = groupId ? { group_id: groupId } : { group_id: null };

    return this.prisma.questions.findMany({
        where: whereClause,
    });
  }

  async create(data: CreateFormDto){
    return this.prisma.forms.create({
      data,
      select:{
        form_id: true
      }
    });
  }

  async saveAnswers(answers: ItemDto[]): Promise<object> {
    try {
      await this.prisma.forms_answers.createMany({
        data: answers,
      });
      return { message: 'Answers saved successfully' };
    } catch (error) {
      throw new Error('Error saving answers: ' + error.message);
    }
  }

  async UpdateAnswers(answers: ItemDto[]): Promise<object>{
    try {
      for (const answer of answers) {
        await this.prisma.forms_answers.update({
          where: {
            form_id_question_id: {
              form_id: answer.form_id,
              question_id: answer.question_id
            }
          },
          data: {
            answer_id: answer.answer_id,
          },
        });
      }
      return { message: 'Answers updated successfully' };
    } catch (error) {
      throw new Error('Error saving answers: ' + error.message);
    }
  }

  async GetAnswers(groupId?: number | any){

    const whereClause = groupId ? { group_id: groupId } : { };

    const forms = await this.prisma.forms.findMany({
      where: whereClause
    });

    let formattedForms = [];

    for (const form of forms) {
      const answers = await this.prisma.forms_answers.findMany({
        select: {
          forms: {
            select: {
              user_email: true
            }
          },
          questions: {
            select: {
              title: true
            }
          },
          answer_options: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          questions: {
            question_id: 'asc'
          }
        }
      });

      const formattedAnswers = answers.map(answer => ({
        title: answer.questions.title,
        answer: answer.answer_options.name,
      }));

      let newForm = {
        user_email: form.user_email,
        questions: formattedAnswers
      };

      formattedForms.push(newForm);
    }

    return formattedForms;
  }
}
