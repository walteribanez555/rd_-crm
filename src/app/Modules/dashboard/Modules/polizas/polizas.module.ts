import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolizasRoutingModule } from './polizas-routing.module';
import { EditPolizaComponent } from './pages/edit-poliza/edit-poliza.component';
import { PolizaComponent } from './pages/poliza/poliza.component';
import { ListPolizaComponent } from './pages/list-poliza/list-poliza.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { CreateComponent } from './pages/create/create.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ListBeneficiariosComponent } from './components/list-beneficiarios/list-beneficiarios.component';
import { BeneficiarioComponent } from './components/beneficiario/beneficiario.component';
import { ModalEditBenComponent } from './components/modal-edit-ben/modal-edit-ben.component';
import { ModalEditPolizaComponent } from './components/modal-edit-poliza/modal-edit-poliza.component';
import { MultiStepComponent } from './components/multi-step/multi-step.component';
import { AgesTravelerComponent } from './components/agesTraveler/agesTraveler.component';
import { CoberturaComponent } from './components/cobertura/cobertura.component';
import { DatesToTravelComponent } from './components/datesToTravel/datesToTravel.component';
import { DatosPolizasComponent } from './components/datosPolizas/datosPolizas.component';
import { DestinyComponent } from './components/destiny/destiny.component';
import { DetailComponent } from './components/detail/detail.component';
import { ExtraComponent } from './components/extra/extra.component';
import { ExtraPolizaComponent } from './components/extraPoliza/extra-poliza.component';
import { ListCoberturaComponent } from './components/list-cobertura/list-cobertura.component';
import { LocationComponent } from './components/location/location.component';
import { ModalPlanDetailsComponent } from './components/modal-plan-details/modal-plan-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PlanComponent } from './components/plan/plan.component';
import { PlanesComponent } from './components/planes/planes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PolizaItemComponent } from './components/poliza/poliza.component';
import { PolizaPdfComponent } from './components/poliza-pdf/poliza-pdf.component';
import { RouterModule } from '@angular/router';
import { ModalService } from './components/modal-plan-details/services/modal-service';


@NgModule({
  declarations: [
    EditPolizaComponent,
    ListPolizaComponent,
    LayoutPageComponent,
    CreateComponent,
    PolizaPdfComponent,
    ListBeneficiariosComponent,
    BeneficiarioComponent,
    ModalEditBenComponent,
    ModalEditPolizaComponent,
    MultiStepComponent,
    AgesTravelerComponent,
    CoberturaComponent,
    DatesToTravelComponent,
    DatosPolizasComponent,
    DestinyComponent,
    DetailComponent,
    ExtraComponent,
    ExtraPolizaComponent,
    ListCoberturaComponent,
    LocationComponent,
    ModalPlanDetailsComponent,
    PaymentComponent,
    PlanComponent,
    PlanesComponent,
    PolizaItemComponent,
    PolizaComponent,
  ],
  imports: [
    CommonModule,
    PolizasRoutingModule,
    SharedModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    ModalService
  ]
})
export class PolizasModule { }
