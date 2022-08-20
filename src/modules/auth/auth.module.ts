import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
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
