import { RadiologistService } from './../../radiologist.service';
import { Subscription } from 'rxjs';
import { PatientService } from './../patient.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../shared/models/patient.model';
import { Treatment } from '../../shared/models/treatment.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TreatmentType } from '../../shared/models/treatment-type.model';

import { FileUpload } from './shared/file-upload.model';
import { FileUploadService } from './shared/file-upload.service';
import { MessagePatient } from 'src/app/components/dentist/shared/message-patient.model';
import { MessagePatientService } from 'src/app/components/dentist/message-patient/message-patient.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private radiologistService: RadiologistService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private uploadService: FileUploadService
  ) {}

  fileName = '';

  sub: Subscription;

  id: number;

  patientDetails: Patient;

  treatments: Treatment[];

  treatment: Treatment;

  selectedTreatments: Treatment[];

  treatmentTypes: TreatmentType[];

  selectedTreatmentType: TreatmentType;

  treatmentDialog: boolean;

  submitted: boolean;

  doctors: any;

  isEditMode = false;

  groupedCities;

  //send items
  sendToDoctorDialog = false;

  countries: any[] = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
  ];
  selectedCountry: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.patientService.getPatient(this.id).then((data) => {
      this.patientDetails = data;
    });

    this.radiologistService.getTreatmentTypes().then((response) => {
      this.treatmentTypes = response;

      this.selectedTreatmentType = this.treatmentTypes[0];
    });

    this.patientService
      .getTreatments(this.id)
      .then((data) => {
        this.treatments = data;
      })
      .catch((err) => console.log(err));

    this.sub = this.patientService.treatmentsChanged.subscribe((response) => {
      const arr = this.treatments.filter(
        (t) => t.treatmentId == response.treatmentId
      );
      if (arr.length > 0) {
        var indexOfModefied = this.treatments.findIndex(
          (p) => (p.treatmentId = response.treatmentId)
        );
        this.treatments[indexOfModefied] = response;
      } else {
        this.treatments = [response, ...this.treatments];
      }
    });

    // this.mService
    //   .getAllDoctors()
    //   .snapshotChanges()
    //   .pipe(
    //     map((actions) =>
    //       actions.map((a) => {
    //         const data = a.payload.doc.data() as object;
    //         const id = a.payload.doc.id;
    //         return { id, ...data };
    //       })
    //     )
    //   )
    //   .subscribe((data) => {
    //     data.forEach((item) => {
    //       this.doctors.push(item);
    //     });
    //     console.log(this.doctors);
    //   });

    this.radiologistService.getAllDoctors().then((data) => {
      this.groupedCities = data;

      console.log(data);
    });
  }

  openNew() {
    this.treatment = { userId: 'maen', treatmentCost: 0 };
    this.submitted = false;
    this.treatmentDialog = true;
  }

  deleteTreatment(treatment: Treatment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Treatment?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.treatments = this.treatments.filter(
          (val) => val.treatmentId !== treatment.treatmentId
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Treatment Deleted',
          life: 1500,
        });
        this.patientService.deleteTreatment(treatment.treatmentId);
        this.uploadService.deleteFileStorage(
          treatment.patientId + '/' + treatment.treatmentImageName
        );
      },
    });
  }

  deleteSelectedTreatments() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected treatments?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.treatments = this.treatments.filter(
          (val) => !this.selectedTreatments.includes(val)
        );
        this.selectedTreatments = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Patients Deleted',
          life: 1500,
        });
      },
    });
  }

  hideDialog() {
    this.treatmentDialog = false;
    this.submitted = false;
    this.isEditMode = false;
    this.sendToDoctorDialog = false;
  }
  async saveTreatment() {
    this.submitted = true;
    // if edite
    if (this.isEditMode) {
      await this.upload().then((fileUpload) => {
        let treatment: Treatment = {
          treatmentId: this.treatment.treatmentId,
          userId: 'maen',
          patientId: this.id,
          treatmentImageUrl: fileUpload.url,
          treatmentImageName: fileUpload.name, // ask seif about it!!!
          treatmentCost: this.selectedTreatmentType.defaultCost,
          treatmentTypeId: this.selectedTreatmentType.treatmentTypeId,
          createdAt: this.treatment.createdAt,
        };

        this.patientService.editTreatment(
          this.treatment.treatmentId,
          treatment
        );
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Patient Updated',
        life: 1500,
      });
    }
    // if add
    else {
      await this.upload().then((fileUpload) => {
        let newTreatment: Treatment = {
          userId: 'maen',
          patientId: this.id,
          treatmentImageUrl: fileUpload.url,
          treatmentImageName: fileUpload.name, // ask seif about it!!!
          treatmentCost: this.selectedTreatmentType.defaultCost,
          treatmentTypeId: this.selectedTreatmentType.treatmentTypeId,
        };
        console.log('this is alll: ' + newTreatment);
        this.patientService.craeteTreatment(newTreatment);
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Patient Created',
        life: 1500,
      });
    }

    this.isEditMode = false;
    this.treatmentDialog = false;

    // } end of first if
  }

  editTreatment(treatment: Treatment) {
    this.treatment = { ...treatment };
    this.treatmentDialog = true;
    this.isEditMode = true;
  }

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Upload Image %%%%%%%%%%%%%%%%%%%%%%%%%%%
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.fileName = this.selectedFiles.item(0).name;
  }
  async upload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.currentFileUpload.id = this.id;
        return await this.uploadService.pushFileToStorage(
          this.currentFileUpload
        );

        // .subscribe(
        //   (percentage) => {
        //     this.percentage = Math.round(percentage ? percentage : 0);
        //   },
        //   (error) => {
        //     console.log(error);
        //   }
        // );
      }
    }
  }
  //delete image
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Send Image %%%%%%%%%%%%%%%%%%%%%%%%%%%
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Send Image %%%%%%%%%%%%%%%%%%%%%%%%%%%
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Send Image %%%%%%%%%%%%%%%%%%%%%%%%%%%
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Send Image %%%%%%%%%%%%%%%%%%%%%%%%%%%
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Send Image %%%%%%%%%%%%%%%%%%%%%%%%%%%
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Send Image %%%%%%%%%%%%%%%%%%%%%%%%%%%

  openDialogSendTreatmentToDoctor(treatment) {
    this.sendToDoctorDialog = true;
    // const message: MessagePatient = { imageUrl: treatment.url };
    // this.mService.createMessage(message);
    this.treatment = { ...treatment };
  }

  sendToDoctor() {
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Send To Doctor',
      life: 1500,
    });

    this.sendToDoctorDialog = false;
  }
  // groupedCities = [
  //   {
  //     label: 'Germany',
  //     value: 'de',
  //     items: [
  //       { label: 'Berlin', value: 'Berlin' },
  //       { label: 'Frankfurt', value: 'Frankfurt' },
  //       { label: 'Hamburg', value: 'Hamburg' },
  //       { label: 'Munich', value: 'Munich' },
  //     ],
  //   },
  //   {
  //     label: 'USA',
  //     value: 'us',
  //     items: [
  //       { label: 'Chicago', value: 'Chicago' },
  //       { label: 'Los Angeles', value: 'Los Angeles' },
  //       { label: 'New York', value: 'New York' },
  //       { label: 'San Francisco', value: 'San Francisco' },
  //     ],
  //   },
  //   {
  //     label: 'Japan',
  //     value: 'jp',
  //     items: [
  //       { label: 'Kyoto', value: 'Kyoto' },
  //       { label: 'Osaka', value: 'Osaka' },
  //       { label: 'Tokyo', value: 'Tokyo' },
  //       { label: 'Yokohama', value: 'Yokohama' },
  //     ],
  //   },
  // ];

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
