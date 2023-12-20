import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatesAction } from '../../utils/dates/dates-action';

@Component({
  selector: 'input-date',

  template: `<input
    type="text"
    [(ngModel)]="date"
    (keyup)="onDeleteWrite($event)"
    placeholder="dd-mm-yyyy"
    autocomplete="false"
  />`,
  styleUrls: ['./input-date.component.css'],
})
export class InputDateComponent  implements OnInit {
  ngOnInit(): void {
    this.date = this.dateControl?.value;
  }
  date: string | null = null;


  @Input() dateControl?: FormControl;
  @Input() ageControl?: FormControl;
  @Input() travelDate! : string;


  datesAction = new DatesAction();

  onDeleteWrite(event: any) {
    if (event.key === 'Backspace') {
      // Aquí puedes notificar al usuario que se eliminó un carácter
      return;
      // Puedes mostrar una notificación, mensaje, o realizar otra acción
    }
    if (this.date?.length === 2 || this.date?.length === 5) {
      this.date += '-';
    }

    // console.log(this.date?.split('-'));
    if (this.date!.length === 10) {
      const arrayToMap = this.date!.split('-');
      this.arraymove(arrayToMap, 0, 1);

      this.ageControl?.setValue(
        this.datesAction.yearsBetweenDates(
          arrayToMap.join('-'),
          this.travelDate
        )
      );

      this.dateControl?.setValue(this.date);
    }
  }

  arraymove(arr: string[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
}
