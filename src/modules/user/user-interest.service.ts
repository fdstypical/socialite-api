import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UserInterest } from 'src/models';

@Injectable()
export class UserInterestService {
  constructor(
    @InjectModel(UserInterest)
    private readonly userInterestRepository: typeof UserInterest,
    private readonly sequelize: Sequelize,
  ) {}

  async add(userId: number, interests: number[]): Promise<UserInterest[]> {
    const alreadyExists = (
      await this.userInterestRepository.findAll({
        where: { userId },
      })
    ).map((userInterest) => userInterest.interestId);

    const uniqueIds = interests.filter(
      (interestId) => !alreadyExists.includes(interestId),
    );

    return this.sequelize.transaction((transaction) =>
      Promise.all(
        uniqueIds.map((interestId) =>
          this.userInterestRepository.create(
            { userId, interestId },
            { transaction },
          ),
        ),
      ),
    );
  }

  async delete(userId: number, interestId: number): Promise<number> {
    return this.userInterestRepository.destroy({
      where: { userId, interestId },
    });
  }
}
