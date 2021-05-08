import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient,
    private authService: AuthService,
    public fireDB: AngularFirestore
  ) {}

  user: any;
  idToken: any;
  role: any;

  async ngOnInit() {
    const cookieExists: boolean = this.cookieService.check('__session');
    console.log(cookieExists);
    if (cookieExists) {
      this.idToken = this.cookieService.get('__session');
      this.http
        .get<{ token: string }>(
          'https://us-central1-drradauthpay.cloudfunctions.net/generateCustomToken',
          {
            params: new HttpParams().append('idToken', this.idToken),
          }
        )
        .subscribe((res) => {
          this.auth.signInWithCustomToken(res.token).then((userCred) => {
            this.user = userCred.user;
            //    console.log(this.user);
            this.getCustomClaimRole().then((role) => {
              if (role == 'dentist') {
                this.router.navigate(['/dentist']);
              } else if (role == 'radiologist') {
                this.router.navigate(['/radiologist']);
              }
            });
          });
        });

      console.log('this is from layout if');
    } else {
      // window.location.href = 'http://localhost:3000/login.html';
      // this.authService.SignIn('user2@test.com', 'Maen_1234');
      // this.authService.SignOut();
      // this.authService.SignOut();
      console.log('this is from layout else');
    }
  }

  async getCustomClaimRole() {
    await firebase.auth().currentUser.getIdToken(true);
    const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
    return decodedToken.claims.stripeRole;
  }

  logout() {
    // this.authService.signOut();
  }
}
