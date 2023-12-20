import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'switch',
  template: `<div class="container">
    <div class="option">
      <input type="checkbox" [id]="indexPos" [(ngModel)]="isSelected" (click)="onChangeState()" />
      <label for="{{indexPos}}" class="button"></label>
    </div>
    <span>seleccionar</span>
  </div> `,
  styleUrls: ['./switch_btn.component.css'],
})
export class SwitchBtnComponent {

  @Input() isSelected! : boolean;
  @Output() changeState = new EventEmitter<boolean>();
  @Input() indexPos! : number;

  onChangeState() {
    this.isSelected = !this.isSelected;
    this.changeState.emit(this.isSelected);
  }



}
