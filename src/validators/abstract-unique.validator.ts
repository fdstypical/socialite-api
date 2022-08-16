import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model, Sequelize } from 'sequelize-typescript';

export type UniqueConstraintsArguments = [new () => Model];

export interface UniqueValidationArguments extends ValidationArguments {
  constraints: UniqueConstraintsArguments;
}

export abstract class AbstractUniueValidator
  implements ValidatorConstraintInterface
{
  protected constructor(protected readonly connection: Sequelize) {}

  public async validate(value: any, args: UniqueValidationArguments) {
    const [EntityClass] = args.constraints;

    const entitiesCount = await this.connection
      .getRepository(EntityClass)
      .count({ where: { [args.property]: value } });

    return entitiesCount <= 0;
  }

  public defaultMessage(args: ValidationArguments) {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `${entity}.not_unique.${args.property}`;
  }
}
