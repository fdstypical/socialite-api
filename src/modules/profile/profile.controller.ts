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
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { AddInterestsDto } from '../interest/dtos/add-interests.dto';
import { UserAvatarService } from '../user/user-avatar.service';
import { UserInterestService } from '../user/user-interest.service';
import { UserPhotoService } from '../user/user-life-photos.service';
import { UserService } from '../user/user.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly userInterestService: UserInterestService,
    private readonly userAvatarService: UserAvatarService,
    private readonly userPhotoService: UserPhotoService,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  @Post('interests')
  addInterests(@Body() dto: AddInterestsDto) {
    const { id: userId } = this.asyncContext.get('user');
    return this.userInterestService.add(userId, dto.interests);
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
    const { id: userId } = this.asyncContext.get('user');
    return this.userInterestService.delete(userId, id);
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
    const { id: userId } = this.asyncContext.get('user');
    return this.userAvatarService.add(userId, id);
  }

  @Post('photos/:id')
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
    const { id: userId } = this.asyncContext.get('user');
    return this.userPhotoService.add(userId, id);
  }
}
