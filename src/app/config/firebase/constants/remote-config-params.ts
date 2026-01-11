import { RemoteConfigValueType } from '@app/config/core/domain/entities';

export const REMOTE_CONFIG_PARAMS = {
  RELEASE_NOTES: {
    key: 'release_notes',
    type: 'json' as RemoteConfigValueType,
  },
  MAINTENANCE_MODE: {
    key: 'maintenance_mode',
    type: 'json' as RemoteConfigValueType,
  },
} as const;

export type RemoteConfigParamKey = keyof typeof REMOTE_CONFIG_PARAMS;
