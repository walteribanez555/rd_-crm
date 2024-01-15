import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { PostComponent } from './Pages/post/post.component';
import { OficceComponent } from './Pages/oficce/oficce.component';
import { EditComponent } from './Pages/edit/edit.component';

const routes: Routes = [
  {
    path : 'oficinas',
    component : LandingPageComponent,
    children : [
      {
        path : 'post',
        component : PostComponent,
      },
      {
        path : ':id',
        component : OficceComponent,
      },
      {
        path : ':id/edit',
        component : EditComponent
      }

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OficinasRoutingModule { }
