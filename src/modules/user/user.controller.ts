import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  avatarInclude,
  interestsInclude,
  lifePhotosInclude,
  roleInclude,
} from 'src/models/includes/user.includes';
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
    return this.userService.getAll([
      roleInclude,
      avatarInclude,
      interestsInclude,
      lifePhotosInclude,
    ]);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id, undefined, [
      roleInclude,
      avatarInclude,
    ]);
  }
}
