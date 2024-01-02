import {  Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanUi } from 'src/app/Modules/shared/models/Plan.ui';

@Component({
  selector: 'extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css'],
})
export class ExtraComponent {

  isSelected : boolean = false;


  @Input() plan! : PlanUi;
  @Input() indexPos! : number;



  @Output() onSelectedService = new EventEmitter<number>();


  changeState( onSelected : boolean) {
    this.isSelected = onSelected;
    this.onSelectedService.emit(this.indexPos);
  }

 }
