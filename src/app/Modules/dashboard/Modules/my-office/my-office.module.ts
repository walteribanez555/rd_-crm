import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOfficeRoutingModule } from './my-office-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportesPolizasComponent } from './pages/reportes-polizas/reportes-polizas.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { CoreModule } from 'src/app/Modules/core/core.module';
import { OficinaItemComponent } from './components/oficina-item/oficina-item.component';
import { AuthModule } from 'src/app/Modules/auth/auth.module';
import { OfficeSelectorModalService } from './utils/office-selector-modal/services/office-selector-modal.service';
import { OfficeSelectorModalComponent } from './utils/office-selector-modal/office-selector-modal.component';
import { OficinasModule } from '../oficinas/oficinas.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ReportesPolizasComponent,
    OficinaItemComponent,
    OfficeSelectorModalComponent,
  ],
  imports: [
    MyOfficeRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    OficinasModule,
  ],
  providers : [
    OfficeSelectorModalService,
  ]
})
export class MyOfficeModule { }
