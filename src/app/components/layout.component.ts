// import { OktaAuthService } from '@okta/okta-angular';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  logout() {
    // this.authService.signOut();
  }
}
