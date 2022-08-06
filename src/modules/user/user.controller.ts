import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';

@Controller('users')
export class UserController {
  @Post()
  create(@Body() user: CreateUserDto) {
    return user;
  }
}
