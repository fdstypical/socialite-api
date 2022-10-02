import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectConnection } from '@nestjs/sequelize';
import { Request } from 'express';
import { Model, Sequelize } from 'sequelize-typescript';
import { ConstraintMessage } from 'src/constants/error.messages';
import { ErrorMessage } from 'src/core/constants/error.messages';
import { ForbiddenException } from 'src/core/exceptions/build-in/forbidden.exception';
import { InternalServerErrorException } from 'src/core/exceptions/build-in/internal-server-error.exception';
import { NotFoundException } from 'src/core/exceptions/build-in/not-found.exception';
import { PipeExceptionFactory } from 'src/core/factories/pipe-exception.factory';
import { AsyncContext } from 'src/core/modules/async-context/async-context';
import { MODEL_KEY } from 'src/decorators/is-model.decorator';

@Injectable()
export class CheckCreatorGuard implements CanActivate {
  constructor(
    @InjectConnection() private readonly connection: Sequelize,
    private readonly reflector: Reflector,
    private readonly asyncContext: AsyncContext<string, any>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const EntityClass = this.reflector.get<new () => Model>(
      MODEL_KEY,
      context.getHandler(),
    );

    const entityId = Number(request.params.id);

    if (!EntityClass)
      throw new InternalServerErrorException(
        ErrorMessage.InternalError,
        'Something went wrong',
      );

    if (!entityId || !Number.isInteger(entityId))
      throw PipeExceptionFactory('id', [ConstraintMessage.MUST_BE_INTEGER])(
        'Validation failed (numeric string is expected)',
      );

    const model = await this.connection
      .getRepository(EntityClass)
      .findByPk(entityId, {
        rejectOnEmpty: new NotFoundException(
          ErrorMessage.NotFound,
          `No such ${EntityClass.name}`,
        ),
      });

    try {
      const { id } = this.asyncContext.get('user');
      const isCreator = id === (model as any).createdByUserId;

      if (!isCreator)
        throw new ForbiddenException(
          ErrorMessage.Forbidden,
          'You must be the creator',
        );

      return true;
    } catch (error) {
      throw new ForbiddenException(
        ErrorMessage.Forbidden,
        'You must be the creator',
      );
    }
  }
}
