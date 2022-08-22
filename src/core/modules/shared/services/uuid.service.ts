import { v4 as uuidv4, V4Options } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UuidService {
  public v4(options?: V4Options) {
    return uuidv4(options);
  }
}
