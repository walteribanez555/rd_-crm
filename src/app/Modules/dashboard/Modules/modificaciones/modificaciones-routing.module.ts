import { NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { ListComponent } from "./pages/list/list.component";
import { PolizaEditComponent } from "./pages/poliza/polizaEdit.component";
import { FilterByPolizaComponent } from "./pages/filterByPoliza/filterByPoliza.component";


const routes :Routes = [
  {
    path: 'modificaciones',
    component : LayoutPageComponent,
    children : [
      {
        path : 'list',
        component :ListComponent,
      },
      {
        path : 'filter',
        component : FilterByPolizaComponent,
      },
      {
        path : ':id',
        component : PolizaEditComponent,
      }
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificacionesRoutingModule{

}
