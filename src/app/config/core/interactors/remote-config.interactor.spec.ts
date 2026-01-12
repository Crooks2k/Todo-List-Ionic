import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RemoteConfigInteractor } from './remote-config.interactor';
import { GetRemoteConfigParameterUseCase } from '../use-cases/get-remote-config-parameter.use-case';
import {
  RemoteConfigParameter,
  RemoteConfigResult,
} from '../domain/entities/remote-config.entity';

describe('RemoteConfigInteractor', () => {
  let interactor: RemoteConfigInteractor;
  let getParameterUseCase: jasmine.SpyObj<GetRemoteConfigParameterUseCase>;

  beforeEach(() => {
    const useCaseSpy = jasmine.createSpyObj('GetRemoteConfigParameterUseCase', [
      'execute',
    ]);

    TestBed.configureTestingModule({
      providers: [
        RemoteConfigInteractor,
        { provide: GetRemoteConfigParameterUseCase, useValue: useCaseSpy },
      ],
    });

    interactor = TestBed.inject(RemoteConfigInteractor);
    getParameterUseCase = TestBed.inject(
      GetRemoteConfigParameterUseCase
    ) as jasmine.SpyObj<GetRemoteConfigParameterUseCase>;
  });

  it('Given the RemoteConfigInteractor, When it is created, Then it should be truthy', () => {
    // Arrange & Act
    // Interactor is created in beforeEach

    // Assert
    expect(interactor).toBeTruthy();
  });

  it('Given a parameter, When getParameter is called, Then it should call the use case with the parameter', (done) => {
    // Arrange
    const parameter: RemoteConfigParameter<string> = {
      key: 'test_key',
      type: 'string',
    };
    const expectedResult: RemoteConfigResult<string> = {
      key: 'test_key',
      value: 'test_value',
      source: 'remote',
    };
    getParameterUseCase.execute.and.returnValue(of(expectedResult));

    // Act
    interactor.getParameter(parameter).subscribe((result) => {
      // Assert
      expect(getParameterUseCase.execute).toHaveBeenCalledWith(parameter);
      expect(result).toEqual(expectedResult);
      done();
    });
  });

  it('Given a maintenance mode parameter, When getParameter is called, Then it should return maintenance mode data', (done) => {
    // Arrange
    const parameter: RemoteConfigParameter<any> = {
      key: 'maintenance_mode',
      type: 'json',
    };
    const maintenanceMode = {
      enabled: true,
      title: 'Maintenance',
      message: 'Under maintenance',
    };
    const expectedResult: RemoteConfigResult<any> = {
      key: 'maintenance_mode',
      value: maintenanceMode,
      source: 'remote',
    };
    getParameterUseCase.execute.and.returnValue(of(expectedResult));

    // Act
    interactor.getParameter(parameter).subscribe((result) => {
      // Assert
      expect(result.value).toEqual(maintenanceMode);
      expect(result.key).toBe('maintenance_mode');
      done();
    });
  });

  it('Given a parameter, When getParameter fails, Then it should propagate the error', (done) => {
    // Arrange
    const parameter: RemoteConfigParameter<string> = {
      key: 'test_key',
      type: 'string',
    };
    const error = new Error('Remote Config Error');
    getParameterUseCase.execute.and.returnValue(throwError(() => error));

    // Act
    interactor.getParameter(parameter).subscribe({
      next: () => fail('Should have failed'),
      error: (err) => {
        // Assert
        expect(err).toEqual(error);
        done();
      },
    });
  });

  it('Given a release notes parameter, When getParameter is called, Then it should return array of release notes', (done) => {
    // Arrange
    const parameter: RemoteConfigParameter<any[]> = {
      key: 'release_notes',
      type: 'json',
    };
    const releaseNotes = [
      { version: '1.0.0', title: 'Initial Release' },
      { version: '1.1.0', title: 'Bug Fixes' },
    ];
    const expectedResult: RemoteConfigResult<any[]> = {
      key: 'release_notes',
      value: releaseNotes,
      source: 'remote',
    };
    getParameterUseCase.execute.and.returnValue(of(expectedResult));

    // Act
    interactor.getParameter(parameter).subscribe((result) => {
      // Assert
      expect(result.value).toEqual(releaseNotes);
      expect(result.value.length).toBe(2);
      done();
    });
  });

  it('Given a parameter with default value, When getParameter is called and remote fails, Then it should return default value', (done) => {
    // Arrange
    const defaultValue = 'default_value';
    const parameter: RemoteConfigParameter<string> = {
      key: 'test_key',
      type: 'string',
      defaultValue,
    };
    const expectedResult: RemoteConfigResult<string> = {
      key: 'test_key',
      value: defaultValue,
      source: 'default',
    };
    getParameterUseCase.execute.and.returnValue(of(expectedResult));

    // Act
    interactor.getParameter(parameter).subscribe((result) => {
      // Assert
      expect(result.value).toBe(defaultValue);
      expect(result.source).toBe('default');
      done();
    });
  });
});
