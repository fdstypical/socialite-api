import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleName } from 'src/types/common.types';
import { CreateUserDto } from './dtos/create.dto';
import { UserService } from './user.service';

@Roles(RoleName.USER)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  @Roles(RoleName.ADMIN)
  getAll() {
    return this.userService.getAll();
  }
}
