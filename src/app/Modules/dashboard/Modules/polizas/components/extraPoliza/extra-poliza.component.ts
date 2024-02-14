import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';

@Component({
  selector: 'extra-poliza',
  styleUrls: ['./extra-poliza.component.css'],
  templateUrl : './extra-poliza.component.html',
})
export class ExtraPolizaComponent implements OnInit {
  ngOnInit(): void {
    this.onSelectedPlan?.subscribe({
      next: (service: ServicioUi) => {
        this.selectedService = service;
        this.daysQuantity = this.forms[1].value.quantityDays;

      },
    });


  }
  @Input() forms!: FormGroup[];


  @Output() onChangePage = new EventEmitter();
  @Output() onBackStep = new EventEmitter();

  @Input() onSelectedPlan?: Observable<ServicioUi>;

  selectedService: ServicioUi | null = null;
  daysQuantity : number = 0;

  onChangeStep() {
    this.onChangePage.emit();
  }

  onBackStepBtn() {
    this.onBackStep.emit();
  }

  onSelectedExtra(pos: number) {
    this.selectedService!.extras[pos].isSelected =
      !this.selectedService!.extras[pos].isSelected;
  }

  onSelectedMultiviaje(pos: number) {
    this.selectedService!.multiviajes[pos].isSelected =
      !this.selectedService!.multiviajes[pos].isSelected;
  }

  parseToInt( quantString : string): number{
    // console.log(quantString);
    return parseInt(quantString);
  }


}
