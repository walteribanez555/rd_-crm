import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';

@Component({
  selector: 'modal-plan-details',
  templateUrl : './modal-plan-details.component.html',
  styleUrls: ['./modal-plan-details.component.css'],
})
export class ModalPlanDetailsComponent {



  constructor( private elementRef : ElementRef) {

  }



  @Input() size? ='md';
  @Input() title? = 'Modal title';
  @Input() servicioUi! : ServicioUi;


  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();


  close(){
     this.elementRef.nativeElement.remove();
     this.closeEvent.emit();
  }

  submit( ) {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }


}
