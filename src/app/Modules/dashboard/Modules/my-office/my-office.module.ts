import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOfficeRoutingModule } from './my-office-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PolizasComponent } from './pages/polizas/polizas.component';
import { ReportesPolizasComponent } from './pages/reportes-polizas/reportes-polizas.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    PolizasComponent,
    ReportesPolizasComponent
  ],
  imports: [
    CommonModule,
    MyOfficeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,

  ]
})
export class MyOfficeModule { }
