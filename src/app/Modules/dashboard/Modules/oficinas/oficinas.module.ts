import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OficinasRoutingModule } from './oficinas-routing.module';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { PostComponent } from './Pages/post/post.component';
import { ListOficcesComponent } from './Components/list-oficces/list-oficces.component';
import { TreeModule } from '@odymaui/angular-tree-component';
import { RouterModule } from '@angular/router';
import { EditComponent } from './Pages/edit/edit.component';
import { OficceComponent } from './Pages/oficce/oficce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { CoreModule } from 'src/app/Modules/core/core.module';
import { AuthModule } from 'src/app/Modules/auth/auth.module';
import { SelectOfficeComponent } from './Components/select-office/select-office.component';
import { OfficeSelectorModalService } from '../my-office/utils/office-selector-modal/services/office-selector-modal.service';


@NgModule({
  declarations: [
    LandingPageComponent,
    PostComponent,
    ListOficcesComponent,
    EditComponent,
    OficceComponent,
    SelectOfficeComponent,
  ],
  imports: [
    CommonModule,
    OficinasRoutingModule,
    TreeModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AuthModule,
    FormsModule,
  ],
  providers : [
    OfficeSelectorModalService,
  ],

  exports: [
    SelectOfficeComponent,
  ]
})
export class OficinasModule { }
