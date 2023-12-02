import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListReembolsoComponent } from './pages/list-reembolso/list-reembolso.component';
import { ReembolsoComponent } from './pages/reembolso/reembolso.component';

const routes: Routes = [
  {
    path : 'reembolso',
    component : LayoutPageComponent,
    children : [
      {
        path : 'list',
        component : ListReembolsoComponent,
      },
      {
        path : ':id',
        component : ReembolsoComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReembolsosRoutingModule { }
