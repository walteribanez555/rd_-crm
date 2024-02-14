import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Catalogo } from 'src/app/Modules/core/models/Catalogo.model';

@Component({
  selector: 'multiviaje',
  templateUrl: './multiviaje.component.html',
  styleUrls: ['./multiviaje.component.css'],
})
export class MultiviajeComponent {

  isSelected : boolean = false;


  @Input() Catalogo! : Catalogo;
  @Input() indexPos! : number;



  @Output() onSelectedService = new EventEmitter<number>();


  changeState( onSelected : boolean) {
    this.isSelected = onSelected;
    this.onSelectedService.emit(this.indexPos);
  }

 }
