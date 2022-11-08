import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { UserInterest } from 'src/models';

@Injectable()
export class UserInterestService {
  constructor(
    @InjectModel(UserInterest)
    private readonly userInterestRepository: typeof UserInterest,
    private readonly sequelize: Sequelize,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async add(interests: number[]): Promise<UserInterest[]> {
    const { id: userId } = this.asyncContext.get('user');

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

  async delete(interestId: number): Promise<number> {
    const { id: userId } = this.asyncContext.get('user');

    return this.userInterestRepository.destroy({
      where: { userId, interestId },
    });
  }
}
