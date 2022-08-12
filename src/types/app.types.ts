export interface AppConfig {
  port: number;
}

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};
