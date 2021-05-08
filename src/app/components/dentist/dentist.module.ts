import { MessagePatientService } from './message-patient/message-patient.service';
import { SharedModule } from './../../../shared/shared.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentistComponent } from './dentist.component';
import { DentistRoutingModule } from './dentist-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BadgeModule } from 'primeng/badge';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [DentistComponent, DashboardComponent],
  imports: [
    DentistRoutingModule,
    CommonModule,
    DentistRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    PanelMenuModule,
    SharedModule,
    BadgeModule,
    ClickOutsideModule,
  ],

  providers: [MessagePatientService],
})
export class DentistModule {}
