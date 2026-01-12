import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TranslateProvider } from './translate.provider';

describe('TranslateProvider', () => {
  let service: TranslateProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslateProvider],
    });
    service = TestBed.inject(TranslateProvider);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Given the TranslateProvider, When it is created, Then it should be truthy', () => {
    // Arrange & Act
    // Service is created in beforeEach

    // Assert
    expect(service).toBeTruthy();
  });

  it('Given a module key, When loadModule is called, Then it should load translations from the correct path', async () => {
    // Arrange
    const moduleKey = 'home';
    const mockTranslations = {
      pages: {
        home: {
          title: 'Home',
          subtitle: 'Welcome',
        },
      },
    };

    // Act
    const loadPromise = service.loadModule(moduleKey);
    const req = httpMock.expectOne(`assets/i18n/${moduleKey}/es-CO.json`);
    req.flush(mockTranslations);
    await loadPromise;

    // Assert
    expect(req.request.method).toBe('GET');
  });

  it('Given loaded translations, When getObject is called with valid path, Then it should return the correct object', async () => {
    // Arrange
    const moduleKey = 'home';
    const mockTranslations = {
      pages: {
        home: {
          title: 'Home',
          subtitle: 'Welcome',
        },
      },
    };
    const loadPromise = service.loadModule(moduleKey);
    const req = httpMock.expectOne(`assets/i18n/${moduleKey}/es-CO.json`);
    req.flush(mockTranslations);
    await loadPromise;

    // Act
    const result = service.getObject('pages.home');

    // Assert
    expect(result).toEqual({
      title: 'Home',
      subtitle: 'Welcome',
    });
  });

  it('Given loaded translations, When getObject is called with nested path, Then it should return the nested value', async () => {
    // Arrange
    const moduleKey = 'tasks';
    const mockTranslations = {
      pages: {
        taskList: {
          title: 'Tasks',
          buttons: {
            add: 'Add Task',
            delete: 'Delete',
          },
        },
      },
    };
    const loadPromise = service.loadModule(moduleKey);
    const req = httpMock.expectOne(`assets/i18n/${moduleKey}/es-CO.json`);
    req.flush(mockTranslations);
    await loadPromise;

    // Act
    const result = service.getObject('pages.taskList.buttons');

    // Assert
    expect(result).toEqual({
      add: 'Add Task',
      delete: 'Delete',
    });
  });

  it('Given no loaded translations, When getObject is called, Then it should return empty object', () => {
    // Arrange
    // No translations loaded

    // Act
    const result = service.getObject('pages.home');

    // Assert
    expect(result).toEqual({});
  });

  it('Given loaded translations, When getObject is called with invalid path, Then it should return empty object', async () => {
    // Arrange
    const moduleKey = 'home';
    const mockTranslations = {
      pages: {
        home: {
          title: 'Home',
        },
      },
    };
    const loadPromise = service.loadModule(moduleKey);
    const req = httpMock.expectOne(`assets/i18n/${moduleKey}/es-CO.json`);
    req.flush(mockTranslations);
    await loadPromise;

    // Act
    const result = service.getObject('pages.nonexistent');

    // Assert
    expect(result).toEqual({});
  });

  it('Given multiple modules, When loadModule is called for each, Then it should load all translations', async () => {
    // Arrange
    const module1 = 'home';
    const module2 = 'tasks';
    const mockTranslations1 = { pages: { home: { title: 'Home' } } };
    const mockTranslations2 = { pages: { taskList: { title: 'Tasks' } } };

    // Act
    const load1 = service.loadModule(module1);
    const req1 = httpMock.expectOne(`assets/i18n/${module1}/es-CO.json`);
    req1.flush(mockTranslations1);
    await load1;

    const load2 = service.loadModule(module2);
    const req2 = httpMock.expectOne(`assets/i18n/${module2}/es-CO.json`);
    req2.flush(mockTranslations2);
    await load2;

    // Assert
    const result1 = service.getObject('pages.home');
    const result2 = service.getObject('pages.taskList');
    expect(result1).toEqual({ title: 'Home' });
    expect(result2).toEqual({ title: 'Tasks' });
  });
});
