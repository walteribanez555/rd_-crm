import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPolizaComponent } from './pages/list-poliza/list-poliza.component';
import { EditPolizaComponent } from './pages/edit-poliza/edit-poliza.component';
import { PolizaComponent } from './pages/poliza/poliza.component';
import { CreateComponent } from './pages/create/create.component';
import { BeneficiarioComponent } from './components/beneficiario/beneficiario.component';

const routes: Routes = [
  {
    path : 'poliza',
    component : LayoutPageComponent,
    children : [
      {
        path: 'list',
        component : ListPolizaComponent,
      },
      {
        path : 'create',
        component : CreateComponent
      },
      {
        path : ':id/edit',
        component : EditPolizaComponent,
      },
      {
        path : ':id',
        component : PolizaComponent,

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolizasRoutingModule { }
