import { Sequelize } from 'sequelize-typescript';
import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  UniqueConstraintsArguments,
  AbstractUniueValidator,
} from 'src/core/abstracts/validators/abstract-unique.validator';
export { UniqueValidator } from 'src/core/validators/unique.validator';

export function IsUnique(
  validator: new (connection: Sequelize) => AbstractUniueValidator,
  constraints: UniqueConstraintsArguments,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints,
      validator,
    });
  };
}
