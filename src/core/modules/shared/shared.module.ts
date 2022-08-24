import { HttpModule } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';

import { ApiConfigService } from './services/api-config.service';
import { DateService } from './services/date.service';
import { UuidService } from './services/uuid.service';

interface SharedModuleOptions {
  isGlobal?: boolean;
}

export class SharedModule {
  static forRoot(options?: SharedModuleOptions): DynamicModule {
    const isGlobal = options?.isGlobal ?? false;
    const providers = [ApiConfigService, DateService, UuidService];

    return {
      module: SharedModule,
      global: isGlobal,
      providers,
      imports: [HttpModule],
      exports: [...providers, HttpModule],
    };
  }
}