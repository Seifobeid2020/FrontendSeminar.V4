import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared/shared.module';

// OKTA IMPORTS
// import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';

// oidc IMPORTS &Auth
import {
  AuthModule,
  LogLevel,
  OidcConfigService,
} from 'angular-auth-oidc-client';

// Firebase IMPORTS
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

// Configs IMPORT
import { environment } from 'src/environments/environment';

// Routing IMPORT
import { AppRoutingModule } from './app-routing.module';

// App Components IMPORT
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from 'src/shared/page-not-found/page-not-found.component';
import { TableModule } from 'primeng/table';

// const config = {
//   issuer: 'https://dev-54465192.okta.com/oauth2/default',
//   clientId: '0oabobmm8QJX0mbQL5d6',
//   redirectUri: window.location.origin + '/login/callback',
//   scopes: ['openid', 'profile', 'email'],
//   pkce: true,
//   postLogoutRedirectUri: 'http://localhost:4200/',
// };

// export function configureAuth(oidcConfigService: OidcConfigService) {
//   return () =>
//     oidcConfigService.withConfig({
//       stsServer: 'https://localhost:5001',
//       redirectUrl: window.location.origin,
//       postLogoutRedirectUri: window.location.origin,
//       clientId: 'js',
//       scope: 'openid profile ', // orders basket webshoppingagg orders.signalrhub webhooks
//       responseType: 'id_token token',
//       // silentRenew: true,
//       // silentRenewUrl: `${window.location.origin}/silent-renew.html`,
//       logLevel: LogLevel.Debug,
//     });
// }

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    // OktaAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),

    //   AuthModule.forRoot(),
  ],
  providers: [
    // OidcConfigService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: configureAuth,
    //   deps: [OidcConfigService],
    //   multi: true,
    // },
  ], //{ provide: OKTA_CONFIG, useValue: config }
  bootstrap: [AppComponent],
})
export class AppModule {}
