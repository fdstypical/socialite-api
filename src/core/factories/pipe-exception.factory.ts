import { ErrorMessage } from 'src/core/constants/error.messages';
import { BadRequestException } from 'src/core/exceptions/build-in/bad-request.exception';

export const PipeExceptionFactory =
  (target: string, constraints: string[]) => (error: string) =>
    new BadRequestException(ErrorMessage.BadRequest, error, [
      { target, messages: constraints.map((message) => ({ message })) },
    ]);
