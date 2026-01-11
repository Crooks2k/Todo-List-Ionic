export type RemoteConfigValueType = 'string' | 'number' | 'boolean' | 'json';

export type RemoteConfigSource = 'remote' | 'default' | 'static';

export interface RemoteConfigParameter<T = any> {
  key: string;
  type: RemoteConfigValueType;
  defaultValue?: T;
}

export interface RemoteConfigResult<T = any> {
  key: string;
  value: T;
  source: RemoteConfigSource;
}
