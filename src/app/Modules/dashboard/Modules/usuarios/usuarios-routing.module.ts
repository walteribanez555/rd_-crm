import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserComponent } from './pages/user/user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { AgregarRolComponent } from './pages/agregar-rol/agregar-rol.component';

const routes: Routes = [
  {
    path : 'usuario',
    component : LayoutPageComponent,
    children : [
      {
        path : 'list',
        component : ListUserComponent,
      },
      {
        path : 'create-rol',
        component : AgregarRolComponent,
      },
      {
        path : 'create',
        component: CreateUserComponent,
      },
      {
        path : ':id',
        component : UserComponent,
      },
      {
        path : ':id/edit',
        component : EditUserComponent,
      },
      {
        path : 'oficinas',
        loadChildren : () => import('./Modules/oficinas/oficinas.module').then(m => m.OficinasModule)
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
