import { Observable } from 'rxjs';
import {
  RemoteConfigParameter,
  RemoteConfigResult,
} from '@app/config/core/domain/entities/remote-config.entity';

export abstract class RemoteConfigRepository {
  abstract getParameter<T>(
    parameter: RemoteConfigParameter<T>
  ): Observable<RemoteConfigResult<T>>;
}
