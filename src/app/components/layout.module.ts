import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SharedModule } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    PanelMenuModule,
    SharedModule,
  ],
  declarations: [LayoutComponent],
})
export class LayoutModule {}
