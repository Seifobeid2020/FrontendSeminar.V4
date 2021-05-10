import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private authSercvice: AuthService, private router: Router) {}

  ngOnInit() {
    let user = this.authSercvice.getUser();
    if (user.role == 'radiologist') {
      this.router.navigate(['radiologist']);
    } else if (user.role == 'dentist') {
      this.router.navigate(['dentist']);
    } else {
      window.location.href = 'http://localhost:3000/login';
    }
  }

  logout() {
    this.authSercvice.SignOut();
  }
}
