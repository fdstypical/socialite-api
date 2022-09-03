import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post('addInterest/:id')
  addInterest(@Param('id') id: number) {
    return this.userService.addInterest(id);
  }
}
