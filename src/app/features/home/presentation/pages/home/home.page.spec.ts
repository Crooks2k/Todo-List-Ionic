import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { HomePage } from './home.page';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { RemoteConfigInteractor } from '@app/config/core/interactors/remote-config.interactor';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let translateProvider: jasmine.SpyObj<TranslateProvider>;
  let remoteConfigInteractor: jasmine.SpyObj<RemoteConfigInteractor>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const translateSpy = jasmine.createSpyObj('TranslateProvider', [
      'loadModule',
      'getObject',
    ]);
    const remoteConfigSpy = jasmine.createSpyObj('RemoteConfigInteractor', [
      'getParameter',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomePage, IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: TranslateProvider, useValue: translateSpy },
        { provide: RemoteConfigInteractor, useValue: remoteConfigSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    translateProvider = TestBed.inject(
      TranslateProvider
    ) as jasmine.SpyObj<TranslateProvider>;
    remoteConfigInteractor = TestBed.inject(
      RemoteConfigInteractor
    ) as jasmine.SpyObj<RemoteConfigInteractor>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    translateProvider.loadModule.and.returnValue(Promise.resolve());
    translateProvider.getObject.and.returnValue({
      title: 'Test Title',
      subtitle: 'Test Subtitle',
    });

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('Given the HomePage, When it is created, Then it should be truthy', () => {
    // Arrange & Act

    // Assert
    expect(component).toBeTruthy();
  });

  it('Given the HomePage, When it is initialized, Then it should load i18n translations', async () => {
    // Arrange
    remoteConfigInteractor.getParameter.and.returnValue(
      of({
        key: 'maintenance_mode',
        value: { enabled: false },
        source: 'default',
      })
    );

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(translateProvider.loadModule).toHaveBeenCalledWith('home');
    expect(translateProvider.getObject).toHaveBeenCalledWith('pages.home');
  });

  it('Given the HomePage, When maintenance mode is disabled, Then isInMaintenance should return false', () => {
    // Arrange
    component.maintenanceMode = { enabled: false } as any;

    // Act
    const result = component.isInMaintenance;

    // Assert
    expect(result).toBe(false);
  });

  it('Given the HomePage, When maintenance mode is enabled, Then isInMaintenance should return true', () => {
    // Arrange
    component.maintenanceMode = { enabled: true } as any;

    // Act
    const result = component.isInMaintenance;

    // Assert
    expect(result).toBe(true);
  });

  it('Given the HomePage, When maintenance mode is null, Then isInMaintenance should return false', () => {
    // Arrange
    component.maintenanceMode = null;

    // Act
    const result = component.isInMaintenance;

    // Assert
    expect(result).toBe(false);
  });

  it('Given the HomePage, When goToTasks is called, Then it should navigate to tasks route', () => {
    // Arrange
    const expectedRoute = '/tasks';

    // Act
    component.goToTasks();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith([expectedRoute]);
  });

  it('Given the HomePage, When goToCategories is called, Then it should navigate to categories route', () => {
    // Arrange
    const expectedRoute = '/tasks/categories';

    // Act
    component.goToCategories();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith([expectedRoute]);
  });

  it('Given the HomePage, When goToReleases is called, Then it should navigate to releases route', () => {
    // Arrange
    const expectedRoute = '/releases';

    // Act
    component.goToReleases();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith([expectedRoute]);
  });

  it('Given the HomePage, When Remote Config returns maintenance mode enabled, Then maintenanceMode should be set', async () => {
    // Arrange
    const mockMaintenanceMode = {
      enabled: true,
      title: 'Maintenance',
      message: 'Under maintenance',
      startDate: '2026-01-01',
      endDate: '2026-01-02',
      icon: 'construct-outline',
    };
    remoteConfigInteractor.getParameter.and.returnValue(
      of({
        key: 'maintenance_mode',
        value: mockMaintenanceMode,
        source: 'remote',
      })
    );

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component.maintenanceMode).toEqual(mockMaintenanceMode);
    expect(component.loading).toBe(false);
  });

  it('Given the HomePage, When Remote Config fails, Then loading should be set to false', async () => {
    // Arrange
    remoteConfigInteractor.getParameter.and.returnValue(
      throwError(() => new Error('Remote Config Error'))
    );

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component.loading).toBe(false);
  });
});
