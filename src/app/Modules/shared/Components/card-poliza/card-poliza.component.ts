import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';

@Component({
  selector: 'card-poliza',
  styleUrls: ['./card-poliza.component.css'],
  templateUrl : './card-poliza.component.html',
})
export class CardPolizaComponent {

  @Input() poliza! : Poliza;

  @Input() servicio! : Servicio;

  @Input() beneficiario! : Beneficiario;

  @Input() isClient : boolean =true;

}
