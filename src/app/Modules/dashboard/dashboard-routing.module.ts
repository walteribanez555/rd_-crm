import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { AdminComponent } from './Pages/admin/admin.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [

      {
        path : '',
        loadChildren : () => import('./Modules/marketing/marketing.module').then(m => m.MarketingModule)
      },
      {
        path : '',
        loadChildren : () => import('./Modules/polizas/polizas.module').then(m => m.PolizasModule)
      },
      {
        path : '',
        loadChildren : () => import('./Modules/reembolsos/reembolsos.module').then(m => m.ReembolsosModule),
      },
      {
        path : '',
        loadChildren : () => import('./Modules/siniestros/siniestros.module').then(m => m.SiniestrosModule),
      },
      {
        path : '',
        loadChildren : () => import('./Modules/usuarios/usuarios.module').then(m => m.UsuariosModule),
      },
      {
        path : '',
        loadChildren : () => import('./Modules/ventas/ventas.module').then( m => m.VentasModule),
      },
      {
        path : '',
        loadChildren : () => import('./Modules/cupones/cupones.module').then(m => m.CuponesModule)
      },
      {
        path : '',
        loadChildren : () => import('./Modules/my-office/my-office.module').then(m => m.MyOfficeModule),
      },
      {
        path : '',
        loadChildren : () => import('./Modules/descuentos/descuentos.module').then(m=> m.DescuentosModule),
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
