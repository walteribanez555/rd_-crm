import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Venta } from 'src/app/Modules/core/models/Venta.model';

@Component({
  selector: 'mod-card-venta',
  templateUrl : './mod-card-venta.component.html',
  styleUrls: ['./mod-card-venta.component.css'],
})
export class ModCardVentaComponent {


  @Input() venta! : Venta;

}
