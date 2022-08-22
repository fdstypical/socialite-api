import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
