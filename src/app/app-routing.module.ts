import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'dashboard',
    loadChildren : () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path : 'auth',
    loadChildren : () => import('./Modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
