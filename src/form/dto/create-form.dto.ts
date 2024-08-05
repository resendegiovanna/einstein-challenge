import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsOptional } from "class-validator";

export class CreateFormDto{
    @IsEmail({}, { message: 'Invalid email address' })
    user_email: string;
  
    @IsInt({ message: 'groupId must be an integer' })
    @Transform(({ value }) => {
      const parsedValue = parseInt(value, 10);
      return isNaN(parsedValue) ? undefined : parsedValue;
    }, { toClassOnly: true })
    group_id: number;
}