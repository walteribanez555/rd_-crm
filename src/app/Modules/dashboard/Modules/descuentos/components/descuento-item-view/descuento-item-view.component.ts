import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Descuento } from 'src/app/Modules/core/models/Descuento.model';

@Component({
  selector: 'descuento-item-view',
  templateUrl : './descuento-item-view.component.html',
  styleUrls: ['./descuento-item-view.component.css'],
})
export class DescuentoItemViewComponent {


  @Input() descuento! : Descuento;


}
