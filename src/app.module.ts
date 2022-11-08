import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AsyncContextModule } from './core/modules/async-context/async-context.module';
import { AsyncContextMiddleware } from './core/middlewares/async-context.middleware';
import { AllExceptionsFilter } from './core/exception-filters/all-exceptions.filter';
import { ApiConfigService } from './core/modules/shared/services/api-config.service';
import { UniqueValidator } from './core/validators/unique.validator';
import { SharedModule } from './core/modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { InterestModule } from './modules/interest/interest.module';
import { UserAvatarModule } from './modules/user-avatar/user-avatar.module';
import { LifePhotoModule } from './modules/life-photo/life-photo.module';
import { ProfileModule } from './modules/profile/profile.module';
import { LocationModule } from './modules/location/location.module';
import { PlaceModule } from './modules/place/palce.module';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ValidationPipe } from './pipes/validation.pipe';

@Module({
  imports: [
    SharedModule.forRoot({ isGlobal: true }),
    AsyncContextModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.PostgresConfig,
      inject: [ApiConfigService],
    }),
    UserModule,
    RoleModule,
    AuthModule,
    UploadModule,
    InterestModule,
    UserAvatarModule,
    LifePhotoModule,
    ProfileModule,
    LocationModule,
    PlaceModule,
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
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncContextMiddleware).forRoutes('*');
  }
}
