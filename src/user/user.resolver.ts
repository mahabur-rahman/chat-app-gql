import { Query, Resolver, Context, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/utils/jwt.guard';
import { UserType } from 'src/auth/types/user.type';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Get All users
  @Query(() => [UserType])
  // @UseGuards(JwtGuard, new RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  // get single user :id
  @Query(() => UserType)
  @UseGuards(JwtGuard)
  async getSingleUserById(@Args('id') id: string) {
    return await this.userService.getSingleUserById(id);
  }

  // delete user :id
  @Mutation(() => UserType)
  @UseGuards(JwtGuard)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
  // update user :id
  @Mutation(() => UserType)
  @UseGuards(JwtGuard)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  // get authenticated user profile
  //  ================================================================
  // ================================================================
  // ================================================================

  @Query(() => UserType)
  @UseGuards(JwtGuard)
  async getUserProfile(@Context('user') user: any) {
    return await this.userService.getUserProfile(user);
  }
}
