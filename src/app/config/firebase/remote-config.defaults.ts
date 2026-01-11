import { DEFAULT_RELEASE_NOTES } from './constants/releases';
import { DEFAULT_MAINTENANCE_MODE } from './constants/home';
import { REMOTE_CONFIG_KEYS } from './constants/remote-config-keys';

export const REMOTE_CONFIG_DEFAULTS = {
  [REMOTE_CONFIG_KEYS.RELEASE_NOTES]: JSON.stringify(DEFAULT_RELEASE_NOTES),
  [REMOTE_CONFIG_KEYS.MAINTENANCE_MODE]: JSON.stringify(DEFAULT_MAINTENANCE_MODE),
} as const;

export type RemoteConfigKey = keyof typeof REMOTE_CONFIG_DEFAULTS;
export type RemoteConfigValue =
  (typeof REMOTE_CONFIG_DEFAULTS)[RemoteConfigKey];

