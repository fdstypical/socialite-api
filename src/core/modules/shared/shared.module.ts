import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { ApiConfigService } from './services/api-config.service';
import { DateService } from './services/date.service';
import { UuidService } from './services/uuid.service';

const providers = [ApiConfigService, DateService, UuidService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
