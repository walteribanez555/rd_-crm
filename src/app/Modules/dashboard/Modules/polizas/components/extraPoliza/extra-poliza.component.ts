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

    this.onSelectedPlan?.subscribe(
      {
        next : ( service : ServicioUi )  => {
          console.log(service);
          this.selectedService = service;
        }
      }
    )

  }


  @Output() onChangePage = new EventEmitter();
  @Output() onBackStep = new EventEmitter();


  @Input() onSelectedPlan? : Observable<ServicioUi>;

  selectedService : ServicioUi | null = null;



  onChangeStep() {
    this.onChangePage.emit();
  }

  onBackStepBtn() {
    this.onBackStep.emit();
  }

  onSelectedExtra(pos : number) {
    this.selectedService!.extras[pos].isSelected = !this.selectedService!.extras[pos].isSelected;
  }



}
