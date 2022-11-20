import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { EventInterest } from 'src/models';

@Injectable()
export class EventInterestService {
  constructor(
    @InjectModel(EventInterest)
    private readonly eventInterestRepository: typeof EventInterest,
    private readonly sequelize: Sequelize,
  ) {}

  async add(eventId: number, interests: number[]): Promise<EventInterest[]> {
    const alreadyExists = (
      await this.eventInterestRepository.findAll({
        where: { eventId },
      })
    ).map((userInterest) => userInterest.interestId);

    const uniqueIds = interests.filter(
      (interestId) => !alreadyExists.includes(interestId),
    );

    return this.sequelize.transaction((transaction) =>
      Promise.all(
        uniqueIds.map((interestId) =>
          this.eventInterestRepository.create(
            { eventId, interestId },
            { transaction },
          ),
        ),
      ),
    );
  }

  async delete(eventId: number, interestId: number): Promise<number> {
    return this.eventInterestRepository.destroy({
      where: { eventId, interestId },
    });
  }
}
