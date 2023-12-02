import { Component, Input } from '@angular/core';

@Component({
  selector: 'beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent {

  @Input() actualChild! : string | null ;


  onEditModal : boolean = false;
  onShowPdf : boolean = false;



}
