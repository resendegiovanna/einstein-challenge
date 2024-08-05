import { IsOptional, IsInt, IsEmail } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ListQuestionsDto {
    @IsOptional()
    @Transform(({ value }) => {
        const parsedValue = parseInt(value, 10);
        return isNaN(parsedValue) ? undefined : parsedValue;
    }, { toClassOnly: true })
    @IsInt({ message: 'groupId must be an integer' })
    group_id?: number;
}