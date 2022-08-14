import { InjectConnection } from '@nestjs/sequelize';
import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model, Sequelize } from 'sequelize-typescript';

interface UniqueValidationArguments extends ValidationArguments {
  constraints: [new () => Model];
}

export abstract class AbstractUniueValidator
  implements ValidatorConstraintInterface
{
  protected constructor(
    @InjectConnection() protected readonly connection: Sequelize,
  ) {}

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
