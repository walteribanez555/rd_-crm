import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiniestrosRoutingModule } from './siniestros-routing.module';
import { ListSiniestrosComponent } from './pages/list-siniestros/list-siniestros.component';
import { SiniestroComponent } from './pages/siniestro/siniestro.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';


@NgModule({
  declarations: [
    ListSiniestrosComponent,
    SiniestroComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    SiniestrosRoutingModule
  ]
})
export class SiniestrosModule { }
