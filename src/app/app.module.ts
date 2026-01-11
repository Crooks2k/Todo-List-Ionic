import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateProvider } from './shared/utils/providers/translate.provider';
import { ServiceProvidersModule } from './config/service-providers/service-providers.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { environment } from '../environments/environment';
import { REMOTE_CONFIG_DEFAULTS } from './config/firebase/remote-config.defaults';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({
      mode: 'md',
      scrollAssist: true,
      scrollPadding: true,
    }),
    AppRoutingModule,
    ServiceProvidersModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TranslateProvider,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideRemoteConfig(() => {
      const rc = getRemoteConfig();
      rc.settings = {
        minimumFetchIntervalMillis: 0,
        fetchTimeoutMillis: 60000,
      };
      rc.defaultConfig = REMOTE_CONFIG_DEFAULTS;
      return rc;
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
