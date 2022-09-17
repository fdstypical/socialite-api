import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserInterest } from 'src/models';
import { CreateUserInterestAttributes } from '../../models/UserInterest/interfaces';

@Injectable()
export class UserInterestService {
  constructor(
    @InjectModel(UserInterest)
    private readonly userInterestRepository: typeof UserInterest,
  ) {}

  addInterestToUser({
    userId,
    interestId,
  }: CreateUserInterestAttributes) {
    return this.userInterestRepository.create({ userId, interestId });
  }
}
