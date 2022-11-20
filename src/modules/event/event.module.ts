import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event, EventInterest } from 'src/models';
import { EventInterestService } from './event-interest.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [SequelizeModule.forFeature([Event, EventInterest])],
  providers: [EventService, EventInterestService],
  controllers: [EventController],
  exports: [EventService, EventInterestService],
})
export class EventModule {}
