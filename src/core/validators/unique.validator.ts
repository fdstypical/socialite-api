import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ValidatorConstraint } from 'class-validator';
import { Sequelize } from 'sequelize-typescript';
import { AbstractUniueValidator } from '../abstracts/validators/abstract-unique.validator';

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator extends AbstractUniueValidator {
  constructor(@InjectConnection() protected readonly connection: Sequelize) {
    super(connection);
  }
}
