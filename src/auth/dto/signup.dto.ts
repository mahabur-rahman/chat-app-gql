import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class SignUpDto {
  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: `Invalid email address` })
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6, { message: `Password must be at least 6 characters long` })
  password: string;
}
