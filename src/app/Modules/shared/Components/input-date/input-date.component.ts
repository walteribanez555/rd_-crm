import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatesAction } from '../../utils/dates/dates-action';
import { ServicioUi } from '../../models/Servicio.ui';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';

@Component({
  selector: 'input-date',

  template: `<div class="input-date">
    <!-- <input
      type="text"
      [(ngModel)]="date"
      (keyup)="onDeleteWrite($event)"
      placeholder="dd-mm-yyyy"
      autocomplete="false"
    /> -->
    <div class="details-input" [class.error]="isNotValidDate">
      <div class="age-detail" *ngIf="ages">
        <span>Edad</span>
        <span>{{ ages }}</span>
      </div>
      <span *ngIf="isNotValidDate">
        No esta en el rango de {{ servicio!.edad_base }} -
        {{ servicio!.edad_limite }}
      </span>
    </div>
  </div>`,
  styleUrls: ['./input-date.component.css'],
})
export class InputDateComponent implements OnInit {
  ngOnInit(): void {
    if(this.dateControl?.value){
      this.date = DatesAction.invert_date(this.dateControl.value as string);
    }
    if(this.ageControl?.value){
      this.date = DatesAction.invert_date(this.ageControl.value as string);
    }

    this.isActionValid();
  }
  date: string | null = null;

  @Input() dateControl?: FormControl;
  @Input() ageControl?: FormControl;
  @Input() travelDate?: string;
  @Input() servicio?: Servicio;

  ages: number | null = null;
  isNotValidDate: boolean = false;

  @Output() onSetValidDate = new EventEmitter();

  private cdr = inject(ChangeDetectorRef);

  datesAction = new DatesAction();

  onDeleteWrite(event: any) {
    if (event.key === 'Backspace') {
      // Aquí puedes notificar al usuario que se eliminó un carácter
      return;
      // Puedes mostrar una notificación, mensaje, o realizar otra acción
    }
    if (this.date?.length === 2 || this.date?.length === 5) {
      this.date += '-';
      this.cdr.detectChanges();

    }

    this.isActionValid();

    // console.log(this.date?.split('-'));

  }

  isActionValid(){
    if (this.date?.length === 10) {
      const arrayToMap = this.date!.split('-');
      this.arraymove(arrayToMap, 0, 1);

      this.ages = this.datesAction.yearsBetweenDates(
        arrayToMap.join('-'),
        this.travelDate!
      ) -1;




      if (this.servicio) {

        if (
          this.ages! >= this.servicio.edad_limite ||
          this.ages! < this.servicio.edad_base
        ) {


          this.isNotValidDate = true;

          this.onSetValidDate.emit(null);
          this.dateControl?.setValue(null);
          this.cdr.detectChanges();

          return;
        } else {
          this.isNotValidDate = false;

          this.ageControl?.setValue(
            this.datesAction.yearsBetweenDates(
              arrayToMap.join('-'),
              this.travelDate!
            )
          );

          this.onSetValidDate.emit(this.date);
          this.dateControl?.setValue(this.date);
          this.cdr.detectChanges();

          return;
        }
      } else {
        this.onSetValidDate.emit(this.date);
        this.dateControl?.setValue(this.date);

      }
    }

  }

  arraymove(arr: string[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
}
