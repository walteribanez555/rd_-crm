import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';

@Component({
  selector: 'list-cobertura',
  template: `
    <div class="list-cobertura">
      <cobertura *ngFor="let catalogoUi of servicioUi.catalogos" [catalogoUi]="catalogoUi"></cobertura>
    </div>

  `,
  styleUrls: ['./list-cobertura.component.css'],
})
export class ListCoberturaComponent {
  @Input() servicioUi! : ServicioUi;


 }
