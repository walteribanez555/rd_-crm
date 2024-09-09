import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './Modules/auth/Guards/Dashboard.guard';
import { ConfirmPolizaComponent } from './Modules/shared/Pages/confirm-poliza/confirm-poliza.component';
import { PolicyComponent } from './Modules/shared/Pages/policy/policy.component';

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
  },
  {
    path: 'confirm',
    component : ConfirmPolizaComponent,
  },
  {
    path : 'policy',
    component : PolicyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
