import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiologistRoutingModule } from './radiologist-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { ExpenseComponent } from './expense/expense.component';
import { TreatmentTypeComponent } from './treatment-type/treatment-type.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportsComponent,
    ExpenseComponent,
    TreatmentTypeComponent,
    ExpenseTypeComponent,
  ],
  imports: [
    CommonModule,
    RadiologistRoutingModule,
    FormsModule,
    //table
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SelectButtonModule,
  ],
  exports: [],
  providers: [MessageService, ConfirmationService],
})
export class RadiologistModule {}
