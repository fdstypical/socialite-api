import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsPublic } from 'src/decorators/public-controller.decorator';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { DateService } from 'src/shared/services/date.service';
import { CreateUserDto } from '../user/dtos/create.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ApiConfigService,
    private readonly dateService: DateService,
  ) {}

  @Post('login')
  async login(
    @Body() userDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access, refresh } = await this.authService.login(userDto);

    response.cookie('refresh', refresh, {
      httpOnly: true,
      sameSite: 'strict',
      expires: this.dateService.createExpiresDate(
        this.configService.JwtRefreshConfig.expiresIn as string,
      ),
    });

    return { access };
  }

  @Post('registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access, refresh } = await this.authService.registration(userDto);

    response.cookie('refresh', refresh, {
      httpOnly: true,
      sameSite: 'strict',
      expires: this.dateService.createExpiresDate(
        this.configService.JwtRefreshConfig.expiresIn as string,
      ),
    });

    return { access };
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh: token } = request.cookies;
    const { access, refresh } = await this.authService.refresh(token);

    response.cookie('refresh', refresh, {
      httpOnly: true,
      sameSite: 'strict',
      expires: this.dateService.createExpiresDate(
        this.configService.JwtRefreshConfig.expiresIn as string,
      ),
    });

    return { access };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh');
  }
}
