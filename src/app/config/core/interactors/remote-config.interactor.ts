import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RemoteConfigParameter,
  RemoteConfigResult,
} from '@app/config/core/domain/entities/remote-config.entity';
import { GetRemoteConfigParameterUseCase } from '@app/config/core/use-cases/get-remote-config-parameter.use-case';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigInteractor {
  constructor(private getParameterUseCase: GetRemoteConfigParameterUseCase) {}

  getParameter<T>(
    parameter: RemoteConfigParameter<T>
  ): Observable<RemoteConfigResult<T>> {
    return this.getParameterUseCase.execute(parameter);
  }
}
