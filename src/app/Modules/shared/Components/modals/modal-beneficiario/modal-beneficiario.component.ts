import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { GeneratePdfService } from '../../pdf/poliza-pdf/services/generate-pdf.service';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import { ServicioUi } from '../../../models/Servicio.ui';



export interface canvasInterface {
  id_beneficiario : number,
  canva  : HTMLCanvasElement
}


@Component({
  selector: 'modal-beneficiario',
  styleUrls: ['./modal-beneficiario.component.css'],
  templateUrl : './modal-beneficiario.component.html'
})
export class ModalBeneficiarioComponent {


  constructor( private elementRef : ElementRef) {

  }


  private cdr = inject(ChangeDetectorRef);


  @Input() size? ='md';
  @Input() title? = 'Modal title';
  @Input() beneficiario? : Beneficiario;
  @Input() servicioUi? : ServicioUi;

  @Input() poliza? : Poliza;
  @Input() venta? : Venta;

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



  private pdfService = inject(GeneratePdfService);


  @ViewChild('canvaContainer') canvaContainer!: ElementRef;
  @ViewChild('polizasPdf', { static: true }) polizasPdfTemplate!: TemplateRef<any>;
  canvasDataMap: canvasInterface[] = []



  getCanva( beneficiario_id : number){




    const options = {
      background: 'white',
      scale: 3
    };

    this.cdr.detectChanges();

    const poliza = document.getElementById(beneficiario_id.toString());

    const id = beneficiario_id;

    if(!poliza){
      console.log("Poliza not found");
      return;
    }

    this.cdr.detectChanges();




    html2canvas(poliza, options).then(
      (canvas : HTMLCanvasElement) => {
        const containerWidth = 2480;
        const containerHeight = 3508; // Maintain the aspect ratio of 2480x3508

        canvas.style.maxWidth = '100%'; // Set the desired maximum width of the canvas
        canvas.style.maxHeight = '100%'; // Set the desired maximum height of the canvas
        canvas.style.width = `${containerWidth}px`; // Set the canvas width to fit the container
        canvas.style.height = `${containerHeight}px`; // Set the canvas height to maintain the aspect ratio

        const newCanva : canvasInterface = {
          id_beneficiario : id,
          canva : canvas
        }
      this.cdr.detectChanges();

        this.canvasDataMap = [...this.canvasDataMap , newCanva]; // Save canvas and beneficiary ID in the map
    this.cdr.detectChanges();

        // this.canvaContainer.nativeElement.appendChild(canvas);
      }
    )
  }



  downloadAllCanvas(){

    console.log(this.canvasDataMap);

    this.cdr.detectChanges();

    const allCanvases = this.canvasDataMap.map(
      canva => canva.canva
    ) as HTMLCanvasElement[];
    this.cdr.detectChanges();
    this.cdr.detectChanges();


    this.pdfService.generatePdfAsync(...allCanvases).subscribe({
      next: (resp)  => {
        console.log({resp});
        // PDF generation succeeded
        console.log('PDF generated successfully.');
      },
      error: (error: any) => {
        // PDF generation failed
        console.error('Error generating PDF:', error);
      },
      complete: () => {
        // PDF generation completed
      }
    });
  }


  downloadBeneficiario( beneficiario_id : number){

      const canva = this.canvasDataMap.map(canvas => canvas.canva);
      if(!canva){
        return;
      }

      this.pdfService.generatePdfAsync(...canva).subscribe({
        next: () => {
          // PDF generation succeeded
          console.log('PDF generated successfully.');
        },
        error: (error: any) => {
          // PDF generation failed

          // this.showErrorNotification(error);

        },
        complete: () => {

          // this.showSuccessNotification("Puede descargar el pdf")
        }
      });

  }



}
