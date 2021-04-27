import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  messagePatientDetails: MessagePatient;

  imageAI;

  imageAIReceived: boolean = false;

  //send items
  sendToDoctorDialog = false;

  selectedCountry: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.messagePatientService.getMessagePatient(this.id).then((data) => {
      this.messagePatientDetails = data;
    });

    // this.radiologistService.getTreatmentTypes().then((response) => {
    //   this.treatmentTypes = response;

    //   this.selectedTreatmentType = this.treatmentTypes[0];
    // });

    // this.patientService
    //   .getTreatments(this.id)
    //   .then((data) => {
    //     this.treatments = data;
    //   })
    //   .catch((err) => console.log(err));

    // this.sub = this.patientService.treatmentsChanged.subscribe((response) => {
    //   const arr = this.treatments.filter(
    //     (t) => t.treatmentId == response.treatmentId
    //   );
    //   if (arr.length > 0) {
    //     var indexOfModefied = this.treatments.findIndex(
    //       (p) => (p.treatmentId = response.treatmentId)
    //     );
    //     this.treatments[indexOfModefied] = response;
    //   } else {
    //     this.treatments = [response, ...this.treatments];
    //   }
    // });
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
