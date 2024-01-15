import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './Modules/auth/Guards/Dashboard.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'dashboard',
    pathMatch  : 'full'
  },
  {
    path : 'dashboard',
    canActivate : [dashboardGuard],
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
