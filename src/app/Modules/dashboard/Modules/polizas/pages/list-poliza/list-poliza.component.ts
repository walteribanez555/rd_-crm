import { Component } from '@angular/core';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';

@Component({
  templateUrl: './list-poliza.component.html',
  styleUrls: ['./list-poliza.component.css'],
  animations : [
    loadingAnimation
  ]
})
export class ListPolizaComponent {

}
