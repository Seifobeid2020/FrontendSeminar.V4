import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuItem } from 'primeng/api';
import { MessagePatientService } from './message-patient/message-patient.service';
import firebase from 'firebase';
import { MessagePatient } from './shared/message-patient.model';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent implements OnInit, OnDestroy {
  user: firebase.User;
  sub: Subscription;
  itemsNav: MenuItem[];
  itemsSideNav: MenuItem[];
  messages: MessagePatient[];
  constructor(
    private auth: AngularFireAuth,
    private messageService: MessagePatientService
  ) {}

  ngOnInit() {
    this.auth.currentUser
      .then((user) => {
        this.user = user;
      })
      .catch((err) => console.log(err));

    this.sub = this.messageService.messagesChanges.subscribe((data) => {
      this.messages = data;
    });

    this.itemsNav = [{}];

    this.itemsSideNav = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/dentist'],
      },

      {
        label: 'Patients',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/dentist/patients'],
      },
    ];
    // this.messageService.getAllDoctors();
  }

  logout() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
