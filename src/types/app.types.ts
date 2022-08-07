export interface AppConfig {
  port: number;
}

export interface IDictionary<T = any> {
  [key: string]: T;
}

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
