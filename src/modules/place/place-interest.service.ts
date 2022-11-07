import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PlaceInterest } from 'src/models';

@Injectable()
export class PlaceInterestService {
  constructor(
    @InjectModel(PlaceInterest)
    private readonly placeInterestRepository: typeof PlaceInterest,
    private readonly sequelize: Sequelize,
  ) {}

  async add(placeId: number, interests: number[]): Promise<PlaceInterest[]> {
    const alreadyExists = (
      await this.placeInterestRepository.findAll({
        where: { placeId },
      })
    ).map((userInterest) => userInterest.interestId);

    const uniqueIds = interests.filter(
      (interestId) => !alreadyExists.includes(interestId),
    );

    return this.sequelize.transaction((transaction) =>
      Promise.all(
        uniqueIds.map((interestId) =>
          this.placeInterestRepository.create(
            { placeId, interestId },
            { transaction },
          ),
        ),
      ),
    );
  }

  async delete(placeId: number, interestId: number): Promise<number> {
    return this.placeInterestRepository.destroy({
      where: { placeId, interestId },
    });
  }
}
