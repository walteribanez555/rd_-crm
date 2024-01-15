import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UserComponent } from './pages/user/user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

const routes: Routes = [
  {
    path : 'usuario',
    component : LayoutPageComponent,
    children : [
      {
        path : 'post',
        component: CreateUserComponent,
      },
      {
        path : ':id',
        component : UserComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
