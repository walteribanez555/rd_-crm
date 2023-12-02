import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './Components/popup/popup.component';
import { FileDropComponent } from './Components/file-drop/file-drop.component';
import { LoadingDivComponent } from './Components/loading-div/loading-div.component';
import { LoadingProcessComponent } from './Components/loading-process/loading-process.component';
import { NumberDisplayComponent } from './Components/number-display/number-display.component';
import { SearchBoxComponent } from './Components/search-box/search-box.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PopupComponent,
    FileDropComponent,
    LoadingDivComponent,
    LoadingProcessComponent,
    NumberDisplayComponent,
    SearchBoxComponent,

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
  ]
})
export class SharedModule { }
