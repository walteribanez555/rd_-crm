import { Component, Input } from '@angular/core';
import { FadeInOut } from '../../animations/fadeInOut.animation';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    FadeInOut
  ]
})
export class PopupComponent {

  
  @Input() message: string ="";
  @Input() duration : number =0;
  show = false;

  showPopup() {
    
    this.show = true;

    setTimeout(() => {
      this.hidePopup();
    }, this.duration);
  }

  hidePopup() {
    this.show = false;
  }





}


