import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DescuentosRoutingMoudule } from "./descuentos-routing.module";
import { CreateDescuentoComponent } from "./pages/create/create-descuento.component";
import { DescuentoComponent } from "./pages/descuento/descuento.component";
import { ListComponent } from "./pages/list/list.component";
import { PipesModule } from "src/app/Modules/shared/pipes/pipes.module";
import { SharedModule } from "src/app/Modules/shared/shared.module";
import { RouterModule } from "@angular/router";
import { EditDescuentoComponent } from "./pages/edit/edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SwitchDescuentoComponent } from "./components/switch-descuento/switch-descuento.component";




@NgModule({
  declarations : [
    DescuentoComponent,
    ListComponent,
    EditDescuentoComponent,
    CreateDescuentoComponent,
    SwitchDescuentoComponent,
  ],
  imports : [
    CommonModule,
    DescuentosRoutingMoudule,
    SharedModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],

})
export class DescuentosModule{

}
