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
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingPageComponent,
    PostComponent,
    ListOficcesComponent,
    EditComponent,
    OficceComponent
  ],
  imports: [
    CommonModule,
    OficinasRoutingModule,
    TreeModule,
    RouterModule,
    ReactiveFormsModule,


  ]
})
export class OficinasModule { }
