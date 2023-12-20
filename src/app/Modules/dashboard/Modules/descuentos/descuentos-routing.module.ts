import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./pages/list/list.component";
import { DescuentoComponent } from "./pages/descuento/descuento.component";
import { CreateDescuentoComponent } from "./pages/create/create-descuento.component";
import { EditDescuentoComponent } from "./pages/edit/edit.component";


const routes : Routes = [
  {
     path : 'descuentos',
     children : [
      {
        path : 'list',
        component : ListComponent,
      },
      {
        path : 'create',
        component : CreateDescuentoComponent,
      },
      {
        path : ':id',
        component : DescuentoComponent,
      },
      {
        path : ':id/edit',
        component: EditDescuentoComponent,
      }

     ]
  }

]
@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [ RouterModule],
})
export class DescuentosRoutingMoudule{

}
