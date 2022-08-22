import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AsyncContextModule } from './core/modules/async-context/async-context.module';
import { AsyncContextMiddleware } from './core/middlewares/async-context.middleware';
import { ApiConfigService } from './core/modules/shared/services/api-config.service';
import { UniqueValidator } from './core/validators/unique.validator';
import { SharedModule } from './core/modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ValidationPipe } from './pipes/validation.pipe';

@Module({
  imports: [
    AsyncContextModule.forRoot({ isGlobal: true }),
    SharedModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    UserModule,
    RoleModule,
    AuthModule,
  ],
  providers: [
    UniqueValidator,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncContextMiddleware).forRoutes('*');
  }
}
