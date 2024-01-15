import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UserComponent } from './pages/user/user.component';
import { TreeModule } from '@odymaui/angular-tree-component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  OptionUserComponent,
  TypeUserComponent,
} from './components';
import { UserFormDataComponent } from './components/user-form-data/user-form-data.component';
import { DetailFormDataComponent } from './components/detail-form-data/detail-form-data.component';
import { RolFormDataComponent } from './components/rol-form-data/rol-form-data.component';
import { ItemUserComponent } from './components/item-user/item-user.component';
import { OficinasModule } from '../oficinas/oficinas.module';
import { RolesModule } from '../roles/roles.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateUserComponent,
    LayoutPageComponent,
    UserComponent,
    OptionUserComponent,
    TypeUserComponent,
    UserFormDataComponent,
    DetailFormDataComponent,
    RolFormDataComponent,
    ItemUserComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    TreeModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TreeModule,
    OficinasModule,
    RolesModule,
    RouterModule,
  ],
})
export class UsuariosModule {}
