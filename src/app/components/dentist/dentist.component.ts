import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent implements OnInit {
  itemsNav: MenuItem[];
  itemsSideNav: MenuItem[];
  constructor() {}

  ngOnInit() {
    this.itemsNav = [
      {
        label: '<img />',
        escape: false,
        // style: {
        //   'margin-left': '1000px',
        // },
      },
    ];

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

    ]
  }

  logout() {
  }
}
