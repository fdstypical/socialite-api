export enum ErrorMessage {
  ValidationError = 'Validation Error',
}

export enum ValidationKey {
  MUST_BE_STRING = 'must.be.string',
  MUST_BE_EMAIL = 'must.be.email',
  MUST_BE_LONGER = 'must.be.longer',
  MUST_BE_NUMBER = 'must.be.number',
}

export interface ValidationMessage {
  localizationKey: string | null;
  context: any;
}

export interface ValidationError {
  property: string;
  messages: ValidationMessage[];
}
