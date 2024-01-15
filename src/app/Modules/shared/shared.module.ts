import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
import { PopupComponent } from './Components/popup/popup.component';
import { FileDropComponent } from './Components/file-drop/file-drop.component';
import { LoadingDivComponent } from './Components/loading-div/loading-div.component';
import { LoadingProcessComponent } from './Components/loading-process/loading-process.component';
import { NumberDisplayComponent } from './Components/number-display/number-display.component';
import { SearchBoxComponent } from './Components/search-box/search-box.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenderInputComponent } from './Components/gender-input/gender-input.component';
import { CustomCalendarComponent } from './Components/custom-calendar/custom-calendar.component';
import { InputDateComponent } from './Components/input-date/input-date.component';
import { InputTelfComponent } from './Components/input-telf/input-telf.component';
import { SelectCustomComponent } from './Components/selectCustom/selectCustom.component';
import { SwitchBtnComponent } from './Components/switch_btn/switch_btn.component';
import { TagComponent } from './Components/tag/tag.component';
import { NotificationModalComponent } from './Components/notification/notification-modal.component';
import { NotificationService } from './Components/notification/notification.service';
import { LocationComponent } from './Components/location/location.component';
import { LocationRolComponent } from './Components/location-rol/location-rol.component';
import { LocationOficceComponent } from './Components/location-office/location-oficce.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { FilterComponent } from './Components/filter/filter.component';
import { CardPolizaComponent } from './Components/card-poliza/card-poliza.component';
import { ModalBeneficiarioComponent } from './Components/modals/modal-beneficiario/modal-beneficiario.component';
import { ModalBenService } from './Components/modals/modal-beneficiario/service/modal.service';
import { GeneratePdfService } from './Components/pdf/poliza-pdf/services/generate-pdf.service';
import { QRCodeModule } from 'angularx-qrcode';
import { PolizaPdfComponent } from './Components/pdf/poliza-pdf/poliza-pdf.component';
import { CardBeneficiarioComponent } from './Components/card-beneficiario/card-beneficiario.component';

@NgModule({
  declarations: [
    PopupComponent,
    FileDropComponent,
    LoadingDivComponent,
    LoadingProcessComponent,
    NumberDisplayComponent,
    SearchBoxComponent,
    CustomCalendarComponent,
    GenderInputComponent,
    InputDateComponent,
    InputTelfComponent,
    SelectCustomComponent,
    SwitchBtnComponent,
    TagComponent,
    NotificationModalComponent,
    LocationComponent,
    LocationRolComponent,
    LocationOficceComponent,
    FilterComponent,
    CardPolizaComponent,
    CardBeneficiarioComponent,
    ModalBeneficiarioComponent,
    PolizaPdfComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    SlicePipe,
    RouterModule,
    CurrencyPipe,
    QRCodeModule,
    CoreModule,
  ],
  exports: [
    PopupComponent,
    FileDropComponent,
    LoadingDivComponent,
    LoadingProcessComponent,
    NumberDisplayComponent,
    SearchBoxComponent,
    CustomCalendarComponent,
    GenderInputComponent,
    InputDateComponent,
    InputTelfComponent,
    SelectCustomComponent,
    SwitchBtnComponent,
    TagComponent,
    NotificationModalComponent,
    LocationComponent,
    LocationRolComponent,
    LocationOficceComponent,
    FilterComponent,
    CardPolizaComponent,
    CardBeneficiarioComponent,
    PolizaPdfComponent,
    ModalBeneficiarioComponent,
  ],
  providers: [NotificationService, ModalBenService, GeneratePdfService],
})
export class SharedModule {}
