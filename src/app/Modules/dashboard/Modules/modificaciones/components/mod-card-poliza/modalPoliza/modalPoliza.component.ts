import {  ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/Modules/auth/Services/session.service';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { countriesRegion } from 'src/app/Modules/shared/utils/data/countries-region.ts/countries-region';

@Component({
  templateUrl : './modalPoliza.component.html',
  styleUrls: ['./modalPoliza.component.css'],
})
export class ModalPolizaComponent implements OnInit {

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {

    this.formPoliza = new FormGroup({
      fecha_salida : new FormControl(this.poliza.fecha_salida, [Validators.required]),
      fecha_retorno : new FormControl(this.poliza.fecha_retorno, [Validators.required]),
      dias : new FormControl(this.poliza.nro_dias, [Validators.required]),
      destino : new FormControl(this.poliza.destino , [Validators.required]),
      observaciones : new FormControl(null, [Validators.required]),
      username : new FormControl(this.sessionService.getUser(), [Validators.required]),
      fecha_caducidad : new FormControl(this.poliza.fecha_caducidad.split('T')[0],[Validators.required]),
    })

    this.cdr.detectChanges();


  }


  private sessionService = inject(SessionService);



  getDifference(  ){
    const initialDateString = this.formPoliza?.get('fecha_salida')?.value;

    const finalDateString = this.formPoliza?.get('fecha_retorno')?.value;

    const initialDate = new Date(initialDateString);
    const finalDate = new Date(finalDateString);


    const timeDifference = finalDate.getTime() - initialDate.getTime();
    const daysDiff = Math.floor(timeDifference / (1000 * 3600 * 24));
    this.formPoliza?.get('dias')?.setValue(daysDiff +1);
    this.cdr.detectChanges();
  }


  formPoliza? : FormGroup;


  @Input() poliza! : Poliza;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();


  destinies = countriesRegion.map( countryRegion => countryRegion.country.toLocaleUpperCase());



  private elementRef= inject(ElementRef);

  close() : void {
    this.elementRef.nativeElement.remove();
  }

  submit( )  : void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(this.formPoliza?.value);
  }


 }
