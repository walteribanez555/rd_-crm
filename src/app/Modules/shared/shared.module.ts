import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    NotificationModalComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    NotificationModalComponent
  ],
  providers : [
    NotificationService,
  ]
})
export class SharedModule { }
