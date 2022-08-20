import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateUserDto } from './dtos/create.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
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
