import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
