import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './utils/auth.guard';
import { JwtGuard } from './utils/jwt.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthResolver, AuthService, AuthGuard, JwtGuard],
  exports: [AuthService, AuthGuard, JwtGuard],
})
export class AuthModule {}
