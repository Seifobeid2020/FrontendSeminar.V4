import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuItem } from 'primeng/api';
import { MessagePatientService } from './message-patient/message-patient.service';
import firebase from 'firebase';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent implements OnInit {
  user: firebase.User;

  itemsNav: MenuItem[];
  itemsSideNav: MenuItem[];
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
  }

  logout() {}
}
