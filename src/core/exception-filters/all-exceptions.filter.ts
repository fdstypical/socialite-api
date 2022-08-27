import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorMessage } from 'src/core/constants/error.messages';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = this.getStatus(exception);
    const path = httpAdapter.getRequestUrl(ctx.getRequest<Request>());
    const timestamp = new Date().toISOString();
    const response = this.getResponse(exception);

    const responseBody = {
      statusCode: httpStatus,
      ...response,
      timestamp,
      path,
      appeal: 'Client developer, don`t be gay, plaese',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getStatus(exception: unknown) {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getResponse(exception: unknown) {
    return exception instanceof HttpException
      ? exception.getResponse() instanceof Object
        ? (exception.getResponse() as object)
        : { message: exception.getResponse() }
      : { message: ErrorMessage.InternalError };
  }
}
