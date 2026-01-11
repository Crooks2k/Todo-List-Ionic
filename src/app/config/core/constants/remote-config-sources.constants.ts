import { RemoteConfigSource } from '@app/config/core/domain/entities';

export const REMOTE_CONFIG_SOURCES: Record<string, RemoteConfigSource> = {
  remote: 'remote',
  default: 'default',
} as const;

export const DEFAULT_REMOTE_CONFIG_SOURCE: RemoteConfigSource = 'static';
