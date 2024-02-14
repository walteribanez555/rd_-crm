import {  Component, Input } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';

@Component({
  selector: 'mod-card-beneficiario',
  templateUrl : './mod-card-beneficiario.component.html',
  styleUrls: ['./mod-card-beneficiario.component.css'],
})
export class ModCardBeneficiarionComponent {

  @Input() beneficiario! : Beneficiario;


  mapGender(type : number){
    return type=== 1 ? "Masculino" : "Femenino";
  }

 }
