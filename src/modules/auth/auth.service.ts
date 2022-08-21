import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { User } from 'src/models';
import { Constants } from 'src/constants/app.constants';
import { BaseExceptionFactory } from 'src/factories/exception.factories/base.exception.vactory';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { ErrorMessage } from 'src/constants/error.messages';
import { CreateUserDto } from '../user/dtos/create.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    return this.generateTokens(user);
  }

  async registration(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      dto.password,
      Constants.BCRYPT_SALT,
    );

    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return this.generateTokens(user);
  }

  async refresh(refresh: string) {
    if (!refresh)
      throw BaseExceptionFactory(HttpStatus.FORBIDDEN, ErrorMessage.Forbidden);

    const token = await this.jwtService.verifyAsync(
      refresh || '',
      this.configService.JwtRefreshConfig,
    );

    const user = await this.userService.getById(token.id);

    if (!user)
      throw BaseExceptionFactory(HttpStatus.FORBIDDEN, ErrorMessage.Forbidden);

    return this.generateTokens(user);
  }

  private generateTokens({ id, email, roleId }: User) {
    const payload = { id, email, roleId };

    return {
      access: this.jwtService.sign(payload, this.configService.JwtAccessConfig),
      refresh: this.jwtService.sign(
        payload,
        this.configService.JwtRefreshConfig,
      ),
    };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);
    const passwordsEquals = await bcrypt.compare(
      dto.password,
      user?.password || '',
    );

    if (!passwordsEquals || !user)
      throw BaseExceptionFactory(
        HttpStatus.UNAUTHORIZED,
        ErrorMessage.Unauthorized,
      );

    return user;
  }
}
