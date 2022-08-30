import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SequelizeModuleOptions } from '@nestjs/sequelize';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import { Dialect } from 'sequelize/types/sequelize';
import { ModelOptions } from 'sequelize/types';
import { AppConfig } from 'src/core/types/app.types';

@Injectable()
export class ApiConfigService {
  private static dialect: Dialect = 'postgres';
  private static define: ModelOptions = { timestamps: false };

  constructor(private readonly configService: ConfigService) {}

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

  get PostgresConfig(): SequelizeModuleOptions {
    const { dialect, define } = ApiConfigService;

    return {
      define,
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

  get BaseJwtConfig(): JwtModuleOptions {
    return {
      secret: this.getString('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: this.getString('JWT_ACCESS_EXPIRES_IN'),
      },
    };
  }

  get JwtAccessConfig(): JwtSignOptions {
    return {
      secret: this.getString('JWT_ACCESS_SECRET'),
      expiresIn: this.getString('JWT_ACCESS_EXPIRES_IN'),
    };
  }

  get JwtRefreshConfig(): JwtSignOptions {
    return {
      secret: this.getString('JWT_REFRESH_SECRET'),
      expiresIn: this.getString('JWT_REFRESH_EXPIRES_IN'),
    };
  }

  get MulterConfig(): MulterOptions {
    return {
      dest: this.getString('MULTER_DEST'),
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
