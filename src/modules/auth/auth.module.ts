import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from 'src/core/modules/shared/services/api-config.service';
import { SharedModule } from 'src/core/modules/shared/shared.module';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UserModule,
    RoleModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.BaseJwtConfig,
      inject: [ApiConfigService],
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
