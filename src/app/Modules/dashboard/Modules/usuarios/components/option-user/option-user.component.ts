import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypeUser } from '../../interfaces/TypeUser.interface';

@Component({
  selector: 'option-user',
  templateUrl: './option-user.component.html',
  styleUrls: ['./option-user.component.css']
})
export class OptionUserComponent {
  @Input() option! : TypeUser;
  @Output() toggleOption = new EventEmitter();






  onCheckBoxChange(){
    this.toggleOption.emit(this.option);
  }
}
