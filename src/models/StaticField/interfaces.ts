import { IsString } from 'class-validator';

export class CreateStaticFieldAttrs {
  readonly fileName: string;

  readonly type: string;

  readonly url: string;
}
