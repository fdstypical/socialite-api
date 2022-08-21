import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ValidationPipe } from './pipes/validation.pipe';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  const authGuard = app.select(AppModule).get(AuthGuard);
  const rolesGuard = app.select(AppModule).get(RolesGuard);
  const configService = app.select(SharedModule).get(ApiConfigService);
  const { port } = configService.appConfig;

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalGuards(authGuard);
  app.useGlobalGuards(rolesGuard);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, () => console.log(`app start on port: ${port}`));
  return app;
}

bootstrap();
