import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  OidcClientNotification,
  OidcSecurityService,
  PublicConfiguration,
} from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form-primeng';
  // constructor(public oidcSecurityService: OidcSecurityService) {}
  constructor() {}

  ngOnInit() {
    // this.oidcSecurityService
    //   .checkAuth()
    //   .subscribe((auth) => console.log('is authenticated', auth));
  }

  // login() {
  //   this.oidcSecurityService.authorize();
  // }

  // logout() {
  //   this.oidcSecurityService.logoff();
  // }

  // clickMe() {
  //   const token = this.oidcSecurityService.getToken();

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + token,
  //     }),
  //   };
  // }
}
