import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [
      {
        path : 'login',
        component : LoginComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
