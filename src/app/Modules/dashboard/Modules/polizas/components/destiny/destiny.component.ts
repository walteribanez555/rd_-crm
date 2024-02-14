import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import {
  PositionMessage,
  Size,
  TypeMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { DatesAction } from 'src/app/Modules/shared/utils/dates/dates-action';

@Component({
  selector: 'destiny',
  // template: `<p>destiny works!</p>`,
  templateUrl: './destiny.component.html',
  styleUrls: ['./destiny.component.css'],
})
export class DestinyComponent implements OnInit {
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.initialDate = this.datesForm.get('initialDate') as FormControl;
    this.finalDate = this.datesForm.get('finalDate') as FormControl;
    this.quantityDays = this.datesForm.get('quantityDays') as FormControl;
  }

  @Output() onChangePage = new EventEmitter();
  @Output() onBackStep = new EventEmitter();

  @Input() datesForm!: FormGroup;

  initialDate?: FormControl;
  finalDate?: FormControl;
  quantityDays?: FormControl;

  datesActions = new DatesAction();

  onChangeStep() {
    this.onChangePage.emit();
  }

  onBackStepBtn() {
    this.onBackStep.emit();
  }

  setInitialDate(date: string) {

    if (!date || isNaN(new Date(date).getTime())) {
      this.onError('Fecha inválida');
      return;
    }

    const actualDate = new Date();
    const selectedDate = new Date(date);

    actualDate.setDate(actualDate.getDate() - 1);

    if (!(selectedDate >= actualDate)) {
      this.onError('La fecha no puede ser menor a la actual');
      return;
    }

    this.initialDate?.setValue(date);

    if (this.initialDate?.valid && this.finalDate?.valid) {
      const initialDateObj = new Date(this.initialDate.value);
      const finalDateObj = new Date(this.finalDate.value);

      initialDateObj.setDate(initialDateObj.getDate() + 4);

      if (initialDateObj > finalDateObj) {
        this.onError(
          'La diferencia entre la fecha inicial y la fecha final debe ser mayor por 4 dias'
        );
        return;
      }

      this.quantityDays?.setValue(
        this.datesActions.quantityBetweenDates(
          this.initialDate.value as string,
          this.finalDate.value as string
        )
      );
    }
  }

  setFinalDate(date: string) {
    this.finalDate?.setValue(date);

    if (this.initialDate?.valid && this.finalDate?.valid) {
      const initialDateObj = new Date(this.initialDate.value);
      const finalDateObj = new Date(this.finalDate.value);

      initialDateObj.setDate(initialDateObj.getDate() + 4);

      if (initialDateObj > finalDateObj) {
        this.onError(
          'La diferencia entre la fecha inicial y la fecha final debe ser mayor por 4 dias'
        );
        return;
      }

      this.quantityDays?.setValue(
        this.datesActions.quantityBetweenDates(
          this.initialDate.value as string,
          this.finalDate.value as string
        )
      );
    }
  }

  onError(message: string) {
    this.notificationService.show(message, {
      size: Size.normal,
      duration: 3000,
      imageUrl: TypeMessage.error,
      positions: [PositionMessage.center],
      closeOnTouch: true,
    });
  }
}
