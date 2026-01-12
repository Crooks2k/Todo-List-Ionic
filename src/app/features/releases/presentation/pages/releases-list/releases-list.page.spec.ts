import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { ReleasesListPage } from './releases-list.page';
import { TranslateProvider } from '@shared/utils/providers/translate.provider';
import { RemoteConfigInteractor } from '@app/config/core/interactors/remote-config.interactor';
import { ReleaseNote } from '@app/config/core/domain/entities';

describe('ReleasesListPage', () => {
  let component: ReleasesListPage;
  let fixture: ComponentFixture<ReleasesListPage>;
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
      imports: [
        ReleasesListPage,
        IonicModule.forRoot(),
        HttpClientTestingModule,
      ],
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
      title: 'Release Notes',
      subtitle: "What's new",
    });

    fixture = TestBed.createComponent(ReleasesListPage);
    component = fixture.componentInstance;
  });

  it('Given the ReleasesListPage, When it is created, Then it should be truthy', () => {
    // Arrange & Act
    // Component is created in beforeEach

    // Assert
    expect(component).toBeTruthy();
  });

  it('Given the page, When it is initialized, Then it should load i18n translations', async () => {
    // Arrange
    remoteConfigInteractor.getParameter.and.returnValue(
      of({
        key: 'release_notes',
        value: [],
        source: 'default',
      })
    );

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(translateProvider.loadModule).toHaveBeenCalledWith('releases');
    expect(translateProvider.getObject).toHaveBeenCalledWith(
      'pages.releasesList'
    );
  });

  it('Given the page, When Remote Config returns release notes, Then releaseNotes should be populated', async () => {
    // Arrange
    const mockReleaseNotes: ReleaseNote[] = [
      {
        version: '1.0.0',
        date: '2026-01-01',
        title: 'Initial Release',
        description: 'First version',
        features: ['Feature 1'],
      },
      {
        version: '1.1.0',
        date: '2026-01-15',
        title: 'Bug Fixes',
        description: 'Fixed bugs',
        improvements: ['Improvement 1'],
      },
    ];
    remoteConfigInteractor.getParameter.and.returnValue(
      of({
        key: 'release_notes',
        value: mockReleaseNotes,
        source: 'remote',
      })
    );

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component.releaseNotes).toEqual(mockReleaseNotes);
    expect(component.releaseNotes.length).toBe(2);
    expect(component.loading).toBe(false);
  });

  it('Given the page, When Remote Config returns empty array, Then releaseNotes should be empty', async () => {
    // Arrange
    remoteConfigInteractor.getParameter.and.returnValue(
      of({
        key: 'release_notes',
        value: [],
        source: 'remote',
      })
    );

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component.releaseNotes).toEqual([]);
    expect(component.releaseNotes.length).toBe(0);
    expect(component.loading).toBe(false);
  });

  it('Given the page, When Remote Config fails, Then loading should be set to false and releaseNotes should be empty', async () => {
    // Arrange
    remoteConfigInteractor.getParameter.and.returnValue(
      throwError(() => new Error('Remote Config Error'))
    );

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component.loading).toBe(false);
    expect(component.releaseNotes).toEqual([]);
  });

  it('Given the page, When goBackToHome is called, Then it should navigate to home route', () => {
    // Arrange
    const expectedRoute = '/home';

    // Act
    component.goBackToHome();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith([expectedRoute]);
  });

  it('Given the page with loading true, When initialized, Then loading should be true initially', () => {
    // Arrange
    remoteConfigInteractor.getParameter.and.returnValue(
      of({
        key: 'release_notes',
        value: [],
        source: 'default',
      })
    );

    // Act
    // Component is created with loading = true

    // Assert
    expect(component.loading).toBe(true);
  });

  it('Given release notes with features, When loaded, Then features should be accessible', async () => {
    // Arrange
    const mockReleaseNotes: ReleaseNote[] = [
      {
        version: '1.0.0',
        date: '2026-01-01',
        title: 'Initial Release',
        description: 'First version',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
      },
    ];
    remoteConfigInteractor.getParameter.and.returnValue(
      of({
        key: 'release_notes',
        value: mockReleaseNotes,
        source: 'remote',
      })
    );

    // Act
    fixture.detectChanges();
    await fixture.whenStable();

    // Assert
    expect(component.releaseNotes[0].features).toBeDefined();
    expect(component.releaseNotes[0].features?.length).toBe(3);
  });
});
