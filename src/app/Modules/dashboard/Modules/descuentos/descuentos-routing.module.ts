import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateDescuentoComponent } from "./pages/create/create-descuento.component";
import { EditDescuentoComponent } from "./pages/edit/edit.component";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";


const routes : Routes = [
  {
     path : 'descuentos',
     component : LayoutPageComponent,
     children : [
      {
        path : 'create',
        component : CreateDescuentoComponent,
      },
      {
        path : ':id',
        component : EditDescuentoComponent,
      },
     ]
  }

]
@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [ RouterModule],
})
export class DescuentosRoutingMoudule{

}
