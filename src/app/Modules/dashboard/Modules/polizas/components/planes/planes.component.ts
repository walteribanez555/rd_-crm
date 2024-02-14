import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ServicioUi } from 'src/app/Modules/shared/models/Servicio.ui';

@Component({
  selector: 'planes',
  templateUrl : './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent  implements OnInit {
  private http = inject(HttpClient);

  ngOnInit(): void {

    this.onSelectedFromPlan = new Subject<ServicioUi>();
    this.observerSelectedFromPlan = this.onSelectedFromPlan.asObservable();



    this.observerSelection?.subscribe({
      next: ( serviciosFiltered ) => {
        console.log({serviciosFiltered});
        this.serviciosUiFiltered = serviciosFiltered;
      },
      error : (err) => {
        console.log(err);
      },
      complete : () => {

      }
    })

    this.serviciosUiFiltered = this.serviciosUi;

  }



  onSelectedFromPlan?  : Subject<ServicioUi>;
  observerSelectedFromPlan? : Observable<ServicioUi>;



  @Output() onChangePage = new EventEmitter();
  @Output() onBackStep = new EventEmitter();
  @Output() onSelectedPlan = new EventEmitter();


  @Input() planForm? : FormGroup;

  @Input() serviciosUi : ServicioUi[] | null = null;
  serviciosUiFiltered : ServicioUi[] | null = null;

  @Input() planSelected? : FormGroup;

  @Input() observerSelection?  : Observable<ServicioUi[]>;

  onChangeStep() {
    this.onChangePage.emit();
  }

  onBackStepBtn() {
    this.onBackStep.emit();
  }

  onSelectedItem( servicioUi : ServicioUi) {
    console.log(servicioUi);
    if(servicioUi.isSelected){
      this.onSelectedFromPlan?.next(servicioUi);
      this.planForm?.get('planSelected')?.setValue(servicioUi);
      this.onSelectedPlan.emit(servicioUi);
      return;
    }
    console.log("Plan deseleccionado");
    this.planForm?.get('planSelected')?.reset();
    return;
  }

  downloadPdf() {
    const pdfUrl = '/assets/pdf/CoberturasRedcard.pdf';

    // Use HttpClient to fetch the PDF file as a Blob
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Coberturas REDCARD.pdf';
      document.body.appendChild(a);
      a.click();

      // Clean up resources
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
