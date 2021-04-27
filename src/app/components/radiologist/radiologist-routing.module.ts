import { TreatmentTypeComponent } from './treatment-type/treatment-type.component';
import { ExpenseComponent } from './expense/expense.component';
import { ReportsComponent } from './reports/reports.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { RadiologistComponent } from './radiologist.component';

const routes: Routes = [

  {
    path: '',
    component: RadiologistComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },

      {
        path: 'patients',
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'expenses',
        component: ExpenseComponent,
      },
      {
        path: 'expense-type',
        component: ExpenseTypeComponent,
      },
      {
        path: 'treatment-type',
        component: TreatmentTypeComponent,
      },
    ],
  },




  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadiologistRoutingModule {}
