import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { LayoutModule } from './layout/layout.module';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptors/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorTranslate } from './shared/paginator';
import { SharedModule } from './shared/shared.module';
import { PageNoFound404Component } from './shared/page-no-found404/page-no-found404.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FirebaseMessagingService } from './services/firebase-messaging.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    PageNoFound404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    SharedModule,
    ServiceWorkerModule.register('./combine-sw.js', { enabled: environment.production }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    FirebaseMessagingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true // Para que este al pendiente de todas las peticiones que hagamos
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'MXN'},
    {
      provide: MatPaginatorIntl,
      useValue: getPaginatorTranslate()
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
