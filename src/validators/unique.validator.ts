import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ValidatorConstraint } from 'class-validator';
import { Sequelize } from 'sequelize-typescript';
import { AbstractUniueValidator } from './abstract-unique.validator';

/*
  <UniqueValidator>
  Custom validator for check if entity with same field already exist in database.
  
  Usage:
  export class MyDto {
    ...
    @Validate(UniqueValidator, [Model]) // [Model]: [new () => Model] - determines in which repository it will be checked
    readonly field: string;
    ...
  }
*/

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator extends AbstractUniueValidator {
  constructor(@InjectConnection() protected readonly connection: Sequelize) {
    super(connection);
  }
}
