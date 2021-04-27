import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-radiologist',
  templateUrl: './radiologist.component.html',
  styleUrls: ['./radiologist.component.css']
})
export class RadiologistComponent implements OnInit {
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
        routerLink: ['/radiologist'],
      },

      {
        label: 'Patients',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/radiologist/patients'],
      },

      {
        label: 'Expenses',
        icon: 'pi pi-dollar',
        routerLink: ['/radiologist/expenses'],
      },
      {
        label: 'Reports',
        icon: 'pi pi-chart-line',
        routerLink: ['/radiologist/reports'],
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',

        items: [
          {
            label: ' Treatment Type',
            icon: 'pi pi-plus',
            routerLink: ['/radiologist/treatment-type'],
          },
          {
            label: ' Expense Type',
            icon: 'pi pi-plus',
            routerLink: ['/radiologist/expense-type'],
          },
        ],
      },
    ];
  }

  logout() {
  //  this.authService.signOut();
  }
}
