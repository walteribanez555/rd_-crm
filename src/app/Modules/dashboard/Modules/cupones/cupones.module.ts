import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuponesRoutingModule } from './cupones-routing.module';
import { EditCuponComponent } from './pages/edit-cupon/edit-cupon.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CreateCouponComponent } from './pages/create-coupon/create-coupon.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { PipesModule } from "../../../shared/pipes/pipes.module";
import { RouterModule } from '@angular/router';
import { SwitchCuponComponent } from './components/switch-cupones/switch-cupon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/Modules/core/core.module';
import { CuponItemViewComponent } from './components/cupon-item-view/cupon-item-view.component';


@NgModule({
    declarations: [
        EditCuponComponent,
        LayoutPageComponent,
        CreateCouponComponent,
        SwitchCuponComponent,
        CuponItemViewComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        PipesModule,
        CuponesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
    ]
})
export class CuponesModule { }
