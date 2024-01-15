import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RolForm } from '../../../usuarios/interfaces/RolForm.interface';

@Component({
  selector: 'rol-type',
  templateUrl: './rol-type.component.html',
  styleUrls: ['./rol-type.component.css']
})
export class RolTypeComponent {

  @Input() rol! : RolForm;
  @Output() updateList = new EventEmitter();



  onChangeOption(data : any){
    this.updateList.emit(data);
  }







}
