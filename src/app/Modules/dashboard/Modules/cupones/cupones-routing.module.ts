import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CuponComponent } from './pages/cupon/cupon.component';
import { EditCuponComponent } from './pages/edit-cupon/edit-cupon.component';
import { ListCuponComponent } from './pages/list-cupon/list-cupon.component';
import { CreateCouponComponent } from './pages/create-coupon/create-coupon.component';

const routes: Routes = [
  {
    path: 'cupones',
    component : LayoutPageComponent,
    children: [
      {
        path:'list',
        component : ListCuponComponent,
      },
      {
        path : 'create',
        component : CreateCouponComponent,
      },
      {
        path : ':id/edit',
        component : EditCuponComponent,
      },
      {
        path: ':id',
        component : CuponComponent
      },

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponesRoutingModule { }
