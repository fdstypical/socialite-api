export interface BaseExceptionResponse<T> {
  message: string;
  internalMessage?: string;
  messages?: T[];
}
