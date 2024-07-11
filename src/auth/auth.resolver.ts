import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { UserType } from './types/user.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // signUp user
  @Mutation(() => UserType)
  signUp(@Args('signUpDto') signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
