import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Servicio } from 'src/app/Modules/core/models/Servicio.model';
import { countriesRegion } from 'src/app/Modules/shared/utils/data/countries-region.ts/countries-region';

@Component({
  templateUrl : './modalBeneficiario.component.html',
  styleUrls: ['./modalBeneficiario.component.css'],
})
export class ModalBeneficiarioComponent  implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.beneficiarioForm = new FormGroup({
      primer_nombre : new FormControl(this.beneficiario.primer_nombre, [Validators.required]),
      primer_apellido : new FormControl(this.beneficiario.primer_apellido,[Validators.required]),
      fecha_nacimiento : new FormControl(this.beneficiario.fecha_nacimiento, [Validators.required]),
      sexo : new FormControl(this.beneficiario.sexo, [Validators.required]),
      origen : new FormControl(this.beneficiario.origen, [Validators.required]),
      email : new FormControl(this.beneficiario.email, [Validators.required]),
      telefono : new FormControl(this.beneficiario.telefono, [Validators.required]),
      nro_identificacion : new FormControl(this.beneficiario.nro_identificacion,[Validators.required]),
    })



   this.sexoFormControl =  this.beneficiarioForm.get('sexo') as FormControl;
   this.ageFormControl = this.beneficiarioForm.get('fecha_nacimiento') as FormControl;

   this.cdr.detectChanges();

  }


  ageFormControl? : FormControl<any>;
  sexoFormControl? : FormControl<any>;

  beneficiarioForm? : FormGroup;

  destinies = countriesRegion.map( countryRegion => countryRegion.country.toLocaleUpperCase());



  @Input() beneficiario! : Beneficiario;
  @Input() travelDate! : string;
  @Input() servicio! :Servicio;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();


  private elementRef= inject(ElementRef);

  close() : void {
    this.elementRef.nativeElement.remove();
  }

  submit( )  : void {




    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(this.beneficiarioForm?.value);
  }


 }
