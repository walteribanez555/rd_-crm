import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { EditCuponComponent } from './pages/edit-cupon/edit-cupon.component';
import { CreateCouponComponent } from './pages/create-coupon/create-coupon.component';

const routes: Routes = [
  {
    path: 'cupones',
    component : LayoutPageComponent,
    children: [
      {
        path : 'create',
        component : CreateCouponComponent,
      },
      {
        path : ':id',
        component : EditCuponComponent,
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuponesRoutingModule { }
