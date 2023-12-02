import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReembolsosRoutingModule } from './reembolsos-routing.module';
import { ReembolsoComponent } from './pages/reembolso/reembolso.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListReembolsoComponent } from './pages/list-reembolso/list-reembolso.component';


@NgModule({
  declarations: [
    ReembolsoComponent,
    LayoutPageComponent,
    ListReembolsoComponent
  ],
  imports: [
    CommonModule,
    ReembolsosRoutingModule
  ]
})
export class ReembolsosModule { }
