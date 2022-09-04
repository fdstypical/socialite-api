import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserInterest } from 'src/models';

@Injectable()
export class UserInterestService {
  constructor(
    @InjectModel(UserInterest)
    private readonly userInterestRepository: typeof UserInterest,
  ) {}

  async addInterestToUser(userId: number, interestId: number) {
    return this.userInterestRepository.create({ userId, interestId });
  }
}
