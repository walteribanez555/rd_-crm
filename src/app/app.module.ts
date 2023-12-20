import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './Modules/core/Interceptors/error.interceptor';
import { SessionInterceptor } from './Modules/core/Interceptors/session.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : SessionInterceptor,
      multi : true,
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : ErrorInterceptor,
      multi : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
