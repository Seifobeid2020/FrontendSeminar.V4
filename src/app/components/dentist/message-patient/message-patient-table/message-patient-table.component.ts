import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { MessagePatientService } from '../message-patient.service';
import { TreatmentType } from 'src/app/components/radiologist/shared/models/treatment-type.model';
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
  patientDialog: boolean;

  sub: Subscription;

  messagePatients: MessagePatient[];

  messagePatient: MessagePatient;

  treatmentTypes: TreatmentType[];

  selectedPatients: MessagePatient[];

  selectedTreatmentType: TreatmentType;

  stateGenderOptions: { label: string; value: string }[];

  submitted: boolean;

  selectedgenderValue: string = 'Male';

  newPatientId: number;

  isEditMode = false;

  constructor(
    private messagePatientService: MessagePatientService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    //Gender Options
    this.stateGenderOptions = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ];
  }

  ngOnInit() {
    // this.messagePatientService.getMessagePatients().then((response) => {
    //   this.messagePatients = response;
    // });
    // this.sub = this.messagePatientService.patientsChanged.subscribe(
    //   (response) => {
    //     // const arr = this.patients.filter(
    //     //   (p) => p.patientId == response.patientId
    //     // );
    //     this.messagePatients = [response, ...this.messagePatients];
    //     // if (arr.length > 0) {
    //     //   var indexOfModefied = this.patients.findIndex(
    //     //     (p) => (p.patientId = response.patientId)
    //     //   );
    //     //   this.patients[indexOfModefied] = response;
    //     // } else {
    //     //   response.totalTreatmentCost = this.selectedTreatmentType.defaultCost;
    //     //   this.patients = [response, ...this.patients];
    //     //   this.newPatientId = response.patientId;
    //     // let t: Treatment = {
    //     //   patientId: this.newPatientId,
    //     //   userId: 'maen',
    //     //   treatmentCost: this.selectedTreatmentType.defaultCost,
    //     //   treatmentTypeId: this.selectedTreatmentType.treatmentTypeId,
    //     // };
    //     //  this.patientService.craeteTreatment(t);
    //     // }
    //   }
    // );
  }

  openNew() {
    // this.patient = {
    //   userId: 'maen',
    //   firstName: '',
    //   lastName: '',
    //   age: null,
    //   gender: this.selectedgenderValue == 'Male' ? 1 : 0,
    //   phoneNumber: '',
    // };
    // this.submitted = false;
    // this.patientDialog = true;
    // this.isEditMode = false;
  }

  deleteSelectedPatients() {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete the selected Patients?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.patients = this.patients.filter(
    //       (val) => !this.selectedPatients.includes(val)
    //     );
    //     this.selectedPatients = null;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Patients Deleted',
    //       life: 1500,
    //     });
    //   },
    // });
    // Delete From API
  }

  editPatient(patient: MessagePatient) {
    // this.patient = { ...patient };
    // this.patientDialog = true;
    // this.isEditMode = true;
  }

  deletePatient(patient: MessagePatient) {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete ' + patient.firstName + '?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.patients = this.patients.filter(
    //       (val) => val.patientId !== patient.patientId
    //     );
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Patient Deleted',
    //       life: 1500,
    //     });
    //     this.patientService.deletePatient(patient.patientId);
    //   },
    // });
  }

  hideDialog() {
    this.patientDialog = false;
    this.submitted = false;
    this.isEditMode = false;
  }

  savePatient() {
    // this.submitted = true;
    // if (this.patient.firstName && this.patient.firstName.trim()) {
    //   // if edit
    //   if (this.isEditMode) {
    //     console.log('Hiii from edit!!');
    //     this.patient.gender = this.selectedgenderValue == 'Male' ? 1 : 0;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Patient Updated',
    //       life: 1500,
    //     });
    //     this.patientService.editPatient(this.patient.patientId, this.patient);
    //     this.patientDialog = false;
    //     this.isEditMode = false;
    //   }
    //   // if add
    //   else {
    //     let p: Patient = {
    //       userId: 'maen',
    //       firstName: this.patient.firstName,
    //       lastName: this.patient.lastName,
    //       age: this.patient.age,
    //       gender: this.selectedgenderValue == 'Male' ? 1 : 0,
    //       phoneNumber: this.patient.phoneNumber,
    //     };
    //     this.patientService.createPatient(p);
    //     this.patientDialog = false;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Patient Created',
    //       life: 1500,
    //     });
    //   }
    // }
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.messagePatients);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
  onChangeTreatmentType() {
    // this.treatmentTypes.find((x) => {
    //   if (x.name == this.selectedTreatmentType.name) {
    //     this.selectedTreatmentType.defaultCost = x.defaultCost;
    //     return;
    //   }
    // });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
