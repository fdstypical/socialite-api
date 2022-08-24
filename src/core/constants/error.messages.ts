/*
  <ErrorMessage>
  Default messages for base.exception -> response.message
  Contains base error`s messages if the form of localization keys for client
*/
export enum ErrorMessage {
  ValidationError = 'error.validation',
  InternalError = 'error.internal_server_error',
  Conflict = 'error.conflict',
  Unauthorized = 'error.unauthorized',
  Forbidden = 'error.forbidden',
  BadRequest = 'error.bad_request',
}
