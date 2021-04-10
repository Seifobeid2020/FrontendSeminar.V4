import { OktaAuthService } from '@okta/okta-angular';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  itemsNav: MenuItem[];
  itemsSideNav: MenuItem[];
  constructor(private authService: OktaAuthService) {}

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
    this.authService.signOut();
  }
}
