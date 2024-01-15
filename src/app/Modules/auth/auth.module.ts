import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './Pages/login/login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from './Services/session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers : [
    SessionService,
  ]
})
export class AuthModule { }
