import { Injectable } from '@angular/core';
import { Observable, from, map, catchError, of } from 'rxjs';
import { RemoteConfigRepository } from '@app/config/core/domain/repositories/remote-config.repository';
import {
  RemoteConfigParameter,
  RemoteConfigResult,
} from '@app/config/core/domain/entities/remote-config.entity';
import { FirebaseRemoteConfigDataSource } from '@app/config/data/datasources/firebase-remote-config.datasource';
import { REMOTE_CONFIG_DEFAULTS } from '@app/config/firebase/remote-config.defaults';
import { REMOTE_CONFIG_FALLBACK_VALUES } from '@app/config/core/constants';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigRepositoryImpl extends RemoteConfigRepository {
  constructor(private dataSource: FirebaseRemoteConfigDataSource) {
    super();
  }

  getParameter<T>(
    parameter: RemoteConfigParameter<T>
  ): Observable<RemoteConfigResult<T>> {
    return from(
      Promise.all([
        this.dataSource.getValue<T>(parameter.key, parameter.type),
        this.dataSource.getSource(parameter.key),
      ])
    ).pipe(
      map(([value, source]) => ({
        key: parameter.key,
        value,
        source,
      })),
      catchError(() => of(this.getDefaultValue(parameter)))
    );
  }

  private getDefaultValue<T>(
    parameter: RemoteConfigParameter<T>
  ): RemoteConfigResult<T> {
    if (parameter.defaultValue !== undefined) {
      return {
        key: parameter.key,
        value: parameter.defaultValue,
        source: 'default',
      };
    }

    const key = parameter.key as keyof typeof REMOTE_CONFIG_DEFAULTS;
    if (key in REMOTE_CONFIG_DEFAULTS) {
      const defaultValue = REMOTE_CONFIG_DEFAULTS[key];
      const value =
        parameter.type === 'json'
          ? JSON.parse(defaultValue as string)
          : defaultValue;

      return {
        key: parameter.key,
        value: value as T,
        source: 'default',
      };
    }

    return {
      key: parameter.key,
      value: (REMOTE_CONFIG_FALLBACK_VALUES[parameter.type] ?? null) as T,
      source: 'static',
    };
  }
}
