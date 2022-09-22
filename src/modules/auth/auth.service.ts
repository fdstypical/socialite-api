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
import { RoleService } from '../role/role.service';
import { LoginDto } from './dtos/login.dto';
import { TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
  ) {}

  async createTokenPayload(dto: User): Promise<TokenPayload> {
    const payload = {
      id: dto.id,
      email: dto.email,
      roleId: dto.roleId,
      roleName: dto.role.name,
    };
    if (!dto.role.name) {
      const role = await this.roleService.getById(dto.roleId);
      payload.roleName = role.name;
    }
    return payload;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    return this.generateTokens(await this.createTokenPayload(user));
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

    return this.generateTokens(await this.createTokenPayload(user));
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

    return this.generateTokens(await this.createTokenPayload(user));
  }

  private generateTokens(payload: TokenPayload) {
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
