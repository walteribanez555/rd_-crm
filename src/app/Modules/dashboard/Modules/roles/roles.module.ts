import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { LayoutPageComponent } from './Pages/LayoutPage/LayoutPage.component';
import { AgregarRolComponent } from './Pages/agregar-rol/agregar-rol.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { CoreModule } from 'src/app/Modules/core/core.module';
import { AuthModule } from 'src/app/Modules/auth/auth.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionRolComponent, RolSelectComponent, RolStructureComponent, RolTypeComponent, RolUserComponent } from '../usuarios/components';
import { RolItemComponent } from './Components/rol-item/rol-item.component';
import { EditarRolComponent } from './Pages/editar-rol/editar-rol.component';
import { SelectRolComponent } from './Components/select-rol/select-rol.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    AgregarRolComponent,
    EditarRolComponent,
    OptionRolComponent,
    RolSelectComponent,
    RolStructureComponent,
    RolTypeComponent,
    RolUserComponent,
    RolItemComponent,
    SelectRolComponent,
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    CoreModule,
    AuthModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    SelectRolComponent,
  ]
})
export class RolesModule { }
