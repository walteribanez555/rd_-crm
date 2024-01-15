import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlanUi } from 'src/app/Modules/shared/models/Plan.ui';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';
import { VentaUi } from 'src/app/Modules/shared/models/Venta.ui';
import { CountryRegion } from 'src/app/Modules/shared/utils/data/countries-region.ts/countries-region';
import { VentaMappers } from 'src/app/Modules/shared/utils/mappers/venta.mappers';

@Component({
  selector: 'detail',
  styleUrls: ['./detail.component.css'],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  ngOnInit(): void {
    this.onDetail?.subscribe({
      next: (step: number) => {
        if (step === 6) {
          this.mapData();
        }
      },
    });
  }

  @Input() forms!: FormGroup[];
  @Input() onDetail?: Observable<any>;


  @Output() onChangePage = new EventEmitter();
  @Output() onBackStep = new EventEmitter();

  destinyList: CountryRegion[] = [];
  origen? : CountryRegion

  selectedPlanesExtras: PlanUi[] = [];

  ventaMapper  = new VentaMappers();

  totalPayment = 0;
  ventaUi : VentaUi | null = null;

  onChangeStep() {
    this.forms[5].get('ventaData')?.setValue(this.ventaUi);
    this.onChangePage.emit();
  }

  onBackStepBtn() {
    this.onBackStep.emit();
  }

  mapData() {
    this.origen = this.forms['0'].get('fromLocation')?.value as CountryRegion;
    this.destinyList = this.forms[0].get('toLocation')?.value as CountryRegion[];
    this.selectedPlanesExtras = (
      this.forms[3].get('planSelected')?.value as ServicioUi
    ).extras.filter((extra) => extra.isSelected);
    this.selectedPlanesExtras.forEach((planExtra) => {
      planExtra.costo =
        (planExtra.incremento *
          (this.forms[3].get('planSelected')?.value as ServicioUi)
            .precioSelected!) /
        100;
    });

    const adultQuantity : number = this.forms[2].get('adultQuantity')?.value;
    const seniorQuantity : number = this.forms[2].get('seniorQuantity')?.value;



    this.ventaUi = this.ventaMapper.mapVenta((this.forms[3].get('planSelected')?.value as ServicioUi), adultQuantity > 0 ? adultQuantity : seniorQuantity, 0);

    console.log(this.ventaUi);




    const totalExtras = this.selectedPlanesExtras.reduce(
      (accum, actualValue) => accum + actualValue.costo!,
      0
    );





    this.totalPayment =
      totalExtras +
      (this.forms[3].get('planSelected')?.value as ServicioUi).precioSelected!;
  }
}
