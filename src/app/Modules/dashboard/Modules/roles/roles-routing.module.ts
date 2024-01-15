import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/LayoutPage/LayoutPage.component';
import { AgregarRolComponent } from './Pages/agregar-rol/agregar-rol.component';
import { EditarRolComponent } from './Pages/editar-rol/editar-rol.component';

const routes: Routes = [
  {
    path : 'roles',
    component : LayoutPageComponent,
    children : [
      {
        path : 'create',
        component : AgregarRolComponent,
      },
      {
        path : ':id',
        component : EditarRolComponent,
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
