import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { MessagePatientService } from './../message-patient.service';
import { MessagePatient } from './../../shared/message-patient.model';
@Component({
  selector: 'app-patient-details',
  templateUrl: './message-patient-details.component.html',
  styleUrls: ['./message-patient-details.component.css'],
})
export class MessagePatientDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private messagePatientService: MessagePatientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  sub: Subscription;

  id: number;

  messagePatientDetails;

  imageAI;

  imageAIReceived: boolean = false;

  //send items

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      this.messagePatientService.getMessage(this.id).then((e) =>
        e.subscribe((f) => {
          console.log(f.data());
          this.messagePatientDetails = f.data();
        })
      );
    });
  }

  sendToAIConverter() {
    console.log(this.imageAIReceived);
    this.imageAIReceived = !this.imageAIReceived;
    console.log(this.imageAIReceived);
  }
  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
}
