import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ConstraintMessage } from 'src/constants/error.messages';
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory';
import { AddInterestsDto } from '../interest/dtos/add-interests.dto';
import { UserService } from '../user/user.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Post('interests')
  addInterests(@Body() dto: AddInterestsDto) {
    return this.userService.addInterests(dto);
  }

  @Delete('interests/:id')
  deleteInterest(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    id: number,
  ) {
    return this.userService.deleteInterest(id);
  }

  @Post('addAvatar/:id')
  addAvatar(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    id: number,
  ) {
    return this.userService.addAvatar(id);
  }

  @Post('addPhoto/:id')
  addPhoto(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessage.MUST_BE_INTEGER,
        ]),
      }),
    )
    id: number,
  ) {
    return this.userService.addPhoto(id);
  }
}
