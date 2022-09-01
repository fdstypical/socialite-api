/*
  <ValidationErrorMessage>
  Validation error messages for validation.exception -> response.message
  Contains base error`s messages if the form of localization keys for client
*/
export enum ValidationErrorMessage {
  MUST_BE_STRING = 'must.be.string',
  MUST_BE_EMAIL = 'must.be.email',
  MUST_BE_LONGER = 'must.be.longer',
  MUST_BE_NUMBER = 'must.be.number',
  MUST_BE_INTEGER = 'must.be.integer',
  MUST_BE_ENUM = 'must.be.enum',
}
