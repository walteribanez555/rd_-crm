import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'switch',
  template: `<div class="container">
  <div class="option">
    <input
      *ngIf="!isItemExtra; else extraTemplate"
      type="checkbox"
      [id]="indexPos"
      [(ngModel)]="isSelected"
      (click)="onChangeState()"
    />
    <label *ngIf="!isItemExtra" for="{{ indexPos }}" class="button"></label>

    <ng-template #extraTemplate>
      <input
        type="checkbox"
        [id]="indexPos + '-multi'"
        [(ngModel)]="isSelected"
        (click)="onChangeState()"
      />
    <label  for="{{ indexPos+ '-multi' }}" class="button"></label>

    </ng-template>

  </div>
  <span>seleccionar</span>
</div> `,
  styleUrls: ['./switch_btn.component.css'],
})
export class SwitchBtnComponent {

  @Input() isSelected!: boolean;
  @Output() changeState = new EventEmitter<boolean>();
  @Input() indexPos!: number;
  @Input() isItemExtra: boolean = false;

  onChangeState() {
    this.isSelected = !this.isSelected;
    this.changeState.emit(this.isSelected);
  }



}
