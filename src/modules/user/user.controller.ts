import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ConstraintMessage } from 'src/constants/error.messages';
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory';
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
  getById(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [ConstraintMessage.MUST_BE_INTEGER]),
      }),
    )
    id: number,
  ) {
    return this.userService.getById(id, undefined, [roleInclude, avatarInclude]);
  }

  @Delete(':id')
  deleteById(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [ConstraintMessage.MUST_BE_INTEGER]),
      }),
    )
    id: number,
  ) {
    return this.userService.deleteById(id);
  }
}
