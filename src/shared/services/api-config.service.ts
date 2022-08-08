import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types/sequelize';
import { AppConfig } from 'src/types/app.types';

@Injectable()
export class ApiConfigService {
  private static dialect: Dialect = 'postgres';

  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(JSON.parse(value));
    } catch {
      throw new Error(`${key} environment variable is not a number`);
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key} env var is not a boolean`);
    }
  }

  private getString(key: string): string {
    const value = this.get(key);
    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get appConfig(): AppConfig {
    return {
      port: this.getNumber('PORT'),
    };
  }

  get postgresConfig(): SequelizeModuleOptions {
    const { dialect } = ApiConfigService;

    return {
      dialect,
      autoLoadModels: true,
      synchronize: false,
      port: this.getNumber('DB_PORT'),
      host: this.getString('DB_HOST'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_NAME'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) {
      throw new Error(`${key} environment variable does not set`);
    }

    return value;
  }
}
