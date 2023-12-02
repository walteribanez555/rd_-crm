import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NotificacionComponent } from './pages/notificacion/notificacion.component';

const routes: Routes = [
  {
    path: 'marketing',
    component: LayoutPageComponent,
    children : [
      {
        path : 'notification',
        component : NotificacionComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
