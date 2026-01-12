import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Given the AppComponent, When it is created, Then it should be truthy', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);

    // Act
    const app = fixture.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  });

  it('Given the AppComponent, When it is initialized, Then it should have ion-app element', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);

    // Act
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const ionApp = compiled.querySelector('ion-app');

    // Assert
    expect(ionApp).toBeTruthy();
  });

  it('Given the AppComponent, When it is initialized, Then it should have ion-router-outlet', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);

    // Act
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const routerOutlet = compiled.querySelector('ion-router-outlet');

    // Assert
    expect(routerOutlet).toBeTruthy();
  });
});
