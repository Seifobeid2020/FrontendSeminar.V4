import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DentistComponent } from './dentist.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DentistComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },

      {
        path: 'patients',
        loadChildren: () =>
          import('./message-patient/message-patient.module').then(
            (m) => m.PatientModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentistRoutingModule {}
