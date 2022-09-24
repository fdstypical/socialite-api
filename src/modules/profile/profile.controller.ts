import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Post('addInterest/:id')
  addInterest(@Param('id') id: number) {
    return this.userService.addInterest(id);
  }

  @Post('addAvatar/:id')
  addAvatar(@Param('id') id: number) {
    return this.userService.addAvatar(id);
  }

  @Post('addPhoto/:id')
  addPhoto(@Param('id') id: number) {
    return this.userService.addPhoto(id);
  }
}
