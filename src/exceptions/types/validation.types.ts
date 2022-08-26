export interface ValidationMessage {
  message: string | null;
  context: any;
}

export interface ValidationError {
  target: string;
  messages: ValidationMessage[];
}
