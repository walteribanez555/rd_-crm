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
import { PolizaPdfComponent } from './components/poliza-pdf/poliza-pdf.component';
import { ListBeneficiariosComponent } from './components/list-beneficiarios/list-beneficiarios.component';
import { BeneficiarioComponent } from './components/beneficiario/beneficiario.component';
import { ModalEditBenComponent } from './components/modal-edit-ben/modal-edit-ben.component';
import { ModalEditPolizaComponent } from './components/modal-edit-poliza/modal-edit-poliza.component';


@NgModule({
  declarations: [
    EditPolizaComponent,
    PolizaComponent,
    ListPolizaComponent,
    LayoutPageComponent,
    CreateComponent,
    PolizaPdfComponent,
    ListBeneficiariosComponent,
    BeneficiarioComponent,
    ModalEditBenComponent,
    ModalEditPolizaComponent,
  ],
  imports: [
    CommonModule,
    PolizasRoutingModule,
    SharedModule,
    QRCodeModule,
  ]
})
export class PolizasModule { }
