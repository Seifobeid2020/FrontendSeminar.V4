import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { PageNotFoundComponent } from 'src/shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  // {
  //   path: 'login/callback',
  //   component: OktaCallbackComponent,
  // },
  {
    path: '',
    // canActivate: [OktaAuthGuard],
    loadChildren: () =>
      import('./components/layout.module').then((m) => m.LayoutModule),
  },
  //

  { path: 'home', component: HomeComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
