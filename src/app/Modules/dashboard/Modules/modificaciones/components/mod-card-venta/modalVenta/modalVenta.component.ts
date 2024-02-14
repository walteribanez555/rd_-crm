import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { Venta } from 'src/app/Modules/core/models/Venta.model';

@Component({
  selector: 'app-modal-venta',
  templateUrl : './modalVenta.component.html',
  styleUrls: ['./modalVenta.component.css'],
})
export class ModalVentaComponent {
  ngOnInit(): void {
    console.log(this.venta);
  }


  @Input() venta! : Venta;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();


  private elementRef= inject(ElementRef);

  close() : void {
    this.elementRef.nativeElement.remove();
  }

  submit( )  : void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(this.venta);
  }


 }
