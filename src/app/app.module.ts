import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateProvider } from './shared/utils/providers/translate.provider';
import { TaskRepository } from './features/tasks/core/domain/repositories/task.repository';
import { CategoryRepository } from './features/tasks/core/domain/repositories/category.repository';
import { TaskRepositoryImpl } from './features/tasks/data/repositories/task.repository.impl';
import { CategoryRepositoryImpl } from './features/tasks/data/repositories/category.repository.impl';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateProvider,
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
    { provide: CategoryRepository, useClass: CategoryRepositoryImpl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
