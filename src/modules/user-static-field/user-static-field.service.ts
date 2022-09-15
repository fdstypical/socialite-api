import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserStaticField } from '../../models/UserStaticField/user-static-field.model';
import { CreateUserStaticFieldAttributes } from '../../models/UserStaticField/interfaces';

@Injectable()
export class UserStaticFieldService {
  constructor(
    @InjectModel(UserStaticField)
    private readonly userStaticField: typeof UserStaticField,
  ) {}

  async addAvatarToUser({
    userId,
    staticFieldId,
  }: CreateUserStaticFieldAttributes) {
    return this.userStaticField.create({ userId, staticFieldId });
  }
}
