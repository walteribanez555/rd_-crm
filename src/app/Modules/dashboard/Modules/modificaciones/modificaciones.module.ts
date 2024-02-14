import {  NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { ListComponent } from "./pages/list/list.component";
import { PolizaEditComponent } from "./pages/poliza/polizaEdit.component";
import { ModificacionesRoutingModule } from "./modificaciones-routing.module";
import { RouterModule } from "@angular/router";
import { CoreModule } from "src/app/Modules/core/core.module";
import { PipesModule } from "src/app/Modules/shared/pipes/pipes.module";
import { CardPolizaComponent } from "src/app/Modules/shared/Components/card-poliza/card-poliza.component";
import { CardBeneficiarioComponent } from "src/app/Modules/shared/Components/card-beneficiario/card-beneficiario.component";
import { SharedModule } from "src/app/Modules/shared/shared.module";
import { ModCardBeneficiarionComponent } from "./components/mod-card-beneficiario/mod-card-beneficiario.component";
import { ModCardPolizaComponent } from "./components/mod-card-poliza/mod-card-poliza.component";
import { ModCardVentaComponent } from "./components/mod-card-venta/mod-card-venta.component";
import { ModCardBenService } from "./components/mod-card-beneficiario/modalBeneficiario/mod-card-ben.service";
import { ModCardPolizaService } from "./components/mod-card-poliza/modalPoliza/mod-card-poliza.service";
import { ModCardVentaService } from "./components/mod-card-venta/modalVenta/mod-card-venta.service";
import { ModalBeneficiarioComponent } from "./components/mod-card-beneficiario/modalBeneficiario/modalBeneficiario.component";
import { ModModifierComponent } from "./components/mod-modifier/mod-modifier.component";
import { ModModifierService } from "./components/mod-modifier/mod-modifier.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalPolizaComponent } from "./components/mod-card-poliza/modalPoliza/modalPoliza.component";
import { ModalVentaComponent } from "./components/mod-card-venta/modalVenta/modalVenta.component";
import { FilterByPolizaComponent } from "./pages/filterByPoliza/filterByPoliza.component";



@NgModule({
  declarations : [
    LayoutPageComponent,
    ListComponent,
    PolizaEditComponent,
    ModCardBeneficiarionComponent,
    ModCardPolizaComponent,
    ModCardVentaComponent,
    ModalBeneficiarioComponent,
    ModalPolizaComponent,
    ModalVentaComponent,
    ModModifierComponent,
    FilterByPolizaComponent,

  ],
  imports : [
    ModificacionesRoutingModule,
    CommonModule,
    RouterModule,
    CoreModule,
    PipesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ModCardBenService,
    ModCardPolizaService,
    ModCardVentaService,
    ModModifierService,
  ]
})
export class ModificacionesModule{

}
