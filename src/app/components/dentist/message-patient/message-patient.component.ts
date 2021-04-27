import { OktaAuthService } from '@okta/okta-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './message-patient.component.html',
  styleUrls: ['./message-patient.component.css'],
})
export class MessagePatientComponent implements OnInit {
  constructor(private authService: OktaAuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.signOut();
  }
}
