import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PolizasComponent } from './pages/polizas/polizas.component';
import { ReportesPolizasComponent } from './pages/reportes-polizas/reportes-polizas.component';

const routes: Routes = [
  {
    path : 'myoficina',
    component : LayoutPageComponent,
    children : [
      {
        path : 'polizas',
        component : PolizasComponent,
      },
      {
        path : 'reporte',
        component : ReportesPolizasComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOfficeRoutingModule { }
