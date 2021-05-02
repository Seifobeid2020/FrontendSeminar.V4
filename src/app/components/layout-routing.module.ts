import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
// import { OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: 'radiologist',
        loadChildren: () =>
          import('./radiologist/radiologist.module').then(
            (m) => m.RadiologistModule
          ),
      },
      {
        path: 'dentist',
        loadChildren: () =>
          import('./dentist/dentist.module').then((m) => m.DentistModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
