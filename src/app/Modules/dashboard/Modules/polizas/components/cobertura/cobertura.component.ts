import { Component, Input } from '@angular/core';
import { CatalogoUi } from 'src/app/Modules/shared/models/Catalogo.ui';

@Component({
  selector: 'cobertura',
  template: `
    <div class="item">
      <div class="title" *ngIf="catalogoUi?.valor != 4">
        <i class="fa-solid fa-circle-info fa-xs"></i>
        <span>{{ catalogoUi!.etiqueta }}</span>
      </div>
      <hr *ngIf="catalogoUi?.valor != 4" />
      <div class="sub-item" *ngFor="let beneficio of catalogoUi!.beneficios">
        <div class="data" *ngIf="beneficio.plan">
          <span *ngIf="beneficio.plan[0].cobertura != null; else incluye">{{
            beneficio.plan[0].cobertura
              | currency : 'USD' : '$' : '1.2-2'
              | uppercase
          }}</span>

          <ng-template #incluye>
            <span *ngIf="beneficio.plan[0].complemento == '1'; else noIncluye"
              >Incluye</span
            >

            <ng-template #noIncluye>
              <span *ngIf="beneficio.plan[0].complemento == '3'"> TKT </span>

              <span *ngIf="beneficio.plan[0].complemento == '2'"
                >No incluye</span
              >
            </ng-template>
          </ng-template>
        </div>
        <div class="cats">
          <span>{{ beneficio.descripcion }}</span>
        </div>
        <hr />
      </div>
    </div>
  `,
  styleUrls: ['./cobertura.component.css'],
})
export class CoberturaComponent {
  @Input() catalogoUi!: CatalogoUi;
}
