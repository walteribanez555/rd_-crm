import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListSiniestrosComponent } from './pages/list-siniestros/list-siniestros.component';
import { SiniestroComponent } from './pages/siniestro/siniestro.component';

const routes: Routes = [
  {
    path : 'siniestro',
    component : LayoutPageComponent,
    children : [
      {
        path : 'list',
        component : ListSiniestrosComponent,
      },
      {
        path : ':id',
        component : SiniestroComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiniestrosRoutingModule { }
