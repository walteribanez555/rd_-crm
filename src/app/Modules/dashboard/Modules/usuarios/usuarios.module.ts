import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UserComponent } from './pages/user/user.component';
import { TreeModule } from '@odymaui/angular-tree-component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { AgregarRolComponent } from './pages/agregar-rol/agregar-rol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  OptionRolComponent,
  OptionUserComponent,
  RolSelectComponent,
  RolStructureComponent,
  RolTypeComponent,
  RolUserComponent,
  TypeUserComponent,
} from './components';
import { UserFormDataComponent } from './components/user-form-data/user-form-data.component';
import { RolFormDataComponent } from './components/rol-form-data/rol-form-data.component';
import { DetailFormDataComponent } from './components/detail-form-data/detail-form-data.component';

@NgModule({
  declarations: [
    CreateUserComponent,
    ListUserComponent,
    EditUserComponent,
    LayoutPageComponent,
    UserComponent,
    AgregarRolComponent,
    OptionRolComponent,
    OptionUserComponent,
    RolSelectComponent,
    RolStructureComponent,
    RolTypeComponent,
    RolUserComponent,
    TypeUserComponent,
    UserFormDataComponent,
    RolFormDataComponent,
    DetailFormDataComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    TreeModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UsuariosModule {}
