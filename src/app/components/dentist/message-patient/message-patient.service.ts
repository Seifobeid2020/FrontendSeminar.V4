import { MessagePatient } from './../shared/message-patient.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Patient } from '../../radiologist/shared/models/patient.model';
import { Treatment } from '../../radiologist/shared/models/treatment.model';

@Injectable({
  providedIn: 'root',
})
export class MessagePatientService {
  patientsChanged = new Subject<MessagePatient>();
  // treatmentsChanged = new Subject<Treatment>();

  baseUrl = 'https://localhost:5003/';

  constructor(private http: HttpClient) {}

  getMessagePatients(): Promise<MessagePatient[]> {
    return this.http
      .get<MessagePatient[]>(this.baseUrl + 'api/Messages')
      .toPromise()
      .then((data) => {
        return data;
      });
  }

  getMessagePatient(id: number): Promise<MessagePatient> {
    return this.http
      .get<MessagePatient>(this.baseUrl + `api/Messages/${id}`)
      .toPromise()
      .then((data) => {
        return data;
      });
  }

  // getTreatments(patientId: number) {
  //   return this.http
  //     .get<Treatment[]>(this.baseUrl + `api/treatments/patient/${patientId}`)
  //     .toPromise()
  //     .then((data) => data);
  // }

  // getTreatmentsTotalCost(patientId: number): number {
  //   let totalCost = 0;
  //   this.http
  //     .get<{ value: number }>(
  //       this.baseUrl + `api/treatments/patient/${patientId}/totalcost`
  //     )
  //     .toPromise()
  //     .then((data) => {
  //       totalCost = data.value;
  //     });

  //   return totalCost;
  // }

  // createPatient(patient: Patient): void {
  //   this.http
  //     .post<Patient>(this.baseUrl + 'api/patients', patient)
  //     .subscribe((result) => {
  //       this.patientsChanged.next(result);
  //     });
  // }

  // craeteTreatment(treatment: Treatment): void {
  //   this.http
  //     .post<Treatment>(this.baseUrl + 'api/treatments', treatment)
  //     .subscribe((result) => {
  //       this.treatmentsChanged.next(result);
  //     });
  // }

  // editPatient(id: number, patient: Patient) {
  //   this.http
  //     .put<Patient>(this.baseUrl + `api/patients/${id}`, patient)
  //     .subscribe((result) => {
  //       console.log(result);
  //       this.patientsChanged.next(result);
  //     });
  // }

  // editTreatment(id: number, treatment: Treatment) {
  //   console.log(treatment);
  //   this.http
  //     .put<Treatment>(this.baseUrl + `api/treatments/${id}`, treatment)
  //     .subscribe((result) => {
  //       this.treatmentsChanged.next(result);
  //     });
  // }

  // deletePatient(id: number) {
  //   this.http.delete(this.baseUrl + `api/patients/${id}`).subscribe();
  // }

  // deleteTreatment(id: number) {
  //   this.http.delete(this.baseUrl + `api/treatments/${id}`).subscribe();
  // }
}