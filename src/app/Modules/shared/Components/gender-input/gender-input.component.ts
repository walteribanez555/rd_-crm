import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gender-input',
  template: `
    <div class="container">
      <div class="item">
        <input type="checkbox" name="masculino" [(ngModel)]="masculino" (change)="onSelect(1)" />
        <label for="masculino">Masculino</label>
      </div>
      <div class="item">
        <input type="checkbox" name="femenino" [(ngModel)]="femenino"  (change)="onSelect(2)" />
        <label for="femenino">Femenino</label>
      </div>
    </div>
  `,
  styleUrls: ['./gender-input.component.css'],
})
export class GenderInputComponent implements OnInit {
  ngOnInit(): void {
    this.genderControl.setValue(1);
  }
  masculino: boolean = true;
  femenino: boolean = false;


  @Input() genderControl! : FormControl;


  onSelect(type : number){
    type === 1 ? this.femenino = false : this.masculino = false;
    this.genderControl.setValue(type);



  }

}
