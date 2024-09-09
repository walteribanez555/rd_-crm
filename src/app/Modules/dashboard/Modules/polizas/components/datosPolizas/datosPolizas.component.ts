import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';
import { BeneficiarioUi } from '../../../../../shared/models/Beneficiario.ui';
import { CountryRegion } from 'src/app/Modules/shared/utils/data/countries-region.ts/countries-region';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';

@Component({
  selector: 'datos-polizas',
  templateUrl: './datosPolizas.component.html',
  styleUrls: ['./datosPolizas.component.css'],
})
export class DatosPolizasComponent implements OnInit {
  private notificationService = inject(NotificationService);

  planSelected: ServicioUi | null = null;

  ngOnInit(): void {

    this.onPageChanged?.subscribe({
      next: (step: number) => {
        if (step === 7) {
          this.mapData();
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  @Output() onChangePage = new EventEmitter();
  @Output() onBackStep = new EventEmitter();

  @Input() onPageChanged?: Observable<any>;
  @Input() forms!: FormGroup[];
  travelDate: string | null = null;
  ageGroupLimit: number[] = [];

  Quantity: number = 0;

  polizasForm: FormGroup[] = [];

  listBeneficiarios: BeneficiarioUi[] = [];

  createPolizaForm(): FormGroup {
    const newPoliza = new FormGroup({
      nombres: new FormControl(null, [Validators.required]),
      apellidos: new FormControl(null, [Validators.required]),
      iden: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      telf: new FormControl(''),
      sexo: new FormControl(null, [Validators.required]),
      edad: new FormControl(null, [Validators.required]),
      titular: new FormControl(false, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      origen: new FormControl(null, [Validators.required]),
    });
    return newPoliza;
  }

  onChangeStep() {
    this.setBeneficiarios();

    this.onChangePage.emit();
  }

  onBackStepBtn() {
    this.onBackStep.emit();
  }

  mapData() {
    if (this.polizasForm.length > 0) {
      return;
    }

    this.polizasForm = [];

    const youngQuantity: number = this.forms[2].get('youngQuantity')?.value;
    const adultQuantity: number = this.forms[2].get('adultQuantity')?.value;
    const seniorQuantity: number = this.forms[2].get('seniorQuantity')?.value;

    this.planSelected = this.forms[3].get('planSelected')?.value;

    this.travelDate = this.forms[1].get('finalDate')?.value;

    if (adultQuantity > 0 || youngQuantity > 0) {
      this.Quantity = adultQuantity + youngQuantity;
    }

    if (seniorQuantity > 0) {
      this.Quantity = seniorQuantity;
    }

    // this.ageGroupLimit.concat(Array(youngQuantity).fill(13) as number[]);
    this.ageGroupLimit = [...this.ageGroupLimit, ...Array(adultQuantity).fill(70) as number[]]
    this.ageGroupLimit = [...this.ageGroupLimit, ...Array(seniorQuantity).fill(85) as number[]]
    this.ageGroupLimit = [...this.ageGroupLimit, ...Array(youngQuantity).fill(13) as number[]]


    console.log(this.ageGroupLimit);

    // this.generateAgeGroupLimit();

    for (let newForm = 0; newForm < this.Quantity; newForm++) {
      this.polizasForm.push(this.createPolizaForm());
    }

    this.polizasForm[0].get('titular')?.setValue(true);
  }

  setBeneficiarios() {
    // console.log(this.polizasForm);

    if (!this.polizasForm.every((polizaform) => polizaform.valid)) {
      return;
    }

    this.listBeneficiarios = [];

    this.polizasForm.forEach((polizaForm) => {
      const {
        nombres,
        apellidos,
        edad,
        email,
        iden,
        telf,
        sexo,
        titular,
        date,
        origen,
      } = polizaForm.value;

      const nuevaBeneficiario: BeneficiarioUi = {
        primer_nombre: nombres,
        segundo_nombre: '0',
        primer_apellido: apellidos,
        segundo_apellido: '0',
        email: email,
        fecha_nacimiento: date,
        nro_identificacion: iden,
        telefono: telf,
        sexo: sexo,
        edad: edad,
        isTitular: titular,
        origen: origen,
      };

      this.listBeneficiarios.push(nuevaBeneficiario);
    });

    this.forms[6].get('beneficiariosData')?.setValue(this.listBeneficiarios);
  }
}
