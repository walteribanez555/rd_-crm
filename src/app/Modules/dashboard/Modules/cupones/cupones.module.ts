import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponesRoutingModule } from './cupones-routing.module';
import { CuponComponent } from './pages/cupon/cupon.component';
import { EditCuponComponent } from './pages/edit-cupon/edit-cupon.component';
import { ListCuponComponent } from './pages/list-cupon/list-cupon.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CreateCouponComponent } from './pages/create-coupon/create-coupon.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { PipesModule } from "../../../shared/pipes/pipes.module";
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        CuponComponent,
        EditCuponComponent,
        ListCuponComponent,
        LayoutPageComponent,
        CreateCouponComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        PipesModule,
        CuponesRoutingModule,
    ]
})
export class CuponesModule { }
