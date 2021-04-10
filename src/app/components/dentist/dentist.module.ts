import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentistComponent } from './dentist.component';
import { DentistRoutingModule } from './dentist-routing.module';

@NgModule({
  imports: [CommonModule, DentistRoutingModule],
  declarations: [DentistComponent],
})
export class DentistModule {}
