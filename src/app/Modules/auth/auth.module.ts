import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { LoginComponent } from './Pages/login/login.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
