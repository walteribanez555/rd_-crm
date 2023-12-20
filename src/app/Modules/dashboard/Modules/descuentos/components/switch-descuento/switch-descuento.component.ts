import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'switch-descuento',
  templateUrl : './switch-descuento.component.html',
  styleUrls: ['./switch-descuento.component.css'],
})
export class SwitchDescuentoComponent {


  @Input() typeDesc! : FormControl;
  ngOnInit(): void {
    if(this.typeDesc.value === null){
      this.typeDesc.setValue(1);
    }


    if(this.typeDesc.value === 1){
      this.porcentaje= true;
    }


    if(this.typeDesc.value === 2){
      this.absoluto = true;
    }

  }


  porcentaje: boolean = false;
  absoluto: boolean = false;



  onSelect(type : number){
    type === 1 ? this.absoluto = false : this.porcentaje = false;
    this.typeDesc.setValue(type);

  }





}
