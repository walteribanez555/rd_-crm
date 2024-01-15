import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutPageComponent } from './Pages/layout-page/layout-page.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CoreModule } from '../core/core.module';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    AdminComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    AuthModule,
  ]
})
export class DashboardModule { }
