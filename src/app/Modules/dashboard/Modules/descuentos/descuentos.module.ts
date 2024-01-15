import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DescuentosRoutingMoudule } from "./descuentos-routing.module";
import { CreateDescuentoComponent } from "./pages/create/create-descuento.component";
import { PipesModule } from "src/app/Modules/shared/pipes/pipes.module";
import { SharedModule } from "src/app/Modules/shared/shared.module";
import { RouterModule } from "@angular/router";
import { EditDescuentoComponent } from "./pages/edit/edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SwitchDescuentoComponent } from "./components/switch-descuento/switch-descuento.component";
import { CoreModule } from "src/app/Modules/core/core.module";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { DescuentoItemViewComponent } from "./components/descuento-item-view/descuento-item-view.component";




@NgModule({
  declarations : [
    EditDescuentoComponent,
    CreateDescuentoComponent,
    SwitchDescuentoComponent,
    LayoutPageComponent,
    DescuentoItemViewComponent,
  ],
  imports : [
    CommonModule,
    DescuentosRoutingMoudule,
    SharedModule,
    CoreModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],

})
export class DescuentosModule{

}
