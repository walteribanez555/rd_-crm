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

  getStatusPoliza(state: number) {
    switch (state) {
      case 1:
        return "Proceso"
      case 2:
        return "Espera"
      case 3:
        return "Activa"
      case 4:
        return "Congelada"
      case 5:
        return "Reembolso"
      case 6:
        return "Anulada"
      default :
        return "Vencida"
    }
  }

}
