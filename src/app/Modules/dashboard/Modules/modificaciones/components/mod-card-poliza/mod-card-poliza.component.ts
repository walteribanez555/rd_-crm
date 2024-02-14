import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';

@Component({
  selector: 'mod-card-poliza',
  templateUrl: './mod-card-poliza.component.html',
  styleUrls: ['./mod-card-poliza.component.css'],
})
export class ModCardPolizaComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.poliza);
  }
  @Input() poliza!: Poliza;



  getStatusPoliza(state: number) {
    switch (state) {
      case 1:
        return "proceso"
      case 2:
        return "espera"
      case 3:
        return "activa"
      case 4:
        return "congelada"
      case 5:
        return "reembolso"
      case 6:
        return "anulada"
      default :
        return "vencida"
    }
  }
}
