import { IsInt } from 'class-validator';

export class ItemDto {
  @IsInt({ message: 'form_id must be an integer' })
  form_id: number;

  @IsInt({ message: 'question_id must be an integer' })
  question_id: number;

  @IsInt({ message: 'answer_id must be an integer' })
  answer_id: number;
}
