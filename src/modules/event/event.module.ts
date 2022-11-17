import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from 'src/models';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
