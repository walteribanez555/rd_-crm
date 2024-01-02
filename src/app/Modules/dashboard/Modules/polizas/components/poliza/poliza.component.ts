import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  @Input() polizaForm! : FormGroup;
  @Input() finalDate! : string;

  sexoInput :FormControl | null = null;
  telfInput : FormControl | null = null;
  ageInput : FormControl | null = null;
  dateBirth : FormControl | null = null;
  origenInput : FormControl | null = null;

  onSelectDestiny( event : any ) {
    this.origenInput!.setValue(event);
  }


}
