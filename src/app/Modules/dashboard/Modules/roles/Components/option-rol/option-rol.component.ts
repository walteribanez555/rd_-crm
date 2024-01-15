import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RolForm } from '../../../usuarios/interfaces/RolForm.interface';

@Component({
  selector: 'option-rol',
  templateUrl: './option-rol.component.html',
  styleUrls: ['./option-rol.component.css']
})
export class OptionRolComponent {

  @Input() option! : string;
  @Input() rol ! : RolForm;
  @Output() toggleOption = new EventEmitter();

  isChecked: boolean = false;





  onCheckBoxChange(){
    this.toggleOption.emit({action : this.option, area:  this.rol.area , toAdd : this.isChecked});
  }




}
