import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiniestrosRoutingModule } from './siniestros-routing.module';
import { ListSiniestrosComponent } from './pages/list-siniestros/list-siniestros.component';
import { SiniestroComponent } from './pages/siniestro/siniestro.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CoreModule } from 'src/app/Modules/core/core.module';
import { AuthModule } from 'src/app/Modules/auth/auth.module';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { ChatComponent } from './components/chat/chat.component';
import { InputTypeSiniestroComponent } from './components/inputTypeSiniestro/inputTypeSiniestro.component';
import { MessageComponent } from './components/message/message.component';
import { SiniestroDetailsComponent } from './components/siniestro-details/siniestro-details.component';
import { ScrollToBottomDirective } from './directives/ScrollToBottomDirective.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImagesService } from './services/images.service';


@NgModule({
  declarations: [
    ListSiniestrosComponent,
    SiniestroComponent,
    LayoutPageComponent,
    InputTypeSiniestroComponent,
    SiniestroDetailsComponent,
    ChatComponent,
    MessageComponent,
    ScrollToBottomDirective,
  ],
  imports: [
    CommonModule,
    SiniestrosRoutingModule,
    CoreModule,
    AuthModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ImagesService,
  ]
})
export class SiniestrosModule { }
