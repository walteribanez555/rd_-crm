import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './pages/ventas/ventas.component';
import { SiniestrosComponent } from './pages/siniestros/siniestros.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DataComponent } from './pages/data/data.component';

const routes: Routes = [
  {
    path : 'reporte',
    component : LayoutPageComponent,
    children : [
      {
        path : 'ventas',
        component : VentasComponent,
        children :[
          {
            path : 'data',
            component : DataComponent,
          }
        ]
      },
      {
        path : 'siniestros',
        component : SiniestrosComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
