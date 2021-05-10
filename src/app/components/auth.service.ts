import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  idToken: string;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private cookieService: CookieService,
    private http: HttpClient // NgZone service to remove outside scope warning
  ) {
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
          this.afAuth.signInWithCustomToken(res.token).then((userCred) => {
            console.log('User is signed in');
          });
        });
    } else {
      window.location.href = 'http://localhost:3000/login';
    }
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.getCustomClaimRole().then((role) => {
          this.userData = { ...this.userData, role };
          localStorage.setItem('user', JSON.stringify(this.userData));
          console.log(JSON.parse(localStorage.getItem('user')));
        });
      } else {
        localStorage.setItem('user', null);
        console.log(JSON.parse(localStorage.getItem('user')));
      }
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    // return  this.afAuth.currentUser.sendEmailVerification().then(() => {
    //   this.router.navigate(['verify-email-address']);
    // });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Sign out
  SignOut() {
    return this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.cookieService.delete('__session');
      })
      .catch((error) => console.log(error.message));
  }

  async getCustomClaimRole() {
    await firebase.auth().currentUser.getIdToken(true);
    const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
    return decodedToken.claims.stripeRole;
  }
}
