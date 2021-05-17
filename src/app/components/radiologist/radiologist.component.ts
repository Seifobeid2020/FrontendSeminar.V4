import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-radiologist',
  templateUrl: './radiologist.component.html',
  styleUrls: ['./radiologist.component.css'],
})
export class RadiologistComponent implements OnInit {
  itemsNav: MenuItem[];
  itemsSideNav: MenuItem[];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.itemsSideNav = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/radiologist'],
        routerLinkActiveOptions: { exact: true },
      },

      {
        label: 'Patients',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/radiologist/patients'],
        routerLinkActiveOptions: { exact: true },
      },

      {
        label: 'Expenses',
        icon: 'pi pi-dollar',
        routerLink: ['/radiologist/expenses'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Reports',
        icon: 'pi pi-chart-line',
        routerLink: ['/radiologist/reports'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',

        items: [
          {
            label: ' Treatment Type',
            icon: 'pi pi-plus',
            routerLink: ['/radiologist/treatment-type'],
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: ' Expense Type',
            icon: 'pi pi-plus',
            routerLink: ['/radiologist/expense-type'],
            routerLinkActiveOptions: { exact: true },
          },
        ],
      },
    ];
  }

  logout() {
    this.authService.SignOut();
  }
}
