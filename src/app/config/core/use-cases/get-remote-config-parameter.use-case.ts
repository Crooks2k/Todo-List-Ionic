import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RemoteConfigRepository } from '@app/config/core/domain/repositories/remote-config.repository';
import {
  RemoteConfigParameter,
  RemoteConfigResult,
} from '@app/config/core/domain/entities/remote-config.entity';

@Injectable({
  providedIn: 'root',
})
export class GetRemoteConfigParameterUseCase {
  constructor(private repository: RemoteConfigRepository) {}

  execute<T>(
    parameter: RemoteConfigParameter<T>
  ): Observable<RemoteConfigResult<T>> {
    return this.repository.getParameter(parameter);
  }
}
