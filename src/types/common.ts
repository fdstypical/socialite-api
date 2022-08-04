export interface AppConfig {
  port: number;
}

export interface ValidationError {
  target: string;
  messages: string[];
}