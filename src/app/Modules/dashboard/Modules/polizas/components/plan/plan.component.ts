import { Component, EventEmitter,  Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { ModalService } from '../modal-plan-details/services/modal-service';
import { Observable } from 'rxjs';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';
import { HttpClient } from '@angular/common/http';

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

  private http  = inject(HttpClient);



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

  downloadPdf() {
    const pdfUrl = `/assets/pdf/${this.servicioUi.img}.pdf`;

    // Use HttpClient to fetch the PDF file as a Blob
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.servicioUi.img}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Clean up resources
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }


}
