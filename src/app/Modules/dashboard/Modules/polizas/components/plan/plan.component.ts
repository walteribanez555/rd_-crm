import { Component, EventEmitter,  Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ModalService } from '../modal-plan-details/services/modal-service';
import { Observable } from 'rxjs';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';

@Component({
  selector: 'plan',
  templateUrl : './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {

  @Input() servicioUi! : ServicioUi;
  tags : string[] = [];

  @Output() onItemSelected = new EventEmitter<ServicioUi>();


  @Input() onSelectedItem? : Observable<ServicioUi>;



  constructor(private modalService  : ModalService){

  }
  ngOnInit(): void {
    this.tags = this.servicioUi.disponibilidad.split(',');


    this.onSelectedItem?.subscribe(
      {
        next : (servicioSelected ) => {
          if(servicioSelected.servicio_id != this.servicioUi.servicio_id){
            this.servicioUi.isSelected = false;
          }

        },
        error : ( err ) => {

        },
        complete : ( ) => {

        }

      }
    )

  }


  openModal(modalTemplate : TemplateRef<any>){
    this.modalService.open(modalTemplate, this.servicioUi , {size : 'lg' , title : this.servicioUi.servicio}).subscribe(
      (action : any) => {
        console.log('modalAction', action);
      }
    )
  }

  changeState(){
    this.servicioUi.isSelected= !this.servicioUi.isSelected;

    this.onItemSelected.emit(this.servicioUi);
  }


}
