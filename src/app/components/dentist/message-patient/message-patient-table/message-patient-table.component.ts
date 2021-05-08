import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { MessagePatientService } from '../message-patient.service';

import { MessagePatient } from '../../shared/message-patient.model';

@Component({
  selector: 'app-patient-table',
  templateUrl: './message-patient-table.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./message-patient-table.component.css'],
})
export class MessagePatientTableComponent implements OnInit, OnDestroy {
  sub: Subscription;

  messagePatients: MessagePatient[] = [];

  constructor(private messagePatientService: MessagePatientService) {}

  ngOnInit() {
    this.messagePatientService.getMessages().then((val) => {
      console.log('from message patient: ', val);
      this.messagePatients = val;
    });
  }

  hideDialog() {}

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
