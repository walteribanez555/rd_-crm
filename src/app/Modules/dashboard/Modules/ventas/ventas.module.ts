import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './pages/ventas/ventas.component';
import { SiniestrosComponent } from './pages/siniestros/siniestros.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CoreModule } from 'src/app/Modules/core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/app/Modules/auth/auth.module';
import { OficinasModule } from '../oficinas/oficinas.module';
import { MonthItemComponent } from './components/month-item/month-item.component';
import { DataComponent } from './pages/data/data.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';


@NgModule({
  declarations: [
    VentasComponent,
    SiniestrosComponent,
    LayoutPageComponent,
    MonthItemComponent,
    DataComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    OficinasModule,
    SharedModule,
  ]
})
export class VentasModule { }
