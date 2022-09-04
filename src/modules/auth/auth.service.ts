import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { UnauthorizedException } from 'src/core/exceptions/build-in/unauthorized.exception';
import { ApiConfigService } from 'src/core/modules/shared/services/api-config.service';
import { User } from 'src/models';
import { Constants } from 'src/constants/app.constants';
import { ErrorMessage } from 'src/core/constants/error.messages';
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
    const token = await this.jwtService.verifyAsync(
      refresh || '',
      this.configService.JwtRefreshConfig,
    );

    const user = await this.userService.getById(
      token.id,
      new UnauthorizedException(
        ErrorMessage.Unauthorized,
        'Refreshing by token data failed',
      ),
    );
    return this.generateTokens(user);
  }

  private generateTokens({
    id,
    email,
    role: { id: roleId, name: roleName },
  }: User) {
    const payload = { id, email, roleId, roleName };

    return {
      access: this.jwtService.sign(payload, this.configService.JwtAccessConfig),
      refresh: this.jwtService.sign(
        payload,
        this.configService.JwtRefreshConfig,
      ),
    };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(
      dto.email,
      new UnauthorizedException(
        ErrorMessage.Unauthorized,
        'User with this email does not exist',
      ),
    );
    const passwordsEquals = await bcrypt.compare(dto.password, user.password);

    if (!passwordsEquals)
      throw new UnauthorizedException(
        ErrorMessage.Unauthorized,
        'Invalid token',
      );

    return user;
  }
}
