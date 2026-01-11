export const REMOTE_CONFIG_KEYS = {
  RELEASE_NOTES: 'release_notes',
  MAINTENANCE_MODE: 'maintenance_mode_v3',
} as const;

export type RemoteConfigKeyType =
  (typeof REMOTE_CONFIG_KEYS)[keyof typeof REMOTE_CONFIG_KEYS];
