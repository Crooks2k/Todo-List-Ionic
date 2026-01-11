import { Injectable, inject } from '@angular/core';
import {
  RemoteConfig,
  fetchAndActivate,
  getValue,
} from '@angular/fire/remote-config';
import {
  RemoteConfigValueType,
  RemoteConfigSource,
  ValueParser,
} from '@app/config/core/domain/entities';
import {
  REMOTE_CONFIG_SOURCES,
  DEFAULT_REMOTE_CONFIG_SOURCE,
} from '@app/config/core/constants';

@Injectable({
  providedIn: 'root',
})
export class FirebaseRemoteConfigDataSource {
  private remoteConfig = inject(RemoteConfig);

  private readonly VALUE_PARSERS: Record<
    RemoteConfigValueType,
    ValueParser<any>
  > = {
    boolean: (value) => value.asBoolean(),
    number: (value) => value.asNumber(),
    string: (value) => value.asString(),
    json: (value) => JSON.parse(value.asString() || '{}'),
  };

  async getValue<T>(key: string, type: RemoteConfigValueType): Promise<T> {
    try {
      await fetchAndActivate(this.remoteConfig);
      const value = getValue(this.remoteConfig, key);
      const parser = this.VALUE_PARSERS[type] || this.VALUE_PARSERS.string;
      return parser(value) as T;
    } catch (error) {
      throw error;
    }
  }

  async getSource(key: string): Promise<RemoteConfigSource> {
    try {
      await fetchAndActivate(this.remoteConfig);
      const value = getValue(this.remoteConfig, key);
      const source = value.getSource();
      return REMOTE_CONFIG_SOURCES[source] || DEFAULT_REMOTE_CONFIG_SOURCE;
    } catch {
      return DEFAULT_REMOTE_CONFIG_SOURCE;
    }
  }
}
