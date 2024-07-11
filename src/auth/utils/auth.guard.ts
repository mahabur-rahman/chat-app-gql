import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    // Retrieve query variables from context
    const { email, password } = ctx.getArgs();

    console.log('AuthGuard - Email:', email);
    console.log('AuthGuard - Password:', password);

    if (!email || !password) {
      throw new HttpException(
        'Email or password not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Attach user to the context for further processing
      ctx.getContext().user = user;
      return true;
    } else {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }
  }
}
