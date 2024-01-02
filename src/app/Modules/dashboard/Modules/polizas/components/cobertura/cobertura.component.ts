import { Component, Input } from '@angular/core';
import { CatalogoUi } from 'src/app/Modules/shared/models/Catalogo.ui';

@Component({
  selector: 'cobertura',
  template: `
    <div class="item">
      <div class="title">
        <i class="fa-solid fa-circle-info fa-xs"></i>
        <span>{{catalogoUi!.etiqueta}}</span>
      </div>
      <hr />


      <div class="sub-item"  *ngFor="let beneficio of catalogoUi!.beneficios">
        <div class="tipe">
          <span>{{beneficio.descripcion}}</span>
        </div>
        <div class="tipe-state">
          <span>INCLUIDO</span>
        </div>
        <hr />
      </div>

    </div>
  `,
  styleUrls: ['./cobertura.component.css'],
})
export class CoberturaComponent {

  @Input() catalogoUi! : CatalogoUi | null;

}
