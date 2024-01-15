import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './Modules/core/Interceptors/error.interceptor';
import { SessionInterceptor } from './Modules/core/Interceptors/session.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './Modules/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
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
