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
import { UserAvatarService } from '../user/user-avatar.service';
import { UserInterestService } from '../user/user-interest.service';
import { UserService } from '../user/user.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly userInterestService: UserInterestService,
    private readonly userAvatarService: UserAvatarService,
  ) {}

  @Post('interests')
  addInterests(@Body() dto: AddInterestsDto) {
    return this.userInterestService.add(dto.interests);
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
    return this.userInterestService.delete(id);
  }

  @Post('avatar/:id')
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
    return this.userAvatarService.add(id);
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
