import { Component, Input } from '@angular/core';
import { LoadingProcessAnimation } from '../../animations/process-loading.animation';

@Component({
  selector: 'loading-process',
  templateUrl: './loading-process.component.html',
  styleUrls: ['./loading-process.component.css'],
  animations : [
    LoadingProcessAnimation
  ]
})
export class LoadingProcessComponent {


  @Input() loading : boolean = false;
  @Input() showReady : boolean = false;


}
