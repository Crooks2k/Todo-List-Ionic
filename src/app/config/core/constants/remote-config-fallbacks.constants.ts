import { RemoteConfigValueType } from '@app/config/core/domain/entities';

export const REMOTE_CONFIG_FALLBACK_VALUES: Record<
  RemoteConfigValueType,
  unknown
> = {
  boolean: false,
  number: 0,
  string: '',
  json: {},
} as const;
