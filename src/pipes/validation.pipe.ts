import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private static JsNativeTypes: Function[] = [
    String,
    Boolean,
    Number,
    Array,
    Object,
  ];

  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const target = plainToClass(metatype, value);
    const errors = await validate(target);

    if (errors.length) {
      throw new ValidationException(
        errors.map((item) => ({
          target: item.property,
          messages: Object.values(item.constraints),
        })),
      );
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    return !ValidationPipe.JsNativeTypes.includes(metatype);
  }
}
