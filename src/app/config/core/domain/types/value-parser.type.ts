import { Value } from '@angular/fire/remote-config';

export type ValueParser<T> = (value: Value) => T;
