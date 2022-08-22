import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ApiConfigService } from './core/modules/shared/services/api-config.service';
import { SharedModule } from './core/modules/shared/shared.module';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  const configService = app.select(SharedModule).get(ApiConfigService);
  const { port } = configService.appConfig;

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, () => console.log(`app start on port: ${port}`));
  return app;
}

bootstrap();
