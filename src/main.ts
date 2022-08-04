import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.select(SharedModule).get(ApiConfigService);
  const { port } = configService.appConfig;

  await app.listen(port, () => console.log(`app start on port: ${port}`));
  return app;
}

bootstrap();
