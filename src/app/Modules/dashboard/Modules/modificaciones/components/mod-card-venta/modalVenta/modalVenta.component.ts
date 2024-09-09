import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';

@Component({
  selector: 'app-modal-venta',
  templateUrl : './modalVenta.component.html',
  styleUrls: ['./modalVenta.component.css'],
})
export class ModalVentaComponent {
  ngOnInit(): void {
    this.formPoliza = new FormGroup({
      total_pago : new FormControl(this.venta.total_pago, [Validators.required]),
      descuento : new FormControl(this.venta.descuento, [Validators.required]),
    });
  }


  formPoliza? : FormGroup;


  @Input() venta! : Venta;
  @Input() poliza! : Poliza;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();


  private elementRef= inject(ElementRef);

  close() : void {
    this.elementRef.nativeElement.remove();
  }

  submit( )  : void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(this.formPoliza?.value);
  }


 }
