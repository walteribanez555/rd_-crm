import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';
import { DatesAction } from 'src/app/Modules/shared/utils/dates/dates-action';

@Component({
  selector: 'poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css'],
})
export class PolizaItemComponent implements OnInit {
  ngOnInit(): void {
    this.sexoInput = this.polizaForm.get('sexo') as FormControl;
    this.telfInput = this.polizaForm.get('telf') as FormControl;
    this.ageInput = this.polizaForm.get('edad') as FormControl;
    this.dateBirth = this.polizaForm.get('date') as FormControl;
    this.origenInput = this.polizaForm.get('origen') as FormControl;
  }


  isNotValidDate = false;
  edad = 0;

  datesAction = new DatesAction();

  onChangeDate(event : any) {
    // console.log(event.target.value);
    // console.log(event.target.value);
    const birthday  = event.target.value;



    this.edad = this.datesAction.yearsBetweenDates(birthday,this.finalDate );
    // console.log(this.edad);

    if(this.edad > this.limitAge || this.edad < this.servicio.edad_base){
      this.isNotValidDate= true;
      return;
    }

    this.isNotValidDate = false;

    // console.log(birthday);

    this.polizaForm.get('edad')?.setValue(this.edad);


  }

  @Input() polizaForm! : FormGroup;
  @Input() finalDate! : string;
  @Input() servicio! : ServicioUi;
  @Input() limitAge! : number;

  sexoInput :FormControl | null = null;
  telfInput : FormControl | null = null;
  ageInput : FormControl | null = null;
  dateBirth : FormControl | null = null;
  origenInput : FormControl | null = null;

  onSelectDestiny( event : any ) {
    this.origenInput!.setValue(event);
  }


}
